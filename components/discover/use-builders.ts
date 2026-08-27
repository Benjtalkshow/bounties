import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';
import type { Paginated, Schemas } from '@/lib/api/types';

/**
 * `/users/directory` list item. Derived from the generated OpenAPI schema.
 * The DTO has no `followers` or `projects` fields, so the directory card
 * renders without those counts (see the open decision note in the PR).
 */
export type BuilderListItemDto = Schemas['BuilderListItemDto'];

/** Query params `GET /users/directory` accepts from the directory page. */
export interface BuildersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  skills?: string[];
  status?: string;
  sort?: string;
}

export const buildersKeys = {
  all: ['builders'] as const,
  list: (params: BuildersQueryParams) =>
    ['builders', 'list', params] as const,
};

function toQueryString(params: BuildersQueryParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.search) search.set('search', params.search);
  if (params.country) search.set('country', params.country);
  if (params.skills?.length) {
    for (const skill of params.skills) {
      search.append('skills', skill);
    }
  }
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
      apiFetch<Paginated<BuilderListItemDto>>(
        `/users/directory${toQueryString(params)}`
      ),
  });
}
