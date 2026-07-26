'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { OpportunityCard } from '@/components/cards/opportunity-card';
import { OpportunityCardSkeleton } from '@/components/cards/opportunity-card-skeleton';
import type { OpportunityCardView } from '@/components/cards/types';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/client';
import type { Paginated } from '@/lib/api/types';

import { Section, SectionHeading } from '../marketing/section';

interface FeaturedProject {
  id: string;
  organization?: { name?: string };
  bountyNumber?: number;
  publicStatus: string;
  title: string;
  category?: string;
  participantCount?: number;
  mode?: string;
  commentCount?: number;
  deadline?: string;
  rewardAmount?: number;
  rewardCurrency?: string;
  slug?: string;
}

function toCardView(project: FeaturedProject): OpportunityCardView {
  const statusMap: Record<string, OpportunityCardView['status']> = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    IN_REVIEW: 'review',
    COMPLETED: 'completed',
  };

  return {
    id: project.id,
    org: project.organization?.name ?? 'Boundless',
    index: project.bountyNumber ?? 0,
    status: statusMap[project.publicStatus] ?? 'open',
    title: project.title,
    category: project.category ?? 'General',
    participants: project.participantCount ?? 0,
    mode: project.mode ?? '',
    comments: project.commentCount ?? 0,
    endsIn: project.deadline
      ? formatDeadline(project.deadline)
      : '',
    reward: {
      amount: project.rewardAmount ?? 0,
      currency: project.rewardCurrency ?? 'USDC',
    },
    detailUrl: `/projects/${project.slug ?? project.id}`,
    isFeatured: true,
  };
}

function formatDeadline(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return '';
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return `${days}D:${String(hours).padStart(2, '0')}H:${String(minutes).padStart(2, '0')}M`;
}

function useFeaturedProjects() {
  return useQuery<Paginated<FeaturedProject>>({
    queryKey: ['projects', 'featured'],
    queryFn: () =>
      apiFetch<Paginated<FeaturedProject>>('/projects/featured?limit=6'),
    staleTime: 5 * 60 * 1000,
  });
}

function FeaturedProjectsGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Featured projects row on the landing page. */
export function FeaturedProjects({ className }: { className?: string }) {
  const { data, isLoading, isError } = useFeaturedProjects();

  const projects = data?.data ?? [];

  return (
    <Section className={className} innerClassName='flex flex-col gap-8'>
      <SectionHeading
        eyebrow='Spotlight'
        title='Featured Projects'
        description='Opportunities hand-picked from across the Boundless ecosystem.'
      />

      {isLoading ? (
        <FeaturedProjectsGridSkeleton />
      ) : isError || projects.length === 0 ? (
        <p className='text-center text-sm text-muted-foreground'>
          No featured projects available right now.
        </p>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => (
              <OpportunityCard
                key={project.id}
                opportunity={toCardView(project)}
              />
            ))}
          </div>

          <div className='flex justify-center'>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href='/projects'>
                View all projects
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </>
      )}
    </Section>
  );
}
