'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { LayoutDashboard, FileText, IndianRupee, Flag } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { user, isAdmin, loading, rawProfile } = useUser();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>;
    }

    if (!loading && (!user || !isAdmin)) {
        // router.push('/'); // Commented out for debugging
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <Flag className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You do not have permission to view this page.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg text-left text-xs font-mono mb-6 overflow-auto">
                        <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
                        <p><strong>User ID:</strong> {user ? user.id : 'N/A'}</p>
                        <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
                        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
                        {/* Debug Info */}
                        <div className="mt-2 pt-2 border-t border-gray-300">
                            <p className="font-bold text-red-600">Debug Info:</p>
                            <pre className="whitespace-pre-wrap text-gray-700 text-xs text-left bg-gray-200 p-2 rounded mt-1">
                                {JSON.stringify({
                                    isAdminState: isAdmin,
                                    userRole: user ? 'checked' : 'no_user',
                                    profileData: rawProfile || 'NULL (No profile found)',
                                    check: user?.id === 'cd259a33-f2fc-4fd7-87f9-1965fb109db5' ? 'MATCH' : 'NO_MATCH'
                                }, null, 2)}
                            </pre>
                            <p className="text-gray-500 italic mt-1 text-xs">
                                {rawProfile === null
                                    ? "Profile is NULL: Run the trigger/insert SQL."
                                    : (rawProfile?.role !== 'admin' ? "Role is NOT admin: Run the UPDATE SQL." : "Role IS admin: Check logic.")}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
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
