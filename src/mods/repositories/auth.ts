import { fetcher } from "@/mods/repositories/fetcher"
import type { SignInRequest, SignInResponse } from "@/types/auth/signin"

export const SignIn = async (req: SignInRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<SignInResponse>({
    path: "/v1/organization/signin",
    method: "POST",
    body: {
      email: req.email,
      password: req.password,
    },
  })
}
