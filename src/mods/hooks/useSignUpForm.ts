import { useCookie } from "@/mods/hooks/cookie"
import { useToast } from "@/mods/hooks/useToast"
import { SignUp } from "@/mods/repositories/auth"
import type { SignUpRequest, SignUpSchemaType } from "@/types/auth/signup"
import { SignUpSchema } from "@/types/auth/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useSignUpForm = (orgId: string) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const cookie = useCookie()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignUpSchemaType) => {
    setLoading(true)

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "パスワードが一致しません。",
      })
      setLoading(false)
      return
    }

    try {
      const req: SignUpRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
      }
      const res = await SignUp(orgId, req)
      cookie.set("token", res.token.value)
      toast.success("ユーザーを作成しました。")
      router.push(`/dashboard?organization_id=${orgId}&role=${res.user.role}`)
    } catch (error) {
      console.error(error)
      toast.error("ユーザーの作成に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  return { control, errors, loading, handleSubmit, onSubmit }
}
