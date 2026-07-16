import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { SocialGlyph } from '@/components/layout/brand-icons';
import { cn } from '@/lib/utils';

type Testimonial = {
  name: string;
  handle: string;
  avatar: string;
  quote: string;
};

// Two rows that scroll in opposite directions. Avatars reuse the team photos.
const ROW_ONE: Testimonial[] = [
  {
    name: 'Alex Carter',
    handle: '@alexcarterx',
    avatar: '/team/team1.svg',
    quote:
      'I have used multiple bounty platforms before, but @boundless_fi was the first one that actually enforced delivery and payment through escrow instead of blind trust.',
  },
  {
    name: 'Daniel Kim',
    handle: '@danielbuilds',
    avatar: '/team/team2.svg',
    quote:
      'Winning a hackathon on @boundless_fi did not feel like the end of the journey. The milestone continuation model helped our team keep building after the event.',
  },
  {
    name: 'Maya Thompson',
    handle: '@mayathompson',
    avatar: '/team/team3.svg',
    quote:
      'The reputation layer on @boundless_fi makes each milestone meaningful. Your work history actually compounds into something you own.',
  },
];

const ROW_TWO: Testimonial[] = [
  {
    name: 'James Okoro',
    handle: '@jamesbuilds',
    avatar: '/team/team4.svg',
    quote:
      'What sold me on @boundless_fi was how simple the experience is for the team, while the blockchain infrastructure stays underneath.',
  },
  {
    name: 'Marcus Reid',
    handle: '@marcusreidx',
    avatar: '/team/team2.svg',
    quote:
      'Most platforms only help you find work. @boundless_fi feels like infrastructure for building long-term reputation in Web3.',
  },
  {
    name: 'Chloe Bennett',
    handle: '@chloebennett',
    avatar: '/team/team1.svg',
    quote:
      'The milestone tracking UI on @boundless_fi gave our community full visibility into project progress and fund releases.',
  },
];

function Card({ name, handle, avatar, quote }: Testimonial) {
  return (
    <article className='relative mr-5 flex w-[455px] shrink-0 flex-col gap-4 rounded-2xl border border-white/6 bg-white/2 p-6'>
      {/* Border accent lines (exact Figma specs), over a faint base rim.
          Top: a white gradient line across the top edge, fading at both ends. */}
      <span
        aria-hidden
        className='pointer-events-none absolute top-0 right-4 left-4 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_100%)] opacity-60'
      />
      {/* Bottom: a shorter white gradient line set toward the left. */}
      <span
        aria-hidden
        className='pointer-events-none absolute bottom-0 left-[52px] h-px w-[135px] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_100%)] opacity-50'
      />
      {/* Green accent on the left edge (Figma: 53px line, gradient fading at
          both ends, #4BDD74 at ~0.6 in the middle). */}
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-0 h-[53px] w-px -translate-y-1/2 bg-[linear-gradient(180deg,rgba(75,221,116,0)_0%,rgba(75,221,116,0.6)_50%,rgba(75,221,116,0)_100%)]'
      />
      <div className='flex items-center gap-3'>
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className='size-10 shrink-0 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-white'>{name}</span>
          <span className='text-xs text-text-muted'>{handle}</span>
        </div>
        <SocialGlyph name='x' className='ml-auto size-4 text-white/40' />
      </div>
      <p className='text-sm leading-[1.6] text-text-muted'>{quote}</p>
    </article>
  );
}

function Row({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
}) {
  // Duplicate the row so the -50% loop lands on an identical copy.
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        'flex w-max',
        direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
      )}
    >
      {loop.map((item, index) => (
        <Card key={`${item.handle}-${index}`} {...item} />
      ))}
    </div>
  );
}

/**
 * "Trusted by Builders Worldwide": two horizontally scrolling rows of social
 * testimonials. Hidden on mobile per the design.
 */
export function Testimonials() {
  return (
    <section className='hidden overflow-hidden bg-ink py-20 lg:block'>
      <div className='px-5 lg:px-[100px]'>
        <div className='mx-auto w-full max-w-page'>
          <div className='flex items-start justify-between gap-8'>
            <div className='flex flex-col gap-3'>
              <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
                Trusted by{' '}
                <span className='text-primary'>Builders Worldwide</span>
              </h2>
              <p className='max-w-md text-base leading-[1.45] text-text-muted'>
                Hear how communities, founders and contributors are creating
                impact through Boundless.
              </p>
            </div>

            {/* Liquid-glass CTA, scaled from a 282px reference to this ~44px
              pill. The lit border runs only along the top-left -> bottom-right
              diagonal (where light enters and exits): a 135deg gradient ring,
              bright at those two corners and transparent at the top-right and
              bottom-left, rendered via a masked overlay. A top-left radial
              highlight sets the light direction and diagonal inset bevels form
              the refractive lens edge. The fill stays dark/translucent over the
              10px backdrop blur, with only a faint inner frost. */}
            <a
              href='https://x.com/boundless_fi'
              target='_blank'
              rel='noreferrer'
              className='relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[60px] bg-[radial-gradient(80%_80%_at_15%_16%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_70%)] px-4 py-3 text-sm text-white shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05),0px_15px_30px_0px_rgba(0,0,0,0.05),0px_30px_60px_0px_rgba(0,0,0,0.1),inset_4px_4px_1px_-4px_rgba(255,255,255,0.5),inset_3px_3px_2px_-3px_rgba(179,179,179,0.45),inset_-3px_-3px_2px_-3px_rgba(179,179,179,0.45),inset_0px_0px_24px_0px_rgba(242,242,242,0.08)] backdrop-blur-[10px] transition-all duration-200 ease-in-out hover:opacity-70'
            >
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 rounded-[60px] bg-[linear-gradient(135deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_42%,rgba(255,255,255,0)_58%,rgba(255,255,255,0.85)_100%)] mask-[linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)] mask-exclude [mask-clip:content-box,border-box] p-px'
              />
              <SocialGlyph name='x' className='size-5' />
              Follow Boundless
              <ArrowUpRight className='size-5' strokeWidth={1.75} aria-hidden />
            </a>
          </div>
          {/* Marquee breaks out of the centered container to span the full
            width; the enclosing section is `overflow-hidden`, so the 100vw
            breakout is clipped and the soft edge fade lands at the true edges. */}
          <div className='relative left-1/2 mt-14 flex w-screen -translate-x-1/2 flex-col gap-5 overflow-hidden mask-[linear-gradient(to_right,transparent_0%,#000_22%,#000_78%,transparent_100%)]'>
            <Row items={ROW_ONE} direction='left' />
            <Row items={ROW_TWO} direction='right' />
          </div>
        </div>
      </div>
    </section>
  );
}
