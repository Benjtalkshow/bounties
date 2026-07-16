'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { Section } from './section';

type Program = { name: string; description: string };

const PROGRAMS: Program[] = [
  {
    name: 'Bounties',
    description: 'Complete tasks and earn rewards for your contributions.',
  },
  {
    name: 'Hackathons',
    description: 'Compete, collaborate, and bring new ideas to life.',
  },
  {
    name: 'Crowdfunding',
    description:
      'Raise support directly from communities that believe in your vision.',
  },
  {
    name: 'Grants',
    description: 'Secure funding for impactful projects and initiatives.',
  },
];

const GRADIENT =
  'bg-[linear-gradient(180deg,rgba(13,17,17,0)_48.68%,rgba(46,237,170,0.08)_100%)]';

/** Blank placeholder for a program's dashboard screenshot. */
function DashboardCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border-2 border-white/10 bg-white/2',
        className
      )}
    />
  );
}

/** Title, description and arrow shown beneath a dashboard card. */
function Caption({ program }: { program: Program }) {
  return (
    <div className='flex items-center gap-5 lg:pr-5'>
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='font-heading text-2xl font-semibold tracking-[-0.48px] text-white'>
          {program.name}
        </h3>
        <p className='text-base leading-[1.45] text-text-muted'>
          {program.description}
        </p>
      </div>
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.5}
        className='size-9 shrink-0 text-white lg:size-10'
      />
    </div>
  );
}

/** Heading, copy and the "Get Started" link shared by the desktop panel. */
function Intro() {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
        Every Funding Path.
        <span className='block text-primary'>One Platform.</span>
      </h2>
      <p className='text-base leading-[1.45] text-text-muted lg:text-xl lg:leading-[1.2] lg:tracking-[-0.4px]'>
        Boundless unifies multiple ways to launch, support and fund projects in
        a single accountable system.
      </p>
      <Link
        href='/opportunities'
        className='hidden items-center gap-2 self-start text-sm font-semibold text-primary transition-colors hover:text-primary-400 lg:inline-flex'
      >
        Get Started
        <ArrowRight className='size-5' />
      </Link>
    </div>
  );
}

/**
 * Desktop "Every Funding Path. One Platform.": the section pins while the user
 * scrolls, advancing through each program (Bounties, Hackathons, Crowdfunding,
 * Grants) before the page continues. The selector is also clickable, scrolling
 * to that program's segment.
 */
function DesktopPrograms() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', value => {
    const index = Math.min(
      PROGRAMS.length - 1,
      Math.max(0, Math.floor(value * PROGRAMS.length))
    );
    setActive(index);
  });

  // Scroll the window so the clicked program sits in the middle of its segment.
  function handleSelect(index: number) {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const target = top + ((index + 0.5) / PROGRAMS.length) * distance;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <section
      ref={ref}
      className={cn('relative hidden bg-ink lg:block', GRADIENT)}
      style={{ height: `${PROGRAMS.length * 100}vh` }}
    >
      <div className='sticky top-0 flex h-screen items-center px-[100px]'>
        <div className='mx-auto flex w-full max-w-page gap-16'>
          <div className='flex w-[412px] shrink-0 flex-col gap-[60px]'>
            <Intro />

            <div className='flex flex-col gap-5'>
              {PROGRAMS.map((program, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={program.name}
                    type='button'
                    onClick={() => handleSelect(index)}
                    aria-pressed={isActive}
                    className='flex cursor-pointer items-center gap-2 text-left'
                  >
                    <span
                      className={cn(
                        'h-6 w-0.5 shrink-0 rounded-full transition-colors',
                        isActive ? 'bg-primary' : 'bg-transparent'
                      )}
                    />
                    <span
                      className={cn(
                        'text-lg transition-colors',
                        isActive ? 'font-bold text-white' : 'text-text-muted'
                      )}
                    >
                      {program.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='flex flex-1 flex-col gap-5'>
            <DashboardCard className='h-[480px]' />
            <Caption program={PROGRAMS[active]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mobile "Every Funding Path. One Platform.": every program stacked. */
function MobilePrograms() {
  return (
    <Section
      className={cn('bg-ink lg:hidden', GRADIENT)}
      innerClassName='flex flex-col gap-10'
    >
      <Intro />

      <div className='flex flex-col gap-8'>
        {PROGRAMS.map((program, index) => (
          <Fragment key={program.name}>
            <div className='flex flex-col gap-5'>
              <DashboardCard className='h-[360px]' />
              <Caption program={program} />
            </div>
            {index < PROGRAMS.length - 1 ? (
              <span aria-hidden className='h-px w-full bg-white/10' />
            ) : null}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}

/**
 * "Every Funding Path. One Platform.": a program selector beside a
 * dashboard-screenshot card. On desktop the section pins and scroll advances
 * through each program; on mobile every program stacks vertically.
 */
export function FundingPrograms() {
  return (
    <>
      <DesktopPrograms />
      <MobilePrograms />
    </>
  );
}
