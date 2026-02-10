import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/donations - Get all donations
export async function GET(request) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('donations')
    .select('*, users_profile(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ donations: data });
}

// POST /api/donations - Create donation record
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const donationData = {
      post_id: body.post_id,
      donor_id: user.id,
      amount: body.amount,
      transaction_id: body.transaction_id || null,
      payment_proof_url: body.payment_proof_url || null,
      is_verified: false,
    };

    const { data, error } = await supabase
      .from('donations')
      .insert(donationData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donation: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
