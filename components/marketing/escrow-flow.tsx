'use client';

import { Check, LoaderCircle, Lock } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Glow } from './glow';

type Step = { title: string; description: string };

const STEPS: Step[] = [
  {
    title: 'Match',
    description: 'Connect with the right contributors or participants.',
  },
  {
    title: 'Secure',
    description: 'Lock funding into escrow before work starts.',
  },
];

// Four phases walk the escrow rail through its lifecycle, then loop:
// 0 both pending, 1 Match confirmed, 2 Secure in progress, 3 Secure locked.
const PHASES = 4;
const STEP_MS = 1400;

/** Pending circle: a dark disc with a faint ring, matching the figma default. */
function PendingDot() {
  return (
    <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1a1b1e]'>
      <span className='size-[18px] rounded-full border-2 border-white/20' />
    </span>
  );
}

/** Filled circle holding a status icon (check, spinner or lock). */
function StatusDot({ children }: { children: React.ReactNode }) {
  return (
    <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-ink'>
      {children}
    </span>
  );
}

/**
 * "Track Progress" illustration: a glassy escrow card whose Match/Secure rail
 * animates through its lifecycle (pending dot, green check, securing spinner,
 * locked) with the connector filling green, looping. Honors reduced motion by
 * resting on the final secured state.
 */
export function EscrowFlow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setStep(s => (s + 1) % PHASES), STEP_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Reduced motion rests on the final secured state instead of looping.
  const phase = reduceMotion ? PHASES - 1 : step;
  const matchDone = phase >= 1;
  const lineFilled = phase >= 1;

  return (
    <div className={cn('relative w-[260px]', className)}>
      {/* Border glow concentrated at the centre of the left edge (only the
          border line glows here), fading to the figma's faint white border. */}
      <div className='relative rounded-[14px] bg-[radial-gradient(circle_at_left,rgba(46,237,170,0.85),rgba(255,255,255,0.09)_18%)] p-px'>
        <div className='relative overflow-hidden rounded-[14px] bg-ink/70 p-[15px] backdrop-blur-[35px]'>
          {/* Green patch near the centre of the right edge (inside, not on the
              border). */}
          <Glow className='absolute top-1/2 right-0 size-24 translate-x-[45%] -translate-y-1/2 opacity-50 blur-[26px]' />

          <div className='relative flex gap-3'>
            {/* Indicator rail: Match dot, connector, Secure dot. */}
            <div className='flex flex-col items-center pt-1'>
              {matchDone ? (
                <StatusDot>
                  <Check className='size-4' strokeWidth={3} aria-hidden />
                </StatusDot>
              ) : (
                <PendingDot />
              )}

              <span className='my-1 h-11 w-1 overflow-hidden rounded-full bg-[#1f2021]'>
                <span
                  className={cn(
                    'block w-full rounded-full bg-primary-400 transition-[height] duration-500 ease-out motion-reduce:transition-none',
                    lineFilled ? 'h-full' : 'h-0'
                  )}
                />
              </span>

              {phase >= 3 ? (
                <StatusDot>
                  <Lock className='size-4' strokeWidth={2.5} aria-hidden />
                </StatusDot>
              ) : phase === 2 ? (
                <StatusDot>
                  <LoaderCircle
                    className='size-4 animate-spin motion-reduce:animate-none'
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </StatusDot>
              ) : (
                <PendingDot />
              )}
            </div>

            <div className='flex flex-1 flex-col gap-8'>
              {STEPS.map(step => (
                <div key={step.title} className='flex flex-col gap-2'>
                  <p className='text-[15px] leading-none font-medium text-white'>
                    {step.title}
                  </p>
                  <p className='text-xs text-white/50'>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top glow: overlays the card from its top edge and bursts out above,
          centred and kept transparent so it reads as a soft burst. */}
      <Glow className='absolute -top-6 left-1/2 h-14 w-36 -translate-x-1/2 opacity-40 blur-[26px]' />
    </div>
  );
}
