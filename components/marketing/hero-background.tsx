'use client';

import { type ReactNode, useEffect, useRef } from 'react';

const STAR_COUNT = 420;
const STAR = {
  minRadius: 0.2,
  maxRadius: 1.4,
  minOpacity: 0.15,
  maxOpacity: 0.7,
} as const;

/** Fallback field height (fraction of canvas) when no `fieldHeight` is given. */
const FIELD_RATIO = 0.42;
/** Exponent > 1 biases stars toward the top of the field. */
const TOP_BIAS = 1.6;
/** Twinkle: brightness oscillates between `floor` and full on a per-star cycle. */
const TWINKLE = { floor: 0.25, minSpeed: 0.0008, maxSpeed: 0.0022 } as const;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
}

/**
 * Gradient background with white stars clustered at the top, fading out by
 * `fieldHeight` px (falls back to a fraction of the canvas). Renders `children`
 * above the canvas.
 */
export function HeroBackground({
  children,
  fieldHeight,
  fadeBottom = false,
}: {
  children?: ReactNode;
  fieldHeight?: number;
  /**
   * For heroes stretched to the footer: resolve the teal tint back to ink at
   * the very bottom within this one gradient, so the page meets the next
   * section with no seam (instead of clipping at the teal peak). Default heroes
   * keep the tint peaking at the bottom edge.
   */
  fadeBottom?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];

    const build = () => {
      const { clientWidth: width, clientHeight: height } = canvas;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const field =
        fieldHeight && fieldHeight > 0
          ? Math.min(fieldHeight, height)
          : height * FIELD_RATIO;

      stars = Array.from({ length: STAR_COUNT }, () => {
        const depth = Math.pow(Math.random(), TOP_BIAS);
        return {
          x: Math.random() * width,
          y: depth * field,
          radius: randomBetween(STAR.minRadius, STAR.maxRadius),
          // Stay bright most of the way down, then drop off near the field edge.
          opacity:
            randomBetween(STAR.minOpacity, STAR.maxOpacity) *
            (1 - depth * depth),
          phase: Math.random() * Math.PI * 2,
          speed: randomBetween(TWINKLE.minSpeed, TWINKLE.maxSpeed),
        };
      });
    };

    const render = (t: number) => {
      const { clientWidth: width, clientHeight: height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const pulse = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const opacity =
          s.opacity * (TWINKLE.floor + (1 - TWINKLE.floor) * pulse);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let frame = 0;
    const loop = (t: number) => {
      render(t);
      frame = requestAnimationFrame(loop);
    };

    build();
    if (reduceMotion) render(0);
    else frame = requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => {
      build();
      if (reduceMotion) render(0);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [fieldHeight]);

  return (
    <div
      className='relative overflow-hidden'
      style={{
        background: fadeBottom
          ? 'linear-gradient(180deg, rgba(13, 17, 17, 0.00) 40.98%, rgba(46, 237, 170, 0.08) 74%, rgba(13, 17, 17, 1) 100%), #0D1111'
          : 'linear-gradient(180deg, rgba(13, 17, 17, 0.00) 40.98%, rgba(46, 237, 170, 0.08) 100%), #0D1111',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
        }}
      />
      <div className='relative z-1'>{children}</div>
    </div>
  );
}

export default HeroBackground;
