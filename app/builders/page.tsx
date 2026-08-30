import type { Metadata } from 'next';

import { BuildersView } from '@/components/discover/builders-view';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Builders',
  description:
    'Discover the builders shipping across the Boundless ecosystem.',
};

export default function BuildersPage() {
  return (
    <>
      <SiteHeader />
      <BuildersView />
      <SiteFooter />
    </>
  );
}
