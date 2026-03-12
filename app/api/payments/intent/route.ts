import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { bookingId, amount } = body

    if (!bookingId || !amount) {
      return NextResponse.json({ error: 'bookingId and amount are required' }, { status: 400 })
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const paymentIntent = await createPaymentIntent(amount, {
      bookingId,
      clientEmail: booking.clientEmail,
      serviceName: booking.service.name,
    })

    // Create payment record
    await prisma.payment.upsert({
      where: { bookingId },
      update: { stripePaymentIntentId: paymentIntent.id, amount, status: 'PROCESSING' },
      create: {
        bookingId,
        stripePaymentIntentId: paymentIntent.id,
        amount,
        depositAmount: amount * 0.5,
        status: 'PROCESSING',
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
