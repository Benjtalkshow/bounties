'use client';

import { ArrowDownUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  BUILDER_SORT_VALUES,
  isBuilderSort,
  type BuilderSort,
} from './use-builders';

const SORT_LABELS: Record<BuilderSort, string> = {
  newest: 'Newest',
  oldest: 'Oldest',
  name_asc: 'Name A-Z',
  name_desc: 'Name Z-A',
};

export function BuildersSortSelect({
  value,
  onChange,
}: {
  value: BuilderSort;
  onChange: (value: BuilderSort) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          className='shrink-0'
          aria-label={`Sort: ${SORT_LABELS[value]}`}
        >
          <ArrowDownUp className='size-4' strokeWidth={1.75} aria-hidden />
          {SORT_LABELS[value]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={next => {
            if (isBuilderSort(next)) onChange(next);
          }}
        >
          {BUILDER_SORT_VALUES.map(option => (
            <DropdownMenuRadioItem key={option} value={option}>
              {SORT_LABELS[option]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
