'use client';

import { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { compressImage, isValidImageType, isValidFileSize } from '@/lib/utils/image-compression';

export default function DonateButton({ postId, onDonationSubmitted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    transaction_id: '',
  });
  const [proofImage, setProofImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidImageType(file)) {
      setError('Please upload a valid image (JPEG, PNG, or WebP)');
      return;
    }

    if (!isValidFileSize(file, 10)) {
      setError('Image must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const compressedFile = await compressImage(file, 1);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);

      setProofImage(compressedFile);
    } catch (err) {
      console.error('Image compression error:', err);
      setError('Failed to process image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setProofImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!formData.transaction_id.trim()) {
      setError('Please enter UPI reference ID');
      return;
    }

    if (!proofImage) {
      setError('Please upload payment proof');
      return;
    }

    setLoading(true);

    try {
      const imageFormData = new FormData();
      imageFormData.append('file', proofImage);
      imageFormData.append('bucket', 'payment-proofs');

      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: imageFormData
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload payment proof');
      }

      const { url } = await uploadResponse.json();

      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          amount: amount,
          transaction_id: formData.transaction_id,
          payment_proof_url: url
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit donation');
      }

      alert('Donation submitted successfully! Waiting for admin verification.');
      setIsOpen(false);
      setFormData({ amount: '', transaction_id: '' });
      setProofImage(null);
      setImagePreview(null);
      
      if (onDonationSubmitted) {
        onDonationSubmitted();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
      >
        Donate Now
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Submit Donation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Amount (₹) *
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI Reference ID / Transaction ID *
            </label>
            <input
              type="text"
              value={formData.transaction_id}
              onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
              placeholder="Enter UPI reference number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Proof (Screenshot) *
            </label>
            <p className="text-xs text-gray-500 mb-2">Upload payment screenshot (compressed to 1MB)</p>
            
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload screenshot</p>
                  <p className="text-xs text-gray-400">JPEG, PNG or WebP</p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Payment proof"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {uploading && (
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Compressing image...
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              ⓘ Your donation will be verified by admin before being added to the total raised amount.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
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
        </form>
      </div>
    </div>
  );
}
