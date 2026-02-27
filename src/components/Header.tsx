'use client'

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, MessageCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

type NavLink =
    | { name: string; href: string }
    | { name: string; targetId: string }

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()
    const pathname = usePathname()
    const router = useRouter()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20)
    })

    const handleScrollLink = (targetId: string) => {
        setMobileMenuOpen(false)

        if (pathname === '/') {
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push(`/#${targetId}`)
        }
    }

    const navLinks: NavLink[] = [
        { name: "IG AGED", targetId: "inventory" },
        { name: "THREADS CUSTOM", targetId: "inventory" },
        { name: "OTHER PLATFORMS", targetId: "inventory" },
        { name: "ABOUT", href: "/about" },
        { name: "ALPHA ACADEMY", href: "/blog" },
    ]

    const openSupport = () => {
        trackEvent("cta_telegram_click", { source: "header_live_support" })
        window.open('https://t.me/luke_of', '_blank')
    }

    return (
        <>
            <motion.header
                className={cn(
                    "sticky top-[20px] md:top-[20px] left-0 right-0 z-[100] transition-all duration-300 border-b mx-4 rounded-2xl",
                    "top-[60px] md:top-[20px]", // Offset for AnnouncementBar on mobile
                    scrolled
                        ? "bg-[#0B0B0B]/80 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-[#4F46E5]/5"
                        : "bg-transparent border-transparent py-4",
                    mobileMenuOpen && "opacity-0" // Hide background header when menu is open
                )}
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 group w-fit" aria-label="aged social media accounts marketplace">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 group-hover:border-[#4F46E5] transition-colors" aria-label="aged social media accounts marketplace">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black tracking-tighter text-white text-lg">THE ARMORY</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            "href" in link ? (
                                <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ) : (
                                <button key={link.name} onClick={() => handleScrollLink(link.targetId)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
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
                            onClick={openSupport}
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
                        className="fixed inset-0 z-[200] bg-[#0B0B0B] px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex items-center justify-between pt-8 mb-8">
                            <Link href="/" className="flex items-center gap-2 group w-fit" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20">
                                    <Shield className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-black tracking-tighter text-white text-lg uppercase">THE ARMORY</span>
                            </Link>
                            <button
                                className="text-white p-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                "href" in link ? (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-black text-white tracking-tight uppercase border-b border-white/5 pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => handleScrollLink(link.targetId)}
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
                                    openSupport()
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
