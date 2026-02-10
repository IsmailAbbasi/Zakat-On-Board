'use client';

import { useState, useEffect } from 'react';
import { Heart, TrendingUp } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import SearchArea from '@/components/SearchArea';
import PostCard from '@/components/PostCard';
import ReportModal from '@/components/ReportModal';
import { useUser } from '@/lib/hooks/useUser';

export default function Home() {
    const { user } = useUser();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportingPostId, setReportingPostId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [searchQuery]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const url = searchQuery
                ? `/api/posts?location=${encodeURIComponent(searchQuery)}`
                : '/api/posts';

            const response = await fetch(url);
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleReport = (postId) => {
        if (!user) {
            alert('Please sign in to report posts');
            return;
        }
        setReportingPostId(postId);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <Heart className="h-16 w-16" fill="currentColor" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Welcome to Zakat Onboard</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        A platform connecting generous donors with people in need. Together, we can make a difference
                        in our community.
                    </p>
                    {!user && (
                        <p className="mt-6 text-primary-50">
                            Sign in with Google to create charity requests or donate to those in need
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <DisclaimerBanner />

                {/* Search Section */}
                <SearchArea onSearch={handleSearch} />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <TrendingUp className="h-10 w-10 text-primary-600 mx-auto mb-3" />
                        <h3 className="text-3xl font-bold text-gray-900">{posts.length}</h3>
                        <p className="text-gray-600">Active Requests</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <Heart className="h-10 w-10 text-primary-600 mx-auto mb-3" fill="currentColor" />
                        <h3 className="text-3xl font-bold text-gray-900">
                            {posts.filter(p => p.status === 'completed').length}
                        </h3>
                        <p className="text-gray-600">Completed Donations</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <Heart className="h-10 w-10 text-primary-600 mx-auto mb-3" />
                        <h3 className="text-3xl font-bold text-gray-900">
                            ₹{posts.reduce((sum, p) => sum + p.current_amount, 0).toLocaleString('en-IN')}
                        </h3>
                        <p className="text-gray-600">Total Raised</p>
                    </div>
                </div>

                {/* Posts Grid */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {searchQuery ? `Charity Requests in "${searchQuery}"` : 'Recent Charity Requests'}
                    </h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow">
                            <p className="text-gray-600 text-lg">
                                {searchQuery
                                    ? `No charity requests found in "${searchQuery}"`
                                    : 'No charity requests available at the moment'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onReport={handleReport}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Report Modal */}
            {reportingPostId && (
                <ReportModal
                    postId={reportingPostId}
                    onClose={() => setReportingPostId(null)}
                    onSuccess={() => {
                        alert('Report submitted successfully');
                        setReportingPostId(null);
                    }}
                />
            )}
        </div>
    );
}
