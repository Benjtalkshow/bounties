'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/** Max px the glow leans toward the cursor. */
const FOLLOW = { x: 60, y: 16 };

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

/**
 * Decorative glow behind the footer card's top edge. Idly drifts like a slow
 * cloud and leans toward the cursor while it is over the footer. Both effects
 * are paused for reduced-motion users.
 */
export function FooterGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // A) idle cloud drift
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const el = glowRef.current;
      const drift = { ease: 'sine.inOut', yoyo: true, repeat: -1 } as const;

      // Mismatched per-axis durations keep the motion organic, not metronomic.
      gsap.fromTo(el, { x: -90 }, { x: 90, duration: 7, ...drift });
      gsap.fromTo(el, { y: -18 }, { y: 18, duration: 10, ...drift });
      gsap.fromTo(el, { scale: 0.96 }, { scale: 1.08, duration: 8, ...drift });
      gsap.fromTo(
        el,
        { rotation: -6 },
        { rotation: 6, duration: 12, ...drift }
      );
    },
    { scope: glowRef }
  );

  // B) lean toward the cursor while it is over the footer
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const follow = followRef.current;
    const footer = outerRef.current?.closest('footer');
    if (!follow || !footer) return;

    const xTo = gsap.quickTo(follow, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follow, 'y', { duration: 0.6, ease: 'power3' });

    const onMove = (event: Event) => {
      const e = event as MouseEvent;
      const r = footer.getBoundingClientRect();
      xTo(
        clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * FOLLOW.x
      );
      yTo(
        clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * FOLLOW.y
      );
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    footer.addEventListener('mousemove', onMove);
    footer.addEventListener('mouseleave', onLeave);
    return () => {
      footer.removeEventListener('mousemove', onMove);
      footer.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      aria-hidden
      className='pointer-events-none absolute top-1 left-1/2 h-20 w-[62%] -translate-x-1/2 sm:top-1 sm:h-28 sm:w-[56%] lg:h-[130px] lg:w-[52%]'
    >
      <div ref={followRef} className='size-full'>
        <div
          ref={glowRef}
          className='size-full rounded-[50%] bg-[linear-gradient(90deg,#2eedaa_0%,#86ee54_52%,#c4f24a_100%)] opacity-80 blur-[48px] lg:blur-[58px]'
        />
      </div>
    </div>
  );
}
