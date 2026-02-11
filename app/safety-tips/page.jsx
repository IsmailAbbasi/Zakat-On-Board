'use client';

import { Shield, Lock, Eye, AlertTriangle, CheckCircle, UserCheck } from 'lucide-react';

export default function SafetyTipsPage() {
    const tips = [
        {
            icon: Shield,
            title: "Verify Charity Requests",
            description: "Always review the details of charity requests carefully. Check the person's contact information and reason for help before donating."
        },
        {
            icon: Lock,
            title: "Secure Payment Methods",
            description: "Use verified UPI IDs and bank details provided on the platform. Always keep payment receipts and transaction IDs for your records."
        },
        {
            icon: Eye,
            title: "Check Admin Verification",
            description: "Look for admin-approved posts. Verified posts have been reviewed by our team to ensure legitimacy."
        },
        {
            icon: AlertTriangle,
            title: "Report Suspicious Activity",
            description: "If you notice any fraudulent requests or suspicious behavior, report them immediately using the report button."
        },
        {
            icon: CheckCircle,
            title: "Keep Proof of Donations",
            description: "Always upload payment screenshots and keep transaction IDs. This helps with verification and maintains transparency."
        },
        {
            icon: UserCheck,
            title: "Direct Contact",
            description: "When possible, contact the beneficiary directly using the provided phone or email to verify their situation."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <Shield className="h-8 w-8 text-primary-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Tips</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Follow these guidelines to ensure safe and secure charitable giving on our platform
                        </p>
                    </div>

                    <div className="space-y-6">
                        {tips.map((tip, index) => {
                            const Icon = tip.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <Icon className="h-6 w-6 text-primary-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                                        <p className="text-gray-600">{tip.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-blue-700">
                            If you have questions or concerns about safety, please contact our support team or report any suspicious activity immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
