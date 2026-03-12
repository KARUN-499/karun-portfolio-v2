import { DefaultSession } from 'next-auth'

// Extend NextAuth session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'ADMIN' | 'CLIENT'
    } & DefaultSession['user']
  }
}

// Shared types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED'
export type UserRole = 'ADMIN' | 'CLIENT'

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  price: number
  duration: string
  features: string[]
  featured: boolean
  active: boolean
}

export interface Booking {
  id: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  serviceId: string
  projectDesc: string
  budget?: number
  timeline?: string
  status: BookingStatus
  notes?: string
  createdAt: string
  updatedAt: string
  service?: Service
  payment?: Payment
}

export interface Payment {
  id: string
  bookingId: string
  stripePaymentIntentId?: string
  amount: number
  currency: string
  status: PaymentStatus
  depositPaid: boolean
  depositAmount?: number
  createdAt: string
}

export interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  imageUrl?: string
  featured: boolean
}

export interface AdminStats {
  totalRevenue: number
  activeProjects: number
  pendingBookings: number
  avgProjectValue: number
  recentBookings: Booking[]
}
