import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { deriveInitials } from '@/lib/initials';
import { cn } from '@/lib/utils';

export interface EntityRowEntity {
  /**
   * Drives the profile link: organizations go to `/organizations/<handle>`,
   * users to `/profile/<handle>`.
   */
  kind: 'organization' | 'user';
  name: string;
  /**
   * Organization slug or user username. Without one the row renders as
   * plain text (no link).
   */
  handle?: string | null;
  avatarUrl?: string | null;
  verified?: boolean;
}

/** Profile URL for an entity, or null when it has no handle to link to. */
export function entityProfileHref(entity: EntityRowEntity): string | null {
  if (!entity.handle) return null;
  return entity.kind === 'organization'
    ? `/organizations/${entity.handle}`
    : `/profile/${entity.handle}`;
}

export interface EntityRowProps {
  entity: EntityRowEntity;
  className?: string;
  /** Override the default responsive name typography per surface. */
  nameClassName?: string;
}

/**
 * General-purpose identity row: 32px avatar, name, and an optional verified
 * badge, linking to the entity's public profile when a handle is known.
 * Renders organizations and users alike; used by opportunity detail headers
 * and any surface that attributes content to an organizer or member.
 */
export function EntityRow({
  entity,
  className,
  nameClassName,
}: EntityRowProps) {
  const { name, avatarUrl, verified, kind } = entity;
  const href = entityProfileHref(entity);

  const content = (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={`${name} ${kind === 'organization' ? 'logo' : 'avatar'}`}
          width={32}
          height={32}
          unoptimized
          className='size-8 shrink-0 rounded-full border-[1.5px] border-white bg-primary-50 object-cover'
        />
      ) : (
        <span className='flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-primary-50 text-[10px] font-semibold text-neutral-900'>
          {deriveInitials(name)}
        </span>
      )}

      <span
        className={cn(
          'truncate text-[16px] leading-[1.45] font-normal text-foreground lg:font-heading lg:text-[20px] lg:leading-[1.2] lg:tracking-[-0.02em]',
          nameClassName
        )}
      >
        {name}
      </span>

      {verified ? (
        <span
          aria-label={
            kind === 'organization' ? 'Verified organization' : 'Verified user'
          }
          className='flex size-4.5 shrink-0 items-center justify-center rounded-full bg-info-600'
        >
          <Check className='size-3 text-white' strokeWidth={3} aria-hidden />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'group flex min-w-0 items-center gap-2 rounded-lg transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-500/40',
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      {content}
    </div>
  );
}
