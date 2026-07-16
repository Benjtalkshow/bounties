import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Reveal } from './reveal';
import { Section } from './section';

// Mint glow at the top, fading fully to dark so it merges into the section below.
const GLOW =
  'linear-gradient(180deg, rgba(46, 237, 170, 0.08) 0%, rgba(13, 17, 17, 0.00) 100%), #0D1111';

interface IntroSectionProps {
  eyebrow: ReactNode;
  title: ReactNode;
  children: ReactNode;
  eyebrowClassName?: string;
}

/** Two-column intro: eyebrow + heading on the left, supporting copy on the right. */
export function IntroSection({
  eyebrow,
  title,
  children,
  eyebrowClassName,
}: IntroSectionProps) {
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

          <Reveal
            delay={0.2}
            className='font-sans text-body-sm text-text-muted lg:flex-1 lg:font-heading lg:text-h5'
          >
            {children}
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
