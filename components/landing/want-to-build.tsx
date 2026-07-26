import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { CtaBand } from '../marketing/cta-band';

/** Closing call-to-action band: "Want to be a builder?" */
export function WantToBuild() {
  return (
    <CtaBand
      badge={
        <>
          <span>Build. Earn. Belong</span>
          <span aria-hidden className='h-3.5 w-px bg-white/15' />
          <Link
            href='/about'
            className='inline-flex items-center gap-1 transition-colors hover:text-primary'
          >
            Learn More
            <ArrowRight className='size-3.5' />
          </Link>
        </>
      }
      heading='Want to Be a Builder?'
      description='Join the Boundless ecosystem. Create a profile, showcase your work, and discover opportunities to build, earn, and grow.'
      action={{ label: 'Get Started', href: '/opportunities' }}
    />
  );
}
