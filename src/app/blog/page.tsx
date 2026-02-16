import Link from 'next/link'
import { motion } from "framer-motion"
import { BookOpen, ArrowRight, Shield, Zap, Lock } from "lucide-react"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Alpha Academy | Specialized Knowledge Base for Social Automation",
    description: "Educational resources for social media automation, multi-account infrastructure, and elite operational security.",
}

const ARTICLES = [
    {
        slug: "warmup-rule-2026",
        title: "The 24-Hour Warmup Rule: How to Prevent Instant Bans in 2026.",
        desc: "Master the critical first 24 hours of account deployment to ensure 100% survival rates.",
        tag: "Safety",
        icon: Shield,
        date: "Feb 17, 2026"
    },
    {
        slug: "threads-vs-x-ofm",
        title: "Threads vs. Twitter/X: Which strategy converts better for OFM?",
        desc: "A data-driven comparison of conversion rates and account longevity for model management.",
        tag: "Strategy",
        icon: Zap,
        date: "Feb 17, 2026"
    },
    {
        slug: "shadowban-recovery-guide",
        title: "Shadowban Recovery: How to save a flagged account.",
        desc: "Stop wasting assets. Learn the technical verification steps to lift flags and restore reach.",
        tag: "Recovery",
        icon: Lock,
        date: "Feb 16, 2026"
    },
    {
        slug: "proxy-guide-instagram",
        title: "The Proxy Guide: Residential vs. 4G Proxies for Instagram.",
        desc: "Why your choice of IP infrastructure is the deciding factor in account trust scoring.",
        tag: "Infrastructure",
        icon: Shield,
        date: "Feb 16, 2026"
    },
    {
        slug: "aged-account-scaling-100",
        title: "Aged Account Scaling: Moving from 1 to 100 Profitable Assets.",
        desc: "The roadmap for agencies scaling mass outreach without increasing detection risk.",
        tag: "Scaling",
        icon: Zap,
        date: "Feb 15, 2026"
    },
    {
        slug: "bypass-instagram-ai-detection",
        title: "How to bypass Instagram 2026 AI-detection using aged accounts.",
        desc: "Learn why legacy metadata is the only way to survive the new neural-behavioral filters.",
        tag: "Security",
        icon: Shield,
        date: "Feb 16, 2026"
    },
    {
        slug: "anti-detect-browsers-guide",
        title: "The ultimate guide to Anti-detect browsers for account management.",
        desc: "Everything you need to know about fingerprinting, proxy setup, and maintaining separate digital identities.",
        icon: Zap,
        tag: "Infrastructure"
    },
    {
        slug: "oge-security-guide",
        title: "Why OGE (Original Email) is the only way to prevent account recovery scams.",
        desc: "Understanding the chain of custody for premium social assets and why original email access is your only defense against pullbacks.",
        icon: Lock,
        tag: "Security"
    }
]

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
                        <BookOpen className="w-3 h-3" />
                        Alpha Academy
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                        The Specialized <span className="text-[#4F46E5]">Knowledge Base</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Educational resources for social media automation, multi-account infrastructure, and elite operational security.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ARTICLES.map((article, i) => (
                        <Link
                            key={i}
                            href={`/blog/${article.slug}`}
                            className="group relative bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 hover:border-[#4F46E5]/50 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {article.icon && <article.icon className="w-4 h-4 text-white" />}
                                </div>
                                <div className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">{article.tag}</div>
                                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#4F46E5] transition-colors leading-tight">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                                    {article.desc}
                                </p>
                            </div>
                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:mr-2 transition-all">Read Article</span>
                                <ArrowRight className="w-4 h-4 text-[#4F46E5] transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Help */}
                <div className="p-12 rounded-3xl bg-gradient-to-r from-[#4F46E5]/10 to-transparent border border-[#4F46E5]/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Need custom guidance?</h3>
                        <p className="text-gray-400">Our agents provide specialized consulting for large-scale social operations.</p>
                    </div>
                    <Link href="https://t.me/luke_of" target="_blank">
                        <button className="px-8 py-4 bg-[#4F46E5] rounded-xl text-white font-bold hover:bg-[#4338ca] transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                            CONTACT SUPPORT
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
