"use client"

import { Button, Input, Label } from "@/components/ui"
import { useCreateOrganizationForm } from "@/mods/hooks/useCreateOrganizationForm"
import { Controller } from "react-hook-form"

export const CreateOrganizationForm = () => {
  const { control, errors, loading, handleSubmit, onSubmit } =
    useCreateOrganizationForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-3 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">ユーザー名</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="userName"
              placeholder="someone"
              onChange={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        {errors.userName && (
          <p className="text-xs text-red-500">{errors.userName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="email"
              type="email"
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
      <div className="space-y-2">
        <Label htmlFor="confirm-password">パスワード(確認)</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="confirm-password"
              type="password"
              placeholder="password"
              onChange={onChange}
              value={value}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="organization-name">組織名</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="organization-name"
              placeholder="organization"
              onChange={onChange}
              value={value}
            />
          )}
          name="organizationName"
        />
        {errors.organizationName && (
          <p className="text-xs text-red-500">
            {errors.organizationName.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "ロード中..." : "サインアップ"}
      </Button>
    </form>
  )
}
