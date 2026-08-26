'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BuilderCard } from '@/components/cards/builder-card';
import { BuilderCardSkeleton } from '@/components/cards/builder-card-skeleton';
import { Pagination } from '@/components/ui/pagination';
import { Section } from '@/components/marketing/section';

import {
  type BuilderSort,
  type BuilderStatus,
  useBuilderFilters,
  useBuilders,
} from './use-builders';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_SORT: BuilderSort = 'newest';

interface DirectoryState {
  search: string;
  skills: string[];
  country: string;
  status: BuilderStatus | '';
  sort: BuilderSort;
  page: number;
}

function isBuilderSort(value: string | null): value is BuilderSort {
  return (
    value === 'name_asc' ||
    value === 'name_desc' ||
    value === 'newest' ||
    value === 'oldest'
  );
}

function isBuilderStatus(value: string | null): value is BuilderStatus {
  return (
    value === 'AVAILABLE' ||
    value === 'OPEN_TO_WORK' ||
    value === 'BUSY' ||
    value === 'UNAVAILABLE'
  );
}

/** Convert only supported, valid URL values into directory state. */
function stateFromSearchParams(searchParams: URLSearchParams): DirectoryState {
  const parsedPage = Number.parseInt(searchParams.get('page') ?? '', 10);
  const status = searchParams.get('status');
  const sort = searchParams.get('sort');
  const skills = searchParams
    .getAll('skills')
    .flatMap(value => value.split(','))
    .map(value => value.trim())
    .filter(Boolean);

  return {
    search: searchParams.get('search') ?? '',
    skills: [...new Set(skills)],
    country: searchParams.get('country') ?? '',
    status: isBuilderStatus(status) ? status : '',
    sort: isBuilderSort(sort) ? sort : DEFAULT_SORT,
    page: Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };
}

function stateToSearchParams(state: DirectoryState): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (state.search) searchParams.set('search', state.search);
  if (state.skills.length) searchParams.set('skills', state.skills.join(','));
  if (state.country) searchParams.set('country', state.country);
  if (state.status) searchParams.set('status', state.status);
  if (state.sort !== DEFAULT_SORT) searchParams.set('sort', state.sort);
  if (state.page !== 1) searchParams.set('page', String(state.page));
  return searchParams;
}

function toBuilderCard(builder: {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  role: string | null;
  location: string | null;
  country: string | null;
  skills: string[];
}) {
  const username = builder.username ?? builder.id;
  return {
    id: builder.id,
    displayName: builder.name ?? username,
    username,
    avatarSrc: builder.image ?? undefined,
    role: builder.role ?? undefined,
    location: builder.location ?? builder.country ?? undefined,
    skills: builder.skills.slice(0, 4),
    detailUrl: `/builders/${username}`,
  };
}

/** Public builders directory with URL-backed, shareable search and filters. */
export function BuildersView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();
  const urlState = useMemo(
    () => stateFromSearchParams(new URLSearchParams(serializedSearchParams)),
    [serializedSearchParams]
  );
  const [state, setState] = useState<DirectoryState>(urlState);
  const [searchInput, setSearchInput] = useState(urlState.search);
  const { data: facets } = useBuilderFilters();

  // A browser back/forward navigation changes Next's search params. Mirror that
  // external state into the controls without adding another history entry.
  useEffect(() => {
    setState(urlState);
    setSearchInput(urlState.search);
  }, [urlState]);

  const navigate = useCallback(
    (next: DirectoryState, replace = false) => {
      setState(next);
      const query = stateToSearchParams(next).toString();
      const href = query ? `${pathname}?${query}` : pathname;
      if (replace) router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  // Search is deliberately debounced. Replacing here means a sentence typed
  // into the search box contributes no per-keystroke browser history entries.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== state.search) {
        navigate({ ...state, search: searchInput, page: 1 }, true);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [navigate, searchInput, state]);

  const params = useMemo(
    () => ({
      page: state.page,
      limit: PAGE_SIZE,
      search: state.search || undefined,
      skills: state.skills.length ? state.skills : undefined,
      country: state.country || undefined,
      status: state.status || undefined,
      sort: state.sort,
    }),
    [state]
  );
  const { data, isPending, isError } = useBuilders(params);

  const update = (patch: Partial<DirectoryState>) =>
    navigate({ ...state, ...patch, page: patch.page ?? 1 });
  const toggleSkill = (skill: string) =>
    update({
      skills: state.skills.includes(skill)
        ? state.skills.filter(item => item !== skill)
        : [...state.skills, skill],
    });

  return (
    <Section className='py-10 lg:py-12' innerClassName='flex flex-col gap-6'>
      <div>
        <h1 className='text-3xl font-semibold text-foreground'>Builders</h1>
        <p className='mt-2 text-muted-foreground'>
          Discover people building across the Boundless ecosystem.
        </p>
      </div>

      <div className='flex flex-wrap gap-3'>
        <label className='flex min-w-56 flex-1 items-center gap-2 rounded-full border border-border px-4 py-2'>
          <Search className='size-4 text-muted-foreground' aria-hidden />
          <input
            className='w-full bg-transparent text-sm outline-none'
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
            placeholder='Search builders'
          />
        </label>
        <select
          aria-label='Country'
          value={state.country}
          onChange={event => update({ country: event.target.value })}
          className='rounded-full border border-border bg-transparent px-4 py-2 text-sm'
        >
          <option value=''>All countries</option>
          {facets?.countries.map(country => (
            <option key={country.value} value={country.value}>
              {country.value} ({country.count})
            </option>
          ))}
        </select>
        <select
          aria-label='Availability status'
          value={state.status}
          onChange={event =>
            update({ status: event.target.value as BuilderStatus | '' })
          }
          className='rounded-full border border-border bg-transparent px-4 py-2 text-sm'
        >
          <option value=''>All statuses</option>
          {facets?.statuses.map(status => (
            <option key={status} value={status}>
              {status.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
        <select
          aria-label='Sort builders'
          value={state.sort}
          onChange={event => update({ sort: event.target.value as BuilderSort })}
          className='rounded-full border border-border bg-transparent px-4 py-2 text-sm'
        >
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
          <option value='name_asc'>Name: A–Z</option>
          <option value='name_desc'>Name: Z–A</option>
        </select>
      </div>

      {facets?.skills.length ? (
        <div className='flex flex-wrap gap-2'>
          {facets.skills.map(skill => (
            <button
              key={skill.value}
              type='button'
              onClick={() => toggleSkill(skill.value)}
              className='rounded-full border border-border px-3 py-1 text-sm'
              aria-pressed={state.skills.includes(skill.value)}
            >
              {skill.value} ({skill.count})
            </button>
          ))}
        </div>
      ) : null}

      {isPending ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: PAGE_SIZE }, (_, index) => (
            <BuilderCardSkeleton key={index} />
          ))}
        </div>
      ) : null}
      {isError || !data ? (
        !isPending ? (
          <p className='py-12 text-center text-muted-foreground'>
            Builders could not be loaded right now.
          </p>
        ) : null
      ) : data.data.length === 0 ? (
        <p className='py-12 text-center text-muted-foreground'>
          No builders match these filters.
        </p>
      ) : (
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {data.data.map(builder => (
              <BuilderCard key={builder.id} builder={toBuilderCard(builder)} />
            ))}
          </div>
          <Pagination
            page={state.page}
            pageSize={PAGE_SIZE}
            totalItems={data.pagination.total}
            onPageChange={page => update({ page })}
            className='justify-between'
          />
        </div>
      )}
    </Section>
  );
}
