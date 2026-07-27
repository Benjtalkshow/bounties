import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { AboutHero } from '@/components/about/about-hero';

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <AboutHero />
      <SiteFooter />
    </>
  );
}
