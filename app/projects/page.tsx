import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import CtaBand from '@/components/CtaBand';
import ProjectsGallery from '@/components/ProjectsGallery';

export const metadata: Metadata = {
  title: 'Solar Installation Projects in East Kent',
  description: 'Recent solar panel, battery and EV charger installations by Voltek Solar in Margate, Ramsgate, Broadstairs, Canterbury, Whitstable, Deal, Dover and across East Kent.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-sunset" aria-labelledby="h1">
        <div className="container split-head" style={{ paddingTop: 'clamp(130px,14vw,170px)', paddingBottom: 'clamp(40px,5vw,64px)', marginBottom: 0 }}>
          <div className="stack" data-reveal="">
            <nav aria-label="Breadcrumb" className="crumbs crumbs--light">
              <Link href="/">Home</Link> / <span aria-current="page">Projects</span>
            </nav>
            <h1 id="h1" className="h1">
              Our <span className="grad-deep">projects</span>
            </h1>
          </div>
          <p className="lead" data-reveal="" data-reveal-delay="120">
            Real installations by our own team across East Kent. Filter by service or town to find homes like yours.
          </p>
        </div>
      </section>
      <Suspense fallback={null}>
        <ProjectsGallery />
      </Suspense>
      <CtaBand title={<>Your roof could be <span className="grad">next</span></>} showCall={false} />
    </>
  );
}
