'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/lib/hooks/useUser';
import { validateEmail, validatePhone, validateUPI, validateAmount, sanitizeInput } from '@/lib/utils/validators';

export default function CreatePost() {
    const router = useRouter();
    const { user, loading: userLoading } = useUser();

    const [formData, setFormData] = useState({
        person_name: '',
        reason: '',
        required_amount: '',
        phone: '',
        email: '',
        upi_id: '',
        bank_details: '',
        location: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (userLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>;
    }

    if (!user) {
        router.push('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.person_name || !formData.reason || !formData.required_amount) {
            setError('Please fill in all required fields');
            return;
        }

        const amount = parseFloat(formData.required_amount);
        if (!validateAmount(amount)) {
            setError('Please enter a valid amount');
            return;
        }

        if (formData.email && !validateEmail(formData.email)) {
            setError('Please enter a valid email');
            return;
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        if (formData.upi_id && !validateUPI(formData.upi_id)) {
            setError('Please enter a valid UPI ID');
            return;
        }

        if (!formData.phone && !formData.email) {
            setError('Please provide at least one contact method (phone or email)');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    required_amount: amount,
                    person_name: sanitizeInput(formData.person_name),
                    reason: sanitizeInput(formData.reason),
                    location: formData.location ? sanitizeInput(formData.location) : null
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create post');
            }

            const { post } = await response.json();
            router.push(`/posts/${post.id}`);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Charity Request</h1>
                    <p className="text-gray-600 mb-8">
                        Help someone in need by creating a charity request. Please provide accurate information.
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Person Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Person Name *
                            </label>
                            <input
                                type="text"
                                value={formData.person_name}
                                onChange={(e) => setFormData({ ...formData, person_name: e.target.value })}
                                placeholder="Name of the person who needs help"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason/Problem *
                            </label>
                            <textarea
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Describe the situation and why help is needed"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Required Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Required Amount (₹) *
                            </label>
                            <input
                                type="number"
                                value={formData.required_amount}
                                onChange={(e) => setFormData({ ...formData, required_amount: e.target.value })}
                                placeholder="0"
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="City, Area, or Pin Code"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="10-digit number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    UPI ID
                                </label>
                                <input
                                    type="text"
                                    value={formData.upi_id}
                                    onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                                    placeholder="yourname@bank"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bank Details
                                </label>
                                <input
                                    type="text"
                                    value={formData.bank_details}
                                    onChange={(e) => setFormData({ ...formData, bank_details: e.target.value })}
                                    placeholder="Account number & IFSC"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
