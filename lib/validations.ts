import { z } from 'zod'

export const BookingSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().optional(),
  serviceId: z.string().min(1, 'Service is required'),
  projectDesc: z.string().min(20, 'Please describe your project (min 20 characters)'),
  budget: z.number().optional(),
  timeline: z.string().optional(),
})

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const ServiceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  duration: z.string().min(1),
  features: z.array(z.string()),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
})

export type BookingInput = z.infer<typeof BookingSchema>
export type ContactInput = z.infer<typeof ContactSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type ServiceInput = z.infer<typeof ServiceSchema>
