'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

const MOTION = { div: motion.div, li: motion.li } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to delay the animation; use `index * step` for a stagger. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: keyof typeof MOTION;
}

/** Fades and slides its children up once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = MOTION[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
