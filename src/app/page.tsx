import dynamic from "next/dynamic"
import { Hero } from "@/components/Hero"
import { SafeStartGuide } from "@/components/SafeStartGuide"
import { Testimonials } from "@/components/Testimonials"
import { InventoryViewTracker } from "@/components/InventoryViewTracker"
import { buildPageMetadata } from "@/lib/seo"

const InventoryGrid = dynamic(
  () => import("@/components/InventoryGrid").then((mod) => mod.InventoryGrid),
  {
    loading: () => (
      <div className="h-screen flex items-center justify-center">Loading Inventory...</div>
    ),
  }
)

const FAQ = dynamic(() => import("@/components/FAQ").then((mod) => mod.FAQ), {
  loading: () => <div className="h-64" />,
})

export const metadata = buildPageMetadata({
  title: "Buy Aged Instagram Accounts (2010-2026) | OGE & 2FA Verified",
  description:
    "Buy aged social media accounts (2010-2026) with OGE and 2FA verification. Secure inventory for Instagram, Threads, Facebook, X, Gmail, TikTok, Reddit and Snapchat.",
  path: "/",
})

const SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      name: "The Armory - Buy Aged Social Media Accounts",
      url: "https://www.buyagedinstagramaccount.com",
      logo: "https://www.buyagedinstagramaccount.com/icon.svg",
      description:
        "Premium marketplace for aged social media accounts. Buy verified Instagram, Threads, Facebook, X, Gmail, TikTok, Reddit and Snapchat accounts with OGE and 2FA.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "347",
      },
    },
    {
      "@type": "Product",
      name: "Aged Instagram Accounts (2010-2026)",
      description:
        "OGE and 2FA verified aged Instagram accounts from 2010-2026. Perfect for brand authority, marketing, and AI operations.",
      brand: { "@type": "Brand", name: "The Armory" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "2.00",
        highPrice: "85.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Aged Facebook Accounts",
      description: "Marketplace-ready aged Facebook accounts with established history.",
      brand: { "@type": "Brand", name: "The Armory" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "3.00",
        highPrice: "50.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Custom Threads Accounts",
      description:
        "Pre-warmed Threads accounts linked to aged Instagram profiles. Custom bio and profile setup.",
      brand: { "@type": "Brand", name: "The Armory" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "5.00",
        highPrice: "45.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Aged Gmail Accounts (OGE)",
      description:
        "Business-grade aged Gmail accounts for email infrastructure and account recovery.",
      brand: { "@type": "Brand", name: "The Armory" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "2.00",
        highPrice: "30.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  ],
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I use the 2FA codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use our internal 2FA Generator Tool page. Paste your secret key to get your 6-digit code. If codes fail, contact @luke_of on Telegram for a 24h replacement.",
      },
    },
    {
      "@type": "Question",
      name: "What does OGE mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Original Email (OGE) access. This ensures you are the sole owner and the account cannot be recovered by others. We provide the login credentials for the email itself.",
      },
    },
    {
      "@type": "Question",
      name: "What are the login safety protocols?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always use a high-quality residential proxy or anti-detect browser (GoLogin/AdsPower). Wait 24-48 hours after the first login before performing aggressive actions like mass-following or link bio changes.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept all major cryptocurrencies (BTC, ETH, LTC, USDT) and Wise payment links for instant processing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these accounts for OFM or AI-influencer models?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our aged accounts are specifically vetted for high-trust environments like OFM and AI-growth, where fresh accounts are often instantly flagged by neural-behavioral analysis.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to how many accounts I can buy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We handle bulk orders from 50 to 5,000+ units. Contact us on Telegram for custom wholesale pricing.",
      },
    },
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden selection:bg-[#4F46E5] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_GRAPH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Hero />
      <InventoryGrid />
      <SafeStartGuide />
      <Testimonials />
      <FAQ />
      <InventoryViewTracker />
    </main>
  )
}
