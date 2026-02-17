'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = [
    "Instagram",
    "Threads",
    "Facebook",
    "Gmail",
    "X (Twitter)",
    "Reddit",
    "Snapchat"
]

export function SlotMachineText() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={WORDS[index]}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                            y: { type: "spring", stiffness: 100, damping: 15, mass: 1, bounce: 0.2, duration: 0.8 },
                            filter: { duration: 0.4 }
                        }
                    }}
                    exit={{
                        y: "-100%",
                        opacity: 0,
                        filter: "blur(4px)",
                        transition: { duration: 0.4 }
                    }}
                    className="inline-block whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-white bg-clip-text text-transparent will-change-transform"
                >
                    {WORDS[index]}
                </motion.span>
            </AnimatePresence>

            {/* SEO Accessibility: Primary keyword in hidden span for crawlers */}
            <span className="sr-only">Instagram</span>
        </span>
    )
}
