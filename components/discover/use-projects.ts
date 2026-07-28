import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';
import type { Paginated } from '@/lib/api/types';

import type { FeaturedProjectDto } from './to-project-card';

/**
 * `/projects` list item. Same `Project` entity the landing "Featured
 * projects" row already reads (`FeaturedProjectDto`), plus the `tags` the
 * directory filters by. Confirm this against a live `GET /api/projects`
 * response before relying on new fields.
 */
export interface ProjectListItemDto extends FeaturedProjectDto {
  tags: string[];
}

export interface FacetCount {
  value: string;
  count: number;
}

export interface ProjectFiltersResponse {
  categories: FacetCount[];
  tags: FacetCount[];
  publicStatuses: string[];
  originTypes: string[];
}

/** Query params `GET /projects` accepts from the directory page. */
export interface ProjectsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  /** Repeatable filter, sent as a comma-separated `tags` value. */
  tags?: string[];
  publicStatus?: string;
  originType?: string;
}

export const projectsKeys = {
  all: ['projects'] as const,
  list: (params: ProjectsQueryParams) =>
    ['projects', 'list', params] as const,
  filters: ['projects', 'filters'] as const,
};

function toQueryString(params: ProjectsQueryParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.search) search.set('search', params.search);
  if (params.category) search.set('category', params.category);
  if (params.tags?.length) search.set('tags', params.tags.join(','));
  if (params.publicStatus) search.set('publicStatus', params.publicStatus);
  if (params.originType) search.set('originType', params.originType);

  const query = search.toString();
  return query ? `?${query}` : '';
}

/** Paginated `/projects` directory list, filtered by the params above. */
export function useProjects(params: ProjectsQueryParams = {}) {
  return useQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () =>
      apiFetch<Paginated<ProjectListItemDto>>(
        `/projects${toQueryString(params)}`
      ),
  });
}

/** Filter facets (categories, tags, statuses, origin types) for `/projects`. */
export function useProjectFilters() {
  return useQuery({
    queryKey: projectsKeys.filters,
    queryFn: () => apiFetch<ProjectFiltersResponse>('/projects/filters'),
  });
}
