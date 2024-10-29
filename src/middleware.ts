import { fetcher } from "@/mods/repositories/fetcher"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type Resp = {
  verify: {
    status: number
    message: string
  }
}

const PUBLIC_PATHS = [
  /^\/signin$/,
  /^\/signup$/,
  /^\/organization\/[^/]+\/signup$/,
  /^\/$/,
]

async function verifyToken(token: string) {
  const apiFetcher = fetcher()
  try {
    const response = await apiFetcher.fetchJSON<Resp["verify"]>({
      path: "/v1/user/authenticate",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {},
    })
    return response.status === 200
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")
  const path = request.nextUrl.pathname

  const isPublicPath = PUBLIC_PATHS.some((pattern) => pattern.test(path))
  if (isPublicPath) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  const isValidToken = await verifyToken(token.value)
  if (!isValidToken) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
