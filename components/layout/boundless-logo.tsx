import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

/**
 * The Boundless brand mark: the filled double chevron. Inherits color via
 * `currentColor`, so wrap it in a `text-*` utility (brand teal by default).
 */
export function BoundlessMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 85 78'
      fill='currentColor'
      className={className}
      aria-hidden
    >
      <path d='M38.4163 49.56V27.8694L38.4313 27.8593L38.4163 27.8493L0 0V21.7157L23.456 38.7122L0 55.7086V77.4194L38.4163 49.5751L38.4313 49.5651L38.4163 49.56Z' />
      <path d='M84.5796 49.56V27.8694L84.5947 27.8593L84.5796 27.8493L46.1733 0V21.7157L69.6243 38.7122L46.1733 55.7086V77.4194L84.5796 49.5751L84.5947 49.5651L84.5796 49.56Z' />
    </svg>
  );
}

type LogoVariant = 'dark' | 'light' | 'white' | 'black';

/** Intrinsic dimensions of each lockup file in `public/brand/`. */
const LOGO_DIMENSIONS: Record<LogoVariant, { width: number; height: number }> =
  {
    dark: { width: 437, height: 69 },
    light: { width: 437, height: 69 },
    white: { width: 437, height: 69 },
    black: { width: 256, height: 40 },
  };

interface BoundlessLogoProps {
  href?: string;
  className?: string;
  /**
   * Lockup colorway. `dark` (teal mark, white word) and `white` suit dark
   * surfaces; `light` (teal mark, ink word) and `black` suit light surfaces.
   */
  variant?: LogoVariant;
}

/**
 * Full Boundless lockup (mark plus wordmark), linked home. Renders the real
 * brand asset from `public/brand/`, so the wordmark is correct regardless of
 * webfont load state. Used in the marketing header.
 */
export function BoundlessLogo({
  href = '/',
  className,
  variant = 'dark',
}: BoundlessLogoProps) {
  const { width, height } = LOGO_DIMENSIONS[variant];

  return (
    <Link
      href={href}
      aria-label='Boundless home'
      className='inline-flex items-center'
    >
      <Image
        src={`/brand/boundless-logo-${variant}.svg`}
        alt=''
        width={width}
        height={height}
        priority
        unoptimized
        className={cn('h-7 w-auto', className)}
      />
    </Link>
  );
}
