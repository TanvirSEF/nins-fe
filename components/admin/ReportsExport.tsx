"use client"

import * as React from "react"
import {
  downloadRevenueExcel,
  downloadRevenuePdf,
  downloadPatientsExcel,
  downloadPatientsPdf,
} from "@/services/queries/useReportQuery"
import { ApiError } from "@/lib/api-client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, FileSpreadsheet, FileText } from "lucide-react"

export function ReportsExport() {
  const [start, setStart] = React.useState("")
  const [end, setEnd] = React.useState("")
  const [busy, setBusy] = React.useState<string>()

  const revenueReady = !!start && !!end

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key)
    try {
      await fn()
      toast.success("Report downloaded")
    } catch (error) {
      const msgs =
        error instanceof ApiError
          ? error.messages
          : ["Couldn't generate the report."]
      msgs.forEach((m) => toast.error(m))
    } finally {
      setBusy(undefined)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Date range</CardTitle>
          <CardDescription>
            Revenue reports require a start and end date. Patient reports accept
            an optional range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 sm:max-w-md">
            <div className="space-y-1.5">
              <Label htmlFor="start">Start date</Label>
              <Input
                id="start"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="end">End date</Label>
              <Input
                id="end"
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Revenue report</CardTitle>
            <CardDescription>
              Validated payments within the selected range.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-1.5"
              disabled={!revenueReady || busy === "rev-xlsx"}
              onClick={() =>
                run("rev-xlsx", () =>
                  downloadRevenueExcel({ startDate: start, endDate: end }),
                )
              }
            >
              {busy === "rev-xlsx" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="size-4" />
              )}
              Excel
            </Button>
            <Button
              variant="outline"
              className="gap-1.5"
              disabled={!revenueReady || busy === "rev-pdf"}
              onClick={() =>
                run("rev-pdf", () =>
                  downloadRevenuePdf({ startDate: start, endDate: end }),
                )
              }
            >
              {busy === "rev-pdf" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              PDF
            </Button>
          </CardContent>
        </Card>

        {/* Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Patient report</CardTitle>
            <CardDescription>
              Registered patients, optionally within a range.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-1.5"
              disabled={busy === "pat-xlsx"}
              onClick={() =>
                run("pat-xlsx", () =>
                  downloadPatientsExcel({ startDate: start, endDate: end }),
                )
              }
            >
              {busy === "pat-xlsx" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="size-4" />
              )}
              Excel
            </Button>
            <Button
              variant="outline"
              className="gap-1.5"
              disabled={busy === "pat-pdf"}
              onClick={() =>
                run("pat-pdf", () =>
                  downloadPatientsPdf({ startDate: start, endDate: end }),
                )
              }
            >
              {busy === "pat-pdf" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
