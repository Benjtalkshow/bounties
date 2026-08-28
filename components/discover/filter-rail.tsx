'use client';

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ComponentType,
  type ReactNode,
  type SVGProps,
  useState,
} from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { transitions } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Any selection state shaped as named groups of strings (skills, country,
 * status, category, tags, ...). The generic shape is what lets the rail drive
 * both the projects and builders directories from one component.
 */
export type FilterValue = Record<string, string[]>;

/** True once the visitor has narrowed the results with any control. */
export function hasActiveFilters(value: FilterValue): boolean {
  return Object.values(value).some(group => group.length > 0);
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

/** A facet row item. `label` lets a raw value render a friendlier display name. */
export interface FacetCount {
  value: string;
  count: number;
  label?: string;
}

/** One collapsible group rendered by the rail. */
interface FilterSectionConfigBase {
  /** Key into `FilterValue` this section reads and writes. */
  group: string;
  title: string;
  icon: FilterSectionIcon;
  defaultOpen?: boolean;
}

/** Facet rows show `value (count)` from `FacetCount[]`. */
export interface FacetSectionConfig extends FilterSectionConfigBase {
  kind: 'facet';
  items: FacetCount[];
}

/** Enum rows format SCREAMING_SNAKE labels from `string[]`. */
export interface EnumSectionConfig extends FilterSectionConfigBase {
  kind: 'enum';
  items: string[];
}

export type FilterSectionConfig = FacetSectionConfig | EnumSectionConfig;

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

/**
 * Discovery filter controls, shared by the desktop sidebar and the mobile
 * sheet. Controlled: the parent owns `value` so it can show a Reset affordance
 * and run the query. Sections are configured by the parent, so the projects
 * (category/tags/status/origin) and builders (skills/country/status) pages
 * render the same controls from one source. `idPrefix` keeps the two instances
 * from sharing input ids.
 */
export function FilterRail({
  sections,
  value,
  onChange,
  idPrefix = 'rail',
  isPending = false,
  isError = false,
  className,
}: {
  sections: FilterSectionConfig[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  idPrefix?: string;
  isPending?: boolean;
  isError?: boolean;
  className?: string;
}) {
  const toggle = (group: string, item: string) => {
    const current = value[group] ?? [];
    const next = current.includes(item)
      ? current.filter(entry => entry !== item)
      : [...current, item];
    onChange({ ...value, [group]: next });
  };

  const renderRows = (section: FilterSectionConfig) => {
    if (section.kind === 'enum') {
      return section.items.map(item => (
        <CheckRow
          key={item}
          id={`${idPrefix}-${section.group}-${item}`}
          label={formatLabel(item)}
          checked={(value[section.group] ?? []).includes(item)}
          onToggle={() => toggle(section.group, item)}
        />
      ));
    }
    return section.items.map(item => (
      <CheckRow
        key={item.value}
        id={`${idPrefix}-${section.group}-${item.value}`}
        label={`${item.label ?? item.value} (${item.count})`}
        checked={(value[section.group] ?? []).includes(item.value)}
        onToggle={() => toggle(section.group, item.value)}
      />
    ));
  };

  if (isPending) {
    return (
      <div className={cn('flex flex-col gap-3 py-4', className)}>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className='h-4 w-full' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className={cn('py-4 text-sm text-muted-foreground', className)}>
        Filters could not be loaded right now.
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {sections.map(section => (
        <FilterSection
          key={section.group}
          icon={section.icon}
          title={section.title}
          defaultOpen={section.defaultOpen}
        >
          {renderRows(section)}
        </FilterSection>
      ))}
    </div>
  );
}
