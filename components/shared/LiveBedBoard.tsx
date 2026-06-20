"use client"

import * as React from "react"
import Link from "next/link"
import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { formatDistanceToNow } from "date-fns"
import { useLiveBoard, useBeds, useUpdateBedStatus } from "@/services/queries/useBedQuery"
import { useAuth } from "@/hooks/useAuth"
import { ApiError } from "@/lib/api-client"
import type { Bed, BedAvailability } from "@/types"
import { BedType, Role } from "@/types"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import {
  BedDouble,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  User,
  Clock,
} from "lucide-react"

const STAFF_ROLES: Role[] = [Role.SUPER_ADMIN, Role.HOSPITAL_STAFF]

function statsFor(
  data: BedAvailability[] | undefined,
  type: BedType,
): BedAvailability | undefined {
  return data?.find((d) => d.type === type)
}

/**
 * Public Live ICU/HDU Bed Board (PRD §7.1).
 * - `compact`: summary cards + CTA, for the homepage.
 * - full: Tabs (ICU/HDU) + summary + bed grid + staff update drawer.
 * Public endpoints; logged-in STAFF/ADMIN get an edit drawer on bed click.
 */
export function LiveBedBoard({ compact = false }: { compact?: boolean }) {
  return compact ? <BedBoardCompact /> : <BedBoardFull />
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Full board                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

function BedBoardFull() {
  const [activeType, setActiveType] = React.useState<BedType>(BedType.ICU)
  const [editing, setEditing] = React.useState<Bed | null>(null)

  const liveBoard = useLiveBoard()
  const beds = useBeds(activeType)
  const { user } = useAuth()
  const canEdit = !!user && STAFF_ROLES.includes(user.role)

  const activeStats = statsFor(liveBoard.data, activeType)

  const refresh = () => {
    liveBoard.refetch()
    beds.refetch()
  }

  return (
    <div className="space-y-6">
      {/* Summary cards for the active type */}
      <div className="grid gap-4 sm:grid-cols-2">
        {liveBoard.isLoading ? (
          <>
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </>
        ) : liveBoard.isError ? (
          <ErrorCard
            message="Couldn't load bed availability."
            onRetry={liveBoard.refetch}
            className="sm:col-span-2"
          />
        ) : (
          <>
            <SummaryCard
              label={`${activeType} Vacant`}
              value={activeStats?.available ?? 0}
              hint={`of ${activeStats?.total ?? 0} beds ready for admission`}
              tone="success"
            />
            <SummaryCard
              label={`${activeType} Occupied`}
              value={activeStats?.occupied ?? 0}
              hint={`admitted patients`}
              tone="warning"
            />
          </>
        )}
      </div>

      {/* Tabs + refresh */}
      <Tabs
        value={activeType}
        onValueChange={(v) => setActiveType(v as BedType)}
        className="w-full"
      >
        <div className="flex items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value={BedType.ICU}>ICU</TabsTrigger>
            <TabsTrigger value={BedType.HDU}>HDU</TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={liveBoard.isFetching || beds.isFetching}
            className="gap-1.5"
          >
            <RefreshCw
              className={
                liveBoard.isFetching || beds.isFetching ? "animate-spin" : ""
              }
            />
            Refresh
          </Button>
        </div>

        {(Object.values(BedType) as BedType[]).map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            {type === activeType && (
              <BedGrid
                beds={beds.data}
                isLoading={beds.isLoading}
                isError={beds.isError}
                onRetry={beds.refetch}
                canEdit={canEdit}
                onSelect={setEditing}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>

      <StaffBedSheet bed={editing} onClose={() => setEditing(null)} />
    </div>
  )
}

function BedGrid({
  beds,
  isLoading,
  isError,
  onRetry,
  canEdit,
  onSelect,
}: {
  beds: Bed[] | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  canEdit: boolean
  onSelect: (bed: Bed) => void
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorCard
        message="Couldn't load the bed grid."
        onRetry={onRetry}
      />
    )
  }

  if (!beds || beds.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        No beds configured for this unit.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {beds.map((bed) => (
        <BedCell
          key={bed._id}
          bed={bed}
          canEdit={canEdit}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function BedCell({
  bed,
  canEdit,
  onSelect,
}: {
  bed: Bed
  canEdit: boolean
  onSelect: (bed: Bed) => void
}) {
  const occupied = bed.isOccupied
  return (
    <button
      type="button"
      disabled={!canEdit}
      onClick={() => canEdit && onSelect(bed)}
      className={[
        "flex w-full flex-col gap-2 rounded-xl border p-3 text-left transition-colors",
        occupied
          ? "border-warning/40 bg-warning/5 hover:bg-warning/10"
          : "border-success/30 bg-success/5 hover:bg-success/10",
        canEdit ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
      title={canEdit ? "Update bed status" : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm font-semibold text-foreground">
          {bed.bedNumber}
        </span>
        <Badge
          className={
            occupied
              ? "bg-warning/15 text-warning"
              : "bg-success/15 text-success"
          }
        >
          {occupied ? "Occupied" : "Vacant"}
        </Badge>
      </div>
      <span className="text-[11px] text-muted-foreground">{bed.wardName}</span>
      {occupied ? (
        <div className="space-y-1 border-t border-warning/20 pt-2 text-[11px]">
          {bed.currentPatientName && (
            <p className="flex items-center gap-1 truncate text-foreground">
              <User className="size-3 shrink-0" />
              {bed.currentPatientName}
            </p>
          )}
          {bed.admittedAt && (
            <p className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3 shrink-0" />
              {formatDistanceToNow(new Date(bed.admittedAt), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>
      ) : (
        <p className="border-t border-success/20 pt-2 text-[11px] font-medium text-success/80">
          Ready for admission
        </p>
      )}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Staff update drawer                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

const bedStatusSchema = z
  .object({
    isOccupied: z.boolean(),
    currentPatientName: z.string().trim().optional(),
  })
  .refine(
    (d) => !d.isOccupied || (d.currentPatientName && d.currentPatientName.length > 0),
    {
      message: "Patient name is required when occupying a bed",
      path: ["currentPatientName"],
    },
  )

type BedStatusValues = z.infer<typeof bedStatusSchema>

function StaffBedSheet({
  bed,
  onClose,
}: {
  bed: Bed | null
  onClose: () => void
}) {
  const open = bed !== null
  const update = useUpdateBedStatus()

  const form = useForm<BedStatusValues>({
    resolver: zodResolver(bedStatusSchema),
    values:
      bed !== null
        ? {
            isOccupied: bed.isOccupied,
            currentPatientName: bed.currentPatientName ?? "",
          }
        : undefined,
  })

  const isOccupied = useWatch({ control: form.control, name: "isOccupied" })

  const onSubmit = async (values: BedStatusValues) => {
    if (!bed) return
    try {
      await update.mutateAsync({
        id: bed._id,
        body: {
          isOccupied: values.isOccupied,
          currentPatientName: values.isOccupied
            ? values.currentPatientName
            : undefined,
        },
      })
      toast.success(`${bed.bedNumber} marked as ${values.isOccupied ? "occupied" : "vacant"}`)
      onClose()
    } catch (error) {
      const messages =
        error instanceof ApiError
          ? error.messages
          : ["Could not update bed status"]
      messages.forEach((m) => toast.error(m))
    }
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        {bed && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <BedDouble className="size-4 text-primary" />
                {bed.bedNumber}
              </SheetTitle>
              <SheetDescription>
                {bed.wardName} — update occupancy status.
              </SheetDescription>
            </SheetHeader>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 p-4"
            >
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Label className="text-sm font-medium">Occupied</Label>
                  <p className="text-xs text-muted-foreground">
                    Toggle to admit or release this bed.
                  </p>
                </div>
                <Controller
                  control={form.control}
                  name="isOccupied"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {isOccupied && (
                <div className="space-y-1.5">
                  <Label htmlFor="currentPatientName">Patient name</Label>
                  <Input
                    id="currentPatientName"
                    placeholder="e.g. Rahim Uddin"
                    {...form.register("currentPatientName")}
                  />
                  {form.formState.errors.currentPatientName && (
                    <p className="text-xs font-medium text-destructive">
                      {form.formState.errors.currentPatientName.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={update.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={update.isPending}
                >
                  {update.isPending ? "Saving…" : "Save"}
                </Button>
              </div>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Compact board (homepage)                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function BedBoardCompact() {
  const liveBoard = useLiveBoard()
  const icu = statsFor(liveBoard.data, BedType.ICU)
  const hdu = statsFor(liveBoard.data, BedType.HDU)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {liveBoard.isLoading ? (
          <>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </>
        ) : liveBoard.isError ? (
          <ErrorCard
            message="Couldn't load bed availability."
            onRetry={liveBoard.refetch}
            className="sm:col-span-2"
          />
        ) : (
          <>
            <CompactStat type="ICU" stats={icu} />
            <CompactStat type="HDU" stats={hdu} />
          </>
        )}
      </div>
      <div className="flex justify-center">
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link href="/beds">
            View live board
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function CompactStat({
  type,
  stats,
}: {
  type: string
  stats: BedAvailability | undefined
}) {
  const available = stats?.available ?? 0
  const total = stats?.total ?? 0
  const pct = total > 0 ? Math.round((available / total) * 100) : 0
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-semibold">{type}</span>
          <Badge variant="secondary">{available} vacant</Badge>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {available}
          <span className="text-base font-normal text-muted-foreground">
            {" "}
            / {total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-success transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared bits                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

function SummaryCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: number
  hint: string
  tone: "success" | "warning"
}) {
  return (
    <Card
      className={
        tone === "success"
          ? "border-success/30 bg-success/5"
          : "border-warning/40 bg-warning/5"
      }
    >
      <CardContent className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-heading text-3xl font-bold text-foreground">
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

function ErrorCard({
  message,
  onRetry,
  className,
}: {
  message: string
  onRetry: () => void
  className?: string
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-8 text-center sm:col-span-2 ${className ?? ""}`}
    >
      <AlertCircle className="size-6 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5">
        <RefreshCw className="size-3.5" />
        Try again
      </Button>
    </div>
  )
}
