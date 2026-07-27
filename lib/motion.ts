import type { Transition } from 'motion/react';

/**
 * Shared motion tokens. Keep transitions subtle and GPU-friendly
 * (opacity/transform only) and tune timing here so it stays consistent.
 */

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = { fast: 0.18, base: 0.28 } as const;

export const STAGGER = 0.04;
/** Cap the per-index stagger so long lists do not feel slow. */
export const STAGGER_CAP = 8;

export const transitions = {
  fast: { duration: DURATION.fast, ease: EASE_OUT },
  base: { duration: DURATION.base, ease: EASE_OUT },
} satisfies Record<string, Transition>;
