'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BuilderCard } from '@/components/cards/builder-card';
import { BuilderCardSkeleton } from '@/components/cards/builder-card-skeleton';
import type { BuilderCardView } from '@/components/cards/types';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/client';
import type { Paginated } from '@/lib/api/types';

import { Section, SectionHeading } from '../marketing/section';

interface LeaderboardEntry {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role?: string;
  country?: string;
  skills?: string[];
  followerCount?: number;
  projectCount?: number;
}

function toCardView(entry: LeaderboardEntry): BuilderCardView {
  return {
    id: entry.id,
    displayName: entry.displayName,
    username: entry.username,
    avatarSrc: entry.avatarUrl,
    role: entry.role,
    location: entry.country,
    skills: entry.skills?.slice(0, 4),
    followers: entry.followerCount,
    projects: entry.projectCount,
    detailUrl: `/builders/${entry.username}`,
  };
}

function useTopBuilders() {
  return useQuery<Paginated<LeaderboardEntry>>({
    queryKey: ['leaderboard', 'top-builders'],
    queryFn: () =>
      apiFetch<Paginated<LeaderboardEntry>>(
        '/leaderboard?limit=6&timeframe=ALL_TIME'
      ),
    staleTime: 5 * 60 * 1000,
  });
}

function TopBuildersGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <BuilderCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Top builders from the ecosystem leaderboard. */
export function TopBuilders({ className }: { className?: string }) {
  const { data, isLoading, isError } = useTopBuilders();

  const builders = data?.data ?? [];

  return (
    <Section className={className} innerClassName='flex flex-col gap-8'>
      <SectionHeading
        eyebrow='Leaderboard'
        title='Top Builders'
        description='The contributors with the highest reputation across the Boundless ecosystem.'
      />

      {isLoading ? (
        <TopBuildersGridSkeleton />
      ) : isError || builders.length === 0 ? (
        <p className='text-center text-sm text-muted-foreground'>
          Could not load top builders right now.
        </p>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {builders.map((entry) => (
              <BuilderCard key={entry.id} builder={toCardView(entry)} />
            ))}
          </div>

          <div className='flex justify-center'>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href='/builders'>
                View all builders
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </>
      )}
    </Section>
  );
}
