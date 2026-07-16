import type { LucideIcon } from 'lucide-react';
import { CodeXml, HandCoins, Target, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

type Pillar = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  cta: string;
};

const PILLARS: Pillar[] = [
  {
    icon: CodeXml,
    title: 'Hackathons',
    subtitle: 'Compete & build',
    cta: 'Join',
  },
  {
    icon: HandCoins,
    title: 'Grants',
    subtitle: 'Secure funding',
    cta: 'Apply',
  },
  { icon: Target, title: 'Bounties', subtitle: 'Earn rewards', cta: 'Earn' },
  {
    icon: Users,
    title: 'Crowdfunding',
    subtitle: 'Raise support',
    cta: 'Fund',
  },
];

function PillarRow({
  icon: Icon,
  title,
  subtitle,
  cta,
  ariaHidden,
}: Pillar & { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className='flex h-[37px] w-full items-center gap-2'
    >
      <Icon
        className='size-7 shrink-0 text-[#4caf50]'
        strokeWidth={1.75}
        aria-hidden
      />
      <div className='flex min-w-0 flex-1 items-center gap-2'>
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <p className='text-body-xs font-bold text-foreground'>{title}</p>
          <p className='truncate text-[10px] font-medium text-muted-foreground'>
            {subtitle}
          </p>
        </div>
        <span className='flex w-12 shrink-0 items-center justify-center rounded-full bg-[#40b66b] px-2 py-1 text-[11px] font-bold text-white'>
          {cta}
        </span>
      </div>
    </div>
  );
}

type PillarCardProps = {
  className?: string;
  /** Negative CSS time (eg. '-5s') to offset the loop so stacked cards show different pillars. */
  animationDelay?: string;
};

/** Glass card that steps through the four Boundless product pillars. */
export function PillarCard({ className, animationDelay }: PillarCardProps) {
  // Duplicate the first pillar so the stepped loop resets seamlessly.
  const rows = [...PILLARS, PILLARS[0]];
  return (
    <div
      className={cn(
        'group relative h-[57px] w-[260px] overflow-hidden rounded-[14px] border border-white/10 bg-[rgba(137,137,137,0.05)] backdrop-blur-[35px]',
        className
      )}
    >
      <div className='absolute top-[10px] left-[10px] h-[37px] w-[240px] overflow-hidden'>
        <div
          className='flex animate-card-rotate flex-col group-hover:paused motion-reduce:animate-none'
          style={animationDelay ? { animationDelay } : undefined}
        >
          {rows.map((pillar, index) => (
            <PillarRow
              key={index}
              {...pillar}
              ariaHidden={index === PILLARS.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
