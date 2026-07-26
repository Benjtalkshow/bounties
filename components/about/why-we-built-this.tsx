import type { ComponentType, SVGProps } from 'react';

import { EyeIcon, SearchIcon, TrophyIcon } from '@/components/icons';
import { Section, SectionHeading } from '@/components/marketing/section';

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

/** Single value point: tinted icon square, bold title, muted one-line description. */
function ValuePointItem({ icon: Icon, title, description }: ValuePoint) {
  return (
    <div className='flex flex-col gap-3'>
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

/** About-page mission section: why the builders directory exists. Static content. */
export function WhyWeBuiltThis() {
  return (
    <Section innerClassName='flex flex-col gap-8'>
      <SectionHeading
        eyebrow='Why we built this'
        title='Great products are easy to find. The people who build them are not.'
        description="Every project on Boundless represents months of work by developers, designers, and founders. But while the products get attention, the people behind them often stay invisible. We built this directory to change that: a home where the ecosystem's builders can be discovered, followed, and celebrated for what they ship."
      />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6'>
        {VALUE_POINTS.map(point => (
          <ValuePointItem key={point.title} {...point} />
        ))}
      </div>
    </Section>
  );
}
