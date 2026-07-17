'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Section } from './section';

type Persona = { title: string; description: string };

const PERSONAS: Persona[] = [
  {
    title: 'Designers',
    description:
      'Contribute creative work, collaborate with teams and get rewarded.',
  },
  {
    title: 'Developers',
    description:
      'Turn ideas into products and earn through challenges and opportunities.',
  },
  {
    title: 'Communities',
    description: 'Launch programs that engage and support contributors.',
  },
  {
    title: 'Startups & Founders',
    description:
      'Access funding, visibility and opportunities to accelerate growth.',
  },
];

const STEP_MS = 3200;

/**
 * "Built for Builders, Creators & Communities": four audience personas as an
 * auto-advancing stepper. The active persona's indicator lights up and its
 * progress bar fills before moving to the next.
 */
export function Personas() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(
      () => setActive(current => (current + 1) % PERSONAS.length),
      STEP_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Section className='bg-ink'>
      <div className='flex flex-col gap-8'>
        <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
          Built for{' '}
          <span className='text-primary'>
            Builders, Creators &amp; Communities
          </span>
        </h2>

        <div className='flex flex-col gap-10 lg:flex-row lg:gap-2'>
          {PERSONAS.map((persona, index) => {
            const isActive = index === active;

            return (
              <div key={persona.title} className='flex flex-col lg:flex-1'>
                {/* Oversized faded index, clipped (desktop only). */}
                <div className='relative hidden h-[100px] overflow-hidden lg:block'>
                  <span className='absolute -top-2 left-5 font-heading text-[160px] leading-none font-semibold tracking-[-6.4px] text-white/4'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Progress: indicator + fill bar. */}
                <div className='flex items-center gap-2 lg:mt-2'>
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full transition-colors',
                      isActive ? 'bg-[#1a3028]' : 'bg-[#1a1b1e]'
                    )}
                  >
                    <span
                      className={cn(
                        'size-1.5 rounded-full transition-colors',
                        isActive ? 'bg-primary' : 'bg-white/25'
                      )}
                    />
                  </span>
                  <span className='relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#28292b]/60'>
                    <span
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full bg-primary ease-linear motion-reduce:transition-none',
                        isActive ? 'w-full' : 'w-0'
                      )}
                      style={{
                        transitionProperty: 'width',
                        transitionDuration: isActive ? `${STEP_MS}ms` : '0ms',
                      }}
                    />
                  </span>
                </div>

                {/* Step copy. */}
                <div className='mt-4 flex flex-col gap-2 lg:mt-10 lg:pr-3 lg:pl-8'>
                  <h3 className='font-heading text-xl font-semibold tracking-[-0.4px] text-white'>
                    {persona.title}
                  </h3>
                  <p className='text-sm leading-[1.45] text-text-muted'>
                    {persona.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
