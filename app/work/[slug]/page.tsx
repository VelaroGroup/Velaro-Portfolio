import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { Cta } from '@/components/cta';
import { ProjectVisual } from '@/components/project-grid';
import { PlatformPreview } from '@/components/platform-preview';
import { getProjects, projectCategoryLabel } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

export const revalidate = 300;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);
  return project ? pageMetadata({ title: project.title, description: project.summary, path: `/work/${slug}` }, parent) : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const isConcept = project.kind === 'concept';
  const serviceProjects = projects.filter((item) => item.service === project.service);
  const nextInService = serviceProjects[(serviceProjects.findIndex((item) => item.slug === slug) + 1) % serviceProjects.length];
  const related = nextInService?.slug !== slug ? nextInService : projects.find((item) => item.slug !== slug);

  return <main id="main" className="secondary-page">
    <section className="page-hero case-hero"><div className="shell">
      <Link href="/work" className="back-link"><span aria-hidden="true">←</span> All work & possibilities</Link>
      <div className="eyebrow">{isConcept ? 'ILLUSTRATIVE CONCEPT' : 'PROJECT'} <span aria-hidden="true">/</span> {projectCategoryLabel(project.service)}</div>
      <h1>{project.title}</h1>
      <p className="intro-text">{project.summary}</p>
      <div className="case-facts"><span>{project.service}</span>{isConcept ? <span>Design & workflow exploration</span> : <>{project.client && <span>{project.client}</span>}{project.year && <span>{project.year}</span>}</>}</div>
    </div></section>
    <section className="case-showcase-section"><div className="shell"><div className="case-showcase"><ProjectVisual project={project} /></div>{isConcept && <p className="case-image-caption">Illustrative interface with sample information. This concept is not a delivered client project.</p>}</div></section>
    <section className="section"><div className="shell case-story">
      <div className="case-story-label"><span className="eyebrow">THE BIG PICTURE</span><h2>Start with what<br />needs to change.</h2></div>
      <div className="case-story-sections"><article><span className="eyebrow">01 / THE CHALLENGE</span><h3>Where work gets harder than it should.</h3><p>{project.challenge}</p></article><article><span className="eyebrow">02 / THE APPROACH</span><h3>A system around the real process.</h3><p>{project.approach}</p></article>{project.outcome && <article><span className="eyebrow">03 / {isConcept ? 'THE INTENDED BENEFIT' : 'THE OUTCOME'}</span><h3>{isConcept ? 'A clearer way forward.' : 'What changed.'}</h3><p>{project.outcome}</p></article>}</div>
    </div></section>
    {isConcept && <section className="section dark-section"><div className="shell case-connected">
      <div><span className="eyebrow">BEHIND THE EXPERIENCE</span><h2>The next step<br />is already connected.</h2><p>A useful interface is only part of the picture. The workflow behind it keeps information, people, and actions moving together.</p><ul className="case-checks"><li><Check aria-hidden="true" /> Clear ownership at each step</li><li><Check aria-hidden="true" /> Connected records and useful context</li><li><Check aria-hidden="true" /> A person available when needed</li></ul></div>
      <div className="case-connected-preview">{project.workflowSteps ? <div className="case-workflow"><span className="eyebrow">EXAMPLE WORKFLOW</span><ol>{project.workflowSteps.map((step, index) => <li key={step.title}><span className="case-workflow-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><p className="case-workflow-note">Adapted to your team, systems, and business rules.</p></div> : <PlatformPreview variant="workflow" compact />}</div>
    </div></section>}
    {related && <section className="section"><div className="shell case-related"><div><span className="eyebrow">KEEP EXPLORING</span><h2>Another possibility.</h2></div><Link href={`/work/${related.slug}`}><span>{related.kind === 'concept' ? 'Illustrative concept' : 'Project'} / {projectCategoryLabel(related.service)}</span><h3>{related.title}<ArrowUpRight aria-hidden="true" /></h3><p>{related.summary}</p></Link></div></section>}
    <Cta title="Let’s solve your next business challenge." text="We’ll look at how work happens today and shape a solution around what needs to improve." />
  </main>;
}
