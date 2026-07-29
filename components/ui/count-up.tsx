'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useEffect, useRef } from 'react';

const formatter = new Intl.NumberFormat('en-US');

/**
 * Counts up from 0 to `value` once it scrolls into view. Formats with thousands
 * separators. Honors reduced motion by showing the final value at once. Drives
 * the text with a motion value, so the tick does not re-render React.
 */
export function CountUp({
  value,
  duration = 1.6,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(count, latest =>
    formatter.format(Math.round(latest))
  );

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion || value === 0) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion, count]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
