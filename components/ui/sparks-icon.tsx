import Image from 'next/image';

/**
 * The Sparks credits brand mark (public/currency/sparks.svg) with an
 * icon-component signature, so it can drop into any `icon` slot alongside
 * the generated SVG icons (e.g. profile menu rows, credit chips).
 */
export function SparksIcon({ className }: { className?: string }) {
  return (
    <Image
      src='/currency/sparks.svg'
      alt=''
      width={20}
      height={20}
      aria-hidden
      className={className}
    />
  );
}
