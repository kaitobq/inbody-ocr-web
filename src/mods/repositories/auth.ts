import { fetcher } from "@/mods/repositories/fetcher"
import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
} from "@/types/auth/createOrganization"
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

export const CreateOrganization = async (req: CreateOrganizationRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<CreateOrganizationResponse>({
    path: "/v1/organization",
    method: "POST",
    body: {
      userName: req.userName,
      email: req.email,
      password: req.password,
      organizationName: req.organizationName,
    },
  })
}
