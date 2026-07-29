'use client';

import { useEffect, useMemo, useState } from 'react';

import { Section } from '@/components/marketing/section';

import { CategoryTabs } from './category-tabs';
import { DiscoverHeader } from './discover-header';
import { DiscoverToolbar } from './discover-toolbar';
import {
  EMPTY_FILTERS,
  FilterRail,
  hasActiveFilters,
  type FilterValue,
} from './filter-rail';
import { FilterSheet } from './filter-sheet';
import { ProjectsResults } from './projects-results';
import {
  useProjectFilters,
  useProjects,
  type ProjectsQueryParams,
} from './use-projects';

const PAGE_SIZE = 12;
const ALL_CATEGORIES = 'All';
const SEARCH_DEBOUNCE_MS = 300;

/**
 * The `/projects` directory. Owns the search, category, filter, and page state
 * and feeds it to `useProjects`, so the controls, the rail, and the grid all
 * read from one source. The projects equivalent of the boundless `discover-view`,
 * minus the pillar tabs, since this page is projects only.
 */
export function ProjectsView() {
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
      setSearch(searchInput);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const applyFilters = (next: FilterValue) => {
    setFilters(next);
    setPage(1);
  };

  const params = useMemo<ProjectsQueryParams>(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      // `GET /projects` takes a single value for these three, so a multi-select
      // in the rail sends its first entry. Only `tags` is repeatable.
      category: filters.category[0],
      publicStatus: filters.publicStatus[0],
      originType: filters.originType[0],
      tags: filters.tags.length > 0 ? filters.tags : undefined,
    }),
    [page, search, filters]
  );

  const { data, isError, isPending } = useProjects(params);
  const { data: facets } = useProjectFilters();

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...(facets?.categories.map(item => item.value) ?? []),
    ],
    [facets]
  );

  const reset = () => applyFilters(EMPTY_FILTERS);

  const selectCategory = (category: string) =>
    applyFilters({
      ...filters,
      category: category === ALL_CATEGORIES ? [] : [category],
    });

  return (
    <Section className='py-10 lg:py-12' innerClassName='flex flex-col gap-6'>
      <DiscoverHeader
        heading='Projects'
        subtext='Explore the products being built across the Boundless ecosystem.'
        count={data?.pagination.total}
        showActions={false}
      />

      <CategoryTabs
        categories={categories}
        active={filters.category[0] ?? ALL_CATEGORIES}
        onSelect={selectCategory}
      />

      <DiscoverToolbar
        filtersOpen={railOpen}
        onToggleFilters={() => setRailOpen(open => !open)}
        onOpenMobileFilters={() => setSheetOpen(true)}
        filtersActive={hasActiveFilters(filters)}
        onReset={reset}
        query={searchInput}
        onQueryChange={setSearchInput}
        placeholder='Search projects, categories, or tags'
      />

      <div className='flex items-start gap-6'>
        {railOpen ? (
          <aside className='hidden w-[260px] shrink-0 lg:block'>
            <FilterRail value={filters} onChange={applyFilters} />
          </aside>
        ) : null}

        <div className='min-w-0 flex-1'>
          <ProjectsResults
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
        value={filters}
        onChange={applyFilters}
        onReset={reset}
      />
    </Section>
  );
}
