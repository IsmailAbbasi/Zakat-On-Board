'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { MapPin, IndianRupee, Calendar, User } from 'lucide-react';
import DonateButton from '@/components/DonateButton';

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('charity_posts')
                .select(`
                    *,
                    created_by_profile:created_by (
                        full_name,
                        email
                    )
                `)
                .eq('id', params.id)
                .single();

            if (error) throw error;
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    const progressPercentage = (post.current_amount / post.required_amount) * 100;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">{post.person_name}</h1>
                        <div className="flex items-center gap-4 text-primary-100">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{post.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Image (if exists) */}
                        {post.image_url && (
                            <div className="mb-8">
                                <img
                                    src={post.image_url}
                                    alt={post.person_name}
                                    className="w-full h-80 object-cover rounded-xl"
                                />
                            </div>
                        )}

                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    ₹{post.current_amount.toLocaleString()}
                                </span>
                                <span className="text-gray-600">
                                    of ₹{post.required_amount.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-primary-600 to-primary-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{progressPercentage.toFixed(1)}% funded</p>
                        </div>

                        {/* Reason */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Reason for Help</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.reason}</p>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                            <div className="space-y-3">
                                {post.phone && (
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-700 min-w-24">Phone:</span>
                                        <a
                                            href={`https://wa.me/${post.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-600 hover:text-primary-700 hover:underline"
                                        >
                                            {post.phone}
                                        </a>
                                    </div>
                                )}
                                {post.email && (
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-700 min-w-24">Email:</span>
                                        <a
                                            href={`mailto:${post.email}`}
                                            className="text-primary-600 hover:text-primary-700 hover:underline"
                                        >
                                            {post.email}
                                        </a>
                                    </div>
                                )}
                                {post.upi_id && (
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-700 min-w-24">UPI ID:</span>
                                        <span className="text-gray-900 font-mono">{post.upi_id}</span>
                                    </div>
                                )}
                                {post.bank_details && (
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-700 min-w-24">Bank:</span>
                                        <span className="text-gray-900 whitespace-pre-wrap">{post.bank_details}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Donate Button */}
                        {post.status === 'pending' && (
                            <div className="mt-6">
                                <DonateButton postId={post.id} onDonationSubmitted={fetchPost} />
                            </div>
                        )}

                        {/* Status Badge */}
                        <div className="mt-6 flex justify-between items-center">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                post.status === 'funded' ? 'bg-green-100 text-green-800' :
                                    post.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-red-100 text-red-800'
                                }`}>
                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </span>

                            <button
                                onClick={() => router.push('/')}
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                ← Back to All Requests
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
