import { z } from "zod"

export const SignUpSchema = z.object({
  name: z
    .string({
      required_error: "ユーザー名を入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(1, { message: "ユーザー名を入力してください。" }),
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
  confirmPassword: z
    .string({
      required_error: "パスワードを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

export type SignUpRequest = {
  name: string
  email: string
  password: string
}

export type SignUpResponse = {
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
