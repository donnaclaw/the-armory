'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const INITIAL_WORDS = [
    'Instagram',
    'Threads',
    'Facebook',
    'Gmail',
    'X (Twitter)',
    'Reddit',
    'Snapchat'
]

export function SlotMachineText() {
    const [words, setWords] = useState(INITIAL_WORDS)
    const [isAnimating, setIsAnimating] = useState(false)
    const controls = useAnimation()
    const containerRef = useRef<HTMLDivElement>(null)

    // Match H1 line-height precisely. 
    // In our Hero.tsx, H1 is text-4xl (36px) md:text-7xl (72px).
    // line-height leading-tight is usually 1.2.
    // So 72 * 1.2 = 86.4px. Let's use a flexible 1.2em.
    const itemHeight = '1.2em'

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isAnimating) return

            setIsAnimating(true)

            // Random index as per jQuery logic (random between 1 and length-1)
            // The jQuery logic used a random index to jump. 
            // We'll jump by 1 for a consistent "roller" feel, or random if user literal.
            // User said: "Replace the current Hero title animation with this specific jQuery Slot Machine logic."
            // JS in reference: var wordIndex = randomSlotttIndex(wordlist.length);
            const wordIndex = Math.floor(Math.random() * (words.length - 1)) + 1

            // Animate upward
            await controls.start({
                y: -wordIndex * 100 + '%', // Using % since height is 1.2em per item
                transition: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95] } // Custom swing-like ease
            })

            // Pop/Push Logic
            setTimeout(() => {
                setWords(prev => {
                    const newWords = [...prev]
                    const popped = newWords.splice(0, wordIndex)
                    newWords.push(...popped)
                    return newWords
                })
                // Reset position instantly
                controls.set({ y: '0%' })
                setIsAnimating(false)
            }, 300) // 300ms delay as per rotateContents reference

        }, 3000) // 3s delay as per Timing request

        return () => clearInterval(interval)
    }, [controls, isAnimating, words.length])

    return (
        <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
            {/* Mask layer as per previous visual polish */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
            />

            <motion.div
                animate={controls}
                className="flex flex-col list-none m-0 p-0 will-change-transform"
                style={{ height: itemHeight }}
                aria-hidden="true"
            >
                {words.map((word, i) => (
                    <div
                        key={`${word}-${i}`}
                        className="h-[1.2em] flex items-center whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-white bg-clip-text text-transparent font-black tracking-tighter"
                        style={{ minHeight: '1.2em' }}
                    >
                        {word}
                    </div>
                ))}
            </motion.div>

            {/* SEO Integrity */}
            <span className="sr-only">Instagram, Threads, Facebook, Gmail, X (Twitter), Reddit, Snapchat</span>
        </span>
    )
}
