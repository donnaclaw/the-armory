'use client'

import { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { motion, useAnimation } from 'framer-motion'

const DEFAULT_WORDS = [
    'INSTAGRAM',
    'THREADS',
    'FACEBOOK',
    'GMAIL',
    'X (TWITTER)',
    'REDDIT',
    'SNAPCHAT'
]

interface SlotMachineTextProps {
    words?: string[]
    duration?: number
    className?: string
}

export function SlotMachineText({
    words: inputWords = DEFAULT_WORDS,
    duration: inputDuration,
    className = "text-4xl md:text-7xl"
}: SlotMachineTextProps) {
    const [words, setWords] = useState(inputWords)
    const [containerWidth, setContainerWidth] = useState<number | string>('auto')
    const controls = useAnimation()

    const wordsRef = useRef(inputWords)
    const isAnimatingRef = useRef(false)
    const measurerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        // Measure all words once on mount or when inputWords change
        if (measurerRef.current) {
            const measurer = measurerRef.current
            measurer.innerText = inputWords[0]
            setContainerWidth(measurer.offsetWidth)
        }
        setWords(inputWords)
        wordsRef.current = inputWords
    }, [inputWords])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isAnimatingRef.current || document.hidden) return

            isAnimatingRef.current = true
            const currentWords = wordsRef.current

            const wordIndex = Math.floor(Math.random() * (currentWords.length - 1)) + 1
            const targetWord = currentWords[wordIndex]

            let nextWidth = 0;
            if (measurerRef.current) {
                measurerRef.current.innerText = targetWord
                nextWidth = measurerRef.current.offsetWidth
            }

            const animDuration = inputDuration || (window.innerWidth < 768 ? 0.3 : 0.5)

            setContainerWidth(nextWidth)
            await controls.start({
                y: -wordIndex * 100 + '%',
                transition: { duration: animDuration, ease: [0.76, 0, 0.24, 1] }
            })

            const newWords = [...currentWords]
            const popped = newWords.splice(0, wordIndex)
            newWords.push(...popped)

            flushSync(() => {
                setWords(newWords)
                wordsRef.current = newWords
            })

            controls.set({ y: '0%' })
            isAnimatingRef.current = false

        }, 3000)

        return () => clearInterval(interval)
    }, [controls, inputDuration])

    return (
        <span className="inline-flex items-baseline">
            <span
                ref={measurerRef}
                className={`absolute invisible whitespace-nowrap pointer-events-none font-black tracking-tighter uppercase ${className}`}
                aria-hidden="true"
            />

            <motion.span
                animate={{ width: containerWidth }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block relative h-[1.1em] overflow-hidden align-baseline"
            >
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
                            className={`h-[1.1em] flex items-end whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-white bg-clip-text text-transparent font-black tracking-tighter uppercase ${className}`}
                            style={{ minHeight: '1.1em', lineHeight: '1.1em' }}
                        >
                            {word}
                        </div>
                    ))}
                </motion.div>

                <span className="sr-only">{inputWords.join(', ')}</span>
            </motion.span>
        </span>
    )
}
