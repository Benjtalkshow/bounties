'use client';

import { useQueries } from '@tanstack/react-query';

import { Section } from '@/components/marketing/section';
import { CountUp } from '@/components/ui/count-up';
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

    return [{ label: stat.label, value: <CountUp value={query.data} /> }];
  });

  if (items.length === 0) return null;

  return (
    <Section
      reveal
      className='bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_100%)]'
    >
      <StatsBar items={items} />
    </Section>
  );
}
