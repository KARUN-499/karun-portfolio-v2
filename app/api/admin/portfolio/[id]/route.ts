import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, category, description, tags, imageUrl, liveUrl, githubUrl, featured, order } = body

    const item = await prisma.portfolioItem.update({
      where: { id },
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        category: category || 'General',
        description: description || '',
        tags: tags || [],
        imageUrl: imageUrl || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        order: order || 0,
      },
    })
    return NextResponse.json({ item })
  } catch (error) {
    console.error('Admin portfolio PUT error:', error)
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 400 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.portfolioItem.delete({ where: { id } })
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Admin portfolio DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 400 })
  }
}
