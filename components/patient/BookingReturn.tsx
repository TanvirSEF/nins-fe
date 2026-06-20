"use client"

import * as React from "react"
import Link from "next/link"
import { useAppointment } from "@/services/queries/useAppointmentQuery"
import { downloadTicket } from "@/lib/ticket"
import { ApiError } from "@/lib/api-client"
import { AppointmentStatus } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  Ticket,
} from "lucide-react"

type Result = "success" | "fail" | "cancel"

export function BookingReturn({
  appointmentId,
  result,
}: {
  appointmentId: string
  result: Result
}) {
  const { data: appt, isLoading, isError } = useAppointment(appointmentId, {
    poll: true,
  })
  const [downloading, setDownloading] = React.useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadTicket(appointmentId)
      toast.success("Ticket downloaded")
    } catch (error) {
      const messages =
        error instanceof ApiError
          ? error.messages
          : ["Couldn't download the ticket."]
      messages.forEach((m) => toast.error(m))
    } finally {
      setDownloading(false)
    }
  }

  if (!appointmentId) {
    return (
      <MissingResult
        title="No booking to show"
        message="We couldn't find a booking reference in your link."
      />
    )
  }

  if (isLoading) {
    return <Skeleton className="h-56 w-full rounded-2xl" />
  }
  if (isError || !appt) {
    return (
      <MissingResult
        title="Couldn't load this booking"
        message="If you just paid, the confirmation may still be processing. Check your appointments shortly."
      />
    )
  }

  const confirmed = appt.status === AppointmentStatus.CONFIRMED
  const cancelled = appt.status === AppointmentStatus.CANCELLED
  const processing = !confirmed && !cancelled

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          {confirmed ? (
            <CheckCircle2 className="size-12 text-success" />
          ) : cancelled || result === "fail" || result === "cancel" ? (
            <XCircle className="size-12 text-destructive" />
          ) : (
            <Loader2 className="size-12 animate-spin text-primary" />
          )}

          <h1 className="font-heading text-xl font-bold text-foreground">
            {confirmed
              ? "Booking confirmed"
              : result === "fail"
                ? "Payment failed"
                : result === "cancel"
                  ? "Payment cancelled"
                  : "Confirming your payment…"}
          </h1>

          <p className="max-w-sm text-sm text-muted-foreground">
            {confirmed
              ? "Your appointment is confirmed. Download your ticket below."
              : cancelled
                ? "This booking was cancelled."
                : processing
                  ? "We received your payment and are waiting for final confirmation. This usually takes a few seconds."
                  : "Your payment didn't go through. You can try booking again."}
          </p>

          <Badge variant={confirmed ? "default" : "secondary"}>
            {appt.status}
          </Badge>
        </CardContent>
      </Card>

      {confirmed && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Ticket className="size-5 text-success" />
              <span className="font-heading text-sm font-semibold">
                Outpatient Ticket
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Your serial number
              </p>
              <p className="font-heading text-4xl font-extrabold text-foreground">
                {appt.serialNumber}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Serials are day-scoped — the next date starts from 1.
              </p>
            </div>
            <Button
              className="w-full gap-2"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
              Download ticket (PDF)
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard/patient">Back to portal</Link>
        </Button>
        {!confirmed && (
          <Button asChild>
            <Link href="/dashboard/patient/book">Book again</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

function MissingResult({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <XCircle className="size-10 text-muted-foreground" />
        <h1 className="font-heading text-lg font-bold text-foreground">
          {title}
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/patient">Back to portal</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
