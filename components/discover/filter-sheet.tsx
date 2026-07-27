'use client';

import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { Button } from '@/components/ui/button';

import { FilterRail, type FilterValue } from './filter-rail';

/**
 * Full-screen filter sheet for mobile. Opened from the toolbar's filter button;
 * fills the viewport, scrolls the rail, and keeps Reset/Done pinned. Triggered
 * only below `lg`, where the inline rail is hidden.
 */
export function FilterSheet({
  open,
  onOpenChange,
  value,
  onChange,
  onReset,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  onReset: () => void;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0' />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className='fixed inset-0 z-50 flex h-dvh w-screen flex-col bg-ink text-white outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom'
        >
          <div className='flex items-center justify-between border-b border-[#1f2a28] px-5 py-4'>
            <DialogPrimitive.Title className='text-lg font-semibold text-foreground'>
              Filters
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button
                appearance='text'
                intent='secondary'
                size='small'
                iconOnly
                aria-label='Close filters'
                className='rounded-full'
              >
                <XIcon className='size-5' />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <div className='flex-1 overflow-y-auto px-5'>
            <FilterRail idPrefix='sheet' value={value} onChange={onChange} />
          </div>

          <div className='flex items-center gap-3 border-t border-[#1f2a28] px-5 py-4'>
            <Button
              appearance='outline'
              intent='secondary'
              shape='pill'
              className='flex-1'
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              intent='primary'
              shape='pill'
              className='flex-1'
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
