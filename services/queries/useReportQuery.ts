import { apiClient } from "@/lib/api-client"

/**
 * Report exports return binary blobs. Each helper fetches with `raw: true`,
 * reads `.blob()`, and triggers a browser download — mirroring `lib/ticket.ts`.
 * Roles: SUPER_ADMIN, HOSPITAL_STAFF. Revenue reports require a date range;
 * patient reports accept an optional range.
 */

type Range = { startDate?: string; endDate?: string }

async function downloadReport(
  endpoint: string,
  params: Range,
  fallbackName: string,
  ext: "xlsx" | "pdf",
): Promise<void> {
  const res = await apiClient<Response>(endpoint, {
    method: "GET",
    params,
    raw: true,
  })
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  // Prefer the server-supplied filename from Content-Disposition, else synthesize.
  const disposition = res.headers.get("content-disposition") ?? ""
  const match = /filename="?([^";]+)"?/.exec(disposition)
  a.download = match ? match[1] : `${fallbackName}.${ext}`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function downloadRevenueExcel(range: {
  startDate: string
  endDate: string
}) {
  return downloadReport("/reports/revenue/excel", range, "revenue-report", "xlsx")
}

export function downloadRevenuePdf(range: {
  startDate: string
  endDate: string
}) {
  return downloadReport("/reports/revenue/pdf", range, "revenue-report", "pdf")
}

export function downloadPatientsExcel(range: Range) {
  return downloadReport(
    "/reports/patients/excel",
    range,
    "patients-report",
    "xlsx",
  )
}

export function downloadPatientsPdf(range: Range) {
  return downloadReport("/reports/patients/pdf", range, "patients-report", "pdf")
}
