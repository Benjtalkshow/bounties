'use client';

import { OpportunityCard } from '@/components/cards/opportunity-card';
import { OpportunityCardSkeleton } from '@/components/cards/opportunity-card-skeleton';
import { Pagination } from '@/components/ui/pagination';
import type { Paginated } from '@/lib/api/types';

import { toProjectCard } from './to-project-card';
import {
  useProjects,
  type ProjectListItemDto,
  type ProjectsQueryParams,
} from './use-projects';

const GRID_CLASS = 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3';

export interface ProjectsResultsProps {
  /** Query params to pass to useProjects if data is fetched directly by ProjectsResults. */
  params?: ProjectsQueryParams;
  /** Pre-fetched query data (optional if params is supplied). */
  data?: Paginated<ProjectListItemDto>;
  /** Pending state if query is managed externally. */
  isPending?: boolean;
  /** Error state if query is managed externally. */
  isError?: boolean;
  /** Whether search or filter options are active (affects empty state message). */
  isNarrowed?: boolean;
  /** Current page (defaults to params.page or 1). */
  page?: number;
  /** Page size (defaults to params.limit or 12). */
  pageSize?: number;
  /** Page change callback. */
  onPageChange?: (page: number) => void;
  /** Additional container styling. */
  className?: string;
}

/**
 * ProjectsResults block renders a responsive grid of project cards from useProjects,
 * including loading skeletons, empty state, error state, and pagination.
 */
export function ProjectsResults({
  params,
  data: externalData,
  isPending: externalIsPending,
  isError: externalIsError,
  isNarrowed = false,
  page: externalPage,
  pageSize: externalPageSize = 12,
  onPageChange,
  className,
}: ProjectsResultsProps) {
  // If params is provided and no external data is supplied, fetch using useProjects
  const query = useProjects(params ?? {});
  const data = externalData ?? (params ? query.data : undefined);
  const isPending = externalIsPending ?? (params ? query.isPending : false);
  const isError = externalIsError ?? (params ? query.isError : false);

  const page = externalPage ?? params?.page ?? 1;
  const pageSize = externalPageSize ?? params?.limit ?? 12;

  if (isPending) {
    return (
      <div className={className}>
        <div className={GRID_CLASS}>
          {Array.from({ length: pageSize }, (_, index) => (
            <OpportunityCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={className}>
        <div className='py-12 text-center text-sm text-muted-foreground'>
          <p>Projects could not be loaded right now.</p>
        </div>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className={className}>
        <div className='py-12 text-center text-sm text-muted-foreground'>
          <p>
            {isNarrowed
              ? 'No projects match these filters.'
              : 'No projects to show yet.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className='flex flex-col gap-8'>
        <div className={GRID_CLASS}>
          {data.data.map((project, index) => (
            <OpportunityCard
              key={project.id}
              opportunity={toProjectCard(
                project,
                (page - 1) * pageSize + index
              )}
            />
          ))}
        </div>

        {onPageChange && data.pagination.total > 0 ? (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={data.pagination.total}
            onPageChange={onPageChange}
            className='justify-between'
          />
        ) : null}
      </div>
    </div>
  );
}
