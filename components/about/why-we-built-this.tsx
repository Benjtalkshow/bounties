import type { ComponentType, SVGProps } from 'react';

import { EyeIcon, SearchIcon, TrophyIcon } from '@/components/icons';
import { Reveal } from '@/components/marketing/reveal';
import { Section } from '@/components/marketing/section';

// Mint glow at the top, fading fully to dark so it merges into the section
// below (mirrors the boundless-platform About intro).
const GLOW =
  'linear-gradient(180deg, rgba(46, 237, 170, 0.08) 0%, rgba(13, 17, 17, 0.00) 100%), #0D1111';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type ValuePoint = {
  icon: IconComponent;
  title: string;
  description: string;
};

const VALUE_POINTS: ValuePoint[] = [
  {
    icon: EyeIcon,
    title: 'Visibility',
    description:
      'Put builders and their work in front of the whole ecosystem, not just their own network.',
  },
  {
    icon: SearchIcon,
    title: 'Discovery',
    description:
      'Help founders, collaborators, and funders find the right people and the projects worth backing.',
  },
  {
    icon: TrophyIcon,
    title: 'Recognition',
    description:
      'Celebrate the teams turning ideas into real, shipped products on Stellar.',
  },
];

/** Bordered value card: tinted icon square, bold title, muted description. */
function ValueCard({ icon: Icon, title, description }: ValuePoint) {
  return (
    <div className='flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6'>
      <span className='flex size-10 items-center justify-center rounded-xl bg-primary-500/8 text-primary-500'>
        <Icon className='size-5' aria-hidden />
      </span>
      <div className='flex flex-col gap-2'>
        <h3 className='font-heading text-h5 font-semibold text-foreground'>
          {title}
        </h3>
        <p className='text-body-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
}

/**
 * About-page mission section: why the builders directory exists. Two-column
 * intro (purple eyebrow + heading on the left, copy on the right) over a top
 * glow, then the value points as bordered cards.
 */
export function WhyWeBuiltThis() {
  return (
    <div style={{ background: GLOW }}>
      <Section innerClassName='flex flex-col gap-12'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-[200px]'>
          <Reveal className='flex flex-col gap-3 lg:w-[380px] lg:shrink-0'>
            <p className='font-sans text-body-xs font-semibold text-primary lg:text-body lg:text-[#cebef9]'>
              Why we built this
            </p>
            <h2 className='font-heading text-h2 font-semibold text-white lg:text-display-sm'>
              Great products are easy to find. The people who build them are
              not.
            </h2>
          </Reveal>

          <Reveal delay={0.2} className='flex-1'>
            <p className='text-body-lg text-white/70'>
              Every project on Boundless represents months of work by
              developers, designers, and founders. But while the products get
              attention, the people behind them often stay invisible. We built
              this directory to change that: a home where the ecosystem&rsquo;s
              builders can be discovered, followed, and celebrated for what they
              ship.
            </p>
          </Reveal>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {VALUE_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.1}>
              <ValueCard {...point} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
