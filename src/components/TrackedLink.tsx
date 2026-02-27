'use client'

import type { MouseEvent, ReactNode } from 'react'
import Link, { type LinkProps } from 'next/link'
import { trackEvent, type AnalyticsEvent, type AnalyticsPrimitive } from '@/lib/analytics'

interface TrackedLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  eventName?: AnalyticsEvent
  eventProps?: Record<string, AnalyticsPrimitive>
}

export function TrackedLink({
  children,
  onClick,
  eventName,
  eventProps,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented && eventName) {
          trackEvent(eventName, eventProps)
        }
      }}
    >
      {children}
    </Link>
  )
}
