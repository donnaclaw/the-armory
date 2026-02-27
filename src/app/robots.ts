import { MetadataRoute } from 'next'
import { toAbsoluteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/success'],
            },
        ],
        sitemap: toAbsoluteUrl('/sitemap.xml'),
    }
}
