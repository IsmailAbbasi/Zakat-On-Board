import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST /api/upload-image - Upload image to Supabase Storage
export async function POST(request) {
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const bucket = formData.get('bucket'); // 'donation-requests' or 'payment-proofs'

    if (!file || !bucket) {
      return NextResponse.json({ error: 'File and bucket are required' }, { status: 400 });
    }

    // Validate bucket name
    const validBuckets = ['donation-requests', 'payment-proofs'];
    if (!validBuckets.includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({ 
      url: publicUrl,
      path: data.path 
    });

  } catch (err) {
    console.error('Upload exception:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
