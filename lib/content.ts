import { generatedLocalProjects } from './generated-projects';

export const siteUrl = 'https://www.velaro.group';
export const services = [
  { slug: 'automation', number: '01', name: 'Automation', short: 'Give your team time back.', description: 'Connect the tools you already use and turn repetitive work into reliable workflows.', intro: 'Better operations start when information moves without friction.', outcomes: ['Map the handoffs that slow your team down', 'Connect apps, data, and approvals', 'Build dependable workflows with human review where it matters'], deliverables: ['Workflow discovery', 'System integrations', 'Automated reporting', 'Monitoring and iteration'], questions: [{q:'What can Velaro automate?', a:'We look for repeated tasks, disconnected tools, and manual handoffs. The right workflow depends on your systems and how your team works.'},{q:'Will automation replace our existing tools?',a:'Often it can connect the tools you already use. We assess your current setup before recommending a new platform.'}] },
  { slug: 'web', number: '02', name: 'Web development', short: 'Make every visit count.', description: 'Fast, accessible websites that explain your value and help visitors take the next step.', intro: 'A website should be clear to people, useful to your team, and easy to find.', outcomes: ['Clarify your story and page structure', 'Design around real customer journeys', 'Build for speed, accessibility, and search'], deliverables: ['Website strategy', 'UX and visual design', 'Responsive development', 'SEO foundations'], questions: [{q:'Can you redesign an existing website?',a:'Yes. We can review what works, preserve valuable content and URLs, and rebuild the experience around your current goals.'},{q:'Can our team update the website?',a:'We can set up an editing workflow suited to the content your team needs to maintain.'}] },
  { slug: 'ecommerce', number: '03', name: 'E-commerce', short: 'Turn browsing into buying.', description: 'Online stores with thoughtful product discovery, smooth checkout, and room to grow.', intro: 'The best store feels effortless for customers and manageable for your team.', outcomes: ['Make products easier to explore', 'Remove friction from purchase journeys', 'Connect store operations to the rest of your business'], deliverables: ['Store strategy', 'Shopify development', 'Product and checkout UX', 'Store integrations'], questions: [{q:'Do you only work with Shopify?',a:'Shopify is one option. We recommend an approach based on your catalog, operations, and growth plans.'},{q:'Can you improve an existing store?',a:'Yes. We can review the shopping experience, performance, and operational bottlenecks before prioritizing changes.'}] },
  { slug: 'custom-software', number: '04', name: 'Custom software & platforms', short: 'Build what your business needs.', description: 'Purpose-built applications, portals, dashboards, and platforms shaped around your workflow.', intro: 'When off-the-shelf software does not fit, build a tool around the way you work.', outcomes: ['Define the right product and scope', 'Prototype the key user journeys', 'Develop a secure, maintainable platform'], deliverables: ['Product discovery', 'UX and prototyping', 'Application development', 'Integrations and support'], questions: [{q:'What types of platforms can you build?',a:'Examples include internal tools, customer portals, dashboards, and tailored web applications. We start by defining the problem and users.'},{q:'Can you start with a smaller first version?',a:'Yes. A focused first release can validate the most important workflow before expanding.'}] },
] as const;
export type Project = { slug: string; title: string; summary: string; service: string; year?: string; client?: string; featured?: boolean; challenge: string; approach: string; outcome?: string; image?: string; imageAlt?: string };
// Add approved case studies here, or connect Sanity as described in README.md.
export const localProjects: Project[] = generatedLocalProjects as Project[];
export async function getProjects(): Promise<Project[]> {
  const id = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || 'production';
  if (!id) return localProjects;
  const query = encodeURIComponent('*[_type == "project" && defined(slug.current)] | order(featured desc, _createdAt desc){"slug":slug.current,title,summary,service,year,client,featured,challenge,approach,outcome,"image":cover.asset->url,"imageAlt":cover.alt}');
  try {
    const response = await fetch(`https://${id}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${query}`, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = await response.json() as { result?: Project[] };
    return Array.isArray(data.result) ? data.result : localProjects;
  } catch (error) {
    console.error('Project content unavailable', error);
    return localProjects;
  }
}
