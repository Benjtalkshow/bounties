'use client';

import { useMemo } from 'react';

import {
  Activity01Icon,
  FlagIcon,
  Tag02Icon,
} from '@/components/icons';
import { useBuilderFilters } from '@/lib/api/users';

import {
  type FilterSectionConfig,
  GenericFilterRail,
  type GenericFilterValue,
  hasActiveGenericFilters,
} from './filter-rail';

export interface BuilderFilterValue {
  skills: string[];
  country: string[];
  status: string[];
}

export const EMPTY_BUILDER_FILTERS: BuilderFilterValue = {
  skills: [],
  country: [],
  status: [],
};

/** True once the visitor has narrowed the results with any control. */
export function hasActiveBuilderFilters(value: BuilderFilterValue): boolean {
  return hasActiveGenericFilters(value);
}

/**
 * Builder-specific filter rail component.
 * Fetches builder filters and renders Skills, Country, and Status sections.
 */
export function BuildersFilterRail({
  value,
  onChange,
  idPrefix = 'builders-rail',
  className,
}: {
  value: BuilderFilterValue;
  onChange: (value: BuilderFilterValue) => void;
  idPrefix?: string;
  className?: string;
}) {
  const { data, isPending, isError } = useBuilderFilters();

  const sections = useMemo<FilterSectionConfig[]>(() => {
    if (!data) return [];

    return [
      {
        key: 'status',
        icon: Activity01Icon,
        title: 'Status',
        defaultOpen: true,
        type: 'enum' as const,
        items: data.statuses,
      },
      {
        key: 'country',
        icon: FlagIcon,
        title: 'Country',
        defaultOpen: true,
        type: 'facets' as const,
        items: data.countries,
      },
      {
        key: 'skills',
        icon: Tag02Icon,
        title: 'Skills',
        defaultOpen: false,
        type: 'facets' as const,
        items: data.skills,
      },
    ];
  }, [data]);

  const handleChange = (newValue: GenericFilterValue) => {
    onChange(newValue as BuilderFilterValue);
  };

  return (
    <GenericFilterRail
      sections={sections}
      value={value}
      onChange={handleChange}
      isPending={isPending}
      isError={isError}
      idPrefix={idPrefix}
      className={className}
    />
  );
}
