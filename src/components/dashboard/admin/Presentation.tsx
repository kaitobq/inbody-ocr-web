"use client"

import { useLoading } from "@/components/common/LoadingContext"
import { ScoreRanking } from "@/components/dashboard/admin/ScoreRanking"
import { UserDataChart } from "@/components/dashboard/admin/UserDataChart"
import { UserDistributionChart } from "@/components/dashboard/admin/UserDistributionChart"
import { UsersTable } from "@/components/dashboard/admin/UsersTable"
import { Stats, type StatCardProps } from "@/components/dashboard/common"
import type { GetAdminDashboardDataResponse } from "@/types/dashboard/member"
import { Users } from "lucide-react"

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

  const stats = genStatsProps(data)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">管理者ダッシュボード</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stats stats={stats} />
      </div>
      <UserDistributionChart data={data.chart} />
      <UsersTable data={data.current} />
      <ScoreRanking data={data.current} />
      <UserDataChart data={data.all_data} />
      {children}
    </div>
  )
}

const genStatsProps = (data: GetAdminDashboardDataResponse) => {
  const userIcon = <Users className="size-4 text-muted-foreground" />
  const stats: StatCardProps[] = [
    {
      title: "平均体重",
      value: `${data.avg.weight.toFixed(1)} kg`,
      icon: userIcon,
    },
    {
      title: "平均筋肉量",
      value: `${data.avg.muscle_weight.toFixed(1)} kg`,
      icon: userIcon,
    },
    {
      title: "平均体脂肪率",
      value: `${data.avg.fat_percent.toFixed(1)}%`,
      icon: userIcon,
    },
    {
      title: "平均得点",
      value: data.avg.point,
      icon: userIcon,
    },
  ]

  return stats
}
