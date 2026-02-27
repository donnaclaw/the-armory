'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function AboutViewTracker() {
  useEffect(() => {
    trackEvent('about_view', { path: '/about' })
  }, [])

  return null
}
