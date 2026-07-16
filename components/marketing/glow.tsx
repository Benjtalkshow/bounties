import { cn } from '@/lib/utils';

/**
 * Soft ambient glow: the primary green with a touch of the explore-path badge
 * accent (#66c589) mixed in. Size, position, opacity and blur are set by the
 * caller (the colour falls off naturally through the blur).
 */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none rounded-full bg-[color-mix(in_srgb,var(--color-primary)_65%,#66c589)] blur-3xl',
        className
      )}
    />
  );
}
