import type { Metadata } from "next"

export const SITE_URL = "https://www.buyagedinstagramaccount.com"
export const SITE_NAME = "The Armory - Aged Social Media Accounts"
export const DEFAULT_OG_IMAGE = "/og-image.png"
export const DEFAULT_DESCRIPTION = "Buy aged social media accounts (2010-2026) - Instagram, Threads, Facebook, X, Gmail, TikTok, Reddit and Snapchat. OGE and 2FA verified with secure delivery via Telegram."

const ROOT_KEYWORDS = [
  "buy aged instagram accounts",
  "buy aged social media accounts",
  "aged instagram accounts for sale",
  "buy aged facebook accounts",
  "buy aged threads accounts",
  "buy aged gmail accounts",
  "buy aged tiktok accounts",
  "buy aged x accounts",
  "buy aged twitter accounts",
  "buy aged reddit accounts",
  "buy aged snapchat accounts",
  "OGE verified accounts",
  "2FA verified social media accounts",
  "bulk aged accounts",
  "aged accounts marketplace",
  "buy old instagram accounts",
  "premium social media accounts",
]

export function toAbsoluteUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

interface PageMetadataInput {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  image?: string
  keywords?: string[]
  publishedTime?: string
  authors?: string[]
  noIndex?: boolean
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  keywords,
  publishedTime,
  authors,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = toAbsoluteUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords,
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "The Armory - Buy Aged Social Media Accounts",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors && authors.length > 0 ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Buy Aged Instagram Accounts (2010-2026) | OGE & 2FA Verified",
      template: "%s | Buy Aged Social Media Accounts",
    },
    description: DEFAULT_DESCRIPTION,
    keywords: ROOT_KEYWORDS,
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: "Buy Aged Instagram & Social Media Accounts (2010-2026) | OGE & 2FA Verified",
      description:
        "Premium marketplace for aged social media accounts. Instagram, Threads, Facebook, X, Gmail, TikTok, Reddit and Snapchat. OGE verified and 2FA included.",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "The Armory - Buy Aged Social Media Accounts",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buy Aged Instagram & Social Media Accounts (2010-2026)",
      description:
        "Premium aged accounts with OGE and 2FA. Instagram, Threads, Facebook, X, Gmail, TikTok, Reddit and Snapchat.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
