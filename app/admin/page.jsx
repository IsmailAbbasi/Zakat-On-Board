'use client';

import { useState, useEffect } from 'react';
import { BarChart3, FileText, DollarSign, Flag } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalPosts: 0,
        pendingPosts: 0,
        totalDonations: 0,
        pendingReports: 0,
        totalAmountRaised: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [postsRes, donationsRes, reportsRes] = await Promise.all([
                fetch('/api/posts'),
                fetch('/api/donations'),
                fetch('/api/reports')
            ]);

            const postsData = await postsRes.json();
            const donationsData = await donationsRes.json();
            const reportsData = await reportsRes.json();

            const posts = postsData.posts || [];
            const donations = donationsData.donations || [];
            const reports = reportsData.reports || [];

            setStats({
                totalPosts: posts.length,
                pendingPosts: posts.filter(p => p.status === 'pending').length,
                totalDonations: donations.length,
                pendingReports: reports.filter(r => r.status === 'pending').length,
                totalAmountRaised: donations
                    .filter(d => d.is_verified)
                    .reduce((sum, d) => sum + d.amount, 0)
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                        </div>
                        <FileText className="h-12 w-12 text-primary-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Posts</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pendingPosts}</p>
                        </div>
                        <BarChart3 className="h-12 w-12 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Donations</p>
                            <p className="text-3xl font-bold text-green-600">{stats.totalDonations}</p>
                        </div>
                        <DollarSign className="h-12 w-12 text-green-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Reports</p>
                            <p className="text-3xl font-bold text-red-600">{stats.pendingReports}</p>
                        </div>
                        <Flag className="h-12 w-12 text-red-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Total Amount Raised</h2>
                <p className="text-4xl font-bold text-primary-600">
                    ₹{stats.totalAmountRaised.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600 mt-2">From verified donations</p>
            </div>
        </div>
    );
}
