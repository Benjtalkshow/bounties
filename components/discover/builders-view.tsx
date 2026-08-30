'use client';

import { useEffect, useMemo, useState } from 'react';

import { Section } from '@/components/marketing/section';

import { BuildersGrid } from './builders-grid';
import { DiscoverHeader } from './discover-header';
import { DiscoverToolbar } from './discover-toolbar';
import {
  useBuilders,
  type BuildersQueryParams,
} from './use-builders';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

/**
 * The `/builders` directory. Owns the search, filter, and page state and feeds
 * it to `useBuilders`, so the controls and the grid read from one source.
 * Modelled on `projects-view.tsx`. Filters and sort are out of scope for this
 * issue and will land in follow-up PRs.
 */
export function BuildersView() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Keep typing off the network until the visitor pauses. Narrowing the results
  // invalidates the page number, so the debounce resets it too.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const params = useMemo<BuildersQueryParams>(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
    }),
    [page, search]
  );

  const { data, isError, isPending } = useBuilders(params);

  return (
    <Section className='py-10 lg:py-12' innerClassName='flex flex-col gap-6'>
      <DiscoverHeader
        heading='Builders'
        subtext='Discover the builders shipping across the Boundless ecosystem.'
        count={data?.pagination.total}
      />

      {/* Filters and sort land in follow-up issues (#366, #367), so only the
          functional controls are wired here; the toolbar hides the rest. */}
      <DiscoverToolbar
        query={searchInput}
        onQueryChange={setSearchInput}
        placeholder='Search builders by name or username'
        showSort={false}
      />

      <BuildersGrid
        data={data}
        isPending={isPending}
        isError={isError}
        isNarrowed={search.length > 0}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </Section>
  );
}
