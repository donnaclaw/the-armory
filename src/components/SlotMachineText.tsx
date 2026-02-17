'use client'

import { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
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
    const [containerWidth, setContainerWidth] = useState<number | string>('auto')
    const [wordWidths, setWordWidths] = useState<Record<string, number>>({})
    const controls = useAnimation()

    // Refs to avoid dependency loops in useEffect
    const wordsRef = useRef(INITIAL_WORDS)
    const isAnimatingRef = useRef(false)
    const measurerRef = useRef<HTMLSpanElement>(null)

    // Match H1 line-height precisely. 
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
            if (isAnimatingRef.current || document.hidden) return

            isAnimatingRef.current = true

            // Access current words from Ref to avoid stale closures
            const currentWords = wordsRef.current

            // Random index (skip 0 which is currently visible)
            const wordIndex = Math.floor(Math.random() * (currentWords.length - 1)) + 1
            const targetWord = currentWords[wordIndex]

            // We need to access widths. Since wordWidths is state and set once, we can try to access it via a ref if we want to be 100% safe,
            // but since we need the widths calculated in the DOM, let's just re-measure if needed or use the state if we can access it?
            // Actually, we can't access `wordWidths` state safely here if it's not in deps. 
            // Better to just re-measure or use a ref for widths too.
            // Let's use a ref for widths.
            let nextWidth = 0;
            if (measurerRef.current) {
                measurerRef.current.innerText = targetWord
                nextWidth = measurerRef.current.offsetWidth
            }

            // Responsive timing
            const duration = window.innerWidth < 768 ? 0.3 : 0.5

            // Animate
            setContainerWidth(nextWidth)
            await controls.start({
                y: -wordIndex * 100 + '%',
                transition: { duration: duration, ease: [0.76, 0, 0.24, 1] }
            })

            // Pop/Push Logic
            // Update immediately after animation completes. 
            // Use flushSync to ensure DOM updates before we reset the transform, preventing a flash of the old list at Y=0.
            const newWords = [...currentWords]
            const popped = newWords.splice(0, wordIndex)
            newWords.push(...popped)

            // Force synchronous DOM update
            flushSync(() => {
                setWords(newWords)
                wordsRef.current = newWords
            })

            // Instantly reset transform to match the new DOM (New Word 0 is now at Y=0)
            controls.set({ y: '0%' })

            isAnimatingRef.current = false

        }, 3000)

        return () => clearInterval(interval)
    }, [controls]) // Only controls in dep array (stable)

    return (
        <span className="inline-flex items-baseline">
            {/* Hidden Measurer */}
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

                <span className="sr-only">Instagram, Threads, Facebook, Gmail, X (Twitter), Reddit, Snapchat</span>
            </motion.span>
        </span>
    )
}
