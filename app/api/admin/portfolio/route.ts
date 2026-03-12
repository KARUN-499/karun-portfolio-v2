import { NextResponse } from 'next/server'

// In-memory store (resets on deploy - connect Supabase for persistence)
let portfolioItems: any[] = []
let nextId = 1

export async function GET() {
  return NextResponse.json({ items: portfolioItems })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = {
      ...body,
      id: String(nextId++),
      created_at: new Date().toISOString(),
    }
    portfolioItems = [item, ...portfolioItems]
    return NextResponse.json({ item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
