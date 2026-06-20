import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { DepartmentDetail } from "@/components/shared/DepartmentDetail"

export const metadata = {
  title: "Department | NINS",
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-y border-slate-100 bg-white py-12 dark:border-white/10 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <DepartmentDetail id={id} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
