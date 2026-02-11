'use client';

import { Heart, Users, Shield, Target } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">About Zakat Onboard</h1>
                    <p className="text-xl text-primary-100">
                        Connecting generous hearts with those in need through transparency and compassion
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Zakat Onboard is a transparent charity platform dedicated to bridging the gap between those who wish to help and those in need. We believe in the power of community-driven support and the importance of accountability in charitable giving.
                    </p>
                    <p className="text-lg text-gray-600">
                        Our platform enables individuals to create verified charity requests for genuine needs while providing donors with complete transparency on how their contributions make a difference.
                    </p>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                        <p className="text-gray-600">
                            Every donation is verified and tracked. We ensure complete visibility into where funds go and how they're used.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <Heart className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassion</h3>
                        <p className="text-gray-600">
                            We believe in helping others without judgment, fostering a community built on empathy and understanding.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                        <p className="text-gray-600">
                            Together we're stronger. Our platform brings people together to support each other in times of need.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Accountability</h3>
                        <p className="text-gray-600">
                            Every request is verified by our admin team to ensure legitimacy and protect both donors and beneficiaries.
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Create a Request</h4>
                                <p className="text-gray-600">Individuals in need can create charity requests with details about their situation and required amount.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Admin Verification</h4>
                                <p className="text-gray-600">Our team reviews each request to ensure legitimacy and compliance with our guidelines.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Community Donates</h4>
                                <p className="text-gray-600">Generous donors review verified requests and contribute directly to help those in need.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                                4
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Verified Impact</h4>
                                <p className="text-gray-600">All donations are verified with payment proofs before being added to the total raised amount.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-xl text-primary-100 mb-6">
                        Whether you need help or want to help others, you're welcome here.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/create"
                            className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-medium"
                        >
                            Create Request
                        </a>
                        <a
                            href="/"
                            className="px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition font-medium border border-primary-500"
                        >
                            View Requests
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
