import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    return NextResponse.next()
  }

  const session =
    request.cookies.get('__Secure-authjs.session-token') ||
    request.cookies.get('authjs.session-token')

  if (session?.value) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/todolist/:path*',
}
