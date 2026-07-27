'use client';


import { useQuery } from '@tanstack/react-query';

import { StatsBar } from '@/components/ui/stats-bar';
import { apiFetch } from '@/lib/api/client';
import { cn } from '@/lib/utils';

import { Section, SectionHeading } from '../marketing/section';
import { Skeleton } from '../ui/skeleton';

interface DiscoverPillarDto {
  total: number;
}

interface DiscoverLandingDto {
  bounties: DiscoverPillarDto;
  hackathons: DiscoverPillarDto;
  crowdfunding: DiscoverPillarDto;
  grants: DiscoverPillarDto;
}

function useLandingStats() {
  return useQuery<DiscoverLandingDto>({
    queryKey: ['discover', 'landing'],
    queryFn: () => apiFetch<DiscoverLandingDto>('/discover/landing'),
    staleTime: 5 * 60 * 1000,
  });
}

function StatsStripSkeleton() {
  return (
    <div className='flex flex-col gap-1 sm:flex-row'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='flex flex-1 flex-col gap-2 px-6 py-5'
        >
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-9 w-20' />
        </div>
      ))}
    </div>
  );
}

/** Ecosystem stats strip rendered between hero and top builders. */
export function StatsStrip({ className }: { className?: string }) {
  const { data, isLoading, isError } = useLandingStats();

  const stats = data
    ? [
        { label: 'Bounties', value: data.bounties.total.toLocaleString() },
        { label: 'Hackathons', value: data.hackathons.total.toLocaleString() },
        {
          label: 'Crowdfunding',
          value: data.crowdfunding.total.toLocaleString(),
        },
        { label: 'Grants', value: data.grants.total.toLocaleString() },
      ]
    : [];

  return (
    <Section
      className={cn(
        'bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_100%)]',
        className
      )}
      innerClassName='flex flex-col gap-8'
    >
      <SectionHeading
        eyebrow='Ecosystem'
        title='Boundless at a Glance'
        description='Opportunities and projects shipping across the Boundless ecosystem.'
      />

      {isLoading ? (
        <StatsStripSkeleton />
      ) : isError || stats.length === 0 ? (
        <p className='text-center text-sm text-muted-foreground'>
          Stats are not available right now.
        </p>
      ) : (
        <StatsBar
          items={stats.map((s) => ({
            label: s.label,
            value: s.value,
          }))}
        />
      )}

import { useQueries } from '@tanstack/react-query';

import { Section } from '@/components/marketing/section';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsBar, type StatItem } from '@/components/ui/stats-bar';
import { apiFetch } from '@/lib/api/client';
import type { Paginated } from '@/lib/api/types';

const STATS = [
  {
    label: 'Builders',
    path: '/users/directory?limit=1',
    queryKey: ['ecosystem-stats', 'builders'],
  },
  {
    label: 'Projects',
    path: '/projects?limit=1',
    queryKey: ['ecosystem-stats', 'projects'],
  },
  {
    label: 'Teams',
    path: '/organizations?limit=1',
    queryKey: ['ecosystem-stats', 'teams'],
  },
] as const;

const numberFormatter = new Intl.NumberFormat('en-US');

function NumberSkeleton({ mobile = false }: { mobile?: boolean }) {
  return (
    <Skeleton
      aria-hidden
      className={mobile ? 'h-5 w-10' : 'h-9 w-16'}
    />
  );
}

async function fetchTotal(path: string) {
  const response = await apiFetch<Paginated<unknown>>(path);
  return response.pagination.total;
}

function useEcosystemStats() {
  return useQueries({
    queries: STATS.map(stat => ({
      queryKey: stat.queryKey,
      queryFn: () => fetchTotal(stat.path),
    })),
  });
}

export function StatsStrip() {
  const queries = useEcosystemStats();
  const items = queries.flatMap((query, index): StatItem[] => {
    const stat = STATS[index];

    if (query.isPending) {
      return [
        {
          label: stat.label,
          value: <NumberSkeleton />,
          mobileValue: <NumberSkeleton mobile />,
        },
      ];
    }

    if (
      query.isError ||
      typeof query.data !== 'number' ||
      !Number.isFinite(query.data)
    ) {
      return [];
    }

    const value = numberFormatter.format(query.data);

    return [{ label: stat.label, value }];
  });

  if (items.length === 0) return null;

  return (
    <Section>
      <StatsBar items={items} />

    </Section>
  );
}
