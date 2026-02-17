'use client';

import { useState, useEffect } from 'react';
import { Heart, TrendingUp, IndianRupee, Search } from 'lucide-react';
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
    const [showLoginReminder, setShowLoginReminder] = useState(false);

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

    const handleCreateRequest = (e) => {
        if (!user) {
            e.preventDefault();
            setShowLoginReminder(true);
        }
        // If user is logged in, the link will navigate normally
    };

    const handleReport = (postId) => {
        if (!user) {
            alert('Please sign in to report posts');
            return;
        }
        setReportingPostId(postId);
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary-100 rounded-2xl">
                            <Heart className="h-12 w-12 text-primary-600" fill="currentColor" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        Connecting Generosity with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            Real Needs
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A transparent platform where donors help individuals directly.
                        No middlemen, just pure impact. Join our community today.
                    </p>

                    <div className="flex justify-center gap-4">
                        <a
                            href="/create-request"
                            onClick={handleCreateRequest}
                            className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                        >
                            Create Request
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-20">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 rounded-xl">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">Active</span>
                        </div>
                        <h3 className="text-4xl font-black text-gray-900 mb-1">{posts.length}</h3>
                        <p className="text-gray-500 font-medium">Open Requests</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Heart className="h-8 w-8 text-blue-600" fill="currentColor" />
                            </div>
                            <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm">Success</span>
                        </div>
                        <h3 className="text-4xl font-black text-gray-900 mb-1">
                            {posts.filter(p => p.status === 'completed').length}
                        </h3>
                        <p className="text-gray-500 font-medium">Completed Donations</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl">
                                <IndianRupee className="h-8 w-8 text-purple-600" />
                            </div>
                            <span className="text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full text-sm">Impact</span>
                        </div>
                        <h3 className="text-4xl font-black text-gray-900 mb-1">
                            ₹{posts.reduce((sum, p) => sum + p.current_amount, 0).toLocaleString('en-IN')}
                        </h3>
                        <p className="text-gray-500 font-medium">Total Raised</p>
                    </div>
                </div>

                {/* Contact Us Button */}
                <div className="flex justify-center mb-8">
                    <a
                        href="/contact"
                        className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                    >
                        Contact Us
                    </a>
                </div>

                <DisclaimerBanner />

                {/* Search Section */}
                <div id="search-area" className="py-8">
                    <SearchArea onSearch={handleSearch} />
                </div>

                {/* Posts Grid */}
                <div className="mt-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {searchQuery ? `Search Results` : 'Latest Charity Requests'}
                            </h2>
                            <p className="text-gray-500 mt-2">
                                {searchQuery ? `Found ${posts.length} requests matching "${searchQuery}"` : 'Browse and support verified requests from your community'}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
                            <p className="text-gray-500 font-medium">Loading charity requests...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Found</h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">
                                {searchQuery
                                    ? `We couldn't find any requests regarding "${searchQuery}"`
                                    : 'There are no active charity requests at the moment.'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-6 text-primary-600 font-bold hover:underline"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Login Reminder Modal */}
            {showLoginReminder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                                <Heart className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Login Required
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Please sign in to create a charity request. You need to be logged in to submit and manage your requests.
                            </p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="/auth/signin"
                                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/30"
                                >
                                    Sign In Now
                                </a>
                                <button
                                    onClick={() => setShowLoginReminder(false)}
                                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
