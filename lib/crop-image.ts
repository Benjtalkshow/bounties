/**
 * Canvas helpers for turning a react-easy-crop selection into an uploadable
 * file. Kept framework-agnostic so any image-upload flow (avatar, banner, and
 * future ones) can reuse it. Runs in the browser only (uses canvas).
 */

/** A crop rectangle in the source image's natural pixels (react-easy-crop's `Area`). */
export interface PixelArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropOutputOptions {
  /** File name for the produced File. */
  fileName?: string;
  /** Output mime type. Defaults to the source type when known, else JPEG. */
  type?: string;
  /** Quality (0..1) for lossy encoders (JPEG/WebP). */
  quality?: number;
  /**
   * Cap the output width in pixels, scaling the crop down to keep uploads
   * light. The aspect ratio of the crop is preserved. No upscaling is done.
   */
  maxWidth?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // Same-origin blob/data URLs never taint the canvas; this keeps remote
    // sources exportable too when the host sends permissive CORS headers.
    image.crossOrigin = 'anonymous';
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () =>
      reject(new Error('Could not load the image to crop.'))
    );
    image.src = src;
  });
}

/**
 * Crops `imageSrc` to `area` (natural pixels) and returns an uploadable File.
 * Optionally downscales the result to `maxWidth` so large photos do not become
 * oversized uploads.
 */
export async function getCroppedImageFile(
  imageSrc: string,
  area: PixelArea,
  options: CropOutputOptions = {}
): Promise<File> {
  const {
    fileName = 'image.jpg',
    type = 'image/jpeg',
    quality = 0.92,
    maxWidth,
  } = options;

  const image = await loadImage(imageSrc);

  const scale = maxWidth && area.width > maxWidth ? maxWidth / area.width : 1;
  const outputWidth = Math.max(1, Math.round(area.width * scale));
  const outputHeight = Math.max(1, Math.round(area.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get a canvas context.');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  const blob = await new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, type, quality)
  );
  if (!blob) throw new Error('Could not export the cropped image.');
  return new File([blob], fileName, { type });
}
