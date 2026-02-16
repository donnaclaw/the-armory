import { Hero } from "@/components/Hero"
import { InventoryGrid } from "@/components/InventoryGrid"
import { SafeStartGuide } from "@/components/SafeStartGuide"
import { FAQ } from "@/components/FAQ"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden selection:bg-[#4F46E5] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "OnlineStore",
                "name": "The Armory - Specialized Marketplace",
                "url": "https://the-armory.social",
                "logo": "https://the-armory.social/logo.png",
                "description": "Premiere specialized marketplace for aged social media assets.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "120"
                }
              },
              {
                "@type": "Product",
                "name": "Aged Instagram Accounts",
                "description": "Verified aged Instagram accounts from 2010-2026.",
                "brand": {
                  "@type": "Brand",
                  "name": "The Armory"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "lowPrice": "5.00",
                  "highPrice": "85.00",
                  "priceCurrency": "USD"
                }
              }
            ]
          })
        }}
      />
      <Hero />
      <InventoryGrid />
      <SafeStartGuide />
      <FAQ />

      {/* Simple Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>&copy; 2026 THE ARMORY. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  )
}
