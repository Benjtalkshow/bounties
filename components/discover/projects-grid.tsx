'use client';

import type { Paginated } from '@/lib/api/types';

import { ProjectsResults } from './projects-results';
import type { ProjectListItemDto } from './use-projects';

export function ProjectsGrid({
  data,
  isPending,
  isError,
  isNarrowed,
  page,
  pageSize,
  onPageChange,
}: {
  data?: Paginated<ProjectListItemDto>;
  isPending: boolean;
  isError: boolean;
  /** A search or filter is applied, so an empty result is a miss, not an empty directory. */
  isNarrowed: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <ProjectsResults
      data={data}
      isPending={isPending}
      isError={isError}
      isNarrowed={isNarrowed}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}

export { ProjectsResults };
