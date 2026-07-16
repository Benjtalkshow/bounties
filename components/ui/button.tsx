import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Boundless button system. Compose the look from independent axes:
 * `intent` (primary | secondary | white | destructive), `appearance`
 * (solid | outline | text), `size` (small | large), and `shape`
 * (rounded | pill). Pass `iconOnly` for square icon buttons and `loading`
 * for the spinner state.
 */
const buttonVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
        white: '',
        destructive: '',
      },
      appearance: {
        solid: '',
        outline: 'border bg-transparent',
        text: 'bg-transparent',
      },
      size: {
        small: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        large: "h-12 px-6 text-base [&_svg:not([class*='size-'])]:size-5",
      },
      shape: {
        rounded: 'rounded-lg',
        pill: 'rounded-full',
      },
    },
    compoundVariants: [
      // Solid
      {
        intent: 'primary',
        appearance: 'solid',
        class:
          'bg-primary-500 text-ink hover:bg-primary-400 focus-visible:ring-primary-200 active:bg-primary-600 disabled:bg-[#1a2422] disabled:text-[#4a5a57]',
      },
      {
        intent: 'secondary',
        appearance: 'solid',
        class:
          'bg-primary-500 text-ink hover:bg-primary-400 focus-visible:ring-primary-200 active:bg-primary-600 disabled:bg-[#1a2422] disabled:text-[#4a5a57]',
      },
      {
        intent: 'white',
        appearance: 'solid',
        class:
          'bg-white text-ink hover:bg-white/90 focus-visible:ring-white/25 active:bg-white disabled:bg-white/40 disabled:text-neutral-500/60',
      },
      {
        intent: 'destructive',
        appearance: 'solid',
        class:
          'bg-error-500 text-white hover:bg-error-400 focus-visible:ring-error-300/40 active:bg-error-600 disabled:bg-[#1a2422] disabled:text-[#4a5a57]',
      },
      // Outline
      {
        intent: 'primary',
        appearance: 'outline',
        class:
          'border-primary-500/60 text-primary-500 hover:border-primary-400/80 hover:bg-primary-500/8 hover:text-primary-400 focus-visible:border-primary-500 focus-visible:ring-primary-300/25 active:border-primary-600/90 active:bg-primary-500/12 disabled:border-neutral-500/30 disabled:text-neutral-500/40',
      },
      {
        intent: 'secondary',
        appearance: 'outline',
        class:
          'border-foreground/20 text-foreground/90 hover:border-foreground/35 hover:bg-foreground/6 hover:text-foreground focus-visible:border-foreground/60 focus-visible:ring-foreground/20 active:border-foreground/45 active:bg-foreground/10 disabled:border-neutral-500/30 disabled:text-neutral-500/40 aria-pressed:border-foreground/60 aria-pressed:bg-foreground/12 aria-pressed:text-foreground',
      },
      {
        intent: 'white',
        appearance: 'outline',
        class:
          'border-white/40 text-white/90 hover:border-white/60 hover:bg-white/8 hover:text-white focus-visible:ring-white/25 active:border-white/80 active:bg-white/12 disabled:border-white/40 disabled:text-white/40',
      },
      {
        intent: 'destructive',
        appearance: 'outline',
        class:
          'border-error-500/70 text-error-500 hover:border-error-400/85 hover:bg-error-500/8 focus-visible:border-error-500 focus-visible:ring-error-500/25 active:border-error-600/90 active:bg-error-500/12 disabled:border-error-500/40 disabled:text-error-500/50',
      },
      // Text
      {
        intent: 'primary',
        appearance: 'text',
        class:
          'text-primary-500 hover:bg-primary-500/8 hover:text-primary-400 focus-visible:ring-primary-300/25 active:text-primary-600 disabled:text-neutral-500/40',
      },
      {
        intent: 'secondary',
        appearance: 'text',
        class:
          'text-foreground/90 hover:bg-foreground/6 hover:text-foreground focus-visible:ring-foreground/20 active:text-foreground disabled:text-neutral-500/40',
      },
      {
        intent: 'white',
        appearance: 'text',
        class:
          'text-white/90 hover:bg-white/8 hover:text-white focus-visible:ring-white/25 active:text-white/80 disabled:text-white/40',
      },
      {
        intent: 'destructive',
        appearance: 'text',
        class:
          'text-error-500 hover:bg-error-500/8 hover:text-error-400 focus-visible:ring-error-300/25 active:text-error-600 disabled:text-error-500/50',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      appearance: 'solid',
      size: 'large',
      shape: 'rounded',
    },
  }
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Square icon-only button (width tracks height). */
    iconOnly?: boolean;
    /** Show a spinner and block interaction. */
    loading?: boolean;
  };

function Button({
  className,
  intent,
  appearance,
  size,
  shape,
  asChild = false,
  iconOnly = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-intent={intent}
      data-appearance={appearance}
      data-size={size}
      data-shape={shape}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ intent, appearance, size, shape }),
        iconOnly && 'aspect-square px-0',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <Loader2 className='animate-spin' aria-hidden /> : null}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
