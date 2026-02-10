import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            This platform facilitates direct donations between individuals. We do not process, verify,
                            or guarantee any transactions. Please exercise due diligence before donating. We are not
                            liable for any fraudulent activities or misuse of funds.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
