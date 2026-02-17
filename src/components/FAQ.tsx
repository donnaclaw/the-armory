'use client'

import { motion } from "framer-motion"
import { ChevronDown, ShieldCheck, CreditCard, Lock, Mail, Zap } from "lucide-react"
import Link from "next/link"

const FAQS = [
    {
        question: "How do I use the 2FA?",
        answer: "Ensure you are using our internal <Link href='/tools/2fa-code-generator' class='text-[#4F46E5] hover:underline'>2FA TOOL</Link> page. If codes fail, contact <a href='https://t.me/luke_of' target='_blank' class='underline'>@luke_of</a> for a 24h replacement.",
        icon: Lock
    },
    {
        question: "What does OGE mean?",
        answer: "**Original Email (OGE)** access. This ensures you are the sole owner and the account cannot be recovered by others. We provide the login credentials for the email itself.",
        icon: Mail
    },
    {
        question: "Login Safety Protocols",
        answer: "Always use a high-quality residential proxy or **anti-detect browser** (GoLogin/AdsPower). Wait **24-48 hours** after the first login before performing aggressive actions like mass-following or link bio changes.",
        icon: ShieldCheck
    },
    {
        question: "Payment Methods",
        answer: "We accept all major **Cryptocurrencies** (BTC, ETH, LTC, USDT) and **Wise** payment links for instant processing. <br/><br/><span class='text-[#4F46E5] font-bold'>Conversion Bridge:</span> To ensure the fastest delivery, send a screenshot of your transaction to <a href='https://t.me/luke_of' target='_blank' class='underline'>@luke_of</a> on Telegram immediately after payment.",
        icon: CreditCard
    },
    {
        question: "Can I use these accounts for OFM or AI-Influencer models?",
        answer: "Yes. Our aged accounts are specifically vetted for high-trust environments like **OFM and AI-growth**, where fresh accounts are often instantly flagged by neural-behavioral analysis.",
        icon: ShieldCheck
    },
    {
        question: "Do the accounts come with followers?",
        answer: "We offer both **'Clean Slate'** aged accounts and **'Seeded'** accounts with followers. Check the individual card descriptions in our inventory for specific asset details.",
        icon: Lock
    },
    {
        question: "Is there a limit to how many accounts I can buy?",
        answer: "No. We handle bulk orders from **50 to 5,000+ units**. Contact us on Telegram for custom wholesale pricing and API access for mass deployment.",
        icon: Zap
    },
    {
        question: "What happens if the 2FA code doesn't work?",
        answer: "First, ensure you are using our built-in <Link href='/tools/2fa-code-generator' class='text-[#4F46E5] hover:underline'>2FA Generator Tool</Link>. Simply paste your secret key there to get your 6-digit code. If the code still fails, our 24h guarantee covers a full replacement. Contact @luke_of on Telegram immediately.",
        icon: ShieldCheck
    }
]

export function FAQ() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black text-white mb-12 text-center tracking-tighter uppercase">
                    PRO-VENDOR <span className="text-[#4F46E5]">KNOWLEDGE BASE</span>
                </h2>

                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass rounded-xl overflow-hidden group border border-white/5 hover:border-[#4F46E5]/30 transition-colors"
                        >
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-bold hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-[#4F46E5]">
                                            <faq.icon className="w-5 h-5" />
                                        </div>
                                        <span>{faq.question}</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-[#4F46E5]" />
                                </summary>
                                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 pl-[4.5rem]">
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
