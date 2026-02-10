'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { LayoutDashboard, FileText, DollarSign, Flag } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { user, isAdmin, loading } = useUser();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>;
    }

    if (!user || !isAdmin) {
        router.push('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
                    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                    <nav className="space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            <FileText className="h-5 w-5" />
                            <span>All Posts</span>
                        </Link>
                        <Link
                            href="/admin/donations"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            <DollarSign className="h-5 w-5" />
                            <span>Donations</span>
                        </Link>
                        <Link
                            href="/admin/reports"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            <Flag className="h-5 w-5" />
                            <span>Reports</span>
                        </Link>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
