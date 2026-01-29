import Checkout from "./components/checkout";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stripe Subscription Demo
          </h1>
          <div className="space-x-4">
            <Link 
              href="/pricing" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
        
        <Checkout />
      </div>
    </div>
  );
}
