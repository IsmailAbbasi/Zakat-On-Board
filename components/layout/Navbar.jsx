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
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-50 p-2 rounded-lg group-hover:bg-primary-100 transition-colors">
                            <Heart className="h-6 w-6 text-primary-600" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                            Zakat Onboard
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/create"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full font-medium text-sm hover:bg-primary-700 transition shadow-sm hover:shadow-md"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Create Request</span>
                                </Link>

                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 font-medium text-sm transition"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span className="hidden sm:inline">Admin</span>
                                    </Link>
                                )}

                                <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 font-medium text-sm transition rounded-full hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-800 transition shadow-sm hover:shadow-md"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
