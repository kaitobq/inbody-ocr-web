import { Header } from "@/components/common"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <div className="mt-14 flex gap-5 px-4">
        <Link href="/signin" className="rounded-lg bg-blue-500 p-2 text-white">
          Signin
        </Link>
        <Link href="/signup" className="rounded-lg bg-blue-500 p-2 text-white">
          Signup
        </Link>
      </div>
    </div>
  )
}
