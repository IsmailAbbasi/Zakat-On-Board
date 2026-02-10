import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizeInput } from '@/lib/utils/validators';

// GET /api/posts - Get all posts or filter by location/status
export async function GET(request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const status = searchParams.get('status');

  let query = supabase
    .from('charity_posts')
    .select('*, users_profile(full_name, email)')
    .order('created_at', { ascending: false });

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data });
}

// POST /api/posts - Create new charity post
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const postData = {
      person_name: sanitizeInput(body.person_name),
      reason: sanitizeInput(body.reason),
      required_amount: body.required_amount,
      phone: body.phone || null,
      email: body.email || null,
      upi_id: body.upi_id || null,
      bank_details: body.bank_details || null,
      location: body.location ? sanitizeInput(body.location) : null,
      current_amount: 0,
      status: 'pending',
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from('charity_posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
