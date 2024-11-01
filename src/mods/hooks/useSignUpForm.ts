import { useLoading } from "@/components/common/LoadingContext"
import { Cookie } from "@/mods/cookie"
import { useToast } from "@/mods/hooks/useToast"
import { SignUp } from "@/mods/repositories/auth"
import type { SignUpRequest, SignUpSchemaType } from "@/types/auth/signup"
import { SignUpSchema } from "@/types/auth/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const useSignUpForm = (orgId: string) => {
  const { isLoading, setLoading } = useLoading()
  const toast = useToast()
  const cookie = Cookie()
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
      await cookie.set("token", res.token.value)
      toast.success("ユーザーを作成しました。")
      router.push(`/dashboard/${res.user.role}`)
    } catch (error) {
      console.error(error)
      toast.error("ユーザーの作成に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  return { control, errors, isLoading, handleSubmit, onSubmit }
}
