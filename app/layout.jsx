import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Zakat Onboard - Charity Platform",
    description: "Connecting donors with people in need. Help build a better community through charitable donations.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
