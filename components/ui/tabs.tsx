'use client';

import { cn } from '@/lib/utils';

export interface TabItem {
  /** Stable identifier emitted through `onValueChange`. */
  value: string;
  /** Visible label. */
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/**
 * Horizontal filter tabs: the active item shows as a solid pill, the rest as
 * plain text links. Scrolls horizontally on narrow viewports.
 */
export function Tabs({ items, value, onValueChange, className }: TabsProps) {
  return (
    <div
      role='tablist'
      className={cn(
        'scrollbar-hide flex items-center gap-6 overflow-x-auto lg:gap-10',
        className
      )}
    >
      {items.map(item => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type='button'
            role='tab'
            aria-selected={active}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'shrink-0 rounded-full whitespace-nowrap transition-colors',
              active
                ? 'bg-white px-5 py-2 text-xs font-semibold tracking-[0.5px] text-[#1c1e13]'
                : 'text-sm font-medium tracking-[0.1px] text-primary-50/90 hover:text-white'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
