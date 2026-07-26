'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { BuilderCard } from '@/components/cards/builder-card';
import { BuilderCardSkeleton } from '@/components/cards/builder-card-skeleton';
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
        eyebrow='Leaderboard'
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
