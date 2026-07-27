import { AboutHero } from '@/components/about/about-hero';
import { WhatYoullFind } from '@/components/about/what-youll-find';
import { WhyWeBuiltThis } from '@/components/about/why-we-built-this';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CtaBand } from '@/components/marketing/cta-band';

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <AboutHero />
      <WhyWeBuiltThis />
      <WhatYoullFind />
      <CtaBand
        heading='Want to be a builder?'
        description='Create your profile, join a team, and start shipping on Boundless. Your work belongs in the showcase.'
        action={{
          label: 'Get started on Boundless',
          href:
            process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL ??
            'https://boundlessfi.xyz',
          external: true,
        }}
      />
      <SiteFooter />
    </>
  );
}
