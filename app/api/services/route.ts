import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    })
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Services GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const service = await prisma.service.create({ data: body })
    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    console.error('Service create error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
