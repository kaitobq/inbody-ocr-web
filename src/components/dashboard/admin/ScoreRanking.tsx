import { CustomTable } from "@/components/dashboard/common"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import type { ImageData } from "@/types/dashboard/member"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface Props {
  data: ImageData[]
}

export const ScoreRanking = (props: Props) => {
  const { data } = props
  const [isExpanded, setIsExpanded] = useState(false)

  // 得点で降順ソート
  const sortedData = [...data].sort((a, b) => b.point - a.point)

  const columns = [
    {
      key: "rank" as const,
      label: "順位",
      render: (_item: ImageData, index: number) => index + 1,
    },
    {
      key: "user_name" as const,
      label: "名前",
      sortable: true,
    },
    {
      key: "point" as const,
      label: "得点",
      sortable: true,
    },
    {
      key: "created_at" as const,
      label: "最終測定日",
      render: (item: ImageData) => item.created_at.split("T")[0],
      sortable: true,
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>得点ランキング</CardTitle>
        <CardDescription>全ユーザーの得点ランキング</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className={`overflow-hidden rounded-md border ${
            isExpanded ? "" : "max-h-[400px] overflow-y-auto"
          }`}
        >
          <CustomTable
            columns={columns}
            data={sortedData}
            enableSorting={true}
            defaultSortColumn="point"
            defaultSortDirection="desc"
          />
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
