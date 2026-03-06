import { Metadata } from 'next'
import TwoFactorGeneratorClient from './TwoFactorGeneratorClient'
import { buildPageMetadata, toAbsoluteUrl } from '@/lib/seo'

const PAGE_PATH = '/tools/2fa-code-generator'
const PAGE_TITLE = '2FA Code Generator for Aged Instagram & Threads Accounts'
const PAGE_DESCRIPTION =
  'Generate secure TOTP 2FA codes for aged Instagram and Threads accounts. Browser-only tool, no server storage, and instant RFC 6238 verification.'
const PAGE_KEYWORDS = [
  '2fa code generator',
  'totp generator',
  'instagram 2fa code',
  'threads 2fa code',
  'aged instagram accounts security',
  'aged threads accounts security',
  'rfc 6238 totp',
]
const LAST_MODIFIED_ISO = '2026-03-06T00:00:00.000Z'

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  keywords: PAGE_KEYWORDS,
  languages: {
    'en-US': PAGE_PATH,
  },
})

export default function TwoFactorGeneratorPage() {
  const canonicalUrl = toAbsoluteUrl(PAGE_PATH)

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${canonicalUrl}#software`,
    name: 'The Armory 2FA Code Generator',
    url: canonicalUrl,
    description: PAGE_DESCRIPTION,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    dateModified: LAST_MODIFIED_ISO,
    publisher: {
      '@type': 'Organization',
      name: 'The Armory',
      url: toAbsoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/icon.svg'),
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
    featureList: [
      'Generate 6-digit TOTP codes every 30 seconds',
      'Local browser-only code generation',
      'RFC 6238 compatible workflow',
      'No secret key persistence on server',
    ],
    keywords: PAGE_KEYWORDS.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <TwoFactorGeneratorClient />
    </>
  )
}
