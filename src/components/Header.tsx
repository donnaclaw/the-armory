'use client'

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, MessageCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20)
    })

    // Smooth scroll handler
    const scrollToInventory = (e: React.MouseEvent) => {
        e.preventDefault()
        setMobileMenuOpen(false)
        const element = document.getElementById('account-types')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const navLinks = [
        { name: "IG AGED", onClick: scrollToInventory },
        { name: "THREADS CUSTOM", onClick: scrollToInventory },
        { name: "OTHER PLATFORMS", onClick: scrollToInventory },
        { name: "ALPHA ACADEMY", href: "/blog" },
        { name: "FAQ", href: "/faq", onClick: (e: React.MouseEvent) => { e.preventDefault(); setMobileMenuOpen(false); document.querySelector('.group-open\\:rotate-180')?.scrollIntoView({ behavior: 'smooth' }) } },
    ]

    return (
        <>
            <motion.header
                className={cn(
                    "sticky top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
                    scrolled
                        ? "bg-[#0B0B0B]/80 backdrop-blur-xl border-white/10 py-4 shadow-lg shadow-[#4F46E5]/5"
                        : "bg-transparent border-transparent py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 group z-[110]">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 group-hover:border-[#4F46E5] transition-colors">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black tracking-tighter text-white text-lg">THE ARMORY</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.href ? (
                                <Link key={link.name} href={link.href} onClick={link.onClick} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ) : (
                                <button key={link.name} onClick={link.onClick} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    {link.name}
                                </button>
                            )
                        ))}
                        <Link href="/tools/2fa-code-generator" className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20 hover:bg-[#4F46E5] hover:text-white transition-all">
                            2FA TOOL
                        </Link>
                    </nav>

                    {/* Action & Mobile Toggle */}
                    <div className="flex items-center gap-4 z-[110]">
                        <Button
                            variant="outline"
                            className="hidden md:flex h-9 text-xs border-[#4F46E5]/50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
                            onClick={() => window.open('https://t.me/luke_of', '_blank')}
                        >
                            <MessageCircle className="w-3 h-3 mr-2" />
                            LIVE SUPPORT
                        </Button>

                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-[#0B0B0B] pt-28 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                link.href ? (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => {
                                            if (link.onClick) link.onClick({} as any);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-2xl font-black text-white tracking-tight uppercase border-b border-white/5 pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={link.onClick}
                                        className="text-2xl font-black text-white text-left tracking-tight uppercase border-b border-white/5 pb-4"
                                    >
                                        {link.name}
                                    </button>
                                )
                            ))}
                            <Link
                                href="/tools/2fa-code-generator"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-black text-[#4F46E5] tracking-tight uppercase border-b border-white/5 pb-4"
                            >
                                2FA TOOL
                            </Link>

                            <Button
                                className="mt-8 h-14 text-lg font-bold"
                                onClick={() => {
                                    window.open('https://t.me/luke_of', '_blank');
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <MessageCircle className="w-5 h-5 mr-3" />
                                LIVE SUPPORT
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
