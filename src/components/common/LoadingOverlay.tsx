"use client"

import { useLoading } from "./LoadingContext"

const LoadingOverlay = () => {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="size-16 animate-spin rounded-full border-y-4 border-white"></div>
    </div>
  )
}

export default LoadingOverlay
