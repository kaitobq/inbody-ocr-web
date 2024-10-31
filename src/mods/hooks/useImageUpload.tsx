import { Cookie } from "@/mods/cookie"
import { AnalyzeImage, PostAnalyzedData } from "@/mods/repositories/dashboard"
import type { AnalyzedData } from "@/types/dashboard/member"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "./useToast"

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false)
  const [analyzedData, setAnalyzedData] = useState<AnalyzedData | null>(null)
  const cookie = Cookie()
  const showToast = useToast()
  const router = useRouter()

  const analyze = async (file: File) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      return
    }

    try {
      setLoading(true)
      const res = await AnalyzeImage(token, file)
      setAnalyzedData(res?.results || null)
    } catch (error) {
      console.error("エラーが発生しました:", error)
      setAnalyzedData(null)
    } finally {
      setLoading(false)
    }
  }

  const submitData = async (data: AnalyzedData) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      return
    }

    try {
      setLoading(true)
      const res = await PostAnalyzedData(token, data)
      console.log("データ送信成功:", res)
      setAnalyzedData(null)
      showToast.success("データの登録に成功しました")
      router.refresh()
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    analyzedData,
    setAnalyzedData,
    analyze,
    submitData,
  }
}
