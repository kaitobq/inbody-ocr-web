import { Presentation } from "@/components/dashboard/admin"
import { Stats, type StatCardProps } from "@/components/dashboard/common"
import { getDataForAdmin } from "@/mods/screen/dashboard"
import type { GetAdminDashboardDataResponse } from "@/types/dashboard/member"
import { Users } from "lucide-react"

export const AdminDashboardContainer = async () => {
  const data = await getDataForAdmin()

  const stats = genStatsProps(data)

  return (
    <Presentation data={data}>
      <Stats stats={stats} />
    </Presentation>
  )
}

const genStatsProps = (data: GetAdminDashboardDataResponse | undefined) => {
  if (!data) {
    return []
  }

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
