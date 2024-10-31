"use client"

import { Button, Input, Label } from "@/components/ui"
import { useSignInForm } from "@/mods/hooks/useSignInForm"
import { Controller } from "react-hook-form"

export const SignInForm = () => {
  const { control, errors, isLoading, handleSubmit, onSubmit } = useSignInForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-3 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="email"
              placeholder="someone@example.com"
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="password"
              type="password"
              placeholder="password"
              onChange={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "ロード中..." : "サインイン"}
      </Button>
    </form>
  )
}
