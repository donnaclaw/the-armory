'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, CheckCircle, Zap } from 'lucide-react'

const ACTIVITIES = [
    "New Order: 50x 2015 IG Accounts delivered via Telegram",
    "New Order: 5x Reddit Aged Accounts (High Karma)",
    "New Order: 10x 2012 Threads Profiles (Verified)",
    "Inventory Update: 100+ Gmail PVAs added to vault",
    "New Order: 25x Facebook Business Manager assets delivered",
    "Security Alert: All 2026 AI-detection bypass tests passed"
]

export function LiveActivity() {
    const [index, setIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false)
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % ACTIVITIES.length)
                setIsVisible(true)
            }, 500)
        }, 45000) // 45 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl shadow-[#4F46E5]/10 max-w-sm pointer-events-auto"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#4F46E5]/20 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-[#4F46E5] animate-pulse" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">Live Activity</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <p className="text-white text-xs font-bold leading-tight">
                                {ACTIVITIES[index]}
                            </p>
                            <div className="flex items-center gap-1 text-[8px] text-gray-500 font-bold uppercase tracking-tighter">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Verified Transaction
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
