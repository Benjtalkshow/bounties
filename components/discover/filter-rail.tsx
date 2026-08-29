'use client';

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ComponentType,
  type ReactNode,
  type SVGProps,
  useState,
} from 'react';

import {
  Activity01Icon,
  CompassIcon,
  HashtagIcon,
  Tag02Icon,
} from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { transitions } from '@/lib/motion';
import { cn } from '@/lib/utils';

import type { FacetCount } from './use-projects';
import { useProjectFilters } from './use-projects';

export type FilterGroup =
  | 'category'
  | 'tags'
  | 'publicStatus'
  | 'originType';

export interface FilterValue {
  category: string[];
  tags: string[];
  publicStatus: string[];
  originType: string[];
}

export const EMPTY_FILTERS: FilterValue = {
  category: [],
  tags: [],
  publicStatus: [],
  originType: [],
};

/** True once the visitor has narrowed the results with any control. */
export function hasActiveFilters(value: FilterValue): boolean {
  return (
    value.category.length > 0 ||
    value.tags.length > 0 ||
    value.publicStatus.length > 0 ||
    value.originType.length > 0
  );
}

/** `IN_DEVELOPMENT` -> `In Development`. */
function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Accepts both lucide icons and our generated SVG icon components. */
type FilterSectionIcon = ComponentType<SVGProps<SVGSVGElement>>;

function FilterSection({
  icon: Icon,
  title,
  defaultOpen = true,
  children,
}: {
  icon: FilterSectionIcon;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className='py-4 first:pt-0 last:border-b-0'>
      <button
        type='button'
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        className='flex w-full items-center gap-2 text-sm font-medium text-foreground'
      >
        <Icon
          className='size-4 text-muted-foreground'
          strokeWidth={1.75}
          aria-hidden
        />
        <span className='flex-1 text-left'>{title}</span>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key='content'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitions.base}
            className='overflow-hidden'
          >
            <div className='mt-3 flex flex-col gap-3'>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label htmlFor={id} className='flex cursor-pointer items-center gap-2'>
      <Checkbox id={id} checked={checked} onCheckedChange={() => onToggle()} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </label>
  );
}

function RadioRow({
  id,
  value,
  label,
  checked,
  onClear,
}: {
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onClear: () => void;
}) {
  return (
    <label htmlFor={id} className='flex cursor-pointer items-center gap-2'>
      <RadioGroupItem
        id={id}
        value={value}
        onPointerDown={event => {
          // Clicking the selected radio clears the filter.
          if (checked) {
            event.preventDefault();
            onClear();
          }
        }}
      />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </label>
  );
}

/** Keep at most one selected value. Clicking the current value clears it. */
function nextExclusiveValue(current: string[], item: string): string[] {
  return current[0] === item ? [] : [item];
}

/**
 * Discovery filter controls, used in the desktop sidebar and the mobile sheet.
 * Controlled: the parent owns `value` so it can show a Reset affordance and run
 * the query. `idPrefix` keeps the two instances from sharing input ids.
 */
export function FilterRail({
  value,
  onChange,
  idPrefix = 'rail',
  className,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  idPrefix?: string;
  className?: string;
}) {
  const { data, isPending, isError } = useProjectFilters();

  const selectExclusive = (group: FilterGroup, item: string) => {
    onChange({ ...value, [group]: nextExclusiveValue(value[group], item) });
  };

  const toggleTag = (item: string) => {
    const current = value.tags;
    const next = current.includes(item)
      ? current.filter(entry => entry !== item)
      : [...current, item];
    onChange({ ...value, tags: next });
  };

  const renderExclusiveRows = (
    group: FilterGroup,
    items: { value: string; label: string }[],
    title: string
  ) => (
    <RadioGroup
      value={value[group][0] ?? ''}
      onValueChange={item => selectExclusive(group, item)}
      name={`${idPrefix}-${group}`}
      aria-label={title}
    >
      {items.map(item => (
        <RadioRow
          key={item.value}
          id={`${idPrefix}-${group}-${item.value}`}
          value={item.value}
          label={item.label}
          checked={value[group][0] === item.value}
          onClear={() => selectExclusive(group, item.value)}
        />
      ))}
    </RadioGroup>
  );

  const renderTagRows = (items: FacetCount[]) =>
    items.map(item => (
      <CheckRow
        key={item.value}
        id={`${idPrefix}-tags-${item.value}`}
        label={`${item.value} (${item.count})`}
        checked={value.tags.includes(item.value)}
        onToggle={() => toggleTag(item.value)}
      />
    ));

  if (isPending) {
    return (
      <div className={cn('flex flex-col gap-3 py-4', className)}>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className='h-4 w-full' />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className={cn('py-4 text-sm text-muted-foreground', className)}>
        Filters could not be loaded right now.
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <FilterSection icon={Activity01Icon} title='Status'>
        {renderExclusiveRows(
          'publicStatus',
          data.publicStatuses.map(item => ({
            value: item,
            label: formatLabel(item),
          })),
          'Status'
        )}
      </FilterSection>

      <FilterSection icon={CompassIcon} title='Origin'>
        {renderExclusiveRows(
          'originType',
          data.originTypes.map(item => ({
            value: item,
            label: formatLabel(item),
          })),
          'Origin'
        )}
      </FilterSection>

      <FilterSection icon={HashtagIcon} title='Category'>
        {renderExclusiveRows(
          'category',
          data.categories.map(item => ({
            value: item.value,
            label: `${item.value} (${item.count})`,
          })),
          'Category'
        )}
      </FilterSection>

      <FilterSection icon={Tag02Icon} title='Tags' defaultOpen={false}>
        {renderTagRows(data.tags)}
      </FilterSection>
    </div>
  );
}
