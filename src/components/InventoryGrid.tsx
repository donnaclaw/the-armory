'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Shield, Instagram, ArrowRight, Users, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"

// Tab Data for Multi-Platform
const PLATFORMS = [
    { id: "facebook", label: "Facebook", desc: "Marketplace-ready accounts with history.", icon: Users },
    { id: "tiktok", label: "TikTok", desc: "Creator Fund eligible & region-unlocked.", icon: Smartphone },
    { id: "x", label: "X (Twitter)", desc: "Aged profiles resistant to shadowbans.", icon: Users },
    { id: "reddit", label: "Reddit", desc: "High-karma accounts for community marketing.", seo: "Reddit accounts with karma" },
    { id: "snapchat", label: "Snapchat", desc: "High-score accounts with active history.", icon: Smartphone },
    { id: "gmail", label: "Gmail", desc: "Business-grade email infrastructure.", seo: "Aged Gmail for business" }
]

export function InventoryGrid() {
    const [activeTab, setActiveTab] = useState("facebook")
    const syncedAt = useMemo(() => new Date().toLocaleTimeString(), [])

    // Platform specific stock values
    const STOCK_STATUS: Record<string, string> = {
        facebook: "+1k available",
        tiktok: "510 left",
        x: "227 left",
        reddit: "Verified Supply",
        snapchat: "High Vol",
        gmail: "High Availability"
    }

    return (
        <section id="inventory" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="mb-16 text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                    Elite Asset <span className="text-[#4F46E5] text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-400">Inventory</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Secure, verified, and warmed. Select your operation capability level.
                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* CARD 1: IG AGED */}
                <motion.div
                    id="ig-heritage"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative group bg-[#0B0B0B] border border-white/10 rounded-3xl p-8 hover:border-[#4F46E5]/50 transition-colors duration-300 flex flex-col scroll-mt-32"
                >
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <div className="bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full border border-[#4F46E5]/20 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            OGE + 2FA
                        </div>
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-2 py-0.5 rounded border border-orange-500/20 uppercase tracking-tighter"
                        >
                            834 IN STOCK
                        </motion.div>
                    </div>

                    <div className="mb-6">
                        <Instagram className="w-12 h-12 text-white mb-4" aria-label="Buy aged Instagram heritage accounts from 2010 to 2026" />
                        <h3 className="text-2xl font-bold text-white mb-2">Instagram Heritage</h3>
                        <p className="text-gray-400 text-sm">2010 — 2026</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Secure <strong>High-Trust Aged Instagram Accounts</strong> designed for longevity. Perfect for brand authority and bypassing new-account filters.
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Original Email (OGE) Access",
                                "2FA Codes Included",
                                "Phone Verified (PVA)",
                                "Warm-up Guide Included"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-[10px] text-gray-500 font-mono leading-tight mt-4 uppercase tracking-widest pt-4 border-t border-white/5">
                            Price scales by vintage (2010-2026). Bulk discounts apply.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-end justify-between mb-4">
                            <div className="text-3xl font-bold text-white">$2.00</div>
                            <div className="text-xs text-gray-500 mb-1">Starting Price</div>
                        </div>
                        <Button
                            className="w-full transition-all duration-300 bg-[#4F46E5] hover:bg-[#4338CA] shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                            onClick={() => {
                                trackEvent("cta_telegram_click", { source: "inventory_ig_secure_assets" })
                                window.open('https://t.me/luke_of', '_blank')
                            }}
                        >
                            SECURE ASSETS
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>

                {/* CARD 2: THREADS */}
                <motion.div
                    id="threads-custom"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0B] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-colors duration-300 flex flex-col scroll-mt-32"
                >
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <div className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                            PRE-WARMED
                        </div>
                        <div className="bg-white/5 text-gray-400 text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase tracking-tighter">
                            1,850 REMAINING THIS MONTH
                        </div>
                        <div className="bg-green-500/10 text-green-400 text-[10px] font-black px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-tighter animate-pulse">
                            20% BULK DISCOUNT
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-black text-2xl mb-4" aria-label="Buy custom Threads accounts with aged Instagram linking">@</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Custom Threads</h3>
                        <p className="text-gray-400 text-sm">Perfect for OFM and AI Models</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Instant credibility with <strong>Threads accounts connected to aged IG</strong> profiles. Comes with custom bio, profile picture, and initial activity history.
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Connected to 2010-2026 IG",
                                "Custom Name, Username & Bio Setup",
                                "Profile Picture Installed",
                                "3-day warmup included"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-white shrink-0" />
                                    {item}
                                </li>
                            ))}
                            <li className="flex items-center gap-3 text-sm text-green-400 font-bold bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                                <Check className="w-4 h-4 shrink-0" />
                                Wholesale Rate: 20% Off for 50+ Units
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-end justify-between mb-4">
                            <div className="text-xl font-bold text-white">Custom Quote</div>
                            <div className="text-xs text-gray-500 mb-1">Project Based</div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full transition-all duration-300 border-white/20 hover:bg-white hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] border-white/40"
                            onClick={() => {
                                trackEvent("cta_telegram_click", { source: "inventory_threads_request_accounts" })
                                window.open('https://t.me/luke_of?text=Hi%20Luke,%20I%20am%20interested%20in%20the%2020%25%20discount%20for%2050%2B%20Threads%2BIG%20accounts.', '_blank')
                            }}
                        >
                            REQUEST ACCOUNTS
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>

                {/* CARD 3: MULTI-PLATFORM */}
                <motion.div
                    id="multi-platform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative group bg-[#0B0B0B] border border-white/10 rounded-3xl p-8 hover:border-[#4F46E5]/30 transition-colors duration-300 flex flex-col scroll-mt-32"
                >
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                            <div className="w-3 h-3 rounded-full bg-pink-500" />
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Multi-Platform</h3>
                        <p className="text-gray-400 text-sm">Diversified Assets</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {PLATFORMS.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setActiveTab(p.id)}
                                    className={cn(
                                        "px-3 py-1 rounded-md text-xs font-bold transition-all border",
                                        activeTab === p.id
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-gray-500 border-transparent hover:text-white"
                                    )}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 min-h-[140px]">
                            {PLATFORMS.map((p) => activeTab === p.id && (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-white font-bold text-lg">{p.label} Assets</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {p.desc} {p.seo && <span className="opacity-0 w-0 h-0 overflow-hidden absolute">{p.seo}</span>}
                                    </p>
                                    {p.seo && (
                                        <p className="text-[#4F46E5] text-xs font-mono mt-2">
                                            FEATURE: {p.seo}
                                        </p>
                                    )}
                                    {!p.seo && p.id === 'tiktok' && <p className="text-[#4F46E5] text-xs font-mono mt-2">FEATURE: PVA (Phone Verified Accounts)</p>}

                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                Stock Status: <span className="text-white">{STOCK_STATUS[p.id] || "Available"}</span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-end justify-between mb-4">
                            <div className="text-xl font-bold text-white">Varies</div>
                            <div className="text-xs text-gray-500 mb-1">Check Catalog</div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full transition-all duration-300 border-white/20 hover:border-[#4F46E5] hover:text-[#4F46E5] shadow-[0_0_15px_rgba(79,70,229,0.1)] border-[#4F46E5]/40"
                            onClick={() => {
                                trackEvent("cta_telegram_click", { source: "inventory_open_catalog" })
                                window.open('https://t.me/luke_of', '_blank')
                            }}
                        >
                            OPEN CATALOG
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>

            </div>

            {/* QUICK FILTERS: pSEO Cross-linking */}
            <div className="mt-24 pt-12 border-t border-white/5">
                <h4 className="text-white font-bold text-lg mb-8 text-center uppercase tracking-widest">
                    Quick Access <span className="text-[#4F46E5]">Vaults</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: "Instagram 2010", path: "/buy/instagram/2010" },
                        { label: "Instagram 2012", path: "/buy/instagram/2012" },
                        { label: "Instagram 2015", path: "/buy/instagram/2015" },
                        { label: "Instagram 2018", path: "/buy/instagram/2018" },
                        { label: "Instagram 2020", path: "/buy/instagram/2020" },
                        { label: "Instagram 2022", path: "/buy/instagram/2022" },
                        { label: "Threads Special", path: "/buy/threads/2023" },
                        { label: "Gmail Veteran", path: "/buy/gmail/2010" },
                        { label: "Reddit Karma", path: "/buy/reddit/2015" },
                        { label: "X Shadow-Proof", path: "/buy/x/2012" },
                        { label: "FB Market-Ready", path: "/buy/facebook/2015" },
                        { label: "TikTok Foundation", path: "/buy/tiktok/2018" }
                    ].map((filter, i) => (
                        <Link
                            key={i}
                            href={filter.path}
                            className="px-4 py-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-xs text-gray-500 hover:text-white hover:border-[#4F46E5]/30 hover:bg-[#151515] transition-all text-center font-medium"
                        >
                            {filter.label}
                        </Link>
                    ))}
                </div>
                <p className="mt-8 text-center text-[10px] text-gray-700 uppercase tracking-[0.2em]">
                    Programmatic Access to 100+ Asset Combinations
                </p>
            </div>

            <div className="mt-12 text-center">
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em]">
                    Inventory last synchronized: {syncedAt} via Global Node.
                </p>
            </div>
        </section>
    )
}
