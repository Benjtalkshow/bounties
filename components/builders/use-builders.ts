import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';
import type { Paginated, Schemas } from '@/lib/api/types';

type BuilderListItem = Schemas['BuilderListItemDto'];
export type BuilderStatus = NonNullable<BuilderListItem['status']>;
export type BuilderSort = 'name_asc' | 'name_desc' | 'newest' | 'oldest';

export interface BuildersQueryParams {
  page: number;
  limit: number;
  search?: string;
  skills?: string[];
  country?: string;
  status?: BuilderStatus;
  sort?: BuilderSort;
}

export interface BuilderFiltersResponse {
  skills: { value: string; count: number }[];
  countries: { value: string; count: number }[];
  statuses: BuilderStatus[];
}

function toQueryString(params: BuildersQueryParams): string {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });

  if (params.search) query.set('search', params.search);
  if (params.skills?.length) query.set('skills', params.skills.join(','));
  if (params.country) query.set('country', params.country);
  if (params.status) query.set('status', params.status);
  if (params.sort) query.set('sort', params.sort);

  return `?${query.toString()}`;
}

export function useBuilders(params: BuildersQueryParams) {
  return useQuery({
    queryKey: ['builders', params],
    queryFn: () =>
      apiFetch<Paginated<Schemas['BuilderListItemDto']>>(
        `/users/directory${toQueryString(params)}`
      ),
  });
}

export function useBuilderFilters() {
  return useQuery({
    queryKey: ['builders', 'filters'],
    queryFn: () => apiFetch<BuilderFiltersResponse>('/users/directory/filters'),
  });
}
