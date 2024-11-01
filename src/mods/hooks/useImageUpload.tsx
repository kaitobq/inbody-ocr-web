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
  const toast = useToast()
  const router = useRouter()

  const analyze = async (file: File) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      toast.error("認証情報が見つかりません")
      router.push("/signin")
      return
    }

    try {
      setLoading(true)
      const res = await AnalyzeImage(token, file)
      setAnalyzedData(res?.results || null)
    } catch (error) {
      console.error(error)
      toast.error("画像の解析に失敗しました")
      setAnalyzedData(null)
    } finally {
      setLoading(false)
    }
  }

  const submitData = async (data: AnalyzedData) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      toast.error("認証情報が見つかりません")
      router.push("/signin")
      return
    }

    try {
      setLoading(true)
      await PostAnalyzedData(token, data)
      setAnalyzedData(null)
      toast.success("データの登録に成功しました")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("データの登録に失敗しました")
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
