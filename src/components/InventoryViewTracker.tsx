'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

export function InventoryViewTracker() {
  const tracked = useRef(false)

  useEffect(() => {
    const element = document.getElementById('inventory')
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true
            trackEvent('inventory_view', { path: window.location.pathname })
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '0px 0px -25% 0px',
        threshold: 0.2,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return null
}
