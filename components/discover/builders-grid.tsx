'use client';

import { BuilderCard } from '@/components/cards/builder-card';
import { BuilderCardSkeleton } from '@/components/cards/builder-card-skeleton';
import { Pagination } from '@/components/ui/pagination';
import type { Paginated } from '@/lib/api/types';

import { toBuilderCard } from './to-builder-card';
import type { BuilderListItem } from './use-builders';

const GRID_CLASS = 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3';

export function BuildersGrid({
  data,
  isPending,
  isError,
  isNarrowed,
  page,
  pageSize,
  onPageChange,
}: {
  data?: Paginated<BuilderListItem>;
  isPending: boolean;
  isError: boolean;
  /** A search or filter is applied, so an empty result is a miss, not an empty directory. */
  isNarrowed: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  if (isPending) {
    return (
      <div className={GRID_CLASS}>
        {Array.from({ length: pageSize }, (_, index) => (
          <BuilderCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className='py-12 text-center text-body-sm text-muted-foreground'>
        Builders could not be loaded right now.
      </p>
    );
  }

  if (data.data.length === 0) {
    return (
      <p className='py-12 text-center text-body-sm text-muted-foreground'>
        {isNarrowed
          ? 'No builders match these filters.'
          : 'No builders to show yet.'}
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className={GRID_CLASS}>
        {data.data.map(builder => (
          <BuilderCard key={builder.id} builder={toBuilderCard(builder)} />
        ))}
      </div>

      {data.pagination.total > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={data.pagination.total}
          onPageChange={onPageChange}
          className='justify-between'
        />
      )}
    </div>
  );
}
