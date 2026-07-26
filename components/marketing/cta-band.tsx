import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { MarketingButton } from './marketing-button';
import { Section } from './section';

interface CtaAction {
  label: string;
  href: string;
  /** External links (e.g. the main Boundless app) open in a new tab. */
  external?: boolean;
}

interface CtaBandProps {
  heading: ReactNode;
  description: ReactNode;
  action: CtaAction;
  /** Optional pill shown above the heading. */
  badge?: ReactNode;
  className?: string;
}

/**
 * Reusable call-to-action band: a centered card with an optional badge, heading,
 * copy, and a single primary action. Ported from the Boundless landing CTA and
 * made prop-driven so it can be reused anywhere a CTA is needed (landing, about,
 * and so on). Wrap it in <Reveal> at the page level for a scroll-in animation.
 */
export function CtaBand({
  heading,
  description,
  action,
  badge,
  className,
}: CtaBandProps) {
  const actionContent = (
    <>
      {action.label}
      <ArrowRight />
    </>
  );

  return (
    <Section
      className={cn(
        'bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_50%)]',
        className
      )}
    >
      <div className='w-full rounded-2xl bg-[#111616] px-5 py-[50px] lg:border lg:border-white/10 lg:py-[70px]'>
        <div className='mx-auto flex max-w-[484px] flex-col items-center gap-6'>
          <div className='flex flex-col items-center gap-3'>
            {badge ? (
              <div className='inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-[5px] text-body-xs font-medium text-white'>
                {badge}
              </div>
            ) : null}

            <h2 className='text-center font-heading text-h3 font-semibold text-white lg:text-display-sm'>
              {heading}
            </h2>

            <p className='text-center font-sans text-body-sm text-text-muted-brand lg:font-heading lg:text-h5'>
              {description}
            </p>
          </div>

          <MarketingButton asChild>
            {action.external ? (
              <a href={action.href} target='_blank' rel='noopener noreferrer'>
                {actionContent}
              </a>
            ) : (
              <Link href={action.href}>{actionContent}</Link>
            )}
          </MarketingButton>
        </div>
      </div>
    </Section>
  );
}
