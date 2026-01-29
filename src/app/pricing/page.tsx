'use client'

import { useRef } from 'react'
import Script from 'next/script'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': {
        'pricing-table-id': string
        'publishable-key': string
      }
    }
  }
}

export default function PricingPage() {
  const tableRef = useRef<HTMLDivElement>(null)

  const handleScriptLoad = () => {
    if (tableRef.current) {
      const table = document.createElement('stripe-pricing-table')
      table.setAttribute('pricing-table-id', 'prctbl_1RkHaZ2UEsSbvoM0rFUltybU')
      table.setAttribute('publishable-key', 'pk_test_51Rjj0Q2UEsSbvoM0yh3tqhHfwDmz7hRhwmHUsGF6QL7aKBc1eTTIodavrclPfqjPSCewv5TU89UfDR7IG9nOIfUq00d6fqfr2k')
      
      tableRef.current.appendChild(table)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the perfect plan for your needs
          </p>
        </div>
        
        <Script 
          src="https://js.stripe.com/v3/pricing-table.js" 
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
        />
        
        <div className="flex justify-center">
          <div ref={tableRef} className="w-full max-w-4xl" />
        </div>
      </div>
    </div>
  )
}