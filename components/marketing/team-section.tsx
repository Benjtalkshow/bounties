import Image from 'next/image';
import { type ReactNode } from 'react';

import { Reveal } from './reveal';
import { Section } from './section';

// Mint glow at the top, fading fully to dark so it merges into the section below.
const GLOW =
  'linear-gradient(180deg, rgba(46, 237, 170, 0.08) 0%, rgba(13, 17, 17, 0.00) 100%), #0D1111';

interface TeamMember {
  name: string;
  role: string;
  /** Portrait path in `/public`. */
  image: string;
  linkedin?: string;
}

interface TeamSectionProps {
  title: ReactNode;
  members: TeamMember[];
}

/** Team grid: heading above portrait cards with name, role and a LinkedIn link. */
export function TeamSection({ title, members }: TeamSectionProps) {
  return (
    <div style={{ background: GLOW }}>
      <Section>
        <div className='flex flex-col gap-8'>
          <Reveal
            as='div'
            className='font-heading text-h2 font-semibold text-white lg:text-display-sm'
          >
            <h2>{title}</h2>
          </Reveal>

          <ul className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {members.map((member, i) => (
              <Reveal
                as='li'
                key={member.image}
                delay={i * 0.15}
                className='flex flex-col gap-5 lg:gap-2'
              >
                <div className='rounded lg:border lg:border-dashed lg:border-[#727272] lg:p-1'>
                  <div className='relative h-80 w-full overflow-hidden rounded-lg border border-white/10 bg-surface-subtle'>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized
                      sizes='(min-width: 1024px) 25vw, 100vw'
                      className='object-cover'
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between gap-3 rounded lg:border lg:border-dashed lg:border-[#727272] lg:p-3'>
                  <div className='flex flex-col gap-2 lg:gap-1'>
                    <p className='font-heading text-h5 font-semibold text-white'>
                      {member.name}
                    </p>
                    <p className='font-sans text-body-sm text-text-muted lg:text-body'>
                      {member.role}
                    </p>
                  </div>

                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                      className='shrink-0'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Image
                        src='/social/linkedin.svg'
                        alt=''
                        width={32}
                        height={32}
                        unoptimized
                        className='size-8'
                      />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
