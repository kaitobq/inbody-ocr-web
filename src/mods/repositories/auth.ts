import { fetcher } from "@/mods/repositories/fetcher"
import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
} from "@/types/auth/createOrganization"
import type { SignInRequest, SignInResponse } from "@/types/auth/signin"
import type { SignUpRequest, SignUpResponse } from "@/types/auth/signup"

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

export const SignUp = async (orgId: string, req: SignUpRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<SignUpResponse>({
    path: `/v1/organization/${orgId}/signup`,
    method: "POST",
    body: {
      name: req.name,
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
      user_name: req.userName,
      email: req.email,
      password: req.password,
      organization_name: req.organizationName,
    },
  })
}
