import { fetcher } from "@/mods/repositories/fetcher"
import type {
  AnalyzedData,
  AnalyzeImageResponse,
  GetAdminDashboardDataResponse,
  GetMemberDashboardDataResponse,
  PostAnalyzedDataResponse,
} from "@/types/dashboard/member"

export const GetMemberDashboardData = async (token: string) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<GetMemberDashboardDataResponse>({
    path: "/v1/organization/dashboard",
    method: "GET",
    accessToken: token,
  })
}

export const GetAdminDashboardData = async (token: string) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<GetAdminDashboardDataResponse>({
    path: "/v1/organization/dashboard/admin",
    method: "GET",
    accessToken: token,
  })
}

export const PostAnalyzedData = async (token: string, data: AnalyzedData) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<PostAnalyzedDataResponse>({
    path: "/v1/image-data",
    method: "POST",
    body: data,
    accessToken: token,
  })
}

export const AnalyzeImage = async (token: string, image: File) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchFormData<AnalyzeImageResponse>({
    path: "/v1/image",
    method: "POST",
    body: {
      image,
    },
    accessToken: token,
  })
}
