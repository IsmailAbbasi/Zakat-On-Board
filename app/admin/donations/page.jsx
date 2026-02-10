'use client';

import { useState, useEffect } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/donations');
      const data = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (donationId, isVerified) => {
    try {
      const response = await fetch('/api/admin/verify-donation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donation_id: donationId, is_verified: isVerified })
      });

      if (response.ok) {
        fetchDonations();
      } else {
        alert('Failed to verify donation');
      }
    } catch (error) {
      console.error('Error verifying donation:', error);
      alert('Error verifying donation');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Donations Management</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      ) : donations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          No donations found
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proof</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {donation.users_profile?.full_name || 'Anonymous'}
                    </div>
                    <div className="text-sm text-gray-500">{donation.users_profile?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ₹{donation.amount.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{donation.transaction_id || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    {donation.payment_proof_url ? (
                      <a
                        href={donation.payment_proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 hover:text-primary-700"
                      >
                        View <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    ) : (
                      <span className="text-gray-400">No proof</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      donation.is_verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donation.is_verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!donation.is_verified && (
                        <button
                          onClick={() => handleVerify(donation.id, true)}
                          className="text-green-600 hover:text-green-700 flex items-center gap-1"
                          title="Verify"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      {donation.is_verified && (
                        <button
                          onClick={() => handleVerify(donation.id, false)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1"
                          title="Reject"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
