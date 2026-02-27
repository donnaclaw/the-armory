import { MetadataRoute } from 'next'
import { ARTICLES } from "@/lib/blog-data"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const platforms = ['instagram', 'threads', 'facebook', 'tiktok', 'x', 'reddit', 'snapchat', 'gmail']
    const years = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => (2010 + i).toString())

    // Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/tools/2fa-code-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ]

    // Blog Dynamic Routes
    const blogRoutes: MetadataRoute.Sitemap = Object.values(ARTICLES).map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(),
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
