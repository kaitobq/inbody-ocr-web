"use client"

import { useLoading } from "@/components/common/LoadingContext"
import type { GetAdminDashboardDataResponse } from "@/types/dashboard/member"

interface Props {
  data: GetAdminDashboardDataResponse | undefined
  children: React.ReactNode
}

export const Presentation = (props: Props) => {
  const { data, children } = props
  const { setLoading } = useLoading()

  if (!data) {
    setLoading(true)
    return null
  }

  return <div>{children}</div>
}
