'use client';

import { countries } from 'countries-list';
import { ChevronDown, Layers, MapPin, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ComponentType,
  type ReactNode,
  type SVGProps,
  useState,
} from 'react';

import { Activity01Icon, Coins02Icon, HashtagIcon } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { transitions } from '@/lib/motion';
import { cn } from '@/lib/utils';

const STATUS = ['Open', 'Applications', 'Review', 'Completed'];
const MODE = [
  'All',
  'Single claim',
  'Application',
  'Competition',
  'Multiple winners',
];
const CATEGORY = [
  'All',
  'Design',
  'Development',
  'Content',
  'Growth',
  'Community',
  'Other',
];
const COUNTRY = Object.values(countries)
  .map(country => country.name)
  .sort((a, b) => a.localeCompare(b));

export type CheckboxGroup = 'status' | 'mode' | 'category' | 'country';

export interface FilterValue {
  status: string[];
  mode: string[];
  category: string[];
  country: string[];
  currency: string;
  min: string;
  max: string;
}

export const EMPTY_FILTERS: FilterValue = {
  status: [],
  mode: [],
  category: [],
  country: [],
  currency: 'USDC',
  min: '',
  max: '',
};

/** True once the visitor has narrowed the results with any control. */
export function hasActiveFilters(value: FilterValue): boolean {
  return (
    value.status.length > 0 ||
    value.mode.length > 0 ||
    value.category.length > 0 ||
    value.country.length > 0 ||
    value.min.trim() !== '' ||
    value.max.trim() !== ''
  );
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
  const [country, setCountry] = useState('');
  const countries = COUNTRY.filter(name =>
    name.toLowerCase().includes(country.trim().toLowerCase())
  );

  const toggle = (group: CheckboxGroup, item: string) => {
    const current = value[group];
    const next = current.includes(item)
      ? current.filter(entry => entry !== item)
      : [...current, item];
    onChange({ ...value, [group]: next });
  };

  const renderRows = (group: CheckboxGroup, items: string[]) =>
    items.map(item => (
      <CheckRow
        key={item}
        id={`${idPrefix}-${group}-${item}`}
        label={item}
        checked={value[group].includes(item)}
        onToggle={() => toggle(group, item)}
      />
    ));

  return (
    <div className={cn('flex flex-col', className)}>
      <FilterSection icon={Activity01Icon} title='Status'>
        {renderRows('status', STATUS)}
      </FilterSection>

      <FilterSection icon={Layers} title='Mode'>
        {renderRows('mode', MODE)}
      </FilterSection>

      <FilterSection icon={Coins02Icon} title='Rewards'>
        <Select
          value={value.currency}
          onValueChange={currency => onChange({ ...value, currency })}
        >
          <SelectTrigger
            aria-label='Reward currency'
            className='w-full border-[#1f2a28] text-foreground'
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='USDC'>USDC</SelectItem>
            <SelectItem value='XLM'>XLM</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            inputSize='small'
            placeholder='0'
            aria-label='Minimum reward'
            value={value.min}
            onChange={event => onChange({ ...value, min: event.target.value })}
            className='border-[#1f2a28]'
          />
          <span className='text-muted-foreground'>-</span>
          <Input
            type='number'
            inputSize='small'
            placeholder='0'
            aria-label='Maximum reward'
            value={value.max}
            onChange={event => onChange({ ...value, max: event.target.value })}
            className='border-[#1f2a28]'
          />
        </div>
      </FilterSection>

      <FilterSection icon={HashtagIcon} title='Category' defaultOpen={false}>
        {renderRows('category', CATEGORY)}
      </FilterSection>

      <FilterSection icon={MapPin} title='Country' defaultOpen={false}>
        <div className='flex items-center gap-2 rounded-md border border-[#1f2a28] px-3 py-2'>
          <Search
            className='size-4 shrink-0 text-muted-foreground'
            strokeWidth={1.75}
            aria-hidden
          />
          <input
            value={country}
            onChange={event => setCountry(event.target.value)}
            placeholder='Search here'
            className='w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground'
          />
        </div>
        {renderRows('country', countries)}
      </FilterSection>
    </div>
  );
}
