import { AlertTriangle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            {/* Disclaimer Banner */}
            <div className="bg-yellow-500 text-gray-900 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-2">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="text-sm font-medium">
                            <strong>Disclaimer:</strong> We are not responsible for any donations or fraud.
                            Please donate only if you trust the person requesting help. Donate at your own responsibility.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Zakat Onboard</h3>
                    <p className="text-gray-400 text-sm">
                        Connecting donors with people in need. Together we can make a difference.
                    </p>
                    <p className="text-gray-500 text-xs mt-4">
                        © {new Date().getFullYear()} Zakat Onboard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
