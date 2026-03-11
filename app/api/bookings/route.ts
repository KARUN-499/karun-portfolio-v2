import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, description, budget, timeline } = body;

    if (!name || !email || !description) {
      return NextResponse.json({ error: 'Name, email, and description are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        client_name: name,
        client_email: email,
        client_phone: phone || null,
        service_name: service || null,
        project_description: description,
        budget_range: budget || null,
        timeline: timeline || null,
        status: 'pending',
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, booking: data }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
