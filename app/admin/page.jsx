'use client';

import { useState, useEffect } from 'react';
import { BarChart3, FileText, IndianRupee, Flag } from 'lucide-react';

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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Posts</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Pending Approval</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pendingPosts}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Donations</p>
                            <p className="text-3xl font-bold text-green-600">{stats.totalDonations}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <IndianRupee className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Pending Reports</p>
                            <p className="text-3xl font-bold text-red-600">{stats.pendingReports}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <Flag className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between items-start">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Total Amount Raised</h2>
                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            ₹{stats.totalAmountRaised.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                            Verified donations only
                        </p>
                    </div>
                    <div className="p-4 bg-primary-50 rounded-2xl">
                        <IndianRupee className="h-8 w-8 text-primary-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}
