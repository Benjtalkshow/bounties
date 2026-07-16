import { Slot } from 'radix-ui';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

interface MarketingButtonProps extends ComponentProps<'button'> {
  /** Render as the child element (e.g. an anchor) instead of a button. */
  asChild?: boolean;
}

/**
 * Pill-shaped brand button used across marketing CTAs (e.g. the brand-kit
 * download). Pass `asChild` to render as a link. Icons are sized automatically.
 */
export function MarketingButton({
  className,
  asChild = false,
  ...props
}: MarketingButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='marketing-button'
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-600 px-[25px] py-[10px] text-[15px] font-semibold tracking-[0.625px] whitespace-nowrap text-[#1c1e13] transition-colors hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
}
