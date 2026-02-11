'use client';

import { FileText, AlertCircle, Shield, CheckCircle } from 'lucide-react';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <FileText className="h-8 w-8 text-primary-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600">
                                By accessing and using Zakat Onboard, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Purpose</h2>
                            <p className="text-gray-600 mb-4">
                                Zakat Onboard is a charity platform that:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Enables individuals to create charity requests for genuine needs</li>
                                <li>Allows donors to contribute to verified charity requests</li>
                                <li>Provides transparency through admin verification of requests and donations</li>
                                <li>Facilitates direct peer-to-peer charitable giving</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="h-6 w-6 text-primary-600" />
                                3. User Responsibilities
                            </h2>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">For All Users</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                                <li>You must be at least 18 years old to use this platform</li>
                                <li>Provide accurate and truthful information</li>
                                <li>Maintain the confidentiality of your account credentials</li>
                                <li>Use the platform in compliance with all applicable laws</li>
                                <li>Not engage in fraudulent or malicious activities</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Charity Request Creators</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                                <li>Submit only genuine and legitimate charity requests</li>
                                <li>Provide accurate beneficiary information and contact details</li>
                                <li>Upload authentic supporting documents or images</li>
                                <li>Use donated funds only for the stated purpose</li>
                                <li>Update request status if the need has been fulfilled</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Donors</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Verify charity requests before donating</li>
                                <li>Provide accurate payment information and transaction IDs</li>
                                <li>Upload genuine payment proof screenshots</li>
                                <li>Understand that donations are made directly to beneficiaries</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                                4. Prohibited Activities
                            </h2>
                            <p className="text-gray-600 mb-4">You agree NOT to:</p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Create fake or fraudulent charity requests</li>
                                <li>Submit false donation claims or payment proofs</li>
                                <li>Misuse personal information of other users</li>
                                <li>Harass, abuse, or threaten other users</li>
                                <li>Attempt to hack, disrupt, or compromise platform security</li>
                                <li>Use automated tools or bots without authorization</li>
                                <li>Violate any applicable local, state, or international laws</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Verification and Moderation</h2>
                            <p className="text-gray-600 mb-4">
                                We reserve the right to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Review and verify all charity requests before approval</li>
                                <li>Request additional documentation or proof</li>
                                <li>Reject or remove requests that violate our guidelines</li>
                                <li>Verify donation payment proofs before updating raised amounts</li>
                                <li>Suspend or terminate accounts engaging in fraudulent activity</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Donations and Payments</h2>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>All donations are made directly to charity request creators/beneficiaries</li>
                                <li>Zakat Onboard acts as a facilitator and does not handle funds</li>
                                <li>Donations are generally non-refundable once made</li>
                                <li>We are not responsible for disputes between donors and beneficiaries</li>
                                <li>Payment methods and transaction security are the responsibility of payment providers</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield className="h-6 w-6 text-primary-600" />
                                7. Limitation of Liability
                            </h2>
                            <p className="text-gray-600 mb-4">
                                To the maximum extent permitted by law:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>We do not guarantee the accuracy of charity requests</li>
                                <li>We are not responsible for the actions of users on the platform</li>
                                <li>We do not guarantee that donations will be used as stated</li>
                                <li>We are not liable for any losses or damages resulting from platform use</li>
                                <li>Users interact at their own risk</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                            <p className="text-gray-600">
                                All content, features, and functionality of Zakat Onboard are owned by us and protected by copyright, trademark, and other intellectual property laws. Users retain ownership of content they upload but grant us a license to display and use it on the platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Account Termination</h2>
                            <p className="text-gray-600 mb-4">
                                We reserve the right to suspend or terminate your account if:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>You violate these Terms of Service</li>
                                <li>You engage in fraudulent or illegal activities</li>
                                <li>You abuse or harass other users</li>
                                <li>We suspect unauthorized account access</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
                            <p className="text-gray-600">
                                Any disputes arising from the use of this platform should first be addressed through our support team. If unresolved, disputes will be settled through arbitration in accordance with applicable laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-600">
                                We may modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                            <p className="text-gray-600">
                                These Terms of Service are governed by and construed in accordance with applicable laws. Any legal action must be brought in the appropriate jurisdiction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                            <p className="text-gray-600">
                                For questions about these Terms of Service, please contact us through the platform's support channels.
                            </p>
                        </section>
                    </div>

                    <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <div className="flex gap-3">
                            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-yellow-900 mb-2">Important Notice</p>
                                <p className="text-sm text-yellow-700">
                                    By using Zakat Onboard, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you must discontinue use of the platform immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
