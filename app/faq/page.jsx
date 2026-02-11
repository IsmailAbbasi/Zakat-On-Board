'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "For Donors",
            questions: [
                {
                    q: "How do I donate to a charity request?",
                    a: "Click on any charity post to view details, then click the 'Donate Now' button. Fill in the donation amount, UPI reference ID, and upload your payment screenshot as proof."
                },
                {
                    q: "Is my donation secure?",
                    a: "Yes! All donations are verified by our admin team before being counted. We recommend using secure payment methods like UPI and always keeping transaction records."
                },
                {
                    q: "Can I see where my donation went?",
                    a: "Yes, once your donation is verified by our admin, it will be reflected in the post's 'Total Raised' amount. You can track the progress of any charity request."
                },
                {
                    q: "What if I need to cancel my donation?",
                    a: "Please contact our support team immediately with your transaction details. Donations pending admin verification may be cancelled."
                }
            ]
        },
        {
            category: "For Help Seekers",
            questions: [
                {
                    q: "Who can create a charity request?",
                    a: "Anyone registered on our platform can create a charity request for genuine needs such as medical emergencies, educational expenses, or disaster relief."
                },
                {
                    q: "How do I create a charity request?",
                    a: "After logging in, click 'Create Request' and fill in all required details including the person's name, reason for help, required amount, and contact information. You can also upload supporting images."
                },
                {
                    q: "How long does admin approval take?",
                    a: "Our admin team typically reviews and approves legitimate requests within 24-48 hours. You'll receive an email notification once approved."
                },
                {
                    q: "Can I update my request after posting?",
                    a: "Yes, you can edit your post details. However, major changes will require re-approval from the admin team."
                }
            ]
        },
        {
            category: "About Verification",
            questions: [
                {
                    q: "How does the verification process work?",
                    a: "All charity requests are reviewed by our admin team. Similarly, all donations are verified by checking the uploaded payment proofs before being added to the total raised amount."
                },
                {
                    q: "What happens if a request is rejected?",
                    a: "If a request doesn't meet our guidelines, it will be rejected. You'll receive feedback on why it was rejected and can submit a revised request."
                },
                {
                    q: "Can I report suspicious requests?",
                    a: "Yes! If you find any fraudulent or suspicious charity requests, please use the 'Report' button to alert our admin team."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    q: "What payment methods are accepted?",
                    a: "We support UPI payments, bank transfers, and other digital payment methods. Always use the payment details provided in the charity request."
                },
                {
                    q: "What image formats can I upload?",
                    a: "You can upload JPEG, PNG, or WebP images. Images are automatically compressed to 1MB for optimal performance."
                },
                {
                    q: "How do I contact support?",
                    a: "You can reach our support team through the contact information provided in the footer or by reporting issues through the platform."
                }
            ]
        }
    ];

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const index = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <HelpCircle className="h-8 w-8 text-primary-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about using Zakat Onboard
                    </p>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, questionIndex) => {
                                    const index = `${categoryIndex}-${questionIndex}`;
                                    const isOpen = openIndex === index;

                                    return (
                                        <div key={questionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                                            >
                                                <span className="font-semibold text-gray-900">{faq.q}</span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                                    <p className="text-gray-600">{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-primary-50 border border-primary-200 rounded-2xl text-center">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">Still have questions?</h3>
                    <p className="text-primary-700 mb-4">
                        Can't find the answer you're looking for? Please contact our support team.
                    </p>
                    <a
                        href="/safety-tips"
                        className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                    >
                        View Safety Tips
                    </a>
                </div>
            </div>
        </div>
    );
}
