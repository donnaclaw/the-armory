'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const INITIAL_WORDS = [
    'INSTAGRAM',
    'THREADS',
    'FACEBOOK',
    'GMAIL',
    'X (TWITTER)',
    'REDDIT',
    'SNAPCHAT'
]

export function SlotMachineText() {
    const [words, setWords] = useState(INITIAL_WORDS)
    const [isAnimating, setIsAnimating] = useState(false)
    const [containerWidth, setContainerWidth] = useState<number | string>('auto')
    const [wordWidths, setWordWidths] = useState<Record<string, number>>({})
    const controls = useAnimation()

    // We'll use a hidden span to measure typography exactly as it renders in the H1
    const measurerRef = useRef<HTMLSpanElement>(null)

    // Match H1 line-height precisely. 
    // In our Hero.tsx, H1 is text-4xl (36px) md:text-7xl (72px).
    // line-height leading-tight is 1.25 (standard for tracking-tighter).
    // We'll use 1.1em as per Elite Armory specs.
    const itemHeight = '1.1em'

    useEffect(() => {
        // Measure all words once on mount
        if (measurerRef.current) {
            const widths: Record<string, number> = {}
            const measurer = measurerRef.current
            INITIAL_WORDS.forEach(word => {
                measurer.innerText = word
                widths[word] = measurer.offsetWidth
            })
            setWordWidths(widths)
            setContainerWidth(widths[INITIAL_WORDS[0]])
        }

        const interval = setInterval(async () => {
            if (isAnimating) return

            setIsAnimating(true)

            // Random index as per jQuery logic
            const wordIndex = Math.floor(Math.random() * (words.length - 1)) + 1
            const targetWord = words[wordIndex]
            const nextWidth = wordWidths[targetWord] || 'auto'

            // Responsive timing: 300ms for mobile (< 768px), 500ms for desktop
            const duration = window.innerWidth < 768 ? 0.3 : 0.5

            // Animate both Width and Scroll simultaneously
            setContainerWidth(nextWidth)
            await controls.start({
                y: -wordIndex * 100 + '%',
                transition: { duration: duration, ease: [0.76, 0, 0.24, 1] }
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
            }, duration * 1000)

        }, 3000)

        return () => clearInterval(interval)
    }, [controls, isAnimating, words, wordWidths])

    return (
        <span className="inline-flex items-baseline">
            {/* Hidden Measurer - matches H1 typography exactly */}
            <span
                ref={measurerRef}
                className="absolute invisible whitespace-nowrap pointer-events-none font-black tracking-tighter text-4xl md:text-7xl uppercase"
                aria-hidden="true"
            />

            <motion.span
                animate={{ width: containerWidth }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block relative h-[1.1em] overflow-hidden align-baseline"
            >
                {/* Mask layer */}
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
                    aria-hidden="true"
                >
                    {words.map((word, i) => (
                        <div
                            key={`${word}-${i}`}
                            className="h-[1.1em] flex items-end whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-white bg-clip-text text-transparent font-black tracking-tighter uppercase"
                            style={{ minHeight: '1.1em', lineHeight: '1.1em' }}
                        >
                            {word}
                        </div>
                    ))}
                </motion.div>

                {/* SEO Integrity */}
                <span className="sr-only">Instagram, Threads, Facebook, Gmail, X (Twitter), Reddit, Snapchat</span>
            </motion.span>
        </span>
    )
}
