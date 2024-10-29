import Link from "next/link"

export const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-slate-100 p-3">
      <Link href="/">
        <h1 className="text-lg font-bold">InBody OCR</h1>
      </Link>
    </div>
  )
}
