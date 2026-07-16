'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { type ReactNode, useRef } from 'react';

const LOGO_CLASS = 'h-6 w-auto sm:h-8';

interface PartnerLogo {
  key: string;
  /** Accessible name for the link (the visible lockup is presentational). */
  label: string;
  /** Partner site; opened in a new tab. */
  href: string;
  node: ReactNode;
}

const LOGOS: PartnerLogo[] = [
  {
    key: 'stellar',
    label: 'Stellar',
    href: 'https://stellar.org',
    node: (
      <Image
        src='/brand/stellar-logo.svg'
        alt='Stellar'
        width={128}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'trustlesswork',
    label: 'Trustless Work',
    href: 'https://www.trustlesswork.com',
    node: (
      <>
        <Image
          src='/brand/trustlesswork-logo.svg'
          alt=''
          width={37}
          height={32}
          unoptimized
          className={LOGO_CLASS}
        />
        <span className='font-display text-[28px] leading-[1.05] font-normal text-white uppercase sm:text-[33.684px] sm:leading-[35.368px]'>
          TrustlessWork
        </span>
      </>
    ),
  },
  {
    key: 'sdf',
    label: 'Stellar Development Foundation',
    href: 'https://stellar.org/foundation',
    node: (
      <Image
        src='/brand/sdf-logo.svg'
        alt='Stellar Development Foundation'
        width={126}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'usdc',
    label: 'USD Coin',
    href: 'https://www.circle.com/usdc',
    node: (
      <>
        <Image
          src='/brand/Usdc--Streamline-Cryptocurrency.svg'
          alt=''
          width={25}
          height={25}
          unoptimized
          className='size-6 sm:size-7'
        />
        <span className='text-xl sm:text-2xl'>USD Coin</span>
      </>
    ),
  },
  {
    key: 'scf',
    label: 'Stellar Community Fund',
    href: 'https://communityfund.stellar.org',
    node: (
      <Image
        src='/brand/stellar-community-fund.svg'
        alt='Stellar Community Fund'
        width={99}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'blockchain-unn',
    label: 'Blockchain UNN',
    href: 'https://www.blockchainunn.org',
    node: (
      <Image
        src='/brand/blocakchain-unn.png'
        alt='Blockchain UNN'
        width={128}
        height={32}
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'blockhive',
    label: 'The BlockHive',
    href: 'https://theblockhive.org',
    node: (
      <Image
        src='/brand/blockhive.png'
        alt='The BlockHive'
        width={88}
        height={32}
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'gida',
    label: 'GIDA',
    href: 'https://www.gida.academy',
    node: (
      <Image
        src='/brand/gida.png'
        alt='GIDA'
        width={128}
        height={46}
        className={LOGO_CLASS}
      />
    ),
  },
];

// One pass of the logos. Trailing margin on every item keeps the spacing even
// across the loop seam where the second copy meets the first. The second copy
// of the marquee is aria-hidden, so its links are pulled out of the tab order
// to avoid duplicate, invisible focus stops.
function LogoTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className='flex shrink-0' aria-hidden={ariaHidden}>
      {LOGOS.map(logo => (
        <li key={logo.key} className='mr-12 flex shrink-0 sm:mr-20'>
          <a
            href={logo.href}
            target='_blank'
            // noopener guards against reverse tabnabbing; the referrer is kept
            // (not noreferrer) so partners can see Boundless as a referral source.
            rel='noopener'
            aria-label={`${logo.label} (opens in a new tab)`}
            tabIndex={ariaHidden ? -1 : undefined}
            className='flex items-center gap-2 rounded-md text-white opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-500/50'
          >
            {logo.node}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Ecosystem partner lockups as a seamless, auto-scrolling marquee. */
export function PartnerLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      tween.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  // Pause the marquee while the user is interacting (hover or keyboard focus)
  // so the partner links stay easy to click.
  const pause = () => tween.current?.pause();
  const resume = () => tween.current?.resume();

  return (
    <div
      className='overflow-hidden'
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div ref={trackRef} className='flex w-max'>
        <LogoTrack />
        <LogoTrack ariaHidden />
      </div>
    </div>
  );
}
