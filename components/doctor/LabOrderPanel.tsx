"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, isValid, parseISO } from "date-fns"
import { useOrderTest, usePatientReports } from "@/services/queries/usePathologyQuery"
import { ApiError } from "@/lib/api-client"
import { PathologyStatus, TestCategory } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { FlaskConical, Loader2, Plus } from "lucide-react"

const STATUS_TONE: Record<PathologyStatus, string> = {
  [PathologyStatus.ORDERED]: "bg-warning/15 text-warning",
  [PathologyStatus.SAMPLE_COLLECTED]: "bg-primary/10 text-primary",
  [PathologyStatus.IN_PROGRESS]: "bg-warning/15 text-warning",
  [PathologyStatus.COMPLETED]: "bg-success/15 text-success",
  [PathologyStatus.CANCELLED]: "bg-muted text-muted-foreground",
}

const CATEGORY_OPTIONS = [
  TestCategory.BLOOD,
  TestCategory.IMAGING,
  TestCategory.URINE,
  TestCategory.BIOPSY,
  TestCategory.OTHER,
] as const

const orderSchema = z.object({
  testName: z.string().trim().min(2, "Test name is required"),
  testCategory: z.nativeEnum(TestCategory),
  notes: z.string().optional(),
})
type OrderValues = z.infer<typeof orderSchema>

/**
 * Inline lab-ordering panel for the consultation. patientId + appointmentId
 * come from the open appointment, so no picker is needed. Ordered tests land
 * on the patient's "Lab Reports" page and fire a TEST_ORDERED notification
 * (server-side).
 */
export function LabOrderPanel({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) {
  const { data, isLoading } = usePatientReports(patientId, {
    page: 1,
    limit: 5,
  })
  const order = useOrderTest()

  const form = useForm<OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      testName: "",
      testCategory: TestCategory.BLOOD,
      notes: "",
    },
  })

  const onSubmit = async (values: OrderValues) => {
    try {
      await order.mutateAsync({
        patientId,
        appointmentId,
        testName: values.testName,
        testCategory: values.testCategory,
        notes: values.notes?.trim() || undefined,
      })
      toast.success("Lab test ordered — patient notified")
      form.reset({ testName: "", testCategory: values.testCategory, notes: "" })
    } catch (error) {
      const msgs =
        error instanceof ApiError ? error.messages : ["Couldn't order the test."]
      msgs.forEach((m) => toast.error(m))
    }
  }

  const reports = data?.data ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading">
          <FlaskConical className="size-4 text-primary" /> Lab tests
        </CardTitle>
        <CardDescription>
          Order pathology tests for this patient. Results appear on their Lab
          Reports page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Recent reports for this patient */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Recent lab activity
          </p>
          {isLoading ? (
            <Skeleton className="h-16 w-full rounded-lg" />
          ) : reports.length > 0 ? (
            <ul className="space-y-1.5">
              {reports.map((r) => {
                const d = r.orderedAt ? parseISO(r.orderedAt) : null
                return (
                  <li
                    key={r._id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {r.testName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d && isValid(d) ? format(d, "d MMM yyyy") : ""}
                      </p>
                    </div>
                    <Badge className={STATUS_TONE[r.status]}>{r.status}</Badge>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">
              No lab tests ordered for this patient yet.
            </p>
          )}
        </div>

        {/* Inline order form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          autoComplete="off"
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <Field
              label="Test name"
              required
              error={form.formState.errors.testName?.message}
            >
              <Input
                {...form.register("testName")}
                placeholder="e.g. Complete Blood Count"
              />
            </Field>
            <Field label="Category">
              <Controller
                control={form.control}
                name="testCategory"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c[0] + c.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          <Field label="Notes">
            <Textarea
              rows={2}
              {...form.register("notes")}
              placeholder="Optional — e.g. fasting sample"
            />
          </Field>

          <Button
            type="submit"
            disabled={order.isPending}
            className="gap-1.5"
            size="sm"
          >
            {order.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
            Order test
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
