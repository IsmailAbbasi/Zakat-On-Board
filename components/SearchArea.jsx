'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchArea({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Donations in Your Area</h2>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by city, area, or pin code..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
