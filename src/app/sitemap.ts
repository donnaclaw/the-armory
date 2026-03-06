import { MetadataRoute } from 'next'
import { ARTICLES, type BlogArticle } from "@/lib/blog-data"
import { SITE_URL } from "@/lib/seo"

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
    const platforms = ['instagram', 'threads', 'facebook', 'tiktok', 'x', 'reddit', 'snapchat', 'gmail']
    const years = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => (2010 + i).toString())
    const toolsHubLastModified = new Date('2026-03-06T00:00:00.000Z')
    const twoFactorToolLastModified = new Date('2026-03-06T00:00:00.000Z')

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/tools`, lastModified: toolsHubLastModified, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/tools/2fa-code-generator`, lastModified: twoFactorToolLastModified, changeFrequency: 'monthly', priority: 0.7 },
    ]

    // Blog Dynamic Routes
    const blogRoutes: MetadataRoute.Sitemap = Object.values(ARTICLES).map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: resolveArticleLastModified(article),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Product Dynamic Routes (buy/[platform]/[year])
    const productRoutes: MetadataRoute.Sitemap = []
    platforms.forEach((platform) => {
        years.forEach((year) => {
            productRoutes.push({
                url: `${baseUrl}/buy/${platform}/${year}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        })
    })

    return [...staticRoutes, ...blogRoutes, ...productRoutes]
}
