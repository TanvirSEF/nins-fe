import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { DoctorDetail } from "@/components/shared/DoctorDetail"

export const metadata = {
  title: "Doctor Profile | NINS",
}

export default async function DoctorDetailPage({
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
          <div className="mx-auto max-w-5xl px-6">
            <DoctorDetail id={id} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
