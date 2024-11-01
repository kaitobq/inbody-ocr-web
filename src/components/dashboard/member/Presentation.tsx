"use client"

import { useLoading } from "@/components/common/LoadingContext"
import {
  CustomLineChart,
  DataHistoryTable,
  ImageUploader,
} from "@/components/dashboard/member"
import type { GetMemberDashboardDataResponse } from "@/types/dashboard/member"

interface Props {
  data: GetMemberDashboardDataResponse | undefined
  children: React.ReactNode
}

export const Presentation = (props: Props) => {
  const { data, children } = props
  const { setLoading } = useLoading()

  if (!data) {
    setLoading(true)
    return null
  }
  setLoading(false)

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
      <CustomLineChart data={data} />
      <DataHistoryTable data={data} />
      <ImageUploader />
    </div>
  )
}
