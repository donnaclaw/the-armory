import { NextRequest, NextResponse } from 'next/server'

const CANONICAL_HOST = 'www.buyagedinstagramaccount.com'
const APEX_HOST = 'buyagedinstagramaccount.com'

function normalizeHost(hostHeader: string | null): string {
  if (!hostHeader) return ''
  return hostHeader.split(':')[0].toLowerCase()
}

function isProductionHost(host: string): boolean {
  return host === APEX_HOST || host === CANONICAL_HOST
}

export function proxy(request: NextRequest) {
  const host = normalizeHost(request.headers.get('x-forwarded-host') ?? request.headers.get('host'))
  if (!isProductionHost(host)) {
    return NextResponse.next()
  }

  const forwardedProto = (request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '')).toLowerCase()

  if (host !== CANONICAL_HOST || forwardedProto !== 'https') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.protocol = 'https'
    redirectUrl.host = CANONICAL_HOST
    redirectUrl.port = ''
    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
