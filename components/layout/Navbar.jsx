'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, Heart, Plus, User, LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/hooks/useUser';

export default function Navbar() {
    const router = useRouter();
    const { user, isAdmin } = useUser();

    const handleSignIn = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const handleSignOut = () => {
        console.log('🔴 Signing out - deleting cookies directly');

        // Get all cookies
        const cookies = document.cookie.split(';');
        console.log('🔵 Found cookies:', cookies.length);

        // Delete ALL cookies (not just Supabase ones)
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

            // Delete with multiple path variations to ensure removal
            const paths = ['/', '/auth', '/auth/callback'];
            paths.forEach(path => {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=localhost;`;
            });

            console.log('🗑️ Deleted:', name);
        }

        console.log('✅ All cookies deleted, redirecting in 200ms...');

        // Small delay to ensure cookies are deleted, then force reload
        setTimeout(() => {
            window.location.href = '/?_t=' + Date.now();
        }, 200);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-primary-600" fill="currentColor" />
                        <span className="text-xl font-bold text-gray-900">Zakat Onboard</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {user && (
                            <>
                                <Link
                                    href="/create"
                                    className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Create Post</span>
                                </Link>

                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center space-x-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Admin</span>
                                    </Link>
                                )}

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sign Out</span>
                                </button>
                            </>
                        )}

                        {!user && (
                            <button
                                onClick={handleSignIn}
                                className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Sign In with Google</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
