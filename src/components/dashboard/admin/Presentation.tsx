"use client"

import { useLoading } from "@/components/common/LoadingContext"
import { ScoreRanking } from "@/components/dashboard/admin/ScoreRanking"
import { UserDataChart } from "@/components/dashboard/admin/UserDataChart"
import { UserDistributionChart } from "@/components/dashboard/admin/UserDistributionChart"
import { UsersTable } from "@/components/dashboard/admin/UsersTable"
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">管理者ダッシュボード</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{children}</div>
      <UserDistributionChart data={data.chart} />
      <UsersTable data={data.current} />
      <ScoreRanking data={data.current} />
      <UserDataChart data={data.all_data} />
    </div>
  )
}
