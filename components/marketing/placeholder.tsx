import { cn } from '@/lib/utils';

/**
 * Plain scaffold block for marketing sections. The design team replaces these
 * with real layouts; until then each section renders a labeled dashed box so
 * pages compose and route correctly without committing to a design.
 */
export function Placeholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center',
        className
      )}
    >
      <span className='text-sm font-medium tracking-wide text-white/40 uppercase'>
        {label}
      </span>
    </div>
  );
}
