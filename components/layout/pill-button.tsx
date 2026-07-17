import { type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Drop shadow plus the inset highlight that gives the green CTA its gloss. */
const PILL_GLOW =
  'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_10px_15px_-3px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.05),inset_0px_0px_0px_2px_rgba(255,255,255,0.1),inset_0px_1px_0px_1px_rgba(255,255,255,0.15),inset_0px_0px_25px_2px_rgba(255,255,255,0.05)]';

/**
 * The brand CTA: a primary solid pill with the signature glow. Used across the
 * navbars (Launch App, Subscribe, Sign in). Pass `asChild` to wrap a link.
 */
export function PillButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      intent='primary'
      appearance='solid'
      shape='pill'
      size='small'
      className={cn('font-semibold', PILL_GLOW, className)}
      {...props}
    />
  );
}
