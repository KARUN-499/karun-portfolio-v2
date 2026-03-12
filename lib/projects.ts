export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  tech: string[];
  year: string;
  status: string;
  duration: string;
  client: string;
  deliverables: string[];
  results: string[];
};

export const categoryColors: Record<string, string> = {
  'Web Development': '#C9A84C',
  'Brand Design': '#8B5CF6',
  'UI/UX Design': '#06B6D4',
  'Digital Marketing': '#10B981',
  'App Design': '#F59E0B',
  'Full Stack': '#EF4444',
};

export const categories = ['All', 'Web Development', 'Brand Design', 'UI/UX Design', 'Digital Marketing', 'App Design', 'Full Stack'];

export const allProjects: Project[] = [
  {
    id: '01',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.',
    fullDescription: 'A complete e-commerce solution built for a retail client needing to scale online. The platform includes a custom storefront, admin dashboard, inventory management, real-time order tracking, and Stripe payment integration. Optimized for speed with 98/100 Lighthouse score.',
    tech: ['Next.js', 'Stripe', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    year: '2025',
    status: 'Completed',
    duration: '6 weeks',
    client: 'Retail Client',
    deliverables: ['Custom storefront', 'Admin dashboard', 'Payment integration', 'Inventory system', 'Order tracking'],
    results: ['3x increase in online sales', '98/100 Lighthouse score', '40% faster checkout flow'],
  },
  {
    id: '02',
    slug: 'brand-identity-system',
    title: 'Brand Identity System',
    category: 'Brand Design',
    description: 'Complete brand identity including logo, typography, color palette, and comprehensive brand guidelines.',
    fullDescription: 'End-to-end brand identity design for a growing fintech startup. The project involved deep research into the target audience, competitor analysis, and multiple concept rounds before landing on a final identity that communicates trust, innovation, and clarity.',
    tech: ['Figma', 'Illustrator', 'Brand Strategy'],
    year: '2025',
    status: 'Completed',
    duration: '3 weeks',
    client: 'Fintech Startup',
    deliverables: ['Logo suite', 'Color palette', 'Typography system', 'Brand guidelines PDF', 'Social media kit'],
    results: ['Brand recognition increased 60%', 'Consistent identity across all channels', 'Featured in design blogs'],
  },
  {
    id: '03',
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Complex data visualization dashboard with real-time updates, custom charts, and role-based access.',
    fullDescription: 'A complex SaaS analytics dashboard designed for a B2B software company. The challenge was presenting large datasets in an intuitive way without overwhelming users. The solution included progressive disclosure, smart defaults, and a clean visual hierarchy that reduces cognitive load.',
    tech: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    year: '2024',
    status: 'Completed',
    duration: '8 weeks',
    client: 'B2B SaaS Company',
    deliverables: ['UX research', 'Wireframes', 'High-fidelity designs', 'Design system', 'Developer handoff'],
    results: ['User onboarding time reduced 45%', 'Support tickets down 30%', '4.8/5 user satisfaction'],
  },
  {
    id: '04',
    slug: 'marketing-campaign',
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
    description: 'Multi-channel digital marketing campaign with Meta Ads, Google Ads, and performance analytics.',
    fullDescription: 'A full-funnel digital marketing campaign for a D2C brand launching a new product line. The campaign spanned Meta Ads, Google Ads, and email marketing with custom audience segmentation, A/B tested creatives, and real-time optimization based on ROAS targets.',
    tech: ['Meta Ads', 'Google Ads', 'Google Analytics', 'Klaviyo', 'Canva'],
    year: '2024',
    status: 'Completed',
    duration: '4 weeks',
    client: 'D2C Brand',
    deliverables: ['Campaign strategy', 'Ad creatives', 'Audience targeting', 'Weekly reports', 'Optimization logs'],
    results: ['4.2x ROAS achieved', '₹8L revenue generated', 'CPA reduced by 35%'],
  },
  {
    id: '05',
    slug: 'mobile-app-design',
    title: 'Mobile App Design',
    category: 'App Design',
    description: 'End-to-end mobile app UI/UX with user research, wireframes, prototypes, and developer handoff.',
    fullDescription: 'Complete mobile app design for a health & wellness startup. Starting from zero, the project included user interviews, persona development, user journey mapping, low-fi wireframes, high-fidelity Figma designs, and a fully interactive prototype for investor presentations.',
    tech: ['Figma', 'Prototyping', 'User Research', 'React Native'],
    year: '2025',
    status: 'Completed',
    duration: '5 weeks',
    client: 'Health Startup',
    deliverables: ['User research report', 'Wireframes', 'UI kit', 'Interactive prototype', 'Handoff documentation'],
    results: ['App rated 4.7 on Play Store', '10K downloads in first month', 'Secured ₹50L seed funding'],
  },
  {
    id: '06',
    slug: 'corporate-website',
    title: 'Corporate Website',
    category: 'Web Development',
    description: 'Professional corporate website with CMS integration, SEO optimization, and multi-language support.',
    fullDescription: 'A modern corporate website for a consulting firm with offices in 3 cities. Built with Next.js for maximum performance, integrated with a headless CMS for easy content management, and fully optimized for SEO with structured data, sitemaps, and page speed optimization.',
    tech: ['Next.js', 'Sanity CMS', 'SEO', 'TypeScript', 'Vercel'],
    year: '2024',
    status: 'Completed',
    duration: '4 weeks',
    client: 'Consulting Firm',
    deliverables: ['Website design', 'CMS setup', 'SEO optimization', 'Performance tuning', 'Training session'],
    results: ['Page 1 ranking for 12 keywords', '65% increase in organic traffic', '99/100 PageSpeed score'],
  },
  {
    id: '07',
    slug: 'social-media-strategy',
    title: 'Social Media Strategy',
    category: 'Digital Marketing',
    description: 'Comprehensive social media strategy with content calendars, growth tactics, and monthly reporting.',
    fullDescription: 'A 3-month social media management and strategy project for a real estate brand. Developed a content strategy, managed posting schedules, created graphics and captions, ran engagement campaigns, and delivered monthly performance reports with actionable insights.',
    tech: ['Instagram', 'LinkedIn', 'Canva', 'Buffer', 'Analytics'],
    year: '2025',
    status: 'Completed',
    duration: '3 months',
    client: 'Real Estate Brand',
    deliverables: ['Content strategy', 'Monthly calendar', 'Post graphics', 'Captions & hashtags', 'Monthly reports'],
    results: ['Followers grew from 2K to 18K', 'Engagement rate 8.4%', '15 qualified leads per month'],
  },
  {
    id: '08',
    slug: 'product-landing-page',
    title: 'Product Landing Page',
    category: 'Web Development',
    description: 'High-converting product landing page with A/B testing, animations, and performance optimization.',
    fullDescription: 'A conversion-focused landing page for a SaaS product launch. The page was designed with persuasion principles, smooth scroll animations, social proof sections, and integrated with an A/B testing tool to continuously optimize the headline, CTA, and pricing section.',
    tech: ['Next.js', 'Framer Motion', 'Vercel', 'Google Optimize'],
    year: '2025',
    status: 'Completed',
    duration: '2 weeks',
    client: 'SaaS Startup',
    deliverables: ['Landing page design', 'Development', 'A/B test setup', 'Analytics integration', 'Performance audit'],
    results: ['12% conversion rate (industry avg 3%)', '500+ sign-ups in week 1', 'Bounce rate reduced to 28%'],
  },
  {
    id: '09',
    slug: 'logo-visual-identity',
    title: 'Logo & Visual Identity',
    category: 'Brand Design',
    description: 'Modern logo design with full visual identity system for a tech startup.',
    fullDescription: 'Logo and visual identity project for a newly founded edtech startup. The brand needed to feel modern, approachable, and trustworthy. Multiple logo concepts were explored before finalizing a clean wordmark with a distinctive icon that works across digital and print.',
    tech: ['Illustrator', 'Figma', 'Brand Guidelines'],
    year: '2024',
    status: 'Completed',
    duration: '2 weeks',
    client: 'Edtech Startup',
    deliverables: ['Logo files (SVG, PNG, PDF)', 'Color palette', 'Typography', 'Usage guidelines', 'Favicon & app icon'],
    results: ['Brand launched successfully', 'Recognized at regional startup event', '500+ social media mentions'],
  },
  {
    id: '10',
    slug: 'project-management-system',
    title: 'Project Management System',
    category: 'Full Stack',
    description: 'Custom project management tool with task tracking, team collaboration, and timeline visualization.',
    fullDescription: 'A custom-built internal project management tool for a mid-size agency that outgrew tools like Trello and Asana. Features include Kanban boards, Gantt chart timelines, team chat, file sharing, time tracking, and automated weekly status email reports.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'AWS S3'],
    year: '2025',
    status: 'Completed',
    duration: '10 weeks',
    client: 'Digital Agency',
    deliverables: ['Kanban boards', 'Gantt timelines', 'Team chat', 'File sharing', 'Time tracking', 'Email reports'],
    results: ['Team productivity up 40%', 'Project delivery time reduced 25%', 'Replaced 3 paid tools'],
  },
  {
    id: '11',
    slug: 'restaurant-app',
    title: 'Restaurant App',
    category: 'App Design',
    description: 'Food ordering app with menu management, table reservations, and delivery tracking.',
    fullDescription: 'UI/UX design for a restaurant chain app covering dine-in, takeaway, and delivery. The design prioritizes quick ordering with a clean menu layout, smart upselling prompts, real-time delivery tracking, and a loyalty rewards section that encourages repeat orders.',
    tech: ['Figma', 'React Native', 'Prototyping', 'User Testing'],
    year: '2024',
    status: 'Completed',
    duration: '4 weeks',
    client: 'Restaurant Chain',
    deliverables: ['User flows', 'UI design', 'Interactive prototype', 'Icon set', 'Developer specs'],
    results: ['Average order value up 22%', '4.6 App Store rating', '30% repeat order rate'],
  },
  {
    id: '12',
    slug: 'seo-content-strategy',
    title: 'SEO & Content Strategy',
    category: 'Digital Marketing',
    description: 'Technical SEO audit, keyword strategy, and content marketing plan that tripled organic traffic.',
    fullDescription: 'A comprehensive SEO and content marketing engagement for a B2B services company. Starting with a full technical audit, followed by competitive keyword research, on-page optimization, content calendar, and 3 months of blog content production targeting high-intent keywords.',
    tech: ['SEMrush', 'Ahrefs', 'Google Search Console', 'WordPress', 'Analytics'],
    year: '2025',
    status: 'Completed',
    duration: '3 months',
    client: 'B2B Services Company',
    deliverables: ['Technical SEO audit', 'Keyword strategy', '12 blog articles', 'On-page optimization', 'Monthly reports'],
    results: ['Organic traffic tripled in 90 days', '18 keywords on page 1', 'Domain authority increased from 12 to 28'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return allProjects;
  return allProjects.filter(p => p.category === category);
}
