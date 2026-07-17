'use client';

import { Play } from 'lucide-react';
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { HeroBackground } from './hero-background';
import { Section } from './section';

// Gap (px) the stars carry past the text, then clamped clear of the content below.
const FIELD_MARGIN = 56;
const CARD_CLEARANCE = 16;

interface HeroSectionProps {
  children?: ReactNode;
  /** Row rendered full-width between the content and the media card. */
  partners?: ReactNode;
  /** Content for the framed media card; falls back to a play placeholder. */
  media?: ReactNode;
  /** Render the framed media card even without `media`. */
  showMedia?: boolean;
  className?: string;
}

/** Marketing hero shell: starfield background, content slot, optional media card. */
export function HeroSection({
  children,
  partners,
  media,
  showMedia = false,
  className,
}: HeroSectionProps) {
  const hasMedia = media != null || showMedia;
  const hasLower = hasMedia || partners != null;

  // Fade the starfield out where the text ends, clamped clear of the content below.
  const contentRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const [fieldHeight, setFieldHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const textEnd = el.offsetTop + el.offsetHeight + FIELD_MARGIN;
      const lower = lowerRef.current;
      const limit = lower ? lower.offsetTop - CARD_CLEARANCE : Infinity;
      setFieldHeight(Math.min(textEnd, limit));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (lowerRef.current) observer.observe(lowerRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children, hasLower]);

  return (
    <HeroBackground fieldHeight={fieldHeight}>
      <Section className={cn('pt-24 pb-16 lg:pt-44 lg:pb-20', className)}>
        {children ? (
          <div ref={contentRef} className='max-w-[772px]'>
            {children}
          </div>
        ) : null}

        {hasLower ? (
          <div ref={lowerRef} className='mt-12'>
            {partners}

            {hasMedia ? (
              <div
                className={cn(
                  'aspect-1240/520 w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-subtle',
                  partners != null && 'mt-12'
                )}
              >
                {media ?? (
                  <div className='flex size-full items-center justify-center'>
                    <span className='flex h-12 w-[68px] items-center justify-center rounded-[18px] bg-[#FF0000] sm:h-[60px] sm:w-[86px]'>
                      <Play className='size-6 translate-x-px fill-white text-white sm:size-7' />
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </Section>
    </HeroBackground>
  );
}
