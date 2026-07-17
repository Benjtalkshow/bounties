import Image from 'next/image';

import { cn } from '@/lib/utils';

/**
 * Local logo fallback keyed by uppercase symbol.
 * Remove an entry once the backend's SupportedToken.logoUrl reliably
 * covers it -- this map is only consulted when logoUrl is absent.
 */
const STATIC_LOGO: Record<string, string> = {
  USDC: '/currency/usdc.png',
};

export interface TokenAmountProps {
  /** Numeric reward amount. */
  amount: number | string;
  /** Token symbol displayed after the amount, e.g. "USDC". */
  symbol: string;
  /**
   * Hosted logo URL from SupportedToken.logoUrl.
   * Falls back to STATIC_LOGO when null/undefined.
   */
  logoUrl?: string | null;
  /** Icon pixel size. Defaults to 20. */
  iconSize?: number;
  /** Render the symbol after the amount. Defaults to true. */
  showSymbol?: boolean;
  className?: string;
}

/**
 * Renders a token logo + formatted amount + symbol inline.
 *
 * Prefer the backend-supplied `logoUrl` (from SupportedToken) when
 * available; fall back to a local static asset while the token catalogue
 * is still being populated.
 */
export function TokenAmount({
  amount,
  symbol,
  logoUrl,
  iconSize = 20,
  showSymbol = true,
  className,
}: TokenAmountProps) {
  const resolvedLogo = logoUrl ?? STATIC_LOGO[symbol.toUpperCase()];
  const formatted =
    typeof amount === 'number' ? amount.toLocaleString() : amount;

  return (
    <span className={cn('inline-flex min-w-0 items-center gap-2', className)}>
      {resolvedLogo ? (
        <Image
          src={resolvedLogo}
          alt={symbol}
          width={iconSize}
          height={iconSize}
          className='shrink-0'
        />
      ) : (
        <span
          aria-hidden
          className='flex shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-[10px] font-bold text-primary-600'
          style={{ width: iconSize, height: iconSize }}
        >
          {symbol.slice(0, 2)}
        </span>
      )}
      <span className='truncate'>
        {formatted}
        {showSymbol ? ` ${symbol}` : ''}
      </span>
    </span>
  );
}
