'use client';

import { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Call Web3Forms directly from client-side (required for free plan)
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'c6c2d680-7e3d-472d-8d8e-e0a2e1db34f8',
                    subject: `[Zakat Onboard] ${formData.subject}`,
                    from_name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to_email: 'ismaiabbasi2003@gmail.com'
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                        <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
                    <p className="text-gray-400 text-lg">
                        Have questions? We'd love to hear from you. Send us a message!
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="hello@example.com"
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject Dropdown */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                SUBJECT
                            </label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl text-gray-300 focus:outline-none focus:border-primary-500 transition appearance-none cursor-pointer"
                            >
                                <option value="General Inquiry" className="bg-gray-800">✓ General Inquiry</option>
                                <option value="Sponsorship" className="bg-gray-800">Sponsorship</option>
                                <option value="Technical Support" className="bg-gray-800">Technical Support</option>
                                <option value="Suggestion" className="bg-gray-800">Suggestion</option>
                            </select>
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                MESSAGE
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="How can we help?"
                                rows="6"
                                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition resize-none"
                                required
                            />
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
                                ✓ Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-semibold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    SENDING...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    SEND MESSAGE
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
