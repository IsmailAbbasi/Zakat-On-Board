import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/reports - Get all reports
export async function GET(request) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reports')
    .select('*, users_profile(full_name, email), charity_posts(person_name, reason)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reports: data });
}

// POST /api/reports - Create report
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const reportData = {
      post_id: body.post_id,
      reported_by: user.id,
      reason: body.reason,
      description: body.description || null,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('reports')
      .insert(reportData)
      .select()
      .single();

    if (error) {
      // Check for duplicate report constraint
      if (error.code === '23505') {
        return NextResponse.json({ error: 'You have already reported this post' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ report: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
