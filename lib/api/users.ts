import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';

export interface BuilderListItemDto {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  role: string | null;
  bio: string | null;
  location: string | null;
  country: string | null;
  status: 'AVAILABLE' | 'OPEN_TO_WORK' | 'BUSY' | 'UNAVAILABLE' | null;
  skills: string[];
  joinedAt: string;
}

export interface FacetCountDto {
  value: string;
  count: number;
}

export interface BuilderFiltersDto {
  /** Skills with counts */
  skills: FacetCountDto[];
  /** Countries with counts */
  countries: FacetCountDto[];
  statuses: ('AVAILABLE' | 'OPEN_TO_WORK' | 'BUSY' | 'UNAVAILABLE')[];
}

/** Query params `GET /users/directory` accepts. */
export interface BuildersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  /** ISO 3166-1 alpha-2 country code (case-insensitive) */
  country?: string;
  /** Repeatable filter, sent as a comma-separated `skills` value. */
  skills?: string[];
  status?: 'AVAILABLE' | 'OPEN_TO_WORK' | 'BUSY' | 'UNAVAILABLE';
  sort?: 'name_asc' | 'name_desc' | 'newest' | 'oldest';
}

export const buildersKeys = {
  all: ['builders'] as const,
  list: (params: BuildersQueryParams) =>
    ['builders', 'list', params] as const,
  filters: ['builders', 'filters'] as const,
};

function toQueryString(params: BuildersQueryParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.search) search.set('search', params.search);
  if (params.country) search.set('country', params.country);
  if (params.skills?.length) search.set('skills', params.skills.join(','));
  if (params.status) search.set('status', params.status);
  if (params.sort) search.set('sort', params.sort);

  const query = search.toString();
  return query ? `?${query}` : '';
}

/** Paginated `/users/directory` list, filtered by the params above. */
export function useBuilders(params: BuildersQueryParams = {}) {
  return useQuery({
    queryKey: buildersKeys.list(params),
    queryFn: () =>
      apiFetch<BuilderListItemDto[]>(
        `/users/directory${toQueryString(params)}`
      ),
  });
}

/** Filter facets (skills, countries, statuses) for `/users/directory`. */
export function useBuilderFilters() {
  return useQuery({
    queryKey: buildersKeys.filters,
    queryFn: () => apiFetch<BuilderFiltersDto>('/users/filters'),
  });
}
