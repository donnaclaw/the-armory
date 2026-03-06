'use client'

import { useEffect, useMemo, useState } from 'react'
import * as OTPAuth from 'otpauth'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Shield, ArrowRight, Lock, Smartphone, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function getTokenState(secret: string, seconds: number) {
  if (!secret) {
    return {
      token: '',
      error: '',
      timeLeft: 30,
    }
  }

  try {
    const cleanKey = secret.replace(/\s+/g, '').toUpperCase()
    const totp = new OTPAuth.TOTP({ secret: cleanKey })
    const token = totp.generate({ timestamp: seconds * 1000 })

    return {
      token,
      error: '',
      timeLeft: 30 - (seconds % 30),
    }
  } catch {
    return {
      token: '',
      error: 'Invalid Secret Key. Please check the format.',
      timeLeft: 30,
    }
  }
}

export default function TwoFactorGeneratorClient() {
  const [secret, setSecret] = useState('')
  const [copied, setCopied] = useState(false)
  const [tick, setTick] = useState(() => Math.floor(Date.now() / 1000))

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(Math.floor(Date.now() / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const tokenState = useMemo(() => {
    return getTokenState(secret, tick)
  }, [secret, tick])

  const copyToClipboard = () => {
    if (!tokenState.token) return
    navigator.clipboard.writeText(tokenState.token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tools" className="hover:text-white transition-colors">
                Tools
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#4F46E5]">2FA Generator</li>
          </ol>
        </nav>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            Infrastructure Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
            Free <span className="text-[#4F46E5]">2FA Code</span> Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Paste your secret key and generate a fresh 6-digit code every 30 seconds. Everything runs in your browser.
          </p>
        </div>

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
                  aria-label="2FA secret key input"
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
              {tokenState.error && <p className="text-red-500 text-xs font-bold">{tokenState.error}</p>}
            </div>

            <AnimatePresence mode="wait">
              {tokenState.token ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-black/60 rounded-2xl p-8 text-center border border-[#4F46E5]/20 relative group">
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-4">Your Auth Code</div>
                    <div className="text-6xl md:text-7xl font-black text-white tracking-[0.1em] font-mono">
                      {tokenState.token.slice(0, 3)} {tokenState.token.slice(3)}
                    </div>

                    <div className="mt-8 h-1 w-48 mx-auto bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#4F46E5]"
                        animate={{ width: `${(tokenState.timeLeft / 30) * 100}%` }}
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500 uppercase font-bold">
                      Expires in {tokenState.timeLeft}s
                    </div>

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
              Browse our premium inventory with pre-configured 2FA and OGE access for cleaner operations.
            </p>
          </div>
          <Link href="/#inventory" className="w-full md:w-auto">
            <Button className="w-full px-12 py-6 bg-[#4F46E5] hover:bg-[#4338ca] shadow-[0_0_30px_rgba(79,70,229,0.4)]">
              BROWSE INVENTORY
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">How to use this 2FA code generator</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Paste your base32 secret key, copy the active code, and use it right away. Codes rotate every 30 seconds.
              This is useful when you manage aged or custom account stacks and need quick login verification.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Privacy and security</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              This tool runs locally in your browser. Secret keys are not sent to our servers and are not stored in a database.
              Always keep your recovery backups safe and rotate compromised secrets immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Common 2FA errors</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              If the code fails, the most common causes are an invalid secret format, expired code window, or device clock drift.
              Re-check spacing, paste the full secret, and try the next 30-second code.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Related account workflows</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Running this tool with the right account setup improves login stability. Explore
              {' '}
              <Link href="/buy/instagram" className="text-[#4F46E5] hover:underline">aged Instagram accounts</Link>
              {' '}
              and
              {' '}
              <Link href="/buy/threads" className="text-[#4F46E5] hover:underline">aged Threads accounts</Link>
              {' '}
              or read implementation guides in
              {' '}
              <Link href="/blog" className="text-[#4F46E5] hover:underline">Alpha Academy</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
