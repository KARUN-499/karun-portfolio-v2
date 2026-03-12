import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@karun.dev' },
    update: {},
    create: {
      name: 'Karun',
      email: 'admin@karun.dev',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  // Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'landing-page' },
      update: {},
      create: {
        name: 'Landing Page',
        slug: 'landing-page',
        description: 'High-converting landing page with modern design',
        price: 299,
        duration: '3-5 days',
        features: ['Responsive design', 'SEO optimized', 'Contact form', '1 revision'],
        featured: false,
        active: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'portfolio-website' },
      update: {},
      create: {
        name: 'Portfolio Website',
        slug: 'portfolio-website',
        description: 'Professional portfolio to showcase your work',
        price: 599,
        duration: '1-2 weeks',
        features: ['Custom design', 'CMS integration', 'Blog', 'Contact form', '3 revisions'],
        featured: true,
        active: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'full-stack-app' },
      update: {},
      create: {
        name: 'Full-Stack App',
        slug: 'full-stack-app',
        description: 'Complete web application with database and API',
        price: 1499,
        duration: '3-4 weeks',
        features: ['Next.js frontend', 'PostgreSQL DB', 'Authentication', 'Payment integration', 'Admin dashboard', 'Unlimited revisions'],
        featured: false,
        active: true,
      },
    }),
  ])
  console.log(`${services.length} services created`)

  // Portfolio items
  const portfolioItems = await Promise.all([
    prisma.portfolioItem.upsert({
      where: { slug: 'ecommerce-store' },
      update: {},
      create: {
        title: 'E-Commerce Store',
        slug: 'ecommerce-store',
        description: 'Full-stack e-commerce with Stripe payments',
        category: 'E-Commerce',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        featured: true,
        order: 1,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { slug: 'saas-dashboard' },
      update: {},
      create: {
        title: 'SaaS Dashboard',
        slug: 'saas-dashboard',
        description: 'Analytics dashboard with real-time data',
        category: 'Websites',
        tags: ['React', 'Charts', 'API'],
        featured: true,
        order: 2,
      },
    }),
  ])
  console.log(`${portfolioItems.length} portfolio items created`)

  // Testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Priya Sharma',
        role: 'Founder',
        company: 'TechStart India',
        content: 'Karun delivered an exceptional portfolio website. Professional, fast, and exactly what we needed.',
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        name: 'Rahul Verma',
        role: 'Product Manager',
        company: 'DigitalCo',
        content: 'Outstanding work on our booking system. The attention to detail was impressive.',
        rating: 5,
        featured: true,
        order: 2,
      },
    ],
  })
  console.log('Testimonials created')

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
