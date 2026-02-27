'use client'

import { track } from '@vercel/analytics'

export type AnalyticsPrimitive = string | number | boolean

export type AnalyticsEvent =
  | 'cta_telegram_click'
  | 'inventory_view'
  | 'about_view'
  | 'blog_to_buy_click'
  | 'page_depth_50'
  | 'page_depth_90'

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, AnalyticsPrimitive>
) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    track(eventName, properties)
  } catch {
    // Ignore analytics failures to avoid blocking user flows.
  }
}
