import { Stats, type StatCardProps } from "@/components/dashboard/common"
import { Presentation } from "@/components/dashboard/member"
import { getDataForMember } from "@/mods/screen/dashboard"
import type { GetMemberDashboardDataResponse } from "@/types/dashboard/member"
import { User } from "lucide-react"

export const MemberDashboardContainer = async () => {
  const data = await getDataForMember()

  const stats = genStatsProps(data)

  return (
    <Presentation data={data}>
      <Stats stats={stats} />
    </Presentation>
  )
}

const genStatsProps = (data: GetMemberDashboardDataResponse | undefined) => {
  if (!data) {
    return []
  }

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

  return stats
}
