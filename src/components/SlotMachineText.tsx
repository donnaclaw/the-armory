'use client'

import React from 'react'

const WORDS = [
    "Instagram",
    "Threads",
    "Facebook",
    "Gmail",
    "X (Twitter)",
    "Reddit",
    "Snapchat",
    "Instagram" // Loop back to start
]

export function SlotMachineText() {
    return (
        <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
            {/* Visual Mask for vertical fade */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
            />

            <ul
                className="flex flex-col animate-roller list-none m-0 p-0 will-change-transform"
                aria-hidden="true"
            >
                {WORDS.map((word, i) => (
                    <li
                        key={i}
                        className="h-[1.2em] flex items-center whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-white bg-clip-text text-transparent font-black tracking-tighter"
                    >
                        {word}
                    </li>
                ))}
            </ul>

            {/* SEO Integrity: Full sentence representation for crawlers */}
            <span className="sr-only">Instagram, Threads, Facebook, Gmail, X (Twitter), Reddit, Snapchat</span>

            <style jsx>{`
                .animate-roller {
                    animation: roller 25.2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                }

                @keyframes roller {
                    /* Slot 1: Instagram */
                    0%, 11.9% { transform: translateY(0); }
                    14.3% { transform: translateY(-12.5%); } /* 1/8 total slots if loop is included */
                    
                    /* Slot 2: Threads */
                    14.3%, 26.2% { transform: translateY(-12.5%); }
                    28.6% { transform: translateY(-25%); }
                    
                    /* Slot 3: Facebook */
                    28.6%, 40.5% { transform: translateY(-25%); }
                    42.9% { transform: translateY(-37.5%); }
                    
                    /* Slot 4: Gmail */
                    42.9%, 54.8% { transform: translateY(-37.5%); }
                    57.1% { transform: translateY(-50%); }
                    
                    /* Slot 5: X (Twitter) */
                    57.1%, 69% { transform: translateY(-50%); }
                    71.4% { transform: translateY(-62.5%); }
                    
                    /* Slot 6: Reddit */
                    71.4%, 83.3% { transform: translateY(-62.5%); }
                    85.7% { transform: translateY(-75%); }
                    
                    /* Slot 7: Snapchat */
                    85.7%, 97.6% { transform: translateY(-75%); }
                    100% { transform: translateY(-87.5%); }
                }

                /* Mobile Adjustment for Slot Machine Container */
                @media (max-width: 768px) {
                    .animate-roller li {
                        font-size: inherit;
                    }
                }
            `}</style>
        </span>
    )
}
