import Link from "next/link"
import { Building2 } from "lucide-react"
import type { Department } from "@/types"
import { RemoteImage } from "./RemoteImage"

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={`/departments/${department._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <RemoteImage
          src={department.image}
          alt={department.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
          }
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
            {department.code}
          </span>
          <h3 className="font-heading text-base font-bold text-foreground">
            {department.name}
          </h3>
        </div>
        {department.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {department.description}
          </p>
        )}
        <p className="mt-auto text-[11px] text-muted-foreground">
          {department.units?.length ?? 0} units
        </p>
      </div>
    </Link>
  )
}
