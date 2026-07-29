import type { Metadata } from 'next';

import { ProjectsView } from '@/components/discover/projects-view';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore the products being built across the Boundless ecosystem.',
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <ProjectsView />
      <SiteFooter />
    </>
  );
}
