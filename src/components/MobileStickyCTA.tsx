'use client'

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function MobileStickyCTA() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[120] md:hidden h-[60px] bg-[#0B0B0B]/90 backdrop-blur-xl border-t border-[#4F46E5]/40 px-4 flex items-center justify-center shadow-[0_-10px_20px_rgba(79,70,229,0.1)]"
        >
            <Link
                href="https://t.me/luke_of"
                target="_blank"
                className="w-full"
            >
                <motion.button
                    animate={{
                        scale: [1, 1.02, 1],
                        boxShadow: [
                            "0 0 0px rgba(79, 70, 229, 0)",
                            "0 0 15px rgba(79, 70, 229, 0.4)",
                            "0 0 0px rgba(79, 70, 229, 0)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-full h-[44px] bg-[#4F46E5] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-transform"
                >
                    <MessageCircle className="w-4 h-4" />
                    REQUEST ACCOUNTS
                </motion.button>
            </Link>
        </motion.div>
    )
}
