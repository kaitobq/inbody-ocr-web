"use client"

import { CustomTable } from "@/components/dashboard/common"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import type {
  GetMemberDashboardDataResponse,
  ImageData,
} from "@/types/dashboard/member"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface Props {
  data: GetMemberDashboardDataResponse
}

export const DataHistoryTable = (props: Props) => {
  const { data } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const columns = [
    {
      key: "created_at",
      label: "日付",
      render: (item: ImageData) => item.created_at.split("T")[0],
    },
    {
      key: "height",
      label: "身長 (cm)",
    },
    {
      key: "weight",
      label: "体重 (kg)",
    },
    {
      key: "muscle_weight",
      label: "筋肉量 (kg)",
    },
    {
      key: "fat_weight",
      label: "体脂肪量 (kg)",
    },
    {
      key: "fat_percent",
      label: "体脂肪率 (%)",
    },
    {
      key: "body_water",
      label: "体水分量 (kg)",
    },
    {
      key: "protein",
      label: "タンパク質量 (kg)",
    },
    {
      key: "mineral",
      label: "ミネラル量 (kg)",
    },
    {
      key: "point",
      label: "得点",
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>データ履歴</CardTitle>
        <CardDescription>過去の測定結果一覧</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`overflow-x-auto ${isExpanded ? "" : "max-h-[400px]"} overflow-y-auto`}
        >
          <CustomTable columns={columns} data={data.history} />
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 size-4" />
              折りたたむ
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 size-4" />
              展開する
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
