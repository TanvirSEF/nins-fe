import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { DoctorProfile } from "@/types"
import { RemoteImage } from "./RemoteImage"

export function doctorName(d: DoctorProfile): string {
  return typeof d.userId === "object" ? d.userId.name : "Doctor"
}

export function doctorDeptName(d: DoctorProfile): string {
  return typeof d.departmentId === "object" ? d.departmentId.name : ""
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?"
}

export function DoctorCard({ doctor }: { doctor: DoctorProfile }) {
  const name = doctorName(doctor)
  return (
    <Link
      href={`/doctors/${doctor._id}`}
      className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-primary/10">
        <RemoteImage
          src={doctor.profilePicture}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
          fallback={
            <div className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-primary">
              {initials(name)}
            </div>
          }
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="text-xs font-medium text-primary">{doctor.designation}</p>
        <p className="truncate text-xs text-muted-foreground">
          {doctorDeptName(doctor)}
        </p>
        {doctor.specialties && doctor.specialties.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {doctor.specialties.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px]">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
