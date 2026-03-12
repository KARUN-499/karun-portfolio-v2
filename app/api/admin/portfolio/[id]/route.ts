import { NextResponse } from 'next/server'

// Shared in-memory store - import from parent module in production
// For now, items are managed via the parent route's in-memory store
let portfolioItems: any[] = []

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const item = { ...body, id: params.id }
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, id: params.id })
}
