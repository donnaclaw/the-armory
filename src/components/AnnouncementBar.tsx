'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function calculateTimeLeft() {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setHours(24, 0, 0, 0)

    const diff = tomorrow.getTime() - now.getTime()
    const h = Math.floor(diff / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
}

export function AnnouncementBar() {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const scrollToThreads = () => {
        const element = document.getElementById('inventory')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div
            onClick={scrollToThreads}
            className="sticky top-0 z-[120] w-full bg-[#4F46E5] cursor-pointer overflow-hidden h-[40px] flex items-center justify-center border-b border-white/10"
        >
            <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full skew-x-[-20deg]"
            />

            <div className="relative flex items-center justify-center gap-4 px-4 w-full">
                {/* Desktop Text */}
                <span className="hidden md:inline text-xs font-black text-white tracking-widest uppercase py-1">
                    🚀 BULK SPECIAL: 20% OFF on all Threads + IG Ecosystem orders (50+ units). Applied at checkout via Telegram.
                </span>

                {/* Mobile Text */}
                <span className="md:hidden text-[10px] font-black text-white tracking-widest uppercase">
                    20% OFF (50+ THREADS) |
                </span>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-tighter hidden md:inline">
                        OFFER EXPIRES IN:
                    </span>
                    <span
                        className="font-mono font-bold text-xs md:text-sm text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] tabular-nums"
                        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                    >
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    )
}
