import { toast } from "sonner"
import { mockDelay } from "@/lib/mock-data"

/**
 * DEMO MODE: Report download functions show a toast instead of triggering a
 * real download. No network calls made.
 */

type Range = { startDate?: string; endDate?: string }

async function fakeDl(name: string): Promise<void> {
  await mockDelay(1000)
  toast.success(`${name} ready — download disabled in demo mode`)
}

export function downloadRevenueExcel(_range: { startDate: string; endDate: string }) {
  return fakeDl("Revenue Excel Report")
}

export function downloadRevenuePdf(_range: { startDate: string; endDate: string }) {
  return fakeDl("Revenue PDF Report")
}

export function downloadPatientsExcel(_range: Range) {
  return fakeDl("Patients Excel Report")
}

export function downloadPatientsPdf(_range: Range) {
  return fakeDl("Patients PDF Report")
}
