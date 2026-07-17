'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Pencil, Plus, Rocket, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { CtaPill } from './cta-pill';

type Cta = { label: string; icon: LucideIcon; iconRight?: boolean };

const CTAS: Cta[] = [
  { label: 'Post', icon: Pencil },
  { label: 'Launch', icon: Rocket },
  { label: 'Create', icon: Plus },
  { label: 'Enter', icon: ArrowUpRight, iconRight: true },
  { label: 'Join', icon: User },
];

const ROW = 47; // pitch: 39px pill + 8px gap
const TRACK = [...CTAS, ...CTAS, ...CTAS]; // copies for a seamless loop
const START = CTAS.length + 2; // centers "Create" first, matching the design
const RESET_AT = CTAS.length * 2; // snap back one cycle once we reach the copy
const STEP_MS = 1800;
const SLIDE_MS = 600;

/** Vertical CTA picker that scrolls action pills through a highlighted center slot. */
export function CtaTicker({ className }: { className?: string }) {
  const [step, setStep] = useState(START);
  const [sliding, setSliding] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setStep(s => s + 1), STEP_MS);
    return () => clearInterval(id);
  }, []);

  // After sliding into the duplicate copy, jump back a cycle without animating.
  useEffect(() => {
    if (step < RESET_AT) return;
    const id = setTimeout(() => {
      setSliding(false);
      setStep(s => s - CTAS.length);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (sliding) return;
    const id = requestAnimationFrame(() => setSliding(true));
    return () => cancelAnimationFrame(id);
  }, [sliding]);

  return (
    <div
      className={cn('relative h-[240px] w-[180px] overflow-hidden', className)}
    >
      <div
        className='flex flex-col will-change-transform'
        style={{
          transform: `translateY(${96.5 - step * ROW}px)`,
          transition: sliding ? `transform ${SLIDE_MS}ms ease` : 'none',
        }}
      >
        {TRACK.map((cta, index) => (
          <div
            key={index}
            className='flex h-[47px] shrink-0 items-center justify-center'
          >
            <CtaPill
              {...cta}
              active={index === step}
              className='transition-all duration-500'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
