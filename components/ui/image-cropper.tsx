'use client';

import 'react-easy-crop/react-easy-crop.css';

import { Minus, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getCroppedImageFile, type PixelArea } from '@/lib/crop-image';
import { cn } from '@/lib/utils';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

export interface ImageCropperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Object URL or data URL of the picked image. Null while none is selected. */
  imageSrc: string | null;
  /** Crop aspect ratio (width / height). */
  aspect: number;
  /** Circular crop for avatars, rectangular for banners. */
  cropShape?: 'rect' | 'round';
  title?: string;
  description?: string;
  confirmLabel?: string;
  /** Name for the produced File. */
  fileName?: string;
  /** Output mime type (defaults to JPEG). */
  outputType?: string;
  /** Cap the exported width in pixels so large photos stay light. */
  maxWidth?: number;
  /** Receives the cropped, correctly-sized File ready to upload. */
  onCropped: (file: File) => void | Promise<void>;
}

/**
 * Reusable crop-and-resize step for any image upload. Wraps react-easy-crop in
 * the app dialog: the user drags to position and zooms, and Save exports the
 * selection (at the given aspect ratio) as a File via {@link getCroppedImageFile}.
 */
export function ImageCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  aspect,
  cropShape = 'rect',
  title = 'Crop image',
  description = 'Drag to reposition and use the slider to zoom.',
  confirmLabel = 'Save',
  fileName,
  outputType,
  maxWidth,
  onCropped,
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [area, setArea] = useState<PixelArea | null>(null);
  const [processing, setProcessing] = useState(false);

  // Start each new image centered and un-zoomed. Each pick creates a fresh
  // object URL, so a changed src means a new image. Resetting during render
  // (React's recommended pattern) avoids a state-sync effect.
  const [lastSrc, setLastSrc] = useState(imageSrc);
  if (imageSrc !== lastSrc) {
    setLastSrc(imageSrc);
    setCrop({ x: 0, y: 0 });
    setZoom(MIN_ZOOM);
    setArea(null);
  }

  const onCropComplete = useCallback(
    (_croppedArea: PixelArea, croppedAreaPixels: PixelArea) =>
      setArea(croppedAreaPixels),
    []
  );

  const clampZoom = (value: number) =>
    Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));

  const handleConfirm = async () => {
    if (!imageSrc || !area) return;
    setProcessing(true);
    try {
      const file = await getCroppedImageFile(imageSrc, area, {
        fileName,
        type: outputType,
        maxWidth,
      });
      await onCropped(file);
      onOpenChange(false);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-5 border-border-subtle bg-ink-soft sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-white'>{title}</DialogTitle>
          <DialogDescription className='text-[#929f9c]'>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className='relative h-[320px] w-full overflow-hidden rounded-xl bg-black'>
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropShape={cropShape}
              showGrid={cropShape === 'rect'}
              restrictPosition
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              onCropChange={setCrop}
              onZoomChange={value => setZoom(clampZoom(value))}
              onCropComplete={onCropComplete}
            />
          ) : null}
        </div>

        {/* Zoom control */}
        <div className='flex items-center gap-3'>
          <button
            type='button'
            aria-label='Zoom out'
            onClick={() => setZoom(z => clampZoom(z - ZOOM_STEP))}
            className='grid size-8 shrink-0 place-items-center rounded-full border border-[#2e3a38] text-neutral-200 transition-colors hover:text-white'
          >
            <Minus className='size-4' aria-hidden />
          </button>
          <input
            type='range'
            aria-label='Zoom'
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={event => setZoom(clampZoom(Number(event.target.value)))}
            className={cn(
              'h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary'
            )}
          />
          <button
            type='button'
            aria-label='Zoom in'
            onClick={() => setZoom(z => clampZoom(z + ZOOM_STEP))}
            className='grid size-8 shrink-0 place-items-center rounded-full border border-[#2e3a38] text-neutral-200 transition-colors hover:text-white'
          >
            <Plus className='size-4' aria-hidden />
          </button>
        </div>

        <DialogFooter>
          <Button
            intent='secondary'
            appearance='outline'
            shape='pill'
            size='small'
            onClick={() => onOpenChange(false)}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            intent='primary'
            appearance='solid'
            shape='pill'
            size='small'
            loading={processing}
            disabled={!area}
            onClick={() => void handleConfirm()}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
