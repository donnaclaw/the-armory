'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function ScrollDepthTracker() {
  const pathname = usePathname()
  const tracked50 = useRef(false)
  const tracked90 = useRef(false)

  useEffect(() => {
    tracked50.current = false
    tracked90.current = false

    const measureDepth = () => {
      const doc = document.documentElement
      const scrollableHeight = doc.scrollHeight - window.innerHeight

      if (scrollableHeight <= 0) {
        return
      }

      const depth = (window.scrollY / scrollableHeight) * 100

      if (depth >= 50 && !tracked50.current) {
        tracked50.current = true
        trackEvent('page_depth_50', { path: pathname })
      }

      if (depth >= 90 && !tracked90.current) {
        tracked90.current = true
        trackEvent('page_depth_90', { path: pathname })
      }
    }

    let rafId = 0
    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        measureDepth()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    measureDepth()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [pathname])

  return null
}
