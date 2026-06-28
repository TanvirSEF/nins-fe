"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { format, isValid, parseISO } from "date-fns"
import { useGlobalSearch } from "@/services/queries/useSearchQuery"
import {
  AppointmentStatus,
  SearchDoctorResult,
  SearchResult,
  SearchType,
} from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pagination } from "@/components/shared/Pagination"
import { RemoteImage } from "@/components/shared/RemoteImage"
import {
  CalendarDays,
  Phone,
  Search as SearchIcon,
  Stethoscope,
  User,
} from "lucide-react"

const LIMIT = 10
const ALL = "all"

const APPT_TONE: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: "bg-warning/15 text-warning",
  [AppointmentStatus.CONFIRMED]: "bg-success/15 text-success",
  [AppointmentStatus.COMPLETED]: "bg-primary/10 text-primary",
  [AppointmentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

function initials(name?: string): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?"
}

function setParam(sp: URLSearchParams, key: string, value?: string) {
  if (!value) sp.delete(key)
  else sp.set(key, value)
}

/**
 * Global search surface. Query + type live in the URL (?q=&type=&page=) so
 * searches are shareable and the header ⌘K trigger can deep-link in. Typing is
 * debounced before it hits the API.
 */
export function SearchDirectory() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const q = params.get("q") ?? ""
  const type = (params.get("type") ?? undefined) as SearchType | undefined
  const page = Math.max(1, Number(params.get("page") ?? "1") || 1)

  const [input, setInput] = React.useState(q)
  // Sync the controlled input when the URL `q` changes externally (e.g. the
  // header ⌘K trigger deep-links in). Typing flows input → URL, not reverse.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setInput(q), [q])

  const pushUrl = React.useCallback(
    (next: { q?: string; type?: string; page?: string }) => {
      const sp = new URLSearchParams(params.toString())
      if (next.q !== undefined) setParam(sp, "q", next.q)
      if (next.type !== undefined) setParam(sp, "type", next.type)
      if (next.page !== undefined) setParam(sp, "page", next.page)
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
    },
    [params, pathname, router],
  )

  // Debounce typed input → URL `q` (resets page).
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (input !== q) pushUrl({ q: input, page: "1" })
    }, 300)
    return () => clearTimeout(t)
  }, [input, q, pushUrl])

  const onTypeChange = (v: string) =>
    pushUrl({ type: v === ALL ? "" : v, page: "1" })

  const { data, isLoading, isFetching, isError, refetch } = useGlobalSearch({
    q,
    type,
    page,
    limit: LIMIT,
  })

  const results = data?.results ?? []
  const hasQuery = q.trim().length >= 2

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search patients, doctors, appointments…"
            className="h-11 pl-9"
            autoFocus
          />
        </div>
        <Select value={type ?? ALL} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            <SelectItem value="patient">Patients</SelectItem>
            <SelectItem value="doctor">Doctors</SelectItem>
            <SelectItem value="appointment">Appointments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!hasQuery ? (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Start typing to search across patients, doctors, and appointments.
        </p>
      ) : isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <p className="rounded-xl border border-dashed border-destructive/30 py-10 text-center text-sm text-destructive">
          Search failed.{" "}
          <button className="underline" onClick={() => refetch()}>
            Try again
          </button>
        </p>
      ) : results.length > 0 ? (
        <>
          <p className="text-xs text-muted-foreground">
            {isFetching ? "Searching…" : `${data?.meta.total ?? 0} match(es)`}
          </p>
          <ResultGroups results={results} />
          {data && (data.meta.totalPages ?? 1) > 1 && (
            <Pagination
              page={page}
              meta={{
                ...data.meta,
                limit: LIMIT,
              }}
              onPageChange={(p) => pushUrl({ page: String(p) })}
            />
          )}
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No matches for “{q}”.
        </p>
      )}
    </div>
  )
}

/* Grouped results */

function ResultGroups({ results }: { results: SearchResult[] }) {
  const groups: { label: string; items: SearchResult[] }[] = []
  for (const t of ["patient", "doctor", "appointment"] as const) {
    const items = results.filter((r) => r.type === t)
    if (items.length) groups.push({ label: `${t}s`, items })
  }
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <section key={g.label} className="space-y-2">
          <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {g.label}
          </h2>
          <div className="space-y-2">
            {g.items.map((r) =>
              r.type === "patient" ? (
                <PatientRow key={`${r.type}-${r.id}`} r={r} />
              ) : r.type === "doctor" ? (
                <DoctorRow key={`${r.type}-${r.id}`} r={r} />
              ) : (
                <AppointmentRow key={`${r.type}-${r.id}`} r={r} />
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

function PatientRow({
  r,
}: {
  r: Extract<SearchResult, { type: "patient" }>
}) {
  const joined = r.createdAt ? parseISO(r.createdAt) : null
  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <User className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold text-foreground">
            {r.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {r.email}
            {r.phone && ` · ${r.phone}`}
          </p>
        </div>
        {joined && isValid(joined) && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            Joined {format(joined, "d MMM yyyy")}
          </span>
        )}
      </CardContent>
    </Card>
  )
}

function DoctorRow({ r }: { r: SearchDoctorResult }) {
  return (
    <Link href={`/doctors/${r.id}`}>
      <Card className="py-0 transition-colors hover:bg-primary/5">
        <CardContent className="flex items-center gap-3 py-3">
          <RemoteImage
            src={r.profilePicture}
            alt={r.name}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-cover"
            fallback={
              <Avatar className="size-10 shrink-0 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials(r.name)}
                </AvatarFallback>
              </Avatar>
            }
          />
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm font-bold text-foreground">
              {r.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              <Stethoscope className="mr-1 inline size-3" />
              {r.designation}
              {r.department && ` · ${r.department}`}
              {r.bmdcReg && ` · BMDC ${r.bmdcReg}`}
            </p>
          </div>
          <Badge variant="secondary">Profile</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}

function AppointmentRow({
  r,
}: {
  r: Extract<SearchResult, { type: "appointment" }>
}) {
  const d = r.appointmentDate ? parseISO(r.appointmentDate) : null
  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="text-[9px] font-semibold uppercase text-muted-foreground">
              Serial
            </span>
            <span className="font-heading text-sm font-extrabold leading-none">
              {r.serialNumber}
            </span>
          </span>
          <div className="min-w-0">
            <p className="font-heading text-sm font-bold text-foreground">
              {r.patientName}
            </p>
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3" />
                {d && isValid(d) ? format(d, "d MMM yyyy") : "—"}
              </span>
              {r.patientPhone && (
                <span className="inline-flex items-center gap-1">
                  <Phone className="size-3" />
                  {r.patientPhone}
                </span>
              )}
            </p>
          </div>
        </div>
        <Badge className={APPT_TONE[r.status]}>{r.status}</Badge>
      </CardContent>
    </Card>
  )
}
