import Link from 'next/link'
import { BookOpen, ArrowRight } from "lucide-react"
import { Metadata } from 'next'
import { ARTICLES } from "@/lib/blog-data"
import { buildPageMetadata } from "@/lib/seo"
import { TrackedLink } from "@/components/TrackedLink"

export const metadata: Metadata = buildPageMetadata({
    title: "Alpha Academy | Specialized Knowledge Base for Social Automation",
    description: "Educational resources for social media automation, multi-account infrastructure, and elite operational security.",
    path: "/blog",
})

const articleList = Object.values(ARTICLES)

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
                        Data-driven operational protocols for social media automation, multi-account infrastructure, and identity security.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articleList.map((article, i) => (
                        <Link
                            key={i}
                            href={`/blog/${article.slug}`}
                            className="group relative bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 hover:border-[#4F46E5]/50 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {article.icon && <article.icon className="w-4 h-4 text-white" />}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">
                                        {article.topicCluster}
                                    </div>
                                </div>
                                <h2 className="text-xl font-black text-white mb-3 group-hover:text-[#4F46E5] transition-colors leading-tight uppercase tracking-tighter">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                                    {article.intro}
                                </p>
                            </div>
                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-black text-white uppercase tracking-widest group-hover:mr-2 transition-all">Deep Dive</span>
                                <ArrowRight className="w-4 h-4 text-[#4F46E5] transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Help */}
                <div className="p-12 rounded-3xl bg-gradient-to-r from-[#4F46E5]/10 to-transparent border border-[#4F46E5]/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="w-3 h-3 rounded-full bg-[#4F46E5] animate-pulse" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Custom Operational Audits</h3>
                        </div>
                        <p className="text-gray-400 max-w-md">Our lead architects provide specialized consulting for high-velocity social operations scaling beyond 1,000+ assets.</p>
                        <TrackedLink
                            href="/tools"
                            eventName="blog_to_buy_click"
                            eventProps={{ source: "blog_index_tools_hub" }}
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4F46E5] hover:text-white transition-colors"
                        >
                            Explore Tools Hub
                            <ArrowRight className="w-3 h-3" />
                        </TrackedLink>
                    </div>
                    <TrackedLink
                        href="https://t.me/luke_of"
                        target="_blank"
                        eventName="cta_telegram_click"
                        eventProps={{ source: "blog_index_consult" }}
                    >
                        <button className="px-12 py-5 bg-[#4F46E5] rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-[#4338ca] transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                            CONSULT LEAD ARCHITECT
                        </button>
                    </TrackedLink>
                </div>
            </div>
        </main>
    )
}
