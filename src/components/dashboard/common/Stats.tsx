import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"

export type { Props as StatCardProps }

interface Props {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
}

export const StatCard = (props: Props) => {
  const { title, value, change, icon } = props

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            前回より
            {change.toFixed(1)}
            kg 変化
          </p>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsProps {
  stats: Props[]
}

export const Stats = (props: StatsProps) => {
  const { stats } = props

  return (
    <>
      {stats.map((prop, index) => (
        <StatCard key={index} {...prop} />
      ))}
    </>
  )
}
