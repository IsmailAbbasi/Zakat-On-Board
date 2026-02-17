'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useUser() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rawProfile, setRawProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    // Timeout - 5 seconds
    const timeoutId = setTimeout(() => {
      if (mounted && loading) {
        console.warn('⚠️ Auth loading timeout - this may indicate a connection issue');
        setLoading(false);
        setRawProfile({ error: 'Connection timeout' });
      }
    }, 5000);

    const loadUser = async () => {
      try {
        // Step 1: Get authenticated user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

        if (authError) {
          // "Auth session missing" is expected when not logged in - don't log as error
          if (authError.message === 'Auth session missing!') {
            console.log('ℹ️ No active session (user not logged in)');
          } else {
            console.error('❌ Auth error:', authError.message);
          }
          
          if (mounted) {
            setLoading(false);
            setRawProfile({ error: authError.message });
          }
          return;
        }

        if (!authUser) {
          if (mounted) {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        if (mounted) setUser(authUser);

        // Step 2: Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('users_profile')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profileError) {
          console.error('❌ Profile error:', profileError.message);
          if (mounted) {
            setRawProfile({ error: profileError.message });
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        if (mounted) {
          setRawProfile(profile);
          setIsAdmin(profile?.role === 'admin');
          setLoading(false);
          clearTimeout(timeoutId);
        }

      } catch (err) {
        console.error('💥 Unexpected error:', err);
        if (mounted) {
          setRawProfile({ error: String(err) });
          setLoading(false);
        }
      }
    };

    loadUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        loadUser();
      } else {
        setUser(null);
        setIsAdmin(false);
        setRawProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, loading, rawProfile };
}
