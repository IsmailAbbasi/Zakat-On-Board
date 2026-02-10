'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { LayoutDashboard, FileText, IndianRupee, Flag } from 'lucide-react';
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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-primary-600" />
                        Admin Panel
                    </h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition font-medium"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/posts"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition font-medium"
                    >
                        <FileText className="h-5 w-5" />
                        <span>All Posts</span>
                    </Link>
                    <Link
                        href="/admin/donations"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition font-medium"
                    >
                        <IndianRupee className="h-5 w-5" />
                        <span>Donations</span>
                    </Link>
                    <Link
                        href="/admin/reports"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition font-medium"
                    >
                        <Flag className="h-5 w-5" />
                        <span>Reports</span>
                    </Link>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 transition font-medium text-sm"
                        >
                            <span>← Back to Website</span>
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
