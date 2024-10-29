"use server"

import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string, expires?: Date) => {
  ;(await cookies()).set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    expires,
  })
}

export const getCookie = async (key: string) => {
  const cookieStore = cookies()
  const cookie = (await cookieStore).get(key)
  return cookie ? cookie.value : null
}

export const deleteCookie = async (key: string) => {
  const cookieStore = cookies()
  ;(await cookieStore).delete(key)
}
