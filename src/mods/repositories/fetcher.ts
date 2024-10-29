/* eslint-disable */

interface FetcherOptions extends Omit<RequestInit, "headers" | "body"> {
  path: string
  accessToken?: string
  queryParams?: Record<string, string | number | boolean>
  body?: any
  headers?: Record<string, string>
}

interface FetcherResponse<T> {
  data: T | null
}

const API_BASE_URL = "http://localhost:8080/api"

function makeJSONBody(body: any): string {
  if (body === undefined || body === null) {
    return JSON.stringify({})
  }
  return JSON.stringify(body)
}

function makeFormDataBody(body: any): FormData {
  const formData = new FormData()
  if (body) {
    const keys = Object.keys(body)
    for (const key of keys) {
      const value = body[key]
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item)
        })
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, String(value))
      }
    }
  }
  return formData
}

export const fetcher = () => {
  const fetchJSON = async <T, U = T>(
    options: FetcherOptions,
    convert?: (data: T) => U,
  ): Promise<U> => {
    const {
      method = "GET",
      path,
      headers = {},
      accessToken,
      queryParams,
      body,
      ...rest
    } = options

    const url = new URL(`${API_BASE_URL}${path}`)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    }

    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`
    }

    const requestBody =
      method === "POST" || method === "PUT" ? makeJSONBody(body) : undefined

    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      body: requestBody,
      ...rest,
    }

    try {
      const response = await fetch(url.toString(), fetchOptions)
      const text = await response.text()

      if (!response.ok) {
        console.error("HTTPエラー:", response.status, text)
        throw new Error(`HTTPエラー: ${response.status}`)
      }

      const data: T = text ? JSON.parse(text) : null
      return convert ? convert(data) : (data as unknown as U)
    } catch (error) {
      console.error("Fetch JSON error:", error)
      throw error
    }
  }

  const fetchFormData = async <T, U = T>(
    options: FetcherOptions,
    convert?: (data: T) => U,
  ): Promise<U> => {
    const {
      method = "POST",
      path,
      headers = {},
      accessToken,
      queryParams,
      body,
      ...rest
    } = options

    const url = new URL(`${API_BASE_URL}${path}`)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    const requestHeaders: Record<string, string> = {
      ...headers,
    }

    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`
    }

    const requestBody =
      method === "POST" || method === "PUT" ? makeFormDataBody(body) : undefined

    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      body: requestBody,
      ...rest,
    }

    try {
      const response = await fetch(url.toString(), fetchOptions)
      const text = await response.text()

      if (!response.ok) {
        console.error("HTTPエラー:", response.status, text)
        throw new Error(`HTTPエラー: ${response.status}`)
      }

      if (text) {
        try {
          const data: T = JSON.parse(text)
          return convert ? convert(data) : (data as unknown as U)
        } catch (error) {
          console.error("JSONのパースに失敗しました:", error)
          throw error
        }
      } else {
        return null as unknown as U
      }
    } catch (error) {
      console.error("Fetch FormData error:", error)
      throw error
    }
  }

  return {
    fetchJSON,
    fetchFormData,
  }
}
