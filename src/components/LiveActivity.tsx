'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Zap, Globe, ArrowRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface Activity {
    text: string
    targetId: string
    location: string
}

const LOCATIONS = [
    'Los Angeles, USA', 'Dubai, UAE', 'London, UK', 'Lisbon, Portugal', 'Milan, Italy',
    'Singapore', 'Berlin, Germany', 'Sydney, Australia', 'Austin, USA', 'Riyadh, Saudi Arabia',
    'Toronto, Canada', 'Amsterdam, Netherlands', 'Hong Kong', 'Barcelona, Spain', 'Zurich, Switzerland',
    'São Paulo, Brazil', 'Seoul, South Korea', 'Tel Aviv, Israel', 'Stockholm, Sweden', 'Paris, France'
]

const PLATFORMS = [
    { name: 'INSTAGRAM', target: 'ig-heritage', asset: 'AGED INSTAGRAM' },
    { name: 'THREADS', target: 'threads-custom', asset: 'AGED THREADS' },
    { name: 'GMAIL', target: 'multi-platform', asset: 'AGED GMAIL (OGE)' },
    { name: 'FB BM', target: 'multi-platform', asset: 'AGED FB BM' },
    { name: 'REDDIT', target: 'multi-platform', asset: 'AGED REDDIT' }
]

const ORDER_TYPES = [
    { type: 'Agency Order', min: 100, max: 500 },
    { type: 'Whale Purchase', min: 200, max: 1000 },
    { type: 'Bulk Purchase', min: 50, max: 300 },
    { type: 'Individual Order', min: 5, max: 25 },
    { type: 'New Transaction', min: 10, max: 50 }
]

export function LiveActivity() {
    const [activity, setActivity] = useState<Activity | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [userLocation, setUserLocation] = useState<string | null>(null)
    const notificationCount = useRef(0)
    const router = useRouter()
    const pathname = usePathname()

    const generateActivity = useCallback((isFirst = false) => {
        const orderType = ORDER_TYPES[Math.floor(Math.random() * ORDER_TYPES.length)]
        const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)]
        const quantity = Math.floor(Math.random() * (orderType.max - orderType.min + 1) + orderType.min)
        const year = Math.floor(Math.random() * (2024 - 2010 + 1) + 2010)

        let location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

        // Use user location for first notification or every 5th one
        if ((isFirst || notificationCount.current % 5 === 0) && userLocation) {
            location = userLocation
        }

        const text = `${orderType.type}: ${quantity}x ${platform.asset} (${year}) delivered to ${location}`

        notificationCount.current += 1

        return {
            text,
            targetId: platform.target,
            location
        }
    }, [userLocation])

    useEffect(() => {
        // Fetch Geo-location with fallback safety
        const fetchGeo = async () => {
            try {
                // Using ipapi.co which is lightweight and often doesn't require keys for low volume
                const res = await fetch('https://ipapi.co/json/')
                const data = await res.json()
                if (data.city && data.country_name) {
                    setUserLocation(`${data.city}, ${data.country_name}`)
                } else {
                    setUserLocation('Dubai, UAE')
                }
            } catch {
                // Fallback to a global hub if API fails
                setUserLocation('Dubai, UAE')
            }
        }

        let cancelled = false

        const runGeo = async () => {
            if (cancelled) return
            await fetchGeo()
        }

        const requestIdle = typeof window.requestIdleCallback === 'function'
            ? window.requestIdleCallback.bind(window)
            : null

        if (requestIdle) {
            const idleId = requestIdle(() => {
                void runGeo()
            })

            return () => {
                cancelled = true
                window.cancelIdleCallback(idleId)
            }
        }

        const timeout = window.setTimeout(() => {
            void runGeo()
        }, 1200)

        return () => {
            cancelled = true
            window.clearTimeout(timeout)
        }
    }, [])

    const showNextActivity = useCallback(() => {
        setIsVisible(false)
        // Set next interval between 11s and 32s
        const nextInterval = Math.floor(Math.random() * (32000 - 11000 + 1) + 11000)

        setTimeout(() => {
            setActivity(generateActivity())
            setIsVisible(true)
        }, 1000)

        return nextInterval
    }, [generateActivity])

    useEffect(() => {
        // Initial Notification after 25s
        const initialTimer = setTimeout(() => {
            setActivity(generateActivity(true))
            setIsVisible(true)

            // Start the cycle after the first one pops up
            // We wait for the first one to be visible, then schedule the next
            const scheduleNext = () => {
                const delay = showNextActivity()
                intervalId = setTimeout(scheduleNext, delay)
            }

            const firstIntervalDelay = Math.floor(Math.random() * (32000 - 11000 + 1) + 11000)
            intervalId = setTimeout(scheduleNext, firstIntervalDelay)
        }, 25000)

        let intervalId: NodeJS.Timeout

        return () => {
            clearTimeout(initialTimer)
            if (intervalId) clearTimeout(intervalId)
        }
    }, [generateActivity, showNextActivity])

    const handleAction = () => {
        if (!activity) return
        if (pathname === '/') {
            const element = document.getElementById(activity.targetId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push(`/#${activity.targetId}`)
        }
    }

    return (
        <div className="fixed bottom-[80px] left-5 md:bottom-8 md:left-8 z-50 pointer-events-none">
            <AnimatePresence mode="wait">
                {isVisible && activity && (
                    <motion.div
                        key={activity.text}
                        drag="x"
                        dragConstraints={{ left: 0, right: 100 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.x > 50) setIsVisible(false)
                        }}
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.2 } }}
                        className="live-activity-toast bg-[#0b0b0b]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-[0_20px_50px_rgba(79,70,229,0.2)] min-w-fit max-w-[90vw] md:max-w-md cursor-pointer hover:border-[#4F46E5]/40 transition-all group active:scale-95 pointer-events-auto"
                        onClick={handleAction}
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#4F46E5]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-10 h-10 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center shrink-0 relative">
                            <Zap className="w-5 h-5 text-[#4F46E5]" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0B0B0B] rounded-full border border-white/10 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            </div>
                        </div>

                        <div className="space-y-1 relative z-10 min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-[0.2em] whitespace-nowrap">
                                    System Operational
                                </span>
                                <Globe className="w-3 h-3 text-gray-600 shrink-0" />
                            </div>

                            <p className="text-white text-[11px] md:text-xs font-bold leading-tight whitespace-nowrap overflow-hidden">
                                {activity.text}
                            </p>

                            <div className="flex items-center gap-2 pt-1">
                                <div className="flex items-center gap-1 text-[9px] text-gray-500 font-black uppercase tracking-widest whitespace-nowrap">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    SECURED
                                </div>
                                <div className="h-1 w-1 rounded-full bg-white/10 shrink-0" />
                                <span className="text-[9px] text-gray-600 font-medium truncate">{activity.location}</span>
                            </div>
                        </div>

                        {/* Desktop Click Indicator */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                            <ArrowRight className="w-4 h-4 text-[#4F46E5]/30" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
