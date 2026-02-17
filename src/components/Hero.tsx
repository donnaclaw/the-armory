'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ShieldCheck, ArrowRight, Instagram, MessageCircle, Twitter } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

import { SlotMachineText } from "@/components/SlotMachineText"

export function Hero() {
    const [agreed, setAgreed] = useState(true)

    const scrollToInventory = () => {
        document.getElementById('account-types')?.scrollIntoView({ behavior: 'smooth' })
    }

    // Floating animation variants
    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    }

    return (
        <section className="relative flex flex-col items-center min-h-screen text-center overflow-hidden pt-20 md:pt-32">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Floating 3D Icons Effect */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {/* IG Icon */}
                <motion.div
                    variants={floatingVariant}
                    animate="animate"
                    className="absolute top-1/4 left-[10%] opacity-20 blur-sm"
                >
                    <Instagram className="w-32 h-32 text-[#4F46E5] transform -rotate-12" aria-label="aged social media accounts marketplace" />
                </motion.div>

                {/* Threads/At Symbol placeholder */}
                <motion.div
                    variants={floatingVariant}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute bottom-1/3 right-[15%] opacity-10 blur-sm"
                >
                    <div className="text-9xl font-black text-white transform rotate-12" aria-label="aged social media accounts marketplace">@</div>
                </motion.div>

                {/* Shield/Verified Icon */}
                <motion.div
                    variants={floatingVariant}
                    animate="animate"
                    transition={{ delay: 1 }}
                    className="absolute top-1/3 right-[20%] opacity-10 blur-md"
                >
                    <ShieldCheck className="w-24 h-24 text-white transform rotate-6" aria-label="aged social media accounts marketplace" />
                </motion.div>
            </div>

            <div className="relative z-10 max-w-5xl px-4 space-y-8">

                {/* Verified Badge Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold tracking-widest uppercase mb-2"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]"></span>
                    </span>
                    System Operational • 2026 Ready
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] inline-flex flex-wrap items-baseline justify-center"
                >
                    <span>BUY HIGH-TRUST AGED&nbsp;</span>
                    <SlotMachineText />
                    <span>&nbsp;ACCOUNTS</span>
                    <br className="w-full" />
                    <span className="text-[#4F46E5] w-full">(2010–2026)</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Instant authority for mass promotion and AI operations. Every account delivered with <strong className="text-white">Original Email (OGE)</strong> and <strong className="text-white">2FA compatibility</strong>. Scale your reach without the shadowban risk.
                </motion.p>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-8 flex flex-col items-center justify-center w-full"
                >
                    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">

                        {/* Clickwrap */}
                        <div className="flex items-center space-x-2 bg-black/40 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 accent-[#4F46E5] bg-gray-800 border-gray-600 rounded focus:ring-[#4F46E5] cursor-pointer"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-xs text-gray-400 select-none cursor-pointer">
                                I agree to the <a href="/terms" className="text-[#4F46E5] hover:underline" target="_blank">Terms</a> and <a href="/refund-policy" className="text-[#4F46E5] hover:underline" target="_blank">24h Replacement Policy</a>.
                            </label>
                        </div>

                        <div className={cn("w-full transition-all duration-500", !agreed && "opacity-50 pointer-events-none grayscale")}>
                            <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                                <Button
                                    className={cn(
                                        "h-14 md:h-14 text-base px-8 w-full md:w-auto md:min-w-[240px] transition-all duration-300",
                                        agreed && "shadow-[0_0_20px_rgba(79,70,229,0.4)] border-[#4F46E5] bg-[#4F46E5]"
                                    )}
                                    variant="primary"
                                    disabled={!agreed}
                                    onClick={scrollToInventory}
                                >
                                    VIEW CURRENT INVENTORY
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <Button
                                    className="h-14 md:h-14 text-base px-8 w-full md:w-auto md:min-w-[240px] border-white/10 hover:bg-white/5"
                                    variant="outline"
                                    disabled={!agreed}
                                    onClick={() => window.open('https://t.me/luke_of', '_blank')}
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    JOIN TELEGRAM
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
