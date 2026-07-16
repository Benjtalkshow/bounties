import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface OptionCardProps extends Omit<ComponentProps<'button'>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Rendered inside the leading 80px tile (e.g. an icon or coin). */
  icon?: ReactNode;
  /** Selected state; drives the border and the radio fill. */
  selected?: boolean;
}

/**
 * Selectable option card: leading icon tile, title/description, and a radio
 * control. Controlled and presentational — render inside a `role="radiogroup"`
 * and let the parent own selection via `selected` + `onClick`.
 */
export function OptionCard({
  title,
  description,
  icon,
  selected = false,
  className,
  ...props
}: OptionCardProps) {
  return (
    <button
      type='button'
      role='radio'
      aria-checked={selected}
      data-slot='option-card'
      className={cn(
        'flex w-full items-center gap-4 overflow-hidden rounded-2xl border-[0.8px] bg-ink-soft py-2 pr-4 pl-2 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        selected
          ? 'border-primary-500'
          : 'border-neutral-600 hover:border-neutral-500',
        className
      )}
      {...props}
    >
      {icon ? (
        <span className='grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#182120]'>
          {icon}
        </span>
      ) : null}

      <span className='flex min-w-0 flex-1 items-center gap-3'>
        <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <span className='text-base font-medium text-foreground'>{title}</span>
          {description ? (
            <span className='text-sm text-[#808080]'>{description}</span>
          ) : null}
        </span>

        <span
          aria-hidden
          className={cn(
            'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
            selected ? 'border-primary-500' : 'border-[#929f9c]'
          )}
        >
          {selected ? (
            <span className='size-2.5 rounded-full bg-primary-500' />
          ) : null}
        </span>
      </span>
    </button>
  );
}
