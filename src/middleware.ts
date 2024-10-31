import { fetcher } from "@/mods/repositories/fetcher"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type Resp = {
  verify: {
    status: number
    message: string
    user: {
      id: string
      name: string
      role: string
    }
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
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.user
  } catch (error) {
    console.error(error)
    return null
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

  const user = await verifyToken(token.value)
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (path === "/dashboard") {
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    } else if (user.role === "member") {
      return NextResponse.redirect(new URL("/dashboard/member", request.url))
    } else {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
