import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    
    // Exchange the OAuth code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      // Redirect to home with error
      return NextResponse.redirect(`${origin}/?error=auth_failed`);
    }
  }

  // Redirect to home page after successful authentication
  return NextResponse.redirect(origin);
}
