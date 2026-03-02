import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Shield, ArrowLeft, Calendar, User, Clock, Share2, Award, ArrowRight } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/Button"
import { ARTICLES } from "@/lib/blog-data"
import { KeyFindings } from "@/components/blog/KeyFindings"
import { InteractiveChecklist } from "@/components/blog/InteractiveChecklist"
import { ProductBridge } from "@/components/blog/ProductBridge"
import { ArticleContent } from "@/components/blog/ArticleContent"
import { SlotMachineText } from "@/components/SlotMachineText"
import { ComparisonTable } from "@/components/blog/ComparisonTable"
import { buildPageMetadata, DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/seo"
import { TrackedLink } from "@/components/TrackedLink"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

function parseToISO(dateValue?: string): string | undefined {
    if (!dateValue) return undefined
    const parsed = new Date(dateValue)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

export async function generateStaticParams() {
    return Object.keys(ARTICLES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const article = ARTICLES[slug]

    if (!article) return { title: 'Not Found' }

    const defaultDescription = article.intro.length > 155 ? article.intro.substring(0, 155) + '...' : article.intro
    const description = article.seo?.metaDescription ?? `${defaultDescription} Expert guide by ${article.author}.`
    const publishedTime = article.seo?.publishedAtISO ?? parseToISO(article.date)

    return buildPageMetadata({
        title: article.seo?.metaTitle ?? `${article.title} | Alpha Academy Authority Guide`,
        description,
        path: `/blog/${slug}`,
        type: "article",
        keywords: article.seo?.keywords,
        languages: {
            "en-US": `/blog/${slug}`,
        },
        publishedTime,
        authors: [article.author],
    })
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params
    const article = ARTICLES[slug]

    if (!article) notFound()
    const canonicalUrl = toAbsoluteUrl(`/blog/${slug}`)
    const publishedAtISO = article.seo?.publishedAtISO ?? parseToISO(article.date)
    const modifiedAtISO = article.seo?.modifiedAtISO ?? publishedAtISO
    const schemaDescription = article.seo?.metaDescription ?? article.intro
    const imageUrl = article.images?.[0]?.url ? toAbsoluteUrl(article.images[0].url) : toAbsoluteUrl(DEFAULT_OG_IMAGE)

    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            {/* Article Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": article.title,
                        "description": schemaDescription,
                        "datePublished": publishedAtISO,
                        "dateModified": modifiedAtISO,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": canonicalUrl
                        },
                        "author": {
                            "@type": "Person",
                            "name": article.author,
                            "jobTitle": article.authorRole
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "The Armory",
                            "logo": {
                                "@type": "ImageObject",
                                "url": toAbsoluteUrl("/icon.svg")
                            }
                        },
                        "image": [imageUrl],
                        "keywords": article.seo?.keywords
                    })
                }}
            />

            <article className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#4F46E5] text-xs font-bold uppercase tracking-widest mb-12 hover:opacity-70 transition-opacity font-sans">
                    <ArrowLeft className="w-3 h-3" />
                    Back to Knowledge Base
                </Link>

                {/* Header Information */}
                <header className="space-y-8 mb-12">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-[10px] font-black uppercase tracking-widest">
                            {article.topicCluster}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                        {article.slotWords && article.slotWords.length > 0 ? (
                            <>
                                {article.title.split('AGED').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <SlotMachineText
                                                words={article.slotWords}
                                                className="text-4xl md:text-5xl"
                                            />
                                        )}
                                    </span>
                                ))}
                            </>
                        ) : (
                            article.title
                        )}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-4 font-sans">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-[#4F46E5]" />
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4F46E5] to-black border border-white/20 flex items-center justify-center overflow-hidden">
                                <User className="w-2 h-2 text-white" />
                            </div>
                            <span className="text-white">BY {article.author}</span>
                            <span className="text-gray-600 block md:inline">— {article.authorRole}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-[#4F46E5]" />
                            {article.readTime}
                        </div>
                    </div>
                </header>

                {/* Content Intro */}
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 border-l-4 border-[#4F46E5] mb-12">
                    <p className="text-white text-lg font-medium leading-relaxed italic">
                        &ldquo;{article.intro}&rdquo;
                    </p>
                </div>

                {/* TL;DR Key Findings */}
                <KeyFindings findings={article.keyFindings} />

                {/* Article Images (Top) */}
                {article.images && article.images.length > 0 && (
                    <div className="my-12 space-y-8">
                        {article.images.map((img, i) => (
                            <figure key={i} className="group">
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={img.url}
                                        alt={img.caption}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 768px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <figcaption className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-[#4F46E5]" />
                                    {img.caption}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                )}

                {/* Article Content */}
                <ArticleContent content={article.content} />

                {/* Conditional Comparison Table for Technical Pillars */}
                {(article.slug === 'oge-security-math' || article.slug === 'shadowban-myth-technical' || article.slug === 'threads-ranking-update-2026-aged-accounts') && <ComparisonTable />}

                {/* Interactive Trust Section */}
                <InteractiveChecklist
                    title={article.checklist.title}
                    items={article.checklist.items}
                />

                {/* Inline Product Bridge */}
                <ProductBridge
                    title={article.productBridge.title}
                    description={article.productBridge.description}
                    link={article.productBridge.link}
                />

                {/* Expert Byline & Bio */}
                <footer className="mt-20 pt-16 border-t border-white/5">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-black flex items-center justify-center border border-white/20 flex-shrink-0">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-white font-black uppercase tracking-tight text-xl">{article.author}</h4>
                                <p className="text-[#4F46E5] text-xs font-black uppercase tracking-widest">Lead Asset Architect</p>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Managing 10,000+ social assets since 2017. Specialist in high-trust legacy accounts and automation skip-logic. Luke handles the infrastructure that powers some of the largest mass-outreach operations globally.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <Link href="https://t.me/luke_of" target="_blank" className="text-white hover:text-[#4F46E5] transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </Link>
                                <TrackedLink
                                    href="/#inventory"
                                    className="text-xs font-black text-white border-b-2 border-[#4F46E5] pb-1 hover:text-[#4F46E5] transition-colors"
                                    eventName="blog_to_buy_click"
                                    eventProps={{ source: "blog_author_footer_inventory", slug }}
                                >
                                    VIEW INVENTORY
                                </TrackedLink>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* CTA Box / Conversion Bridge */}
                {article.cta ? (
                    <div className="mt-16 p-10 rounded-3xl bg-white/5 border border-[#4F46E5]/30 relative overflow-hidden group text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-transparent" />
                        <div className="relative z-10 space-y-6">
                            <Shield className="w-10 h-10 text-[#4F46E5] mx-auto mb-4" />
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                                {article.cta.text}
                            </h3>
                            <p className="text-gray-400 text-sm max-w-md mx-auto">
                                Secure your heritage infrastructure today. Deployment is instant, root security is guaranteed.
                            </p>
                            <TrackedLink
                                href={article.cta.link}
                                className="inline-block pt-4"
                                eventName="blog_to_buy_click"
                                eventProps={{ source: "blog_post_cta", slug }}
                            >
                                <Button className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 px-12 py-7 font-black uppercase tracking-widest text-xs rounded-full shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] group-hover:scale-105 transition-all">
                                    ENTER THE ARMORY
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </TrackedLink>
                        </div>
                    </div>
                ) : (
                    <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Need a Custom Setup?</h3>
                                <p className="text-white/80 text-sm font-medium">Get a direct blueprint for your specific operation.</p>
                            </div>
                            <Link href="https://t.me/luke_of" target="_blank">
                                <Button className="bg-white text-[#4F46E5] hover:bg-white/90 px-10 py-6 font-black uppercase tracking-widest text-xs">
                                    CONSULT LUKE
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Related Articles Cross-Links */}
                <div className="mt-16 pt-12 border-t border-white/5 space-y-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                        Continue Reading in <span className="text-[#4F46E5]">Alpha Academy</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(ARTICLES)
                            .filter(a => a.slug !== slug)
                            .slice(0, 4)
                            .map((related, i) => (
                                <Link
                                    key={i}
                                    href={`/blog/${related.slug}`}
                                    className="flex items-center justify-between p-5 bg-[#0f0f0f] border border-white/5 rounded-xl hover:border-[#4F46E5]/30 transition-all group"
                                >
                                    <div>
                                        <div className="text-[9px] font-black text-[#4F46E5] uppercase tracking-widest mb-1">{related.topicCluster}</div>
                                        <span className="text-sm text-gray-300 font-bold group-hover:text-white transition-colors">{related.title}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[#4F46E5] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                                </Link>
                            ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                        <TrackedLink href="/buy/instagram" className="text-xs text-gray-500 hover:text-[#4F46E5] transition-colors font-bold" eventName="blog_to_buy_click" eventProps={{ source: "blog_related_buy_ig", slug }}>Buy Aged Instagram →</TrackedLink>
                        <TrackedLink href="/buy/threads" className="text-xs text-gray-500 hover:text-[#4F46E5] transition-colors font-bold" eventName="blog_to_buy_click" eventProps={{ source: "blog_related_buy_threads", slug }}>Buy Threads Accounts →</TrackedLink>
                        <TrackedLink href="/buy/facebook" className="text-xs text-gray-500 hover:text-[#4F46E5] transition-colors font-bold" eventName="blog_to_buy_click" eventProps={{ source: "blog_related_buy_facebook", slug }}>Buy Aged Facebook →</TrackedLink>
                        <TrackedLink href="/buy/gmail" className="text-xs text-gray-500 hover:text-[#4F46E5] transition-colors font-bold" eventName="blog_to_buy_click" eventProps={{ source: "blog_related_buy_gmail", slug }}>Buy Aged Gmail →</TrackedLink>
                        <TrackedLink href="/buy/x" className="text-xs text-gray-500 hover:text-[#4F46E5] transition-colors font-bold" eventName="blog_to_buy_click" eventProps={{ source: "blog_related_buy_x", slug }}>Buy Aged X/Twitter →</TrackedLink>
                    </div>
                </div>
            </article>
        </main>
    )
}
