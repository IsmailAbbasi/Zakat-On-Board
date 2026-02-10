'use client';

import { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { compressImage, isValidImageType, isValidFileSize } from '@/lib/utils/image-compression';
import { uploadFile } from '@/lib/utils/storage';

export default function DonateModal({ post, onClose, onSuccess }) {
    const [amount, setAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [proofFile, setProofFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isValidImageType(file)) {
            setError('Please upload a valid image (JPEG, PNG, or WebP)');
            return;
        }

        if (!isValidFileSize(file)) {
            setError('File size must be less than 10MB');
            return;
        }

        setProofFile(file);
        setPreview(URL.createObjectURL(file));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);

        try {
            let proofUrl = null;

            if (proofFile) {
                const compressed = await compressImage(proofFile);
                const { url } = await uploadFile(compressed, 'charity-images');
                proofUrl = url;
            }

            const response = await fetch('/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: post.id,
                    amount: parseFloat(amount),
                    transaction_id: transactionId || null,
                    payment_proof_url: proofUrl,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit donation');
            }

            onSuccess();
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Donating to:</p>
                    <p className="font-semibold text-gray-900">{post.person_name}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (₹) *
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction ID (Optional)
                        </label>
                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction reference"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Proof (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                id="proof-upload"
                            />
                            <label htmlFor="proof-upload" className="cursor-pointer">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
                                ) : (
                                    <div>
                                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload payment screenshot</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
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
                                    Submitting...
                                </>
                            ) : (
                                'Submit Donation'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
