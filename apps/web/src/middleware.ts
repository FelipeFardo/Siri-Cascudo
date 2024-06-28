import { auth, update } from '@siricascudo/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = await auth()
  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    const updateSession = {
      user: {
        ...session?.user,
        orgSlug: slug,
      },
      ...session,
    }
    update(updateSession)
    response.cookies.set('org', slug)
  } else {
    response.cookies.delete('org')
  }
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
