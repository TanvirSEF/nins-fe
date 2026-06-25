"use client"

import * as React from "react"
import { format, isValid, parseISO } from "date-fns"
import {
  useAllPayments,
  useTransactionStatus,
} from "@/services/queries/usePaymentQuery"
import { ApiError } from "@/lib/api-client"
import {
  Appointment,
  Payment,
  PaymentStatus,
  User,
} from "@/types"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Search, ShieldCheck } from "lucide-react"

const LIMIT = 10
const ALL = "all"

const STATUS_TONE: Record<PaymentStatus, string> = {
  [PaymentStatus.VALIDATED]: "bg-success/15 text-success",
  [PaymentStatus.PENDING]: "bg-warning/15 text-warning",
  [PaymentStatus.FAILED]: "bg-destructive/10 text-destructive",
  [PaymentStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

function patientName(p: Payment): string {
  return typeof p.patientId === "object" ? (p.patientId as User).name : "—"
}
function patientEmail(p: Payment): string {
  return typeof p.patientId === "object" ? (p.patientId as User).email : ""
}
function appointmentOf(p: Payment): Appointment | undefined {
  return typeof p.appointmentId === "object" ? p.appointmentId : undefined
}
function fmtDate(s?: string): string {
  if (!s) return "—"
  const d = parseISO(s)
  return isValid(d) ? format(d, "d MMM yyyy, HH:mm") : "—"
}

export function PaymentsOversight() {
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState<PaymentStatus | undefined>()
  const [detail, setDetail] = React.useState<Payment | null>(null)
  const [verifyOpen, setVerifyOpen] = React.useState(false)

  const { data, isLoading, isError, refetch } = useAllPayments({
    page,
    limit: LIMIT,
    status,
  })

  const onStatusChange = (v: string) => {
    setStatus(v === ALL ? undefined : (v as PaymentStatus))
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Registration-fee payments across the institute. Verify a transaction
          against SSLCommerz when a patient reports a mismatch.
        </p>
        <Button
          variant="outline"
          onClick={() => setVerifyOpen(true)}
          className="gap-1.5"
        >
          <ShieldCheck className="size-4" />
          Verify transaction
        </Button>
      </div>

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

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-4">
              <DirectoryError onRetry={refetch} />
            </div>
          ) : data && data.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="w-28">Amount</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-40">Appointment</TableHead>
                  <TableHead className="w-24 text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((p) => {
                  const appt = appointmentOf(p)
                  return (
                    <TableRow key={p._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="truncate font-mono text-xs text-foreground">
                            {p.tranId}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {fmtDate(p.paidAt ?? p.createdAt)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {patientName(p)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {patientEmail(p)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {p.amount.toFixed(2)} {p.currency}
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_TONE[p.status]}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {appt
                          ? `#${appt.serialNumber} · ${fmtDate(
                              appt.appointmentDate,
                            ).split(",")[0]}`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDetail(p)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No payments {status ? `with status "${status}"` : ""} yet.
            </p>
          )}
        </CardContent>
      </Card>

      {data && data.data.length > 0 && (
        <Pagination page={page} meta={data.meta} onPageChange={setPage} />
      )}

      <DetailDialog payment={detail} onOpenChange={(o) => !o && setDetail(null)} />

      <VerifyDialog open={verifyOpen} onOpenChange={setVerifyOpen} />
    </div>
  )
}

/* ─── Payment detail ─────────────────────────────────────────────────── */

function DetailDialog({
  payment,
  onOpenChange,
}: {
  payment: Payment | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={!!payment} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {payment && (
          <>
            <DialogHeader>
              <DialogTitle>Payment detail</DialogTitle>
              <DialogDescription className="font-mono">
                {payment.tranId}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 px-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={STATUS_TONE[payment.status]}>
                  {payment.status}
                </Badge>
              </div>
              <Row label="Patient" value={patientName(payment)} />
              <Row label="Amount" value={`${payment.amount.toFixed(2)} ${payment.currency}`} />
              <Row label="Bank txn" value={payment.bankTransactionId || "—"} mono />
              <Row label="Card" value={cardLabel(payment)} />
              <Row label="Store amount" value={payment.storeAmount != null ? `${payment.storeAmount.toFixed(2)}` : "—"} />
              <Row label="Risk level" value={payment.riskLevel || "—"} />
              <Row label="Paid at" value={fmtDate(payment.paidAt)} />
              <Row label="Created" value={fmtDate(payment.createdAt)} />
              {payment.errorReason && (
                <p className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                  {payment.errorReason}
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function cardLabel(p: Payment): string {
  const parts = [p.cardBrand, p.cardType, p.cardIssuer].filter(Boolean)
  return parts.length ? parts.join(" · ") : "—"
}

function Row({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-right text-sm font-medium text-foreground ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </span>
    </div>
  )
}

/* ─── Live transaction verify ────────────────────────────────────────── */

function VerifyDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Mount fresh each open so the input/lookup reset automatically.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {open && <VerifyForm onDone={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}

function VerifyForm({ onDone }: { onDone: () => void }) {
  const [tranId, setTranId] = React.useState("")
  const [submitted, setSubmitted] = React.useState<string | undefined>()
  const { data, isLoading, isError, error, refetch } =
    useTransactionStatus(submitted)

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const t = tranId.trim()
    if (t.length < 3) {
      toast.error("Enter a valid transaction ID.")
      return
    }
    setSubmitted(t)
  }

  const notFound =
    isError && error instanceof ApiError && error.statusCode === 404

  return (
    <>
      <DialogHeader>
        <DialogTitle>Verify transaction</DialogTitle>
        <DialogDescription>
          Look up a transaction&apos;s live status from SSLCommerz.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onVerify} className="flex items-end gap-2 px-1">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="tran-id" className="text-sm font-medium">
            Transaction ID
          </Label>
          <Input
            id="tran-id"
            value={tranId}
            onChange={(e) => setTranId(e.target.value)}
            placeholder="NINS-…"
            className="font-mono"
            autoFocus
          />
        </div>
        <Button type="submit" disabled={isLoading} className="gap-1.5">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Verify
        </Button>
      </form>

      <div className="space-y-3 px-1">
        {!submitted && (
          <p className="text-sm text-muted-foreground">
            Paste a transaction ID above to compare our record with the gateway.
          </p>
        )}

        {notFound && (
          <p className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
            No payment found for that transaction ID.
          </p>
        )}
        {isError && !notFound && (
          <p className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
            Lookup failed.{" "}
            <button className="underline" onClick={() => refetch()}>
              Retry
            </button>
          </p>
        )}

        {data && (
          <div className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Our record
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={STATUS_TONE[data.local.status]}>
                  {data.local.status}
                </Badge>
              </div>
              <Row label="Amount" value={`${data.local.amount.toFixed(2)}`} />
              <Row label="Paid at" value={fmtDate(data.local.paidAt)} />
            </div>

            <div className="rounded-lg border border-border p-3">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                SSLCommerz (live)
              </p>
              <SslFields data={data.sslcommerz} />
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Close
        </Button>
      </DialogFooter>
    </>
  )
}

/** Render the loosely-typed live gateway object defensively. */
const SSL_FIELDS: { key: string; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "tran_id", label: "Tran ID" },
  { key: "bank_tran_id", label: "Bank txn" },
  { key: "card_type", label: "Card type" },
  { key: "card_brand", label: "Card brand" },
  { key: "card_issuer", label: "Issuer" },
  { key: "amount", label: "Amount" },
  { key: "store_amount", label: "Store amount" },
  { key: "risk_level", label: "Risk level" },
  { key: "tran_date", label: "Tran date" },
]

function SslFields({ data }: { data: Record<string, unknown> }) {
  const rows = SSL_FIELDS.filter((f) => data[f.key] !== undefined)
  if (rows.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        No live details returned for this transaction.
      </p>
    )
  }
  return (
    <div className="space-y-1.5">
      {rows.map((f) => (
        <Row
          key={f.key}
          label={f.label}
          value={String(data[f.key])}
          mono={f.key.includes("tran_id")}
        />
      ))}
    </div>
  )
}
