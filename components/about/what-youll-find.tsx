import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';

import { BoxIcon, CodeIcon, UsersIcon } from '@/components/icons';
import { Section, SectionHeading } from '@/components/marketing/section';
import { cn } from '@/lib/utils';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Pillar = {
  icon: IconComponent;
  title: string;
  description: string;
  href: '/builders' | '/projects' | '/teams';
};

const PILLARS: Pillar[] = [
  {
    icon: CodeIcon,
    title: 'Builders',
    description:
      "Developers, designers, and product leaders from across the network, each with a profile of what they've shipped.",
    href: '/builders',
  },
  {
    icon: BoxIcon,
    title: 'Projects',
    description:
      'The products being built, launched, and funded on Boundless, with the teams behind them.',
    href: '/projects',
  },
  {
    icon: UsersIcon,
    title: 'Teams',
    description:
      'The organizations turning ideas into shipped work, and the people who make them up.',
    href: '/teams',
  },
];

/**
 * Equal-weight directory pillar card. Mirrors the Boundless pillar pattern
 * (icon, bold title, short description, subtle hover) as a link into a
 * directory route. Distinct from the animated marketing PillarCard.
 */
function DirectoryPillarCard({
  icon: Icon,
  title,
  description,
  href,
}: Pillar) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6',
        'transition-[border-color,background-color] duration-200',
        'hover:border-neutral-500 hover:bg-ink',
        'focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:outline-none',
        'motion-reduce:transition-none'
      )}
    >
      <span className='flex size-10 items-center justify-center rounded-xl bg-primary-500/8 text-primary-500'>
        <Icon className='size-5' aria-hidden />
      </span>
      <div className='flex flex-col gap-2'>
        <h3 className='font-heading text-h5 font-semibold text-foreground'>
          {title}
        </h3>
        <p className='text-body-sm text-muted-foreground'>{description}</p>
      </div>
    </Link>
  );
}

/** About-page section introducing the three directory pillars. Static content. */
export function WhatYoullFind() {
  return (
    <Section innerClassName='flex flex-col gap-8'>
      <SectionHeading
        eyebrow="What you'll find"
        title='One place to explore the whole ecosystem.'
        description='Browse the directory by what matters to you.'
      />

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {PILLARS.map(pillar => (
          <DirectoryPillarCard key={pillar.href} {...pillar} />
        ))}
      </div>

      <p className='mx-auto max-w-2xl text-center text-body-sm text-muted-foreground'>
        This is a showcase. Everything here is created and maintained in the
        main Boundless app. Here, you explore and discover.
      </p>
    </Section>
  );
}
