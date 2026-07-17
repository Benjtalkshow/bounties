import { Download } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { MarketingButton } from './marketing-button';
import { Reveal } from './reveal';
import { Section } from './section';

/** Brand kit call to action: logo + heading on the left, download button right. */
export function BrandKitCta({ className }: { className?: string }) {
  return (
    <Section className={cn('bg-ink', className)}>
      <Reveal className='flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-5'>
        <div className='flex items-center gap-5'>
          <div className='hidden size-20 shrink-0 items-center justify-center rounded-2xl border border-neutral-700 bg-white/5 lg:flex'>
            <Image
              src='/brand/boundless-mark.svg'
              alt=''
              width={85}
              height={78}
              unoptimized
              className='w-10'
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='font-sans text-body-xs font-semibold text-primary lg:text-body'>
              Brand Kit
            </p>
            <h2 className='font-heading text-h2 font-semibold text-white lg:text-display-sm lg:whitespace-nowrap'>
              Get the latest <br className='lg:hidden' />
              Boundless Brand kit
            </h2>
          </div>
        </div>

        <MarketingButton asChild>
          <a href='/download.zip' download>
            Download All
            <Download />
          </a>
        </MarketingButton>
      </Reveal>
    </Section>
  );
}
