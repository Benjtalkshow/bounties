'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

export interface AvatarGroupProps {
  /** Avatar image URLs, in stacking order (the first appears on top). */
  avatars: string[];
  /** Maximum avatars shown before the +N overflow badge. Default 4. */
  maxVisible?: number;
  /**
   * Total participants the stack represents. When provided, overflow is
   * `totalCount - maxVisible` so callers can pass a small sample plus a count.
   */
  totalCount?: number;
  /** Avatar diameter in pixels; the whole stack scales from this. Default 24. */
  size?: number;
  className?: string;
}

// Proportions captured at the 24px design size, scaled by `size / 24`.
const BASE_SIZE = 24;
const BASE_BORDER = 1.125;
const BASE_OVERLAP = 6; // matches -mr-1.5 at 24px
const BASE_OVERFLOW_TEXT = 6.75;

/** Deterministic fallback glyph so every position stays occupied (A, B, C...). */
function fallbackGlyph(index: number): string {
  return String.fromCharCode(65 + (index % 26));
}

/** One stacked cell: image avatar with a letter fallback on a missing/broken URL. */
function AvatarCell({
  src,
  index,
  diameter,
  borderWidth,
  marginRight,
  zIndex,
}: {
  src: string;
  index: number;
  diameter: number;
  borderWidth: number;
  marginRight: number;
  zIndex: number;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className='relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-solid border-white bg-primary-50 font-semibold text-neutral-900'
      style={{
        width: diameter,
        height: diameter,
        borderWidth,
        marginRight,
        fontSize: diameter * 0.4,
        zIndex,
      }}
    >
      {showImage ? (
        <Image
          src={src}
          alt=''
          fill
          sizes={`${diameter}px`}
          className='object-cover'
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden>{fallbackGlyph(index)}</span>
      )}
    </span>
  );
}

/**
 * AvatarGroup: an overlapping stack of avatars with an optional +N overflow
 * badge. Feature-agnostic UI primitive: pass avatar URLs (and optionally a
 * total count and pixel size) and it renders the stack, scaling every
 * dimension from `size`. The first avatar sits on top; missing or broken URLs
 * fall back to a letter so each position stays occupied. Figma 3471:40575.
 */
export function AvatarGroup({
  avatars,
  maxVisible = 4,
  totalCount,
  size = BASE_SIZE,
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, maxVisible);
  const total = totalCount ?? avatars.length;
  const overflow = Math.max(0, total - maxVisible);

  const scale = size / BASE_SIZE;
  const borderWidth = BASE_BORDER * scale;
  const overlap = BASE_OVERLAP * scale;

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((src, index) => {
        const isLast = index === visible.length - 1 && overflow === 0;
        return (
          <AvatarCell
            key={`${index}-${src}`}
            src={src}
            index={index}
            diameter={size}
            borderWidth={borderWidth}
            marginRight={isLast ? 0 : -overlap}
            zIndex={visible.length - index}
          />
        );
      })}

      {overflow > 0 ? (
        <span
          aria-label={`${overflow} more`}
          className='relative flex shrink-0 items-center justify-center rounded-full border-solid border-white bg-primary-100 font-semibold text-ink'
          style={{
            width: size,
            height: size,
            borderWidth,
            fontSize: BASE_OVERFLOW_TEXT * scale,
            zIndex: 0,
          }}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
