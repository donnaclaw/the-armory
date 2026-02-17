'use client'

import { useState, useEffect } from 'react'
import * as OTPAuth from 'otpauth'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Copy, Check, Shield, ArrowRight, RefreshCw, Lock, Smartphone, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function TwoFactorGenerator() {
    const [secret, setSecret] = useState('')
    const [token, setToken] = useState('')
    const [timeLeft, setTimeLeft] = useState(30)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')

    const generateToken = (key: string) => {
        if (!key) {
            setToken('')
            setError('')
            return
        }

        try {
            // Clean the key (remove spaces)
            const cleanKey = key.replace(/\s+/g, '').toUpperCase()
            const totp = new OTPAuth.TOTP({
                secret: cleanKey,
            })
            const newToken = totp.generate()
            setToken(newToken)
            setError('')

            // Calculate time left (TOTP default period is 30s)
            const seconds = Math.floor(Date.now() / 1000)
            setTimeLeft(30 - (seconds % 30))
        } catch (err) {
            setToken('')
            setError('Invalid Secret Key. Please check the format.')
        }
    }

    useEffect(() => {
        if (secret) {
            generateToken(secret)
        }

        const timer = setInterval(() => {
            if (secret) {
                generateToken(secret)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [secret])

    const copyToClipboard = () => {
        if (!token) return
        navigator.clipboard.writeText(token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
                        <Lock className="w-3 h-3" />
                        Infrastructure Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                        Free <span className="text-[#4F46E5]">2FA Code</span> Generator
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Verify your aged account credentials instantly. No data leaves your browser—computation is strictly local.
                    </p>
                </div>

                {/* Tool Card */}
                <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                        <Shield className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Paste 2FA Secret Key
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    placeholder="JBSWY3DPEHPK3PXP..."
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#4F46E5]/50 transition-colors font-mono uppercase"
                                />
                                {secret && (
                                    <button
                                        onClick={() => setSecret('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                        </div>

                        <AnimatePresence mode="wait">
                            {token ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-black/60 rounded-2xl p-8 text-center border border-[#4F46E5]/20 relative group">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-4">Your Auth Code</div>
                                        <div className="text-6xl md:text-7xl font-black text-white tracking-[0.1em] font-mono">
                                            {token.slice(0, 3)} {token.slice(3)}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-8 h-1 w-48 mx-auto bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#4F46E5]"
                                                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                                                transition={{ duration: 1, ease: "linear" }}
                                            />
                                        </div>
                                        <div className="mt-2 text-[10px] text-gray-500 uppercase font-bold">Expires in {timeLeft}s</div>

                                        <button
                                            onClick={copyToClipboard}
                                            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5]/10 hover:bg-[#4F46E5]/20 border border-[#4F46E5]/30 rounded-xl text-[#4F46E5] text-xs font-bold uppercase transition-all"
                                        >
                                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            {copied ? 'Copied' : 'Copy Code'}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-48 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-600 gap-3">
                                    <Smartphone className="w-8 h-8 opacity-20" />
                                    <p className="text-sm font-bold uppercase tracking-widest opacity-40">Awaiting Secret Key</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* The 'Buy' Bridge Banner */}
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#4F46E5]/20 via-black to-black border border-[#4F46E5]/30 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
                            <Zap className="w-4 h-4" />
                            Upgrade Your Infrastructure
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
                            Need more <span className="text-[#4F46E5]">high-trust aged assets?</span>
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Browse our premium 2010-2026 Inventory with pre-configured 2FA and OGE access. High trust, zero friction.
                        </p>
                    </div>
                    <Link href="/#account-types" className="w-full md:w-auto">
                        <Button className="w-full px-12 py-6 bg-[#4F46E5] hover:bg-[#4338ca] shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                            BROWSE INVENTORY
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>

                {/* SoftwareApplication Schema for SEO Ranking */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": "The Armory 2FA Generator",
                            "operatingSystem": "Web Browser",
                            "applicationCategory": "SecurityApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "featureList": [
                                "Local browser computation",
                                "RFC 6238 Standard",
                                "Instant TOTP Generation",
                                "Zero-Server Storage"
                            ]
                        })
                    }}
                />

                {/* SEO Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">How to use the 2FA Verifier</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            When you purchase a premium aged account from The Armory, you receive a **2FA Secret Key** (often a string of 16-32 characters). Simply paste that key into the field above to generate your current 6-digit login code. This tool follows the RFC 6238 standard for Time-Based One-Time Passwords (TOTP).
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Privacy & Security Notice</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Unlike other online verifiers, The Armory 2FA Generator performs all logic within your local browser's memory. Your secret keys are **never sent to our servers** or stored in any database. This is a client-side utility designed for maximum operational security.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
