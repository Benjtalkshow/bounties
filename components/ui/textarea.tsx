import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string;
  helperText?: string;
  /** Class applied to the outer container (label + control + helper). */
  containerClassName?: string;
};

/**
 * Multi-line text field matching the Input design: neutral-600 border, eased
 * focus glow, with an optional label and helper text.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      containerClassName,
      label,
      helperText,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const describedBy = helperText
      ? [ariaDescribedBy, helperId].filter(Boolean).join(' ')
      : ariaDescribedBy;

    return (
      <div
        className={cn('flex w-full min-w-0 flex-col gap-1', containerClassName)}
      >
        {label ? (
          <label
            htmlFor={textareaId}
            className='text-sm font-medium text-[#929f9c]'
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          data-slot='textarea'
          aria-describedby={describedBy || undefined}
          className={cn(
            'min-h-[120px] w-full resize-none rounded-md border border-neutral-600 bg-transparent px-3 py-2 text-sm text-[#f1fff1] caret-primary-500 shadow-[0_0_0_0_transparent] transition-[color,background-color,border-color,box-shadow] duration-200 ease-out outline-none placeholder:text-neutral-400/70 hover:border-neutral-500 focus:border-primary-500 focus:bg-ink-soft focus:shadow-[0_0_0_4px_rgba(46,237,170,0.12)] disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {helperText ? (
          <p id={helperId} className='text-sm text-[#929f9c]/80'>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

export { Textarea };
