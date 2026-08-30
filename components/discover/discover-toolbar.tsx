'use client';

import {
  ArrowDownUp,
  Funnel,
  ListFilter,
  MoveLeft,
  RotateCcw,
  Search,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { transitions } from '@/lib/motion';

/**
 * Filter wiring is all or nothing. A page either owns filter state and passes
 * every handler, or it passes none and the toolbar shows search alone. Making
 * this a union means a half-wired caller is a type error rather than a toolbar
 * that quietly drops its filter controls.
 */
type FilterProps =
  | {
      filtersOpen: boolean;
      onToggleFilters: () => void;
      onOpenMobileFilters: () => void;
      filtersActive: boolean;
      onReset: () => void;
    }
  | {
      filtersOpen?: never;
      onToggleFilters?: never;
      onOpenMobileFilters?: never;
      filtersActive?: never;
      onReset?: never;
    };

export function DiscoverToolbar({
  filtersOpen = false,
  onToggleFilters,
  onOpenMobileFilters,
  filtersActive = false,
  onReset,
  showSort = true,
  query,
  onQueryChange,
  placeholder = 'Search',
}: FilterProps & {
  /** Hide the sort pill on pages that don't wire sorting yet (e.g. `/builders`). */
  showSort?: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
}) {
  // Pages like `/builders` only wire search today, so they omit the handlers and
  // the toolbar shows search alone instead of a Filters button that does nothing.
  // `FilterProps` guarantees these arrive together, so one check covers all three.
  const showFilters = onToggleFilters !== undefined;

  return (
    <div className='flex items-center gap-3'>
      {showFilters && (
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          onClick={onToggleFilters}
          className='hidden shrink-0 lg:inline-flex'
        >
          {filtersOpen ? (
            <MoveLeft className='size-4' strokeWidth={1.75} aria-hidden />
          ) : (
            <Funnel className='size-4' strokeWidth={1.75} aria-hidden />
          )}
          {filtersOpen ? 'Hide Filters' : 'Filters'}
        </Button>
      )}

      <AnimatePresence initial={false}>
        {showFilters && filtersActive ? (
          <motion.div
            key='reset-desktop'
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={transitions.fast}
            className='hidden shrink-0 lg:block'
          >
            <Button
              appearance='outline'
              intent='primary'
              shape='pill'
              size='small'
              onClick={onReset}
            >
              <RotateCcw className='size-4' strokeWidth={1.75} aria-hidden />
              Reset
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className='flex flex-1 items-center gap-2 rounded-full border border-[#1f2a28] px-4 py-2.5'>
        <Search
          className='size-4 shrink-0 text-muted-foreground'
          strokeWidth={1.75}
          aria-hidden
        />
        <input
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className='w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground'
        />
      </div>

      {showFilters && (
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          iconOnly
          onClick={onOpenMobileFilters}
          aria-label='Filters'
          className='shrink-0 lg:hidden'
        >
          <ListFilter className='size-5' strokeWidth={1.75} aria-hidden />
        </Button>
      )}

      <AnimatePresence initial={false}>
        {showFilters && filtersActive ? (
          <motion.div
            key='reset-mobile'
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={transitions.fast}
            className='shrink-0 lg:hidden'
          >
            <Button
              appearance='outline'
              intent='secondary'
              shape='pill'
              size='small'
              iconOnly
              onClick={onReset}
              aria-label='Reset filters'
            >
              <RotateCcw className='size-5' strokeWidth={1.75} aria-hidden />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showSort && (
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          className='hidden shrink-0 lg:inline-flex'
        >
          <ArrowDownUp className='size-4' strokeWidth={1.75} aria-hidden />
          Newest
        </Button>
      )}
    </div>
  );
}
