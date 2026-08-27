import type { Metadata } from 'next';

import { BuildersView } from '@/components/discover/builders-view';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Builders',
  description:
    'Meet the builders making an impact across the Boundless ecosystem.',
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
