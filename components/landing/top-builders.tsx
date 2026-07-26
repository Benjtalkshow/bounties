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

import { ArrowRightIcon } from '@/components/icons';
import { Section, SectionHeading } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/client';

import {
  type LeaderboardData,
  toBuilderCard,
} from './to-builder-card';

const TOP_BUILDERS_LIMIT = 8;

function useTopBuilders() {
  return useQuery({
    queryKey: ['leaderboard', 'top-builders', TOP_BUILDERS_LIMIT],
    queryFn: () =>
      apiFetch<LeaderboardData>(
        `/leaderboard?limit=${TOP_BUILDERS_LIMIT}`
      ),
  });
}

function TopBuildersSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {Array.from({ length: TOP_BUILDERS_LIMIT }, (_, index) => (
        <BuilderCardSkeleton key={index} />

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

function EmptyState() {
  return (
    <p className='text-center text-body-sm text-muted-foreground'>
      No builders to show yet.
    </p>
  );
}

export function TopBuilders() {
  const { data, isError, isPending } = useTopBuilders();
  const builders = data?.entries.map(toBuilderCard) ?? [];

  return (
    <Section innerClassName='flex flex-col gap-8'>
      <SectionHeading
        title='Top builders'
        description='Meet the builders making an impact across the Boundless ecosystem.'
      />

      {isPending ? (
        <TopBuildersSkeleton />
      ) : isError ? (
        <p className='text-center text-body-sm text-muted-foreground'>
          Top builders could not be loaded right now.
        </p>
      ) : builders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {builders.map((builder) => (
            <BuilderCard key={builder.id} builder={builder} />
          ))}
        </div>
      )}

      <div className='flex justify-center'>
        <Button
          intent='secondary'
          appearance='outline'
          size='large'
          asChild
        >
          <Link href='/builders'>
            View all builders
            <ArrowRightIcon aria-hidden />
          </Link>
        </Button>
      </div>

    </Section>
  );
}
