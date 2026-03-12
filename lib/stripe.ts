import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}

export async function createPaymentIntent(amount: number, metadata?: Record<string, string>) {
  return stripe.paymentIntents.create({
    amount: formatAmountForStripe(amount),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata,
  })
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId)
}
