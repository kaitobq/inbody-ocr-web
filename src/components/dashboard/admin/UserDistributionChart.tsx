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
import { useEffect, useRef, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface Props {
  data: {
    bmi: { [key: string]: number }
    weight: { [key: string]: number }
    muscle_weight: { [key: string]: number }
    fat_percent: { [key: string]: number }
  }
}

export const UserDistributionChart = (props: Props) => {
  const { data } = props

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

  const metricOptions = {
    bmi: "BMI",
    weight: "体重",
    muscle_weight: "筋肉量",
    fat_percent: "体脂肪率",
  }

  const [selectedMetric, setSelectedMetric] =
    useState<keyof typeof metricOptions>("bmi")

  // 選択された指標に対応するデータを取得
  const selectedDataMap = data[selectedMetric]

  // オブジェクトを配列に変換し、Recharts で扱える形式にする
  const chartData = Object.entries(selectedDataMap)
    .map(([category, count]) => ({
      category,
      count,
    }))
    // カテゴリを数値的にソート（必要に応じて）
    .sort((a, b) => {
      const aValue = Number.parseFloat(
        a.category.match(/\d+(\.\d+)?/)?.[0] || "0",
      )
      const bValue = Number.parseFloat(
        b.category.match(/\d+(\.\d+)?/)?.[0] || "0",
      )
      return aValue - bValue
    })

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>分布チャート</CardTitle>
        <CardDescription>ユーザーの各指標の分布</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
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
          <BarChart data={chartData} width={chartWidth} height={chartHeight}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="ユーザー数" />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  )
}
