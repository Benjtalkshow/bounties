import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { MarketingButton } from '../marketing/marketing-button';
import { Section } from '../marketing/section';

/** Closing call-to-action band: "Want to be a builder?" */
export function WantToBuild() {
  return (
    <Section className='bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_50%)]'>
      <div className='w-full rounded-2xl bg-[#111616] px-5 py-[50px] lg:border lg:border-white/10 lg:py-[70px]'>
        <div className='mx-auto flex max-w-[484px] flex-col items-center gap-6'>
          <div className='flex flex-col items-center gap-3'>
            <div className='inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-[5px] text-body-xs font-medium text-white'>
              <span>Build. Earn. Belong</span>
              <span aria-hidden className='h-3.5 w-px bg-white/15' />
              <Link
                href='/about'
                className='inline-flex items-center gap-1 transition-colors hover:text-primary'
              >
                Learn More
                <ArrowRight className='size-3.5' />
              </Link>
            </div>

            <h2 className='text-center font-heading text-h3 font-semibold text-white lg:text-display-sm'>
              Want to Be a Builder?
            </h2>

            <p className='text-center font-sans text-body-sm text-text-muted-brand lg:font-heading lg:text-h5'>
              Join the Boundless ecosystem. Create a profile, showcase your
              work, and discover opportunities to build, earn, and grow.
            </p>
          </div>

          <MarketingButton asChild>
            <Link href='/opportunities'>
              Get Started
              <ArrowRight />
            </Link>
          </MarketingButton>
        </div>
      </div>
    </Section>
  );
}
