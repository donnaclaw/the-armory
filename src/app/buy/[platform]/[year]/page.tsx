import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AssetPageContent } from './AssetPageContent'

interface PageProps {
    params: Promise<{
        platform: string
        year: string
    }>
}

const PLATFORMS = ['instagram', 'threads', 'facebook', 'tiktok', 'x', 'reddit', 'snapchat', 'gmail']
const YEARS = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => (2010 + i).toString())

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { platform, year } = await params

    if (!PLATFORMS.includes(platform.toLowerCase()) || !YEARS.includes(year)) {
        return { title: 'Not Found' }
    }

    const platformTitle = platform.charAt(0).toUpperCase() + platform.slice(1)
    return {
        title: `Buy Aged ${platformTitle} Accounts (${year}) | High-Trust Assets`,
        description: `Premium aged ${platformTitle} accounts from ${year}. Secure OGE & 2FA verified assets for professional marketing. Direct delivery via Telegram.`,
    }
}

function generateIntro(platform: string, year: string) {
    const platformTitle = platform.charAt(0).toUpperCase() + platform.slice(1)
    return `Why a ${year} ${platformTitle} Account is perfect for brand stability. In the rapidly evolving digital landscape, aged assets from ${year} provide a level of inherent trust that fresh accounts simply cannot match. By leveraging a ${platformTitle} profile with over a decade of history, marketing agencies and mass-outreach specialists can effectively bypass modern spam filters and trust-score algorithms. These veteran assets are pre-equipped with legacy metadata, ensuring your operations remain robust and resistant to shadowbans. Whether you are scaling an OFM operation or managing a global marketing campaign, our verified ${year} assets offer the security and longevity required for high-volume enterprise performance.`
}

export default async function Page({ params }: PageProps) {
    const { platform, year } = await params

    if (!PLATFORMS.includes(platform.toLowerCase()) || !YEARS.includes(year)) {
        notFound()
    }

    const platformTitle = platform.charAt(0).toUpperCase() + platform.slice(1)
    const intro = generateIntro(platform, year)

    return (
        <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
            <AssetPageContent
                platformTitle={platformTitle}
                year={year}
                intro={intro}
            />
        </main>
    )
}
