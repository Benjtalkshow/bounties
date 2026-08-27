import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';
import type { Paginated, Schemas } from '@/lib/api/types';

/** One row of `GET /users/directory`, derived from the generated schema. */
export type BuilderListItem = Schemas['BuilderListItemDto'];

/** Facets backing the builders filter rail. */
export type BuilderFilters = Schemas['BuilderFiltersDto'];

/** Query params `GET /users/directory` accepts from the directory page. */
export interface BuildersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  /** Repeatable filter, sent as a comma-separated `skills` value. */
  skills?: string[];
  /** Single value, ISO 3166-1 alpha-2 country code. */
  country?: string;
  /** Single value, one of AVAILABLE / OPEN_TO_WORK / BUSY / UNAVAILABLE. */
  status?: string;
}

export const buildersKeys = {
  all: ['builders'] as const,
  list: (params: BuildersQueryParams) => ['builders', 'list', params] as const,
  filters: ['builders', 'filters'] as const,
};

function toQueryString(params: BuildersQueryParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.search) search.set('search', params.search);
  if (params.skills?.length) search.set('skills', params.skills.join(','));
  if (params.country) search.set('country', params.country);
  if (params.status) search.set('status', params.status);

  const query = search.toString();
  return query ? `?${query}` : '';
}

/** Paginated `/users/directory` list, filtered by the params above. */
export function useBuilders(params: BuildersQueryParams = {}) {
  return useQuery({
    queryKey: buildersKeys.list(params),
    queryFn: () =>
      apiFetch<Paginated<BuilderListItem>>(
        `/users/directory${toQueryString(params)}`
      ),
  });
}

/** Filter facets (skills, countries, statuses) for the builders directory. */
export function useBuilderFilters() {
  return useQuery({
    queryKey: buildersKeys.filters,
    queryFn: () => apiFetch<BuilderFilters>('/users/filters'),
  });
}
