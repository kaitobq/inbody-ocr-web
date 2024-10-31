import { Cookie } from "@/mods/cookie"
import {
  AnalyzeImage,
  GetMemberDashboardData,
  PostAnalyzedData,
} from "@/mods/repositories/dashboard"
import type { AnalyzedData } from "@/types/dashboard/member"

export const getDataForMember = async () => {
  const cookie = Cookie()
  const token = await cookie.get("token")
  if (!token) {
    return
  }

  const data = await GetMemberDashboardData(token)
  return data
}

export const analyzeImage = async (image: File) => {
  const cookie = Cookie()
  const token = await cookie.get("token")
  if (!token) {
    return
  }

  const res = await AnalyzeImage(token, image)
  return res
}

export const submitAnalyzedData = async (data: AnalyzedData) => {
  const cookie = Cookie()
  const token = await cookie.get("token")
  if (!token) {
    return
  }

  const res = await PostAnalyzedData(token, data)
  return res
}
