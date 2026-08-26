import type { Metadata } from 'next';
import { Suspense } from 'react';

import { BuildersView } from '@/components/builders/builders-view';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Builders',
  description: 'Discover people building across the Boundless ecosystem.',
};

export default function BuildersPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <BuildersView />
      </Suspense>
      <SiteFooter />
    </>
  );
}
