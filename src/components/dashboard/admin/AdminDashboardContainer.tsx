import { Presentation } from "@/components/dashboard/admin"
import { getDataForAdmin } from "@/mods/screen/dashboard"

export const AdminDashboardContainer = async () => {
  const data = await getDataForAdmin()

  return <Presentation data={data}>AdminDashboardContainer</Presentation>
}
