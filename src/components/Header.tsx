'use client'

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { MessageCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    // Smooth scroll handler
    const scrollToInventory = (e: React.MouseEvent) => {
        e.preventDefault()
        const element = document.getElementById('account-types')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-[#0B0B0B]/70 backdrop-blur-xl border-white/10 py-4 shadow-lg shadow-[#4F46E5]/5"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 group-hover:border-[#4F46E5] transition-colors">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-black tracking-tighter text-white text-lg">THE ARMORY</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={scrollToInventory} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        IG AGED
                    </button>
                    <button onClick={scrollToInventory} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        THREADS CUSTOM
                    </button>
                    <button onClick={scrollToInventory} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        OTHER PLATFORMS
                    </button>
                    <Link href="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        ALPHA ACADEMY
                    </Link>
                    <Link href="/faq" onClick={(e) => { e.preventDefault(); document.querySelector('.group-open\\:rotate-180')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        FAQ
                    </Link>
                    <Link href="/tools/2fa-code-generator" className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20 hover:bg-[#4F46E5] hover:text-white transition-all">
                        2FA TOOL
                    </Link>
                </nav>

                {/* Action */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="hidden md:flex h-9 text-xs border-[#4F46E5]/50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
                        onClick={() => window.open('https://t.me/luke_of', '_blank')}
                    >
                        <MessageCircle className="w-3 h-3 mr-2" />
                        LIVE SUPPORT
                    </Button>
                </div>
            </div>
        </motion.header>
    )
}
