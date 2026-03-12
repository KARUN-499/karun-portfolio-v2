import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { service: true },
    });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Admin bookings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
