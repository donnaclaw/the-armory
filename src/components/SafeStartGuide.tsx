'use client'

import { motion } from "framer-motion"
import { Globe, Clock, Flame } from "lucide-react"

const STEPS = [
    {
        icon: Globe,
        title: "1. SECURE PROXY",
        desc: "Always connect via high-quality 4G/5G mobile proxies matching the account region."
    },
    {
        icon: Clock,
        title: "2. GHOST MODE",
        desc: "Login and let the session rest for 24-48 hours. Do not engage immediately."
    },
    {
        icon: Flame,
        title: "3. WARM UP",
        desc: "Gradually increase activity. Like, scroll, and view stories before posting."
    }
]

export function SafeStartGuide() {
    return (
        <section className="py-20 px-4 border-t border-white/5 bg-black/40">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-white mb-12 tracking-wide">OPERATIONAL SECURITY PROTOCOLS</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="relative p-6 group"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-[#4F46E5]/10 flex items-center justify-center mb-6 group-hover:bg-[#4F46E5]/20 transition-colors border border-[#4F46E5]/20">
                                    <step.icon className="w-8 h-8 text-[#4F46E5]" aria-label={step.title} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
