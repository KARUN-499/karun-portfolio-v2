import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation, sendAdminBookingAlert } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as any
        const bookingId = pi.metadata?.bookingId

        if (bookingId) {
          await prisma.payment.update({
            where: { bookingId },
            data: { status: 'SUCCEEDED', depositPaid: true },
          })

          await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'CONFIRMED' },
          })

          const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { service: true },
          })

          if (booking) {
            await sendBookingConfirmation({
              clientName: booking.clientName,
              clientEmail: booking.clientEmail,
              serviceName: booking.service.name,
              bookingId: booking.id,
              amount: pi.amount / 100,
            })
            await sendAdminBookingAlert({
              clientName: booking.clientName,
              clientEmail: booking.clientEmail,
              serviceName: booking.service.name,
              bookingId: booking.id,
              amount: pi.amount / 100,
            })
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as any
        const bookingId = pi.metadata?.bookingId
        if (bookingId) {
          await prisma.payment.update({
            where: { bookingId },
            data: { status: 'FAILED' },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
