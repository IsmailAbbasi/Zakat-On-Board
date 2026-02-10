'use client';

import Link from 'next/link';
import { MapPin, Flag, MessageCircle } from 'lucide-react';

export default function PostCard({ post, onReport }) {
    const progress = post.required_amount > 0
        ? (post.current_amount / post.required_amount) * 100
        : 0;

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        funded: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const handleWhatsApp = () => {
        if (post.phone) {
            const cleanPhone = post.phone.replace(/\D/g, '');
            const message = encodeURIComponent(
                `Hi, I saw your charity request for ${post.person_name} on Zakat Onboard`
            );
            window.open(`https://wa.me/91${cleanPhone}?text=${message}`, '_blank');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6">
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[post.status] || statusColors.pending}`}>
                    {post.status?.toUpperCase()}
                </span>
                <button
                    onClick={() => onReport(post.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Report this post"
                >
                    <Flag className="h-5 w-5" />
                </button>
            </div>

            {/* Person Name */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.person_name}</h3>

            {/* Location */}
            {post.location && (
                <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{post.location}</span>
                </div>
            )}

            {/* Reason */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{post.reason}</p>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-900">
                        ₹{post.current_amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-600">
                        of ₹{post.required_amount.toLocaleString('en-IN')}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% funded</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <Link
                    href={`/posts/${post.id}`}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition font-medium"
                >
                    View Details
                </Link>
                {post.phone && (
                    <button
                        onClick={handleWhatsApp}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                        title="Contact via WhatsApp"
                    >
                        <MessageCircle className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
