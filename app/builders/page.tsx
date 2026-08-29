'use client';

import { useState } from 'react';

import {
  BuildersFilterRail,
  type BuilderFilterValue,
  EMPTY_BUILDER_FILTERS,
  hasActiveBuilderFilters,
} from '@/components/discover/builders-filter-rail';
import { Button } from '@/components/ui/button';
import { useBuilders } from '@/lib/api/users';

export default function BuildersPage() {
  const [filters, setFilters] = useState<BuilderFilterValue>(
    EMPTY_BUILDER_FILTERS
  );
  const [page, setPage] = useState(1);

  // When filters change, reset to page 1
  const handleFilterChange = (newFilters: BuilderFilterValue) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Reset all filters
  const handleReset = () => {
    setFilters(EMPTY_BUILDER_FILTERS);
    setPage(1);
  };

  // Query builders with current filters
  const { data: builders, isPending, isError } = useBuilders({
    page,
    limit: 12,
    skills: filters.skills,
    country: filters.country[0], // Single country selection
    status: filters.status[0] as
      | 'AVAILABLE'
      | 'OPEN_TO_WORK'
      | 'BUSY'
      | 'UNAVAILABLE'
      | undefined,
  });

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Builders Directory</h1>
        {hasActiveBuilderFilters(filters) && (
          <Button onClick={handleReset} variant='outline'>
            Reset Filters
          </Button>
        )}
      </div>

      <div className='flex gap-8'>
        {/* Filter Sidebar */}
        <aside className='w-64 shrink-0'>
          <div className='sticky top-8'>
            <BuildersFilterRail value={filters} onChange={handleFilterChange} />
          </div>
        </aside>

        {/* Results Grid */}
        <main className='flex-1'>
          {isPending && (
            <div className='text-center text-muted-foreground'>
              Loading builders...
            </div>
          )}

          {isError && (
            <div className='text-center text-destructive'>
              Failed to load builders. Please try again.
            </div>
          )}

          {builders && (
            <>
              <div className='mb-4 text-sm text-muted-foreground'>
                {builders.length} builder{builders.length !== 1 ? 's' : ''}{' '}
                found
              </div>

              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {builders.map(builder => (
                  <div
                    key={builder.id}
                    className='rounded-lg border bg-card p-4'
                  >
                    <div className='mb-2 flex items-start justify-between'>
                      <div>
                        <h3 className='font-semibold'>
                          {builder.name || builder.username || 'Anonymous'}
                        </h3>
                        {builder.role && (
                          <p className='text-sm text-muted-foreground'>
                            {builder.role}
                          </p>
                        )}
                      </div>
                      {builder.status && (
                        <span className='rounded-full bg-primary/10 px-2 py-1 text-xs'>
                          {builder.status.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>

                    {builder.bio && (
                      <p className='mb-3 line-clamp-2 text-sm text-muted-foreground'>
                        {builder.bio}
                      </p>
                    )}

                    {builder.location && (
                      <p className='mb-2 text-xs text-muted-foreground'>
                        📍 {builder.location}
                      </p>
                    )}

                    {builder.skills.length > 0 && (
                      <div className='flex flex-wrap gap-1'>
                        {builder.skills.slice(0, 3).map(skill => (
                          <span
                            key={skill}
                            className='rounded bg-secondary px-2 py-0.5 text-xs'
                          >
                            {skill}
                          </span>
                        ))}
                        {builder.skills.length > 3 && (
                          <span className='px-2 py-0.5 text-xs text-muted-foreground'>
                            +{builder.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Simple pagination */}
              {builders.length === 12 && (
                <div className='mt-8 flex justify-center gap-2'>
                  <Button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    variant='outline'
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage(p => p + 1)}
                    disabled={builders.length < 12}
                    variant='outline'
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
