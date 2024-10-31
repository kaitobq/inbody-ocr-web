"use client"

import { useLoading } from "@/components/common/LoadingContext"
import type { StatCardProps } from "@/components/dashboard/common"
import { Stats } from "@/components/dashboard/common"
import {
  CustomLineChart,
  DataHistoryTable,
} from "@/components/dashboard/member"
import type { GetMemberDashboardDataResponse } from "@/types/dashboard/member"
import { User } from "lucide-react"

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

  const userIcon = <User className="size-4 text-muted-foreground" />
  const stats: StatCardProps[] = [
    {
      title: "現在の体重",
      value: `${data.current.weight.toFixed(1)} kg`,
      change: data.current.weight - data.previous.weight,
      icon: userIcon,
    },
    {
      title: "現在の筋肉量",
      value: `${data.current.muscle_weight.toFixed(1)} kg`,
      change: data.current.muscle_weight - data.previous.muscle_weight,
      icon: userIcon,
    },
    {
      title: "現在の体脂肪量",
      value: `${data.current.fat_weight.toFixed(1)}%`,
      change: data.current.fat_weight - data.previous.fat_weight,
      icon: userIcon,
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Stats stats={stats} />
      </div>
      <CustomLineChart data={data} />
      <DataHistoryTable data={data} />
      {children}
    </div>
  )
}
