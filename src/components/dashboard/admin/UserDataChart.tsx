import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import type { ImageData } from "@/types/dashboard/member"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface Props {
  data: ImageData[]
}

export const UserDataChart = (props: Props) => {
  const { data } = props

  const [selectedUser, setSelectedUser] = useState(data[0]?.user_id)
  const [selectedMetric, setSelectedMetric] =
    useState<keyof typeof metricOptions>("weight")

  const userData = useMemo(() => {
    return data
      .filter((record) => record.user_id === selectedUser)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
  }, [data, selectedUser])

  // ResponsiveContainerが動作しないため、動的に生成
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState<number>(0)
  const [chartHeight, setChartHeight] = useState<number>(0)

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.offsetWidth)
      setChartHeight(chartContainerRef.current.offsetHeight)
    }
  }, [])

  // ユーザーの重複を除いたリストを取得
  const uniqueUsers = useMemo(() => {
    return data.reduce((acc, record) => {
      if (!acc.includes(record.user_id)) acc.push(record.user_id)
      return acc
    }, [] as string[])
  }, [data])

  const metricOptions = {
    height: "身長 (cm)",
    weight: "体重 (kg)",
    muscle_weight: "筋肉量 (kg)",
    fat_weight: "体脂肪量 (kg)",
    fat_percent: "体脂肪率 (%)",
    body_water: "体水分量 (kg)",
    protein: "タンパク質量 (kg)",
    mineral: "ミネラル量 (kg)",
    point: "得点",
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>個人データの推移</CardTitle>
        <CardDescription>選択したユーザーの測定値推移</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-4">
          <div className="w-[180px]">
            <Select onValueChange={setSelectedUser} defaultValue={selectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="ユーザーを選択" />
              </SelectTrigger>
              <SelectContent style={{ maxHeight: "300px" }}>
                {uniqueUsers.map((user, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <SelectItem key={index} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select
            onValueChange={(value) =>
              setSelectedMetric(value as keyof typeof metricOptions)
            }
            defaultValue={selectedMetric}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="指標を選択" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricOptions).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }}>
          <LineChart data={userData} width={chartWidth} height={chartHeight}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="created_at"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("ja-JP")
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("ja-JP")
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#8884d8"
              name={metricOptions[selectedMetric]}
            />
          </LineChart>
        </div>
      </CardContent>
    </Card>
  )
}
