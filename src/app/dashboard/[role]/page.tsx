import { AdminDashboardContainer } from "@/components/dashboard/admin"
import { MemberDashboardContainer } from "@/components/dashboard/member"
import { notFound } from "next/navigation"
import { use } from "react"

interface Props {
  params: Promise<{ role: string }>
}

export default function Dashboard(props: Props) {
  const { role } = use(props.params)
  if (role !== "member" && role !== "admin" && role !== "owner") {
    notFound()
  }

  return (
    <div>
      {role === "member" ? (
        <MemberDashboardContainer />
      ) : (
        <AdminDashboardContainer />
      )}
    </div>
  )
}
