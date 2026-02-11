'use client';

import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <Lock className="h-8 w-8 text-primary-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="h-6 w-6 text-primary-600" />
                                Introduction
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Zakat Onboard ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our charity platform.
                            </p>
                            <p className="text-gray-600">
                                Please read this privacy policy carefully. By using our platform, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Eye className="h-6 w-6 text-primary-600" />
                                Information We Collect
                            </h2>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                            <p className="text-gray-600 mb-4">
                                When you register on our platform, we may collect:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                <li>Full name and email address</li>
                                <li>Phone number for contact purposes</li>
                                <li>Profile picture (optional)</li>
                                <li>Authentication data (via Google OAuth)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Charity Request Information</h3>
                            <p className="text-gray-600 mb-4">
                                When creating or donating to charity requests, we collect:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                <li>Beneficiary details (name, reason for help, contact information)</li>
                                <li>Required and raised amounts</li>
                                <li>Supporting images and documents</li>
                                <li>Donation transaction IDs and payment proofs</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                <li>Device information and IP address</li>
                                <li>Browser type and operating system</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                            <p className="text-gray-600 mb-4">We use the collected information to:</p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Facilitate charity requests and donations</li>
                                <li>Verify the authenticity of requests and donations</li>
                                <li>Send notifications about donation status and updates</li>
                                <li>Improve our platform and user experience</li>
                                <li>Prevent fraud and ensure platform security</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield className="h-6 w-6 text-primary-600" />
                                Data Security
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Encrypted data transmission using SSL/TLS</li>
                                <li>Secure authentication via Google OAuth</li>
                                <li>Regular security audits and updates</li>
                                <li>Row-level security policies on our database</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                            <p className="text-gray-600 mb-4">
                                We do not sell your personal information. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li><strong>Publicly Visible Information:</strong> Charity requests and donor names (if you choose to donate publicly) are visible to all users</li>
                                <li><strong>With Beneficiaries:</strong> Donor contact information may be shared with charity request creators</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Service Providers:</strong> With trusted third-party services (e.g., Supabase for database hosting)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                            <p className="text-gray-600 mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate or incomplete data</li>
                                <li>Request deletion of your data</li>
                                <li>Withdraw consent at any time</li>
                                <li>Object to data processing</li>
                            </ul>
                            <p className="text-gray-600 mt-4">
                                To exercise these rights, please contact us through the platform or via email.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                            <p className="text-gray-600">
                                We use cookies and similar tracking technologies to improve your experience, analyze usage patterns, and maintain session information. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                            <p className="text-gray-600">
                                Our platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                            <p className="text-gray-600">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                            <p className="text-gray-600">
                                If you have questions about this Privacy Policy or our data practices, please contact our support team through the platform.
                            </p>
                        </section>
                    </div>

                    <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-xl">
                        <p className="text-sm text-primary-700">
                            <strong>Note:</strong> This privacy policy is designed to be transparent about our data practices. We are committed to protecting your privacy and using your information responsibly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
