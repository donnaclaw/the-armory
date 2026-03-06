import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AssetPageContent } from './AssetPageContent'
import { buildPageMetadata, toAbsoluteUrl } from '@/lib/seo'
import {
    BUY_PLATFORMS,
    BUY_YEARS,
    getBuyYearSeoProfile,
    isValidBuyPlatform,
    isValidBuyYear,
} from '@/lib/buy-seo-data'

interface PageProps {
    params: Promise<{
        platform: string
        year: string
    }>
}

export const dynamicParams = false

export function generateStaticParams() {
    return BUY_PLATFORMS.flatMap((platform) => BUY_YEARS.map((year) => ({ platform, year })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { platform, year } = await params

    if (!isValidBuyPlatform(platform) || !isValidBuyYear(year)) {
        return { title: 'Not Found' }
    }

    const seoProfile = getBuyYearSeoProfile(platform, year)
    if (!seoProfile) {
        return { title: 'Not Found' }
    }

    const path = `/buy/${platform.toLowerCase()}/${year}`

    return buildPageMetadata({
        title: seoProfile.metaTitle,
        description: seoProfile.metaDescription,
        path,
        keywords: [
            seoProfile.keywordFocus,
            `aged ${seoProfile.platformLabel.toLowerCase()} accounts`,
            'buy aged social media accounts',
            'oge verified accounts',
            '2fa verified accounts',
        ],
        languages: {
            'en-US': path,
        },
        modifiedTime: seoProfile.modifiedAtISO,
    })
}

export default async function Page({ params }: PageProps) {
    const { platform, year } = await params

    if (!isValidBuyPlatform(platform) || !isValidBuyYear(year)) {
        notFound()
    }

    const seoProfile = getBuyYearSeoProfile(platform, year)
    if (!seoProfile) {
        notFound()
    }

    const canonicalPath = `/buy/${platform.toLowerCase()}/${year}`
    const canonicalUrl = toAbsoluteUrl(canonicalPath)
    const platformUrl = toAbsoluteUrl(`/buy/${platform.toLowerCase()}`)
    const homeUrl = toAbsoluteUrl('/')

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: homeUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: `Aged ${seoProfile.platformLabel} Accounts`,
                item: platformUrl,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: `${seoProfile.platformLabel} ${year}`,
                item: canonicalUrl,
            },
        ],
    }

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${seoProfile.platformLabel} Aged Accounts (${year})`,
        description: seoProfile.metaDescription,
        url: canonicalUrl,
        brand: { '@type': 'Brand', name: 'The Armory' },
        category: `${seoProfile.platformLabel} Aged Accounts`,
        keywords: seoProfile.keywordFocus,
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '2.00',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
        },
    }

    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <AssetPageContent
                platformTitle={seoProfile.platformLabel}
                year={year}
                intro={seoProfile.introVariant}
                keywordFocus={seoProfile.keywordFocus}
                keyPoints={seoProfile.keyPoints}
                h1={seoProfile.h1}
            />
        </main>
    )
}
