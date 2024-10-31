"use client" // なぜかないとエラーが起きる

import { Button, Input, Label } from "@/components/ui"
import { useEffect, useState } from "react"

type HasCreatedAt = {
  created_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type DataType = HasCreatedAt[]

interface Props {
  data: DataType
  onRangeChange: (startDate: string, endDate: string) => void
}

export const DateRangeSelector = (props: Props) => {
  const { data, onRangeChange } = props

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (data && data.length > 0) {
      const newStartDate = data[0]?.created_at
      const newEndDate = data[data.length - 1]?.created_at
      setStartDate(newStartDate)
      setEndDate(newEndDate)

      onRangeChange(newStartDate, newEndDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = () => {
    onRangeChange(startDate, endDate)
  }

  return (
    <div className="flex w-full flex-col space-y-2 sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0">
      <div className="flex grow flex-col space-y-1">
        <Label htmlFor="start-date">開始日</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={startDate}
          max={endDate}
        />
      </div>
      <div className="flex grow flex-col space-y-1">
        <Label htmlFor="end-date">終了日</Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
          max={endDate}
        />
      </div>
      <Button onClick={handleChange} className="w-full sm:w-auto">
        適用
      </Button>
    </div>
  )
}
