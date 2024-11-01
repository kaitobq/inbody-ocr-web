import { useLoading } from "@/components/common/LoadingContext"
import { Cookie } from "@/mods/cookie"
import { useToast } from "@/mods/hooks/useToast"
import { SignIn } from "@/mods/repositories/auth"
import type { SignInRequest, SignInSchemaType } from "@/types/auth/signin"
import { SignInSchema } from "@/types/auth/signin"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const useSignInForm = () => {
  const { isLoading, setLoading } = useLoading()
  const router = useRouter()
  const cookie = Cookie()
  const toast = useToast()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInSchemaType) => {
    setLoading(true)
    try {
      const req: SignInRequest = {
        email: data.email,
        password: data.password,
      }
      const res = await SignIn(req)
      await cookie.set("token", res.token.value)
      toast.success("サインインしました。")
      router.push(
        `/dashboard?organization_id=${res.organization_id}&role=${res.user.role}`,
      )
    } catch (e) {
      console.error(e)
      toast.error("サーバーエラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return { control, errors, isLoading, handleSubmit, onSubmit }
}
