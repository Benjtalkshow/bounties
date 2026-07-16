import { Play } from 'lucide-react';
import { type ReactNode } from 'react';

import { CtaTicker } from './cta-ticker';
import { EscrowFlow } from './escrow-flow';
import { ExplorePath } from './explore-path';
import { Glow } from './glow';
import { PrizePool } from './prize-pool';
import { Section } from './section';

type Step = {
  title: string;
  description: string;
  illustration: ReactNode;
};

const STEPS: Step[] = [
  {
    title: 'Discover Opportunities',
    description:
      'Find grants, hackathons, bounties and campaigns aligned with your goals.',
    illustration: <ExplorePath />,
  },
  {
    title: 'Apply or Participate',
    description: 'Submit proposals, join teams, or contribute your skills.',
    illustration: (
      <div className='relative'>
        {/* Tight green glow around the highlighted (centre) action. */}
        <Glow className='absolute top-1/2 left-1/2 h-24 w-44 -translate-x-1/2 -translate-y-1/2 opacity-55 blur-[36px]' />
        {/* Arrows pointing at the centre slot. */}
        <Play
          aria-hidden
          className='absolute top-1/2 -left-6 size-4 -translate-y-1/2 fill-primary text-primary'
        />
        <Play
          aria-hidden
          className='absolute top-1/2 -right-6 size-4 -translate-y-1/2 rotate-180 fill-primary text-primary'
        />
        <CtaTicker className='relative' />
      </div>
    ),
  },
  {
    title: 'Earn Funding or Rewards',
    description:
      'Receive support, prizes or payments for successful contributions.',
    illustration: <PrizePool />,
  },
  {
    title: 'Track Progress',
    description:
      'Stay informed with transparent updates and milestone tracking.',
    illustration: <EscrowFlow />,
  },
];

/** "Work flows through Boundless in 4 steps": four animated workflow columns. */
export function FundingPaths() {
  return (
    <Section
      className='bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_50%)]'
      innerClassName='flex flex-col gap-8'
    >
      <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
        Work flows through{' '}
        <span className='block text-primary-400'>Boundless in 4 steps</span>
      </h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:overflow-hidden xl:rounded-2xl xl:border xl:border-[#1d1f20]'>
        {STEPS.map(step => (
          <div
            key={step.title}
            className='relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#1d1f20] bg-ink xl:gap-0 xl:rounded-none xl:border-0 xl:border-[#1d1f20] xl:not-first:border-l'
          >
            <div className='flex flex-col gap-2 p-5'>
              <h3 className='font-heading text-xl font-semibold tracking-[-0.4px] text-white'>
                {step.title}
              </h3>
              <p className='text-sm leading-[1.45] text-text-muted'>
                {step.description}
              </p>
            </div>

            <div className='flex flex-1 items-center justify-center overflow-hidden pb-6 xl:h-[268px] xl:pb-0'>
              {step.illustration}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
