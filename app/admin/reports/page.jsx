'use client';

import { useState, useEffect } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this reported post?')) return;

    try {
      console.log('🗑️ Attempting to delete post:', postId);
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      console.log('Delete response:', response.status, data);

      if (response.ok) {
        fetchReports();
        alert('Post deleted successfully');
      } else {
        console.error('❌ Delete failed:', data.error);
        alert(`Failed to delete post: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('💥 Delete error:', error);
      alert(`Error deleting post: ${error.message}`);
    }
  };

  const handleDismissReport = async (reportId) => {
    if (!confirm('Dismiss this report? The report will be marked as resolved.')) return;

    try {
      console.log('📋 Dismissing report:', reportId);
      const response = await fetch('/api/admin/dismiss-report', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_id: reportId })
      });

      const data = await response.json();

      if (response.ok) {
        fetchReports();
        alert('Report dismissed successfully');
      } else {
        console.error('❌ Dismiss failed:', data.error);
        alert(`Failed to dismiss report: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('💥 Dismiss error:', error);
      alert(`Error dismissing report: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reported Posts</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          No reports found
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      {report.reason}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {report.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Post: {report.charity_posts?.person_name}
                  </h3>
                  <p className="text-gray-600 mb-3">{report.charity_posts?.reason}</p>

                  {report.description && (
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <p className="text-sm text-gray-700"><strong>Report Details:</strong> {report.description}</p>
                    </div>
                  )}

                  <p className="text-sm text-gray-500">
                    Reported by: {report.users_profile?.full_name || 'Anonymous'} ({report.users_profile?.email})
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`/posts/${report.post_id}`, '_blank')}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                  >
                    View Post <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDismissReport(report.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleDeletePost(report.post_id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
