"use client"

import { DateRangeSelector } from "@/components/dashboard/member"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import type { GetMemberDashboardDataResponse } from "@/types/dashboard/member"
import { useEffect, useRef, useState } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const dataGroups = {
  kilo: {
    label: "体重関連 (kg)",
    keys: [
      "weight",
      "muscle_weight",
      "fat_weight",
      "body_water",
      "protein",
      "mineral",
    ],
  },
  percent: {
    label: "体脂肪率 (%)",
    keys: ["fat_percent"],
  },
  score: {
    label: "得点",
    keys: ["point"],
  },
}

const dataLabels = {
  weight: "体重",
  muscle_weight: "筋肉量",
  fat_weight: "体脂肪量",
  fat_percent: "体脂肪率",
  body_water: "体水分量",
  protein: "タンパク質量",
  mineral: "ミネラル量",
  point: "得点",
}

const dataColors = {
  weight: "#82ca9d",
  muscle_weight: "#ffc658",
  fat_weight: "#ff8042",
  fat_percent: "#a4de6c",
  body_water: "#8dd1e1",
  protein: "#a4de6c",
  mineral: "#d0ed57",
  point: "#8884d8",
}

type SelectedGroup = keyof typeof dataGroups

interface Props {
  data: GetMemberDashboardDataResponse
}

export const CustomLineChart = ({ data }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState<SelectedGroup>("kilo")
  const [activeDataKeys, setActiveDataKeys] = useState<string[]>(
    dataGroups[selectedGroup].keys,
  )

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

  // 元のデータを保持し、日付の昇順にソートする
  const originalData = data.graph[selectedGroup]
    .map((item) => ({
      ...item,
      created_at: item.created_at.split("T")[0],
    }))
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
  const [filteredData, setFilteredData] = useState(originalData)

  useEffect(() => {
    const updatedData = data.graph[selectedGroup]
      .map((item) => ({
        ...item,
        created_at: item.created_at.split("T")[0],
      }))
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
    setFilteredData(updatedData)
    setActiveDataKeys(dataGroups[selectedGroup].keys)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup])

  const handleRangeChange = (start: string, end: string) => {
    const filtered = originalData.filter(
      (item) => item.created_at >= start && item.created_at <= end,
    )
    setFilteredData(filtered)
  }

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group as SelectedGroup)
  }

  const handleDataKeyChange = (key: string, checked: boolean) => {
    setActiveDataKeys((prevKeys) =>
      checked ? [...prevKeys, key] : prevKeys.filter((k) => k !== key),
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>グラフ表示</CardTitle>
        <CardDescription>選択したデータグループに基づく履歴</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between">
          <DateRangeSelector
            data={originalData}
            onRangeChange={handleRangeChange}
          />
          <Select
            onValueChange={handleGroupChange}
            defaultValue={selectedGroup}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="データグループを選択" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dataGroups).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          {dataGroups[selectedGroup].keys.map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={activeDataKeys.includes(key)}
                onCheckedChange={(checked) =>
                  handleDataKeyChange(key, checked as boolean)
                }
              />
              <Label htmlFor={key}>
                {dataLabels[key as keyof typeof dataLabels]}
              </Label>
            </div>
          ))}
        </div>
        <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }}>
          {chartWidth > 0 && chartHeight > 0 && (
            <LineChart
              data={filteredData}
              width={chartWidth}
              height={chartHeight}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" />
              <YAxis />
              <Tooltip />
              <Legend
                formatter={(value, entry) => {
                  return <span style={{ color: entry.color }}>{value}</span>
                }}
              />
              {activeDataKeys.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={dataColors[key as keyof typeof dataColors]}
                  name={dataLabels[key as keyof typeof dataLabels]}
                  hide={!activeDataKeys.includes(key)}
                />
              ))}
            </LineChart>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
