import { AlertTriangle, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            {/* Disclaimer Banner */}
            <div className="bg-yellow-500 text-gray-900 py-4 px-4">
                <div className="max-w-7xl mx-auto flex items-start gap-3 justify-center">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed max-w-4xl">
                        <strong>Important Disclaimer:</strong> Zakat Onboard facilitates direct peer-to-peer contributions.
                        We do not hold funds, verify claims independently, or guarantee the authenticity of any request.
                        Please exercise due diligence and donate only to people you trust or can verify.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <Heart className="h-8 w-8 text-primary-500" fill="currentColor" />
                            <span className="text-xl font-bold">Zakat Onboard</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Empowering communities through direct, transparent giving.
                            Connect with those in need near you and make a real difference today.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-primary-400 transition">Home</Link></li>
                            <li><Link href="/create" className="hover:text-primary-400 transition">Request Help</Link></li>
                            <li><Link href="/about" className="hover:text-primary-400 transition">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary-400 transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/safety-tips" className="hover:text-primary-400 transition">Safety Tips</Link></li>
                            <li><Link href="/faq" className="hover:text-primary-400 transition">FAQ</Link></li>
                            <li><Link href="/partners" className="hover:text-primary-400 transition">Community Partners</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-400 transition">Success Stories</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                                <span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                <span>Tughkabad ,<br />New Delhi, India 110019</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Zakat Onboard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
