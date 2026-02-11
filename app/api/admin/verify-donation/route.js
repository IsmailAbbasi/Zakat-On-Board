import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// PATCH /api/admin/verify-donation - Verify/reject donation
export async function PATCH(request) {
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('users_profile')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { donation_id, is_verified } = body;

    // Get the donation details first
    const { data: donation, error: fetchError } = await supabaseAdmin
      .from('donations')
      .select('*, charity_posts(id, current_amount)')
      .eq('id', donation_id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    // Determine the new status
    const newStatus = is_verified ? 'verified' : 'rejected';
    const oldStatus = donation.status || (donation.is_verified ? 'verified' : 'pending');

    // Update donation status
    const { data, error } = await supabaseAdmin
      .from('donations')
      .update({ 
        is_verified,
        status: newStatus
      })
      .eq('id', donation_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update post's current_amount based on status change
    if (donation.charity_posts) {
      let newCurrentAmount = donation.charity_posts.current_amount;

      // Add amount if moving from pending/rejected to verified
      if (newStatus === 'verified' && oldStatus !== 'verified') {
        newCurrentAmount += donation.amount;
      }
      // Subtract amount if moving from verified to rejected/pending
      else if (oldStatus === 'verified' && newStatus !== 'verified') {
        newCurrentAmount = Math.max(0, newCurrentAmount - donation.amount);
      }

      await supabaseAdmin
        .from('charity_posts')
        .update({ current_amount: newCurrentAmount })
        .eq('id', donation.post_id);
    }

    return NextResponse.json({ 
      donation: data,
      message: is_verified ? 'Donation verified and amount added' : 'Donation rejected'
    });
  } catch (err) {
    console.error('Verify donation error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
