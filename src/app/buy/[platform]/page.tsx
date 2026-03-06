import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, Shield, ArrowRight, Star, ChevronRight } from 'lucide-react'
import { buildPageMetadata, toAbsoluteUrl } from '@/lib/seo'
import { getBuyPlatformModifiedAtISO } from '@/lib/buy-seo-data'
import { TrackedLink } from '@/components/TrackedLink'

interface PageProps {
    params: Promise<{
        platform: string
    }>
}

const PLATFORM_DATA: Record<string, {
    title: string
    h1: string
    description: string
    metaDescription: string
    intro: string
    features: string[]
    useCases: string[]
    priceRange: string
    stock: string
    years: number[]
    relatedArticles: { title: string; slug: string }[]
}> = {
    instagram: {
        title: "Buy Aged Instagram Accounts",
        h1: "Buy Aged Instagram Accounts (2010-2026)",
        description: "OGE & 2FA verified aged Instagram accounts for brand authority, OFM, AI operations, and mass marketing.",
        metaDescription: "Buy aged Instagram accounts from 2010-2026 with Original Email (OGE) and 2FA codes. High-trust heritage assets for marketing, OFM, and AI influencer operations. Bulk discounts for 50+ units.",
        intro: "Instagram's algorithmic trust system heavily favors accounts with established history. Fresh accounts registered in 2024-2026 face immediate velocity limits, shadowbans, and 'Suspicious Activity' locks when performing high-volume outreach. Our aged Instagram accounts from 2010-2026 carry a legacy behavioral footprint — years of organic interactions, follows, and session data — that acts as an invisible shield against modern AI detection. Whether you're running OFM funnels, scaling AI-influencer profiles, or building brand authority, heritage assets are the foundation of every successful operation. Each account is delivered with full Original Email (OGE) access and 2FA codes, ensuring you have complete, irreversible ownership from day one.",
        features: [
            "Original Email (OGE) — Full root access",
            "2FA Authentication Codes included",
            "Phone Verified (PVA) status",
            "Warm-up guide included with every order",
            "24-hour replacement guarantee",
            "Instant delivery via Telegram",
            "Anti-detect browser compatibility",
            "Bulk pricing for 50+ units (20% OFF)"
        ],
        useCases: [
            "OFM (OnlyFans Management) outreach funnels",
            "AI-Influencer profile deployment",
            "Brand authority and credibility building",
            "Mass DM campaigns with shadowban resistance",
            "Affiliate marketing and CPA networks",
            "E-commerce store social proof"
        ],
        priceRange: "From $2.00",
        stock: "834+ in stock",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "The 2026 OFM Survival Guide", slug: "ofm-survival-guide-2026" },
            { title: "OGE vs. Non-OGE: Security Math", slug: "oge-security-math" },
            { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
            { title: "Shadowban Recovery Guide", slug: "shadowban-recovery-guide" }
        ]
    },
    threads: {
        title: "Buy Aged Threads Accounts",
        h1: "Buy Custom Threads Accounts — Linked to Aged IG",
        description: "Pre-warmed Threads accounts connected to heritage Instagram profiles. Custom bio, profile photo, and 3-day warmup included.",
        metaDescription: "Buy custom Threads accounts linked to aged Instagram profiles (2010-2026). Pre-warmed with custom bio and profile setup. Perfect for AI influencers, OFM, and mass outreach. 20% bulk discount.",
        intro: "Threads is in its 'Growth Phase,' where the algorithm rewards engagement from trusted accounts. Deploying on Threads without an Instagram heritage backbone means instant throttling by the bot detection system. Our custom Threads accounts are linked to aged IG profiles from 2012-2026, giving each account a 'Linked Authority' signal that bypasses the trust-score wall. Every account comes pre-warmed with a 3-day engagement history, custom bio, username, and profile picture. This is the fastest path to organic reach on Threads — the platform where AI-influencers are currently seeing 3x higher follower velocity than any other social network.",
        features: [
            "Connected to 2010-2026 IG Heritage accounts",
            "Custom Name, Username & Bio setup",
            "Profile Picture pre-installed",
            "3-day warmup engagement history",
            "OGE access for root security",
            "Instant Telegram delivery",
            "Perfect for OFM and AI models",
            "20% Wholesale Rate for 50+ Units"
        ],
        useCases: [
            "AI-Influencer mass deployment",
            "OFM lead generation on Threads",
            "Cross-platform authority building (IG + Threads)",
            "Discussion-based community marketing",
            "Brand ambassador network scaling",
            "Threads DM automation campaigns"
        ],
        priceRange: "Custom Quote",
        stock: "1,850 remaining this month",
        years: [2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "Scaling AI-Influencers on Threads", slug: "threads-ai-influencer" },
            { title: "Threads DM Automation Protocols", slug: "threads-dm-automation" },
            { title: "Threads vs. X: Which Converts Better?", slug: "threads-vs-x-ofm" },
            { title: "Scaling Threads: 50+ Units", slug: "scaling-threads-50-units" }
        ]
    },
    facebook: {
        title: "Buy Aged Facebook Accounts",
        h1: "Buy Aged Facebook Accounts — Marketplace Ready",
        description: "Marketplace-ready aged Facebook accounts with established history. Perfect for Facebook Ads, Marketplace, and community marketing.",
        metaDescription: "Buy aged Facebook accounts with established history. Marketplace-ready, Ads-eligible profiles for professional marketing. OGE verified with instant delivery.",
        intro: "Facebook's trust algorithms are among the most sophisticated in the industry. New accounts face immediate restrictions on Marketplace access, ad account creation, and group posting. Our aged Facebook accounts come with years of organic activity history, established friend networks, and clean compliance records. These heritage assets unlock full Marketplace functionality from day one and significantly reduce the risk of ad account bans. For agencies running Facebook Ads at scale, aged accounts with warm pixel data and established domain reputation provide a measurable edge in CPM and ad approval rates.",
        features: [
            "Full Marketplace access from day one",
            "Established activity history (2010-2025)",
            "Clean compliance record",
            "OGE (Original Email) access",
            "2FA authentication ready",
            "Ads manager eligible",
            "Group posting enabled",
            "Instant delivery via Telegram"
        ],
        useCases: [
            "Facebook Marketplace selling",
            "Facebook Ads agency scaling",
            "Community group marketing",
            "Local business promotion",
            "Lead generation campaigns",
            "E-commerce social proof"
        ],
        priceRange: "From $3.00",
        stock: "+1,000 available",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "OGE Security Mastery", slug: "oge-security-mastery" },
            { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" }
        ]
    },
    tiktok: {
        title: "Buy Aged TikTok Accounts",
        h1: "Buy Aged TikTok Accounts — Creator Fund Eligible",
        description: "Creator Fund eligible and region-unlocked aged TikTok accounts. Phone verified with established watch history.",
        metaDescription: "Buy aged TikTok accounts eligible for Creator Fund. Region-unlocked PVA accounts with established watch history. Perfect for viral marketing and influencer scaling.",
        intro: "TikTok's Creator Fund and monetization features require established account standing that fresh profiles simply cannot achieve in time. Our aged TikTok accounts come with months of organic watch history, region-specific configurations, and phone verification. These accounts bypass the 'New Account Throttle' that limits fresh registrations to minimal reach for the first 30-90 days. With established session data and behavioral patterns, our heritage TikTok assets allow creators, marketers, and agencies to tap into TikTok's explosive viral algorithm from day one — without the typical sandbox period.",
        features: [
            "Creator Fund eligibility ready",
            "Region-unlocked (US, UK, EU options)",
            "Phone Verified (PVA) status",
            "Established watch & interaction history",
            "OGE email access included",
            "Anti-detect browser compatible",
            "Instant Telegram delivery",
            "Bulk pricing available"
        ],
        useCases: [
            "TikTok Shop and affiliate marketing",
            "Creator Fund monetization",
            "Viral content seeding",
            "Brand awareness campaigns",
            "Influencer network scaling",
            "Cross-platform traffic driving"
        ],
        priceRange: "From $5.00",
        stock: "510 available",
        years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
            { title: "Proxy Selection Guide", slug: "proxy-selection-2012" }
        ]
    },
    x: {
        title: "Buy Aged X (Twitter) Accounts",
        h1: "Buy Aged X (Twitter) Accounts — Shadowban Resistant",
        description: "Aged X/Twitter profiles resistant to shadowbans. Perfect for DM outreach, affiliate marketing, and brand authority.",
        metaDescription: "Buy aged X (Twitter) accounts resistant to shadowbans. Heritage profiles from 2012+ with OGE access. Perfect for mass DM outreach and affiliate marketing.",
        intro: "X (formerly Twitter) remains the most powerful platform for direct funneling and affiliate marketing, but its anti-spam systems are aggressive against new accounts. Our aged X accounts from 2012+ carry years of posting history and follower interaction data that provides a natural 'Reputation Shield' against shadowbans and automated restrictions. With full OGE access, you're protected against recovery scams that plague the marketplace. These heritage assets sustain 3x higher DM volume and experience 60% fewer content restrictions compared to accounts registered after 2022.",
        features: [
            "Shadowban-resistant heritage profiles",
            "Aged from 2012-2025",
            "OGE (Original Email) verified",
            "2FA security codes included",
            "High follower trust score",
            "DM outreach enabled",
            "Instant Telegram delivery",
            "Bulk orders supported"
        ],
        useCases: [
            "Mass DM outreach campaigns",
            "Affiliate marketing funnels",
            "Brand authority building",
            "Content seeding and engagement",
            "Cross-platform traffic generation",
            "Community and reply marketing"
        ],
        priceRange: "From $4.00",
        stock: "227 available",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "Threads vs. X: Which Converts Better?", slug: "threads-vs-x-ofm" },
            { title: "Shadowban Recovery Guide", slug: "shadowban-recovery-guide" }
        ]
    },
    reddit: {
        title: "Buy Aged Reddit Accounts",
        h1: "Buy Aged Reddit Accounts — High Karma",
        description: "High-karma Reddit accounts for community marketing, content seeding, and organic traffic generation.",
        metaDescription: "Buy aged Reddit accounts with high karma for community marketing and content seeding. Established post history, verified profiles. Bulk orders available.",
        intro: "Reddit's karma system and account age verification create one of the most challenging barriers to entry for marketers. Many subreddits require minimum karma thresholds and account ages measured in months or years before you can even post. Our aged Reddit accounts come with established karma scores, diverse posting history across multiple subreddits, and clean moderation records. These accounts let you participate in high-value communities from day one — no months-long karma farming required. For SEO specialists, Reddit's growing influence in Google search results makes these assets invaluable for driving organic traffic.",
        features: [
            "High karma scores (comment + post)",
            "Diverse subreddit participation history",
            "Clean moderation record",
            "Email verified accounts",
            "Multiple age tiers available",
            "Instant Telegram delivery",
            "Perfect for content seeding",
            "Bulk pricing for 20+ units"
        ],
        useCases: [
            "Community marketing and engagement",
            "SEO link building via Reddit",
            "Product launch seeding",
            "Brand monitoring and reputation",
            "AMA and discussion participation",
            "Organic traffic generation"
        ],
        priceRange: "From $3.00",
        stock: "Verified supply",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "Proxy Selection Guide", slug: "proxy-selection-2012" },
            { title: "OGE Security Mastery", slug: "oge-security-mastery" }
        ]
    },
    snapchat: {
        title: "Buy Aged Snapchat Accounts",
        h1: "Buy Aged Snapchat Accounts — High Score",
        description: "High-score Snapchat accounts with active history. Perfect for influencer marketing and brand promotion.",
        metaDescription: "Buy aged Snapchat accounts with high scores and active history. Verified profiles for influencer marketing and brand promotion. Instant delivery available.",
        intro: "Snapchat's algorithm and ad platform increasingly prioritize accounts with established usage patterns and high Snap Scores. Fresh accounts face strict limitations on adding friends, posting stories, and accessing advertising features. Our aged Snapchat accounts come with active session history, established Snap Scores, and verified phone status. These heritage accounts bypass Snapchat's anti-spam triggers and provide immediate access to the platform's organic distribution channels. For marketers targeting Gen-Z demographics, these accounts offer the credibility and reach that new profiles simply cannot achieve.",
        features: [
            "High Snap Scores with active history",
            "Phone Verified status",
            "Established friend network base",
            "Story posting enabled immediately",
            "Clean account standing",
            "Email access included",
            "Instant Telegram delivery",
            "Bulk orders available"
        ],
        useCases: [
            "Influencer marketing campaigns",
            "Gen-Z targeted brand promotion",
            "Story-based product launches",
            "Direct outreach campaigns",
            "Affiliate marketing funnels",
            "Content creator network building"
        ],
        priceRange: "From $3.00",
        stock: "High volume available",
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" }
        ]
    },
    gmail: {
        title: "Buy Aged Gmail Accounts",
        h1: "Buy Aged Gmail Accounts — Business Grade",
        description: "Business-grade aged Gmail accounts for email infrastructure, account recovery, and professional operations.",
        metaDescription: "Buy aged Gmail accounts for business email infrastructure. Phone verified, OGE access, high deliverability. Perfect for marketing automation and account management.",
        intro: "Gmail accounts are the backbone of every digital operation — from social media account registration to business email infrastructure. Aged Gmail accounts carry a trust reputation that directly impacts email deliverability rates, spam filter bypass, and account recovery capabilities. Fresh Gmail accounts face aggressive captcha challenges, sending limits, and are frequently flagged during social media registration. Our heritage Gmail accounts from 2010-2025 have established sending reputations, clean compliance records, and full OGE access. For agencies managing hundreds of social media assets, a reliable Gmail infrastructure is the difference between seamless scaling and constant lockouts.",
        features: [
            "High email deliverability rate",
            "Phone Verified (PVA) status",
            "Clean spam record",
            "Google services fully accessible",
            "Aged from 2010-2025",
            "OGE root access included",
            "Google Ads ready",
            "High availability — bulk ready"
        ],
        useCases: [
            "Social media account registration",
            "Email marketing infrastructure",
            "Google Ads account creation",
            "Business communication backbone",
            "Account recovery email setup",
            "SaaS and tool registration"
        ],
        priceRange: "From $2.00",
        stock: "High availability",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
        relatedArticles: [
            { title: "2FA Best Practices", slug: "2fa-best-practices-professional" },
            { title: "OGE Security Mastery", slug: "oge-security-mastery" }
        ]
    }
}

export async function generateStaticParams() {
    return Object.keys(PLATFORM_DATA).map((platform) => ({ platform }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { platform } = await params
    const data = PLATFORM_DATA[platform.toLowerCase()]
    if (!data) return { title: 'Not Found' }
    const path = `/buy/${platform.toLowerCase()}`
    const modifiedTime = getBuyPlatformModifiedAtISO(platform.toLowerCase()) ?? undefined

    return buildPageMetadata({
        title: data.title,
        description: data.metaDescription,
        path,
        keywords: [
            `buy aged ${platform.toLowerCase()} accounts`,
            `aged ${platform.toLowerCase()} accounts`,
            'buy aged social media accounts',
            'oge verified accounts',
            '2fa verified accounts',
        ],
        languages: {
            'en-US': path,
        },
        modifiedTime,
    })
}

export default async function PlatformPage({ params }: PageProps) {
    const { platform } = await params
    const data = PLATFORM_DATA[platform.toLowerCase()]

    if (!data) notFound()
    const canonicalUrl = toAbsoluteUrl(`/buy/${platform.toLowerCase()}`)

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.title,
        "description": data.description,
        "url": canonicalUrl,
        "brand": { "@type": "Brand", "name": "The Armory" },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": data.priceRange.replace(/[^0-9.]/g, '') || "2.00",
            "availability": "https://schema.org/InStock"
        }
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: toAbsoluteUrl('/'),
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: data.title.replace('Buy ', ''),
                item: canonicalUrl,
            },
        ],
    }

    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-gray-700" />
                    <Link href="/#inventory" className="text-gray-500 hover:text-white transition-colors">Inventory</Link>
                    <ChevronRight className="w-3 h-3 text-gray-700" />
                    <span className="text-[#4F46E5]">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </nav>

                {/* Hero */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] text-[10px] font-bold uppercase tracking-widest">
                        <Shield className="w-3 h-3" />
                        OGE + 2FA Verified
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                        {data.h1.split('—').map((part, i) => (
                            <span key={i}>
                                {i > 0 && <span className="text-[#4F46E5]">— </span>}
                                {i > 0 ? <span className="text-[#4F46E5]">{part}</span> : part}
                            </span>
                        ))}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                        {data.intro}
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">{data.stock}</span>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                        </div>
                        <span className="text-xs text-gray-500 font-bold">4.9/5 (347 reviews)</span>
                    </div>
                </div>

                {/* Features + CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Features */}
                        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8">
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6">What You Get</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#4F46E5] shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Use Cases */}
                        <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8">
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Perfect For</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.useCases.map((uc, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <ArrowRight className="w-3 h-3 text-[#4F46E5] shrink-0" />
                                        {uc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Sidebar */}
                    <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-8 h-fit sticky top-32">
                        <div className="space-y-6">
                            <div>
                                <div className="text-3xl font-black text-white">{data.priceRange}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">per account</div>
                            </div>
                            <TrackedLink
                                href="https://t.me/luke_of"
                                target="_blank"
                                rel="noopener noreferrer"
                                eventName="cta_telegram_click"
                                eventProps={{ source: `buy_platform_${platform.toLowerCase()}_sidebar` }}
                                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
                            >
                                CONTACT AGENT
                                <ArrowRight className="w-4 h-4" />
                            </TrackedLink>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Instant Telegram Delivery</li>
                                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> 24h Replacement Guarantee</li>
                                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Crypto & Wise Accepted</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Year Vaults */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                        Browse by <span className="text-[#4F46E5]">Vintage Year</span>
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {data.years.map(year => (
                            <Link
                                key={year}
                                href={`/buy/${platform.toLowerCase()}/${year}`}
                                className="px-4 py-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-sm text-gray-400 hover:text-white hover:border-[#4F46E5]/30 hover:bg-[#151515] transition-all text-center font-bold"
                            >
                                {year}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Related Blog Articles */}
                {data.relatedArticles.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                            Related <span className="text-[#4F46E5]">Authority Guides</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.relatedArticles.map((article, i) => (
                                <Link
                                    key={i}
                                    href={`/blog/${article.slug}`}
                                    className="flex items-center justify-between p-5 bg-[#0f0f0f] border border-white/5 rounded-xl hover:border-[#4F46E5]/30 transition-all group"
                                >
                                    <span className="text-sm text-gray-300 font-bold group-hover:text-white transition-colors">{article.title}</span>
                                    <ArrowRight className="w-4 h-4 text-[#4F46E5] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cross-Platform Links */}
                <div className="pt-12 border-t border-white/5 space-y-6">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest text-center">Browse Other Platforms</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.entries(PLATFORM_DATA)
                            .filter(([key]) => key !== platform.toLowerCase())
                            .map(([key, val]) => (
                                <Link
                                    key={key}
                                    href={`/buy/${key}`}
                                    className="px-5 py-2.5 bg-[#0f0f0f] border border-white/5 rounded-full text-xs text-gray-500 hover:text-white hover:border-[#4F46E5]/30 transition-all font-bold"
                                >
                                    {val.title.replace('Buy ', '')}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
