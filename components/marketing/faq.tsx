import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { FaqAccordion } from './faq-accordion';
import { FAQ_ITEMS } from './faq-data';
import { Section } from './section';

// The home section previews the first few questions; the rest live on /faq.
const HOME_FAQS = FAQ_ITEMS.slice(0, 4);

/** Home "Frequently Asked Questions (FAQs)": heading beside a preview accordion. */
export function Faq() {
  return (
    <Section className='bg-ink bg-[linear-gradient(180deg,rgba(13,17,17,0)_50%,rgba(46,237,170,0.08)_100%)]'>
      <div className='flex flex-col gap-10 lg:flex-row lg:gap-16'>
        <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:shrink-0 lg:text-5xl lg:tracking-[-1.92px]'>
          <span className='block whitespace-nowrap'>Frequently Asked</span>
          <span className='block whitespace-nowrap'>
            Questions <span className='text-white/60'>(FAQs)</span>
          </span>
        </h2>

        <div className='flex flex-1 flex-col gap-8'>
          <FaqAccordion items={HOME_FAQS} defaultOpen={[0]} />

          <Link
            href='/faq'
            className='inline-flex items-center gap-2 self-center text-sm font-semibold text-primary transition-colors hover:text-primary-400 lg:self-start'
          >
            See More FAQs
            <ArrowRight className='size-5' />
          </Link>
        </div>
      </div>
    </Section>
  );
}
