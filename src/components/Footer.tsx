'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Shield, Send, MessageCircle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function Footer() {
    const pathname = usePathname()
    const router = useRouter()

    const handleNavigation = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        if (pathname === '/') {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            router.push(`/#${id}`)
        }
    }

    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 text-sm font-sans">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* COL 1: BRAND & SEO */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2 group w-fit" aria-label="aged social media accounts marketplace">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 group-hover:border-[#4F46E5] transition-colors" aria-label="aged social media accounts marketplace">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black tracking-tighter text-white text-lg">THE ARMORY</span>
                    </Link>
                    <p className="text-gray-500 leading-relaxed max-w-sm">
                        The world&apos;s leading provider of aged social media assets. We specialize in providing high-authority accounts for marketing agencies, OFM operations, and mass-outreach specialists. Trusted since 2017.
                    </p>
                </div>

                {/* COL 2: QUICK LINKS */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold tracking-widest uppercase text-xs">Quick Links</h4>
                    <nav className="flex flex-col gap-3">
                        <button onClick={(e) => handleNavigation(e, 'inventory')} className="text-gray-500 hover:text-[#4F46E5] transition-colors text-left w-fit">
                            Instagram Aged
                        </button>
                        <button onClick={(e) => handleNavigation(e, 'inventory')} className="text-gray-500 hover:text-[#4F46E5] transition-colors text-left w-fit">
                            Threads Custom
                        </button>
                        <button onClick={(e) => handleNavigation(e, 'inventory')} className="text-gray-500 hover:text-[#4F46E5] transition-colors text-left w-fit">
                            Aged Gmail & More
                        </button>
                    </nav>
                </div>

                {/* COL 3: COMPANY */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold tracking-widest uppercase text-xs">Company</h4>
                    <nav className="flex flex-col gap-3">
                        <Link href="/about" className="text-gray-500 hover:text-[#4F46E5] transition-colors w-fit">
                            About Us
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-[#4F46E5] transition-colors w-fit">
                            Terms of Service
                        </Link>
                        <Link href="/refund-policy" className="text-gray-500 hover:text-[#4F46E5] transition-colors w-fit">
                            Refund Policy
                        </Link>
                    </nav>
                </div>

                {/* COL 4: SUPPORT & SOCIAL */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold tracking-widest uppercase text-xs">Support & Payment</h4>



                    <div className="flex flex-col gap-3">
                        <a
                            href="https://t.me/luke_of"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                            onClick={() => trackEvent("cta_telegram_click", { source: "footer_telegram" })}
                        >
                            <Send className="w-4 h-4 text-[#4F46E5] group-hover:translate-x-1 transition-transform" />
                            Telegram: @luke_of
                        </a>
                        <a href="https://discord.gg/luke_of" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                            <MessageCircle className="w-4 h-4 text-[#4F46E5] group-hover:translate-x-1 transition-transform" />
                            Discord: @luke_of
                        </a>
                    </div>

                    <div className="pt-4" aria-label="aged social media accounts marketplace">
                        <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Accepted Methods</p>
                        <div className="flex items-center gap-2 text-gray-400">
                            {/* Payment "Icons" - Using styled text badges for clarity as specific simple SVGs are limited */}
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold">BTC</div>
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold">ETH</div>
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold">USDT</div>
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold">WISE</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5 pt-8 max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-xs">© 2026 The Armory. All rights reserved.</p>
                <p className="text-gray-700 text-[10px] max-w-md text-center md:text-right">
                    Disclaimer: Use accounts responsibly. We do not promote spam; we provide the tools for professional digital marketing.
                </p>
            </div>
        </footer>
    )
}
