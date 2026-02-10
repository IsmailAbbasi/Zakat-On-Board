import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/proofs - Get all donation proofs
export async function GET(request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('post_id');

  let query = supabase
    .from('donation_proofs')
    .select('*, users_profile(full_name, email)')
    .order('created_at', { ascending: false });

  if (postId) {
    query = query.eq('post_id', postId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ proofs: data });
}

// POST /api/proofs - Create proof of help
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const proofData = {
      post_id: body.post_id,
      submitted_by: user.id,
      proof_image_url: body.proof_image_url,
      description: body.description || null,
      amount_used: body.amount_used || null,
    };

    const { data, error } = await supabase
      .from('donation_proofs')
      .insert(proofData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ proof: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
