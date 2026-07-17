import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** Pulsing placeholder block for loading states. */
function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('animate-pulse rounded-md bg-white/[0.06]', className)}
      {...props}
    />
  );
}

export { Skeleton };
