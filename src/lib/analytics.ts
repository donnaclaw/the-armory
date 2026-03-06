'use client'

import { track } from '@vercel/analytics'

export type AnalyticsPrimitive = string | number | boolean

export type AnalyticsEvent =
  | 'cta_telegram_click'
  | 'organic_telegram_click'
  | 'inventory_view'
  | 'about_view'
  | 'blog_to_buy_click'
  | 'page_depth_50'
  | 'page_depth_90'

const ORGANIC_SEARCH_ENGINES = [
  'google.',
  'bing.',
  'duckduckgo.',
  'search.yahoo.',
  'yandex.',
  'ecosia.',
]

function getReferrerHost(): string | null {
  if (typeof document === 'undefined' || !document.referrer) {
    return null
  }

  try {
    return new URL(document.referrer).hostname.toLowerCase()
  } catch {
    return null
  }
}

function resolveOrganicEngine(hostname: string): string | null {
  if (hostname.includes('google.')) return 'google'
  if (hostname.includes('bing.')) return 'bing'
  if (hostname.includes('duckduckgo.')) return 'duckduckgo'
  if (hostname.includes('search.yahoo.')) return 'yahoo'
  if (hostname.includes('yandex.')) return 'yandex'
  if (hostname.includes('ecosia.')) return 'ecosia'
  return null
}

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, AnalyticsPrimitive>
) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    track(eventName, properties)

    if (eventName === 'cta_telegram_click') {
      const referrerHost = getReferrerHost()
      if (!referrerHost) return

      const isOrganic = ORGANIC_SEARCH_ENGINES.some((engineToken) => referrerHost.includes(engineToken))
      if (!isOrganic) return

      const organicEngine = resolveOrganicEngine(referrerHost)
      track('organic_telegram_click', {
        ...(properties ?? {}),
        landing_path: window.location.pathname,
        referrer_host: referrerHost,
        ...(organicEngine ? { search_engine: organicEngine } : {}),
      })
    }
  } catch {
    // Ignore analytics failures to avoid blocking user flows.
  }
}
