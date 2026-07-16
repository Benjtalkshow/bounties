import { Fragment, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Reveal } from './reveal';
import { Section } from './section';

// Mint glow at the bottom, fading up into the page background.
const GLOW =
  'linear-gradient(180deg, rgba(13, 17, 17, 0.00) 48.684%, rgba(46, 237, 170, 0.08) 100%), #0D1111';

interface Feature {
  title: string;
  description: string;
}

interface FeatureListSectionProps {
  eyebrow: ReactNode;
  title: ReactNode;
  items: Feature[];
  eyebrowClassName?: string;
}

/** Two-column section: eyebrow + heading on the left, a dash-separated list on the right. */
export function FeatureListSection({
  eyebrow,
  title,
  items,
  eyebrowClassName,
}: FeatureListSectionProps) {
  return (
    <div style={{ background: GLOW }}>
      <Section>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-[200px]'>
          <Reveal className='flex flex-col gap-3 lg:w-[380px] lg:shrink-0'>
            <p
              className={cn(
                'font-sans text-body-xs font-semibold text-primary lg:text-body lg:text-[#cebef9]',
                eyebrowClassName
              )}
            >
              {eyebrow}
            </p>
            <h2 className='font-heading text-h2 font-semibold text-white lg:text-display-sm'>
              {title}
            </h2>
          </Reveal>

          <div className='flex flex-col gap-4 lg:mt-6 lg:flex-1 lg:gap-8'>
            {items.map((item, i) => (
              <Fragment key={item.title}>
                {i > 0 ? (
                  <hr className='w-full border-0 border-t border-dashed border-white/10' />
                ) : null}
                <Reveal delay={i * 0.15} className='flex flex-col gap-3'>
                  <p className='font-sans text-body-lg font-semibold text-white lg:text-body'>
                    {item.title}
                  </p>
                  <p className='font-sans text-body-sm text-text-muted lg:font-heading lg:text-h5'>
                    {item.description}
                  </p>
                </Reveal>
              </Fragment>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
