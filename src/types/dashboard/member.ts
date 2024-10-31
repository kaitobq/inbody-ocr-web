export type ImageData = {
  user_id: string
  user_name: string
  weight: number
  height: number
  muscle_weight: number
  fat_weight: number
  fat_percent: number
  body_water: number
  protein: number
  mineral: number
  point: number
  created_at: string
  updated_at: string
}

export type GetMemberDashboardDataResponse = {
  status: number
  message: string
  current: {
    weight: number
    muscle_weight: number
    fat_weight: number
    created_at: string
  }
  previous: {
    weight: number
    muscle_weight: number
    fat_weight: number
    created_at: string
  }
  graph: {
    kilo: [
      {
        weight: number
        muscle_weight: number
        fat_weight: number
        body_water: number
        protein: number
        mineral: number
        created_at: string
      },
    ]
    percent: [
      {
        fat_percent: number
        created_at: string
      },
    ]
    score: [
      {
        point: number
        created_at: string
      },
    ]
  }
  history: ImageData[]
}

export type AnalyzedData = {
  height: number
  weight: number
  muscle_weight: number
  fat_weight: number
  fat_percent: number
  body_water: number
  protein: number
  mineral: number
  point: number
  created_at: string
  updated_at: string
}

export type AnalyzeImageResponse = {
  status: number
  message: string
  results: AnalyzedData
}

export type PostAnalyzedDataResponse = {
  message: string
}
