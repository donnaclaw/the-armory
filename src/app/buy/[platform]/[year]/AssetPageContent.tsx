'use client'

import { Check, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

interface AssetPageContentProps {
    platformTitle: string
    year: string
    intro: string
    keywordFocus: string
    keyPoints: string[]
    h1: string
}

export function AssetPageContent({ platformTitle, year, intro, keywordFocus, keyPoints, h1 }: AssetPageContentProps) {
    const scrollToTop = () => {
        window.location.href = '/'
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] uppercase tracking-widest">
                    <li>
                        <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
                    </li>
                    <li className="text-gray-700" aria-hidden="true">/</li>
                    <li>
                        <Link href={`/buy/${platformTitle === 'X/Twitter' ? 'x' : platformTitle.toLowerCase()}`} className="text-gray-500 hover:text-white transition-colors">
                            {platformTitle}
                        </Link>
                    </li>
                    <li className="text-gray-700" aria-hidden="true">/</li>
                    <li className="text-white">{year}</li>
                </ol>
            </nav>

            {/* Hero Section */}
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                    {h1.split(platformTitle).map((part, index, arr) => (
                        <span key={index}>
                            {part}
                            {index < arr.length - 1 ? <span className="text-[#4F46E5]">{platformTitle}</span> : null}
                        </span>
                    ))}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    {intro}
                </p>
            </div>

            {/* Year-Specific SEO Value Block */}
            <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 space-y-4">
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Year-specific trust signals</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Primary keyword focus: {keywordFocus}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Product Card */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-64 h-64 text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-[10px] font-bold uppercase tracking-tighter">
                            OGE + 2FA Verified
                        </div>
                        <h2 className="text-3xl font-bold text-white">Full Access {platformTitle} Pack</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "Original Email Access",
                                "2FA Security Codes",
                                "Phone Verified (PVA)",
                                "Instant Telegram Delivery",
                                "24h Replacement Policy",
                                "Marketing Ready"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                    <Check className="w-4 h-4 text-[#4F46E5]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="shrink-0 w-full md:w-auto bg-black/40 border border-white/5 rounded-2xl p-6 text-center space-y-4">
                        <div className="space-y-1">
                            <div className="text-4xl font-black text-white">$Varies</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Contact for pricing</div>
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => {
                                const sanitizedPlatform = platformTitle.toLowerCase().replace('/', '_').replace(/\s+/g, '-')
                                trackEvent("cta_telegram_click", { source: `buy_year_${sanitizedPlatform}_${year}_cta` })
                                window.open('https://t.me/luke_of', '_blank', 'noopener,noreferrer')
                            }}
                        >
                            CONTACT AGENT
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Back link */}
            <div className="pt-8 text-center">
                <Button variant="outline" className="border-white/5 text-gray-500 hover:text-white" onClick={scrollToTop}>
                    BACK TO FULL INVENTORY
                </Button>
            </div>
        </div>
    )
}
