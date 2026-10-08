export type ServiceSlug = 'custom-software' | 'automation' | 'web' | 'ecommerce';

export type Service = {
  slug: ServiceSlug;
  number: string;
  name: string;
  short: string;
  description: string;
  headline: string;
  intro: string;
  introduction: string;
  cta: string;
  preview: 'inbox' | 'workflow' | 'platform' | 'website' | 'commerce';
  outcomes: string[];
  benefits: { title: string; description: string }[];
  band: { eyebrow: string; title: string; text: string; preview: 'inbox' | 'workflow' | 'platform' | 'website' | 'commerce' };
  deliverables: string[];
  capabilities: { title: string; description: string }[];
  questions: { q: string; a: string }[];
  closing: string;
};

export const services: Service[] = [
  {
    slug: 'custom-software',
    number: '01',
    name: 'Custom software & platforms',
    short: 'Your process. Your platform. Your brand.',
    description: 'Custom software, automated operations and white-label platforms shaped around your business, for your team, customers or partners.',
    headline: 'Your process. Your platform. Your brand.',
    intro: 'Start with the problem. Build what makes work better.',
    introduction: 'From internal operations to customer portals, we design software around the work your business needs to do. We identify repeated steps, map the process and build the right platform, with white-label options under your own brand.',
    cta: 'Discuss your platform',
    preview: 'platform',
    outcomes: ['Build around the way your business operates', 'Automate repetitive steps around your own business rules', 'Offer a branded experience for your team or customers'],
    benefits: [
      { title: 'One shared workspace', description: 'Bring customer information, requests and documents together so your team has the context it needs.' },
      { title: 'Less repetitive work', description: 'Move information, create tasks and trigger next steps automatically, with approval where it matters.' },
      { title: 'An experience under your brand', description: 'White-label options bring your name and visual identity into the agreed platform experience.' },
    ],
    band: {
      eyebrow: 'AUTOMATION BUILT AROUND YOU',
      title: 'Your process, from start to finish.',
      text: 'Connect requests, approvals, documents and reporting in a system designed for your team. Automate the agreed routine steps and keep exceptions visible to the people responsible.',
      preview: 'workflow',
    },
    deliverables: ['Business & workflow discovery', 'Platform design & development', 'Custom workflows & integrations', 'Testing, handover & support planning'],
    capabilities: [
      { title: 'Customer & operations platforms', description: 'Manage customers, jobs, bookings, orders or service requests in a workspace shaped around your business.' },
      { title: 'White-label platforms', description: 'Offer a platform under your own brand, with the agreed interface, workflows and customer or team experience tailored to your business.' },
      { title: 'Approvals & automated workflows', description: 'Turn your business rules into clear steps, from assigning work and preparing documents to reminders and approvals.' },
      { title: 'Portals, reports & permissions', description: 'Give customers and team members the views they need, with role-based access and practical reporting.' },
    ],
    questions: [
      { q: 'How do you decide what to automate?', a: 'We start with your team and the work itself. We map the current process, identify repeated steps and delays, then agree on the most useful first workflow. That discovery shapes the platform and its priorities.' },
      { q: 'Can the platform connect to our existing tools?', a: 'Yes, where the tools provide suitable integrations or APIs. We review what you already use, the data involved and access requirements before deciding what to connect or replace.' },
      { q: 'Can the platform be available under our own brand?', a: 'Yes. We can build a white-label platform using your brand name and visual identity, with workflows shaped around your business. We agree on the branding, functionality, hosting and support arrangements in the project scope.' },
      { q: 'Can we start with a smaller first version?', a: 'Yes. We can begin with a focused workflow, test it with your team and expand the platform in useful stages. The scope, access requirements and success criteria are agreed before development.' },
      { q: 'Who looks after the platform after launch?', a: 'We agree on hosting, handover, maintenance and support as part of the project. Your team receives an introduction to the system, and ongoing improvements can be planned around how it is used.' },
    ],
    closing: 'What would make your team’s day easier?',
  },
  {
    slug: 'automation',
    number: '02',
    name: 'Automation',
    short: 'Less chasing. Less copying. More progress.',
    description: 'Automate repeated tasks, approvals, reporting and customer replies around your business rules, using suitable existing tools or a tailored system.',
    headline: 'Make everyday processes work better.',
    intro: 'Find the friction. Connect the work.',
    introduction: 'We look at the steps your team repeats every day: copying information, answering the same questions, chasing updates and moving work between tools. Then we build a workflow that handles those steps around your business rules.',
    cta: 'Explore your automation',
    preview: 'inbox',
    outcomes: ['Reduce repeated data entry and manual handoffs', 'Keep information moving between suitable tools', 'Make follow-ups, approvals and reporting more consistent'],
    benefits: [
      { title: 'Fewer manual handoffs', description: 'Let information move between your tools without your team entering the same details again.' },
      { title: 'A useful next step', description: 'Turn an inquiry, order or update into the task, notification or follow-up that comes next.' },
      { title: 'Your team in control', description: 'Include review, escalation and a clear record of activity in the places your process needs them.' },
    ],
    band: {
      eyebrow: 'FROM REPETITION TO A WORKFLOW',
      title: 'The right next step, handled.',
      text: 'An order, request or update can trigger the next task, document, approval or notification. We map the complete process, automate the useful steps and leave a clear path for your team to handle exceptions.',
      preview: 'workflow',
    },
    deliverables: ['Workflow discovery & mapping', 'System & messaging integrations', 'Custom automation development', 'Documentation & support planning'],
    capabilities: [
      { title: 'Messaging & customer replies', description: 'Connect WhatsApp Business, Instagram, Facebook Messenger and eligible TikTok business accounts to tailored replies, lead capture and team handoffs.' },
      { title: 'Lead handling & follow-ups', description: 'Capture customer details, organise inquiries, assign a team member and prompt the next step at the right point in your process.' },
      { title: 'Everyday business processes', description: 'Connect bookings, orders, documents and approvals. Build the rules around how your team actually works.' },
      { title: 'Connected data & reporting', description: 'Keep suitable systems in sync, prepare recurring reports and surface exceptions that need your team’s attention.' },
    ],
    questions: [
      { q: 'What kinds of work can you automate?', a: 'Typical starting points include inquiry handling, repeated messages, copying data between systems, assigning tasks, document preparation, reminders and recurring reports. We assess your process and tools to work out what is useful and feasible.' },
      { q: 'Which messaging platforms can you connect?', a: 'WhatsApp Business, Instagram, Facebook Messenger and eligible TikTok business accounts can be considered. Available channels and features depend on your accounts, region and each platform’s approved access. We confirm the right setup during discovery.' },
      { q: 'Will every customer reply be automated?', a: 'Only the parts you choose. We agree on the information an automated reply can use, when a person should review it and when a conversation should go straight to your team. Sensitive or unusual requests can be escalated.' },
      { q: 'Do we need to replace our existing software?', a: 'Often we can connect what you already use. If the tools cannot support the workflow, we can recommend a focused custom workspace or platform alongside them.' },
      { q: 'What happens when a workflow needs attention?', a: 'We design for the exceptions as well as the routine path. Depending on the project, this can include activity history, error notifications, retry handling and a queue for a person to review.' },
    ],
    closing: 'What does your team keep doing by hand?',
  },
  {
    slug: 'web',
    number: '03',
    name: 'Web development',
    short: 'A clear story. A confident next step.',
    description: 'Websites that reflect your brand, explain your offer and make the next step clear. Build a standalone site or connect it to your business tools.',
    headline: 'A website that works beautifully for your business.',
    intro: 'Make every visit feel clear and considered.',
    introduction: 'Your website should explain what you do, help the right people find their way and make it easy to take the next step. We bring strategy, content, design and development together for a new website or a considered redesign.',
    cta: 'Discuss your website',
    preview: 'website',
    outcomes: ['Explain your offer with clear content and structure', 'Give visitors a considered experience on every screen', 'Make contact, bookings or other next steps easy to find'],
    benefits: [
      { title: 'A clearer first impression', description: 'A purposeful page structure and a visual identity that give people a reason to keep exploring.' },
      { title: 'A considered experience', description: 'Thoughtful navigation, readable content and responsive layouts that work across screen sizes.' },
      { title: 'A clear next step', description: 'Help visitors find the information, contact option or booking journey that fits their needs.' },
    ],
    band: {
      eyebrow: 'A WEBSITE THAT FITS YOUR BUSINESS',
      title: 'A strong foundation, with room to grow.',
      text: 'Start with the website your business needs today. Where useful, we can connect forms, bookings or inquiries to your existing tools or a custom platform, with integrations scoped around your goals.',
      preview: 'workflow',
    },
    deliverables: ['Content & website strategy', 'Interface & visual design', 'Responsive development', 'Search foundations & launch planning'],
    capabilities: [
      { title: 'Strategy & content structure', description: 'Clarify your audience, message and page journey so visitors understand the business and know what to do next.' },
      { title: 'Design for every screen', description: 'Create a consistent visual system, with thoughtful typography, accessible interactions and layouts that adapt.' },
      { title: 'Development & search foundations', description: 'Build the site with performance, semantic structure, metadata and an editing approach suited to your content.' },
      { title: 'Forms & optional integrations', description: 'Plan useful contact and inquiry paths, with bookings, customer records or other connections included where they fit the project.' },
    ],
    questions: [
      { q: 'Can we commission a standalone website?', a: 'Yes. Website strategy, design and development are a complete service. We can build the site on its own and include integrations if they support your goals.' },
      { q: 'Can you redesign an existing website?', a: 'Yes. We review the current content, visitor journeys and technical setup, then agree on what to preserve and improve. Important URLs and content can be included in a migration plan.' },
      { q: 'Can our team update the website?', a: 'We can include an editing workflow for the content your team needs to maintain, whether that is project stories, products, service details or articles. The approach is agreed during discovery.' },
      { q: 'Can the website connect to our operations?', a: 'Yes. Forms, bookings and inquiries can connect to suitable existing tools or a custom platform. We define where information should go and what should happen next.' },
      { q: 'Do you include search and accessibility work?', a: 'We include sound technical foundations such as semantic content, metadata, responsive layouts, keyboard navigation and performance considerations. Further content strategy, accessibility audits or ongoing search work can be scoped around your goals.' },
    ],
    closing: 'Let’s give your business a better first impression.',
  },
  {
    slug: 'ecommerce',
    number: '04',
    name: 'E-commerce',
    short: 'Thoughtful shopping. Practical to run.',
    description: 'Online stores built around your products, brand and customers, from product discovery to checkout, with operational integrations where useful.',
    headline: 'A better experience, from browsing to delivery.',
    intro: 'Beautiful to shop. Practical to run.',
    introduction: 'We plan, design and build online stores that make products easy to discover and the path to purchase clear. Start with a standalone store, or connect orders and customer information to the systems your business uses.',
    cta: 'Discuss your store',
    preview: 'commerce',
    outcomes: ['Help customers find the right product', 'Make the path to purchase clear and consistent', 'Give your team a practical way to manage the store'],
    benefits: [
      { title: 'Clear product discovery', description: 'Give products the detail and organisation they need, with useful collections and considered product pages.' },
      { title: 'A smoother purchase', description: 'Create a coherent experience across product selection, cart and the supported checkout flow.' },
      { title: 'Practical store management', description: 'Choose an approach to products, orders and customer information that makes sense for your team.' },
    ],
    band: {
      eyebrow: 'BEHIND EVERY ORDER',
      title: 'Keep the business moving after checkout.',
      text: 'When your store needs closer connections, we can link suitable order, inventory, delivery and customer tools. Define the workflow around your process and give your team a clear view of the exceptions.',
      preview: 'platform',
    },
    deliverables: ['Store & catalogue planning', 'Storefront design & development', 'Product & checkout experience', 'Store setup & launch planning'],
    capabilities: [
      { title: 'Store strategy & product structure', description: 'Plan the catalogue, collections and shopping journey around your products, audience and operational needs.' },
      { title: 'A considered storefront', description: 'Build product and collection pages that feel like your brand and make information easy to find on every screen.' },
      { title: 'Cart, checkout & customer journeys', description: 'Configure the supported purchase flow and customer communications around your chosen platform and market.' },
      { title: 'Orders, inventory & automation', description: 'Connect suitable tools for order handling, inventory updates, customer records and follow-ups around your process.' },
    ],
    questions: [
      { q: 'Can we start with just an online store?', a: 'Yes. E-commerce is a complete service, from store planning and design to development and launch. Connections to other systems can be included in the agreed scope or considered later.' },
      { q: 'Which e-commerce platforms do you use?', a: 'Shopify is one option. We choose an approach around your catalogue, market, payment requirements and operations rather than assuming one platform is right for every business.' },
      { q: 'Can you improve an existing store?', a: 'Yes. We can review product discovery, the purchase journey, performance and the way your team manages orders, then prioritise the changes that address the real problems.' },
      { q: 'Can you automate work after an order is placed?', a: 'Where supported by your systems, we can connect orders to customer records, team tasks, inventory tools, notifications and follow-ups. The exact workflow depends on your business rules and integrations.' },
      { q: 'Can you connect payments and delivery tools?', a: 'We assess the payment and shipping options supported by your platform, business location and target markets, then configure the agreed integrations within that scope.' },
    ],
    closing: 'Let’s build a store that works for everyone.',
  },
];
