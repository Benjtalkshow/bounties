'use client';

import { getCountryDataList } from 'countries-list';
import { useEffect, useMemo, useState } from 'react';

import { Activity01Icon, CodeIcon, GlobeIcon } from '@/components/icons';
import { Section } from '@/components/marketing/section';

import { DiscoverHeader } from './discover-header';
import { DiscoverToolbar } from './discover-toolbar';
import {
  FilterRail,
  hasActiveFilters,
  type FilterSectionConfig,
  type FilterValue,
} from './filter-rail';
import { FilterSheet } from './filter-sheet';
import { BuildersGrid } from './builders-grid';
import {
  useBuilderFilters,
  useBuilders,
  type BuildersQueryParams,
} from './use-builders';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const EMPTY_FILTERS: FilterValue = {
  skills: [],
  country: [],
  status: [],
};

/** ISO alpha-2 code -> country name, for friendlier facet labels. */
const COUNTRY_NAMES = new Map<string, string>(
  getCountryDataList().map(country => [country.iso2, country.name])
);

function countryLabel(code: string): string | undefined {
  return COUNTRY_NAMES.get(code.toUpperCase());
}

/**
 * The `/builders` directory. Owns the search, filter, and page state and feeds
 * it to `useBuilders`, so the rail, the sheet, and the grid all read from one
 * source. `railOpen` drives the desktop sidebar toggle; `sheetOpen` drives the
 * mobile full-screen sheet, which renders the exact same `FilterRail` instance
 * configuration under a distinct `idPrefix`.
 */
export function BuildersView() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterValue>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [railOpen, setRailOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Keep typing off the network until the visitor pauses. Narrowing the results
  // invalidates the page number, so the debounce resets it too.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const applyFilters = (next: FilterValue) => {
    setFilters(next);
    setPage(1);
  };

  const params = useMemo<BuildersQueryParams>(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      // `GET /users/directory` takes a single value for these two, so their
      // rail sections are single-select radios. Only `skills` is repeatable.
      skills: filters.skills?.length ? filters.skills : undefined,
      country: filters.country?.[0],
      status: filters.status?.[0],
    }),
    [page, search, filters]
  );

  const { data, isError, isPending } = useBuilders(params);
  const {
    data: facets,
    isPending: facetsPending,
    isError: facetsError,
  } = useBuilderFilters();

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    if (!facets) return [];
    return [
      {
        group: 'skills',
        selection: 'multi',
        title: 'Skills',
        icon: CodeIcon,
        kind: 'facet',
        items: facets.skills,
      },
      {
        group: 'country',
        selection: 'single',
        title: 'Country',
        icon: GlobeIcon,
        kind: 'facet',
        items: facets.countries.map(item => ({
          ...item,
          label: countryLabel(item.value) ?? item.value,
        })),
      },
      {
        group: 'status',
        selection: 'single',
        title: 'Status',
        icon: Activity01Icon,
        kind: 'enum',
        items: facets.statuses,
      },
    ];
  }, [facets]);

  const reset = () => applyFilters(EMPTY_FILTERS);

  return (
    <Section className='py-10 lg:py-12' innerClassName='flex flex-col gap-6'>
      <DiscoverHeader
        heading='Builders'
        subtext='Meet the builders making an impact across the Boundless ecosystem.'
        count={data?.pagination.total}
      />

      <DiscoverToolbar
        filtersOpen={railOpen}
        onToggleFilters={() => setRailOpen(open => !open)}
        onOpenMobileFilters={() => setSheetOpen(true)}
        filtersActive={hasActiveFilters(filters)}
        onReset={reset}
        query={searchInput}
        onQueryChange={setSearchInput}
        placeholder='Search builders, skills, or locations'
      />

      <div className='flex items-start gap-6'>
        {railOpen ? (
          <aside className='hidden w-[260px] shrink-0 lg:block'>
            <FilterRail
              idPrefix='rail'
              sections={filterSections}
              value={filters}
              onChange={applyFilters}
              isPending={facetsPending}
              isError={facetsError}
            />
          </aside>
        ) : null}

        <div className='min-w-0 flex-1'>
          <BuildersGrid
            data={data}
            isPending={isPending}
            isError={isError}
            isNarrowed={hasActiveFilters(filters) || search.length > 0}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onReset={reset}
      >
        <FilterRail
          idPrefix='sheet'
          sections={filterSections}
          value={filters}
          onChange={applyFilters}
          isPending={facetsPending}
          isError={facetsError}
        />
      </FilterSheet>
    </Section>
  );
}
