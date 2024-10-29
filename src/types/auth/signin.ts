import { z } from "zod"

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .email({ message: "正しいメールアドレスを入力してください。" }),
  password: z
    .string({
      required_error: "パスワードを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  status: number
  message: string
  organization_id: string
  user: {
    id: string
    name: string
    role: string
  }
  token: {
    value: string
    expires_at: string
  }
}
