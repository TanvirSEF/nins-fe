"use client"

import * as React from "react"
import { useMyPayments } from "@/services/queries/usePaymentQuery"
import { Appointment, Payment, PaymentStatus } from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, parseISO } from "date-fns"

const LIMIT = 10
const ALL = "all"

function appointmentOf(p: Payment): Appointment | undefined {
  return typeof p.appointmentId === "object" ? p.appointmentId : undefined
}

const STATUS_TONE: Record<PaymentStatus, string> = {
  [PaymentStatus.VALIDATED]: "bg-success/15 text-success",
  [PaymentStatus.PENDING]: "bg-warning/15 text-warning",
  [PaymentStatus.FAILED]: "bg-destructive/10 text-destructive",
  [PaymentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

export function PaymentsDirectory() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<PaymentStatus | undefined>()

  const { data, isLoading, isError, refetch } = useMyPayments({
    page,
    limit: LIMIT,
    status,
  })

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as PaymentStatus))
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <Select value={status ?? ALL} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          <SelectItem value={PaymentStatus.VALIDATED}>Validated</SelectItem>
          <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
          <SelectItem value={PaymentStatus.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DirectoryError onRetry={refetch} />
      ) : data && data.data.length > 0 ? (
        <>
          <div className="space-y-3">
            {data.data.map((p) => (
              <PaymentCard key={p._id} payment={p} />
            ))}
          </div>
          <Pagination page={page} meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No payments {status ? `with status "${status}"` : ""} yet.
        </p>
      )}
    </div>
  )
}

function PaymentCard({ payment }: { payment: Payment }) {
  const appt = appointmentOf(payment)
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-heading text-sm font-bold text-foreground">
              {payment.amount.toFixed(2)} {payment.currency}
            </span>
            <Badge className={STATUS_TONE[payment.status]}>
              {payment.status}
            </Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {payment.tranId}
          </p>
        </div>

        <div className="text-left text-xs text-muted-foreground sm:text-right">
          {appt && (
            <p>
              Serial #{appt.serialNumber} ·{" "}
              {format(parseISO(appt.appointmentDate), "dd MMM yyyy")}
            </p>
          )}
          <p>
            {payment.paidAt
              ? `Paid ${format(parseISO(payment.paidAt), "dd MMM yyyy, HH:mm")}`
              : payment.status === PaymentStatus.VALIDATED
                ? "Validated"
                : "—"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
