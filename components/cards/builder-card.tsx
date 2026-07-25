import { Folder, MapPin, type LucideIcon, Users } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { deriveInitials } from '@/lib/initials';
import { cn } from '@/lib/utils';

import type { BuilderCardView } from './types';

function Meta({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex items-center gap-1 text-xs font-medium text-muted-foreground',
        className
      )}
    >
      <Icon className='size-4 shrink-0' strokeWidth={1.75} aria-hidden />
      <span className='truncate'>{children}</span>
    </span>
  );
}

/** A single builder card in the discovery grid or /builders directory. */
export function BuilderCard({
  builder,
}: {
  builder: BuilderCardView;
}) {
  const {
    displayName,
    username,
    avatarSrc,
    role,
    location,
    skills: rawSkills,
    followers,
    projects,
    detailUrl,
  } = builder;
  const skills = rawSkills ?? [];

  return (
    <Link
      href={detailUrl}
      aria-label={displayName}
      className='group block h-full min-w-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:outline-none'
    >
      <article className='flex h-full min-w-0 flex-col gap-5 rounded-2xl border border-border bg-ink p-4 transition-[transform,border-color] duration-200 group-hover:border-[#2a3a37] motion-reduce:transition-none'>
        {/* Header: avatar + name + username */}
        <div className='flex items-center gap-3'>
          <Avatar
            src={avatarSrc}
            initials={deriveInitials(displayName)}
            alt={displayName}
            size='md'
            className='shrink-0'
          />
          <div className='min-w-0 flex-1'>
            <h3 className='truncate text-base font-semibold text-foreground'>
              {displayName}
            </h3>
            <p className='truncate text-sm text-muted-foreground'>
              @{username}
            </p>
          </div>
        </div>

        {/* Variable content: role, location, skills — stretches to keep cards equal-height */}
        <div className='flex flex-1 flex-col gap-5'>
          {/* Role / title */}
          {role && (
            <p className='text-body-sm text-muted-foreground'>{role}</p>
          )}

          {/* Location */}
          {location && (
            <Meta icon={MapPin} className='shrink-0'>
              {location}
            </Meta>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {skills.map((skill) => (
                <span
                  key={skill}
                  className='rounded-[12px] bg-[rgba(234,253,247,0.08)] px-2 py-0.5 text-xs font-medium text-primary-700'
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <span aria-hidden className='h-px w-full bg-border' />

        {/* Follower / project counts */}
        <div className='flex items-center justify-between gap-4'>
          {followers !== undefined && (
            <Meta icon={Users} className='shrink-0'>
              {followers.toLocaleString()}{' '}
              {followers === 1 ? 'follower' : 'followers'}
            </Meta>
          )}
          {projects !== undefined && (
            <Meta icon={Folder} className='shrink-0'>
              {projects.toLocaleString()}{' '}
              {projects === 1 ? 'project' : 'projects'}
            </Meta>
          )}
        </div>
      </article>
    </Link>
  );
}
