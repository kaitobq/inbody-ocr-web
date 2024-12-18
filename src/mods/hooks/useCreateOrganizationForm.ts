import { useLoading } from "@/components/common/LoadingContext"
import { Cookie } from "@/mods/cookie"
import { useToast } from "@/mods/hooks/useToast"
import { CreateOrganization } from "@/mods/repositories/auth"
import type {
  CreateOrganizationRequest,
  CreateOrganizationSchemaType,
} from "@/types/auth/createOrganization"
import { CreateOrganizationSchema } from "@/types/auth/createOrganization"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const useCreateOrganizationForm = () => {
  const { isLoading, setLoading } = useLoading()
  const toast = useToast()
  const cookie = Cookie()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateOrganizationSchemaType>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
    },
  })

  const onSubmit = async (data: CreateOrganizationSchemaType) => {
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
      const req: CreateOrganizationRequest = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        organizationName: data.organizationName,
      }
      const res = await CreateOrganization(req)
      await cookie.set("token", res.token.value)
      toast.success("組織を作成しました。")
      router.push(`/dashboard/${res.user.role}`)
    } catch (error) {
      console.error(error)
      toast.error("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return { control, errors, isLoading, handleSubmit, onSubmit }
}
