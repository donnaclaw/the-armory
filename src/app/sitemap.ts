import { MetadataRoute } from 'next'
import { ARTICLES, type BlogArticle } from "@/lib/blog-data"
import { SITE_URL } from "@/lib/seo"
import {
    BUY_PLATFORMS,
    INVENTORY_REFRESH_ISO,
    getBuyPlatformModifiedAtISO,
    getValidBuyYearsForPlatform,
    getBuyYearSeoProfile,
} from '@/lib/buy-seo-data'

function parseDate(dateValue?: string): Date | undefined {
    if (!dateValue) return undefined
    const parsed = new Date(dateValue)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function resolveArticleLastModified(article: BlogArticle): Date {
    return parseDate(article.seo?.modifiedAtISO) ?? parseDate(article.date) ?? new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const toolsHubLastModified = new Date('2026-03-08T00:00:00.000Z')
    const twoFactorToolLastModified = new Date('2026-03-06T00:00:00.000Z')
    const topicTagToolLastModified = new Date('2026-03-08T00:00:00.000Z')
    const warmupPlannerLastModified = new Date('2026-03-08T00:00:00.000Z')
    const inventoryLastModified = new Date(INVENTORY_REFRESH_ISO)

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: inventoryLastModified, changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/about`, lastModified: inventoryLastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: inventoryLastModified, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/terms`, lastModified: inventoryLastModified, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/refund-policy`, lastModified: inventoryLastModified, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/tools`, lastModified: toolsHubLastModified, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/tools/2fa-code-generator`, lastModified: twoFactorToolLastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/tools/threads-topic-tag-finder`, lastModified: topicTagToolLastModified, changeFrequency: 'weekly', priority: 0.72 },
        { url: `${baseUrl}/tools/ig-threads-warmup-planner`, lastModified: warmupPlannerLastModified, changeFrequency: 'weekly', priority: 0.72 },
    ]

    // Blog Dynamic Routes
    const blogRoutes: MetadataRoute.Sitemap = Object.values(ARTICLES).map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: resolveArticleLastModified(article),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    const platformRoutes: MetadataRoute.Sitemap = BUY_PLATFORMS.map((platform) => ({
        url: `${baseUrl}/buy/${platform}`,
        lastModified: parseDate(getBuyPlatformModifiedAtISO(platform) ?? undefined) ?? inventoryLastModified,
        changeFrequency: 'weekly',
        priority: 0.82,
    }))

    // Product Dynamic Routes (buy/[platform]/[year])
    const productRoutes: MetadataRoute.Sitemap = []
    BUY_PLATFORMS.forEach((platform) => {
        const validYears = getValidBuyYearsForPlatform(platform) ?? []
        validYears.forEach((year) => {
            const seoProfile = getBuyYearSeoProfile(platform, year)
            productRoutes.push({
                url: `${baseUrl}/buy/${platform}/${year}`,
                lastModified: parseDate(seoProfile?.modifiedAtISO) ?? inventoryLastModified,
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        })
    })

    return [...staticRoutes, ...blogRoutes, ...platformRoutes, ...productRoutes]
}
