import { ImageUploader, Presentation } from "@/components/dashboard/member"
import { getDataForMember } from "@/mods/screen/dashboard"

export const MemberDashboardContainer = async () => {
  const data = await getDataForMember()
  console.log(data)

  return (
    <Presentation data={data}>
      <ImageUploader />
    </Presentation>
  )
}