'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

/**
 * Nudge banner shell shared by profile-completion and verify-identity
 * prompts (Figma 2330:29584 anatomy): elevated rounded card with the
 * breathing green radial glow in the bottom-right, a heading on the left,
 * and an action slot on the right (stacked on mobile).
 */
export function GlowBanner({
  title,
  action,
  className,
  'aria-label': ariaLabel,
}: {
  title: string;
  action: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn(
        'relative flex flex-col gap-4 overflow-hidden rounded-[20px] border border-[#1f2a28] bg-ink-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6',
        className
      )}
    >
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-8 left-12 h-24 w-[55%]'
      >
        <motion.div
          className='absolute top-0 bottom-0 h-full w-full rounded-full bg-[radial-gradient(ellipse_at_top_left,rgba(46,237,170,0.5)_0%,rgba(46,237,170,0.22)_40%,rgba(46,237,170,0)_70%)] blur-[30px]'
          animate={{ x: [-18, 18, -18] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute right-0 bottom-0 h-24 w-[55%]'
      >
        <motion.div
          className='absolute right-0 bottom-0 h-full w-full rounded-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(46,237,170,0.5)_0%,rgba(46,237,170,0.22)_40%,rgba(46,237,170,0)_70%)] blur-[18px]'
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <h2 className='relative z-10 font-heading text-base leading-[1.3] font-semibold tracking-[-0.36px] text-white sm:text-[18px] sm:leading-[1.2]'>
        {title}
      </h2>

      <div className='relative z-10 shrink-0'>{action}</div>
    </section>
  );
}
