import { cn } from '@/lib/utils';

export interface StatItem {
  label: string;
  /** Value shown on desktop (large green). */
  value: React.ReactNode;
  /** Optional compact value for mobile; falls back to `value`. */
  mobileValue?: React.ReactNode;
}

/**
 * Shared profile stats bar: a horizontal card with dividers between columns on
 * desktop, stacked label/value rows on mobile, green values per the frames.
 * Both the contributor and organization profiles configure the same anatomy
 * with different columns.
 */
export function StatsBar({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <section
      className={cn('w-full rounded-2xl border border-[#1F2A28]', className)}
    >
      {/* Desktop: columns with dividers */}
      <div className='hidden sm:flex'>
        {items.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              'flex flex-1 flex-col gap-2 px-6 py-5',
              index > 0 && 'border-l border-[#1f2a28]'
            )}
          >
            <span className='text-sm font-semibold whitespace-nowrap text-[#F1FFF1]'>
              {item.label}
            </span>
            <span className='text-3xl font-normal text-primary-500'>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {/* Mobile: stacked rows */}
      <div className='flex flex-col gap-4 p-5 sm:hidden'>
        {items.map(item => (
          <div key={item.label} className='flex items-center justify-between'>
            <span className='text-sm text-[#929f9c]'>{item.label}</span>
            <span className='text-sm font-semibold text-primary-500'>
              {item.mobileValue ?? item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
