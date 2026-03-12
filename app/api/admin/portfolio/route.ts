import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Admin portfolio GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, category, description, technologies, imageUrl, liveUrl, githubUrl, featured, order } = body;

    const item = await prisma.portfolioItem.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        category: category || 'General',
        description: description || '',
        technologies: technologies || [],
        imageUrl: imageUrl || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        order: order || 0,
      },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Admin portfolio POST error:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 400 });
  }
}
