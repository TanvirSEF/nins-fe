import { apiClient } from "@/lib/api-client"

/**
 * Download the appointment ticket PDF. Only succeeds when the appointment is
 * CONFIRMED and a VALIDATED payment exists (backend returns 400 otherwise).
 * Uses the apiClient `raw` path → blob → object URL → anchor click.
 */
export async function downloadTicket(appointmentId: string): Promise<void> {
  const res = await apiClient<Response>(
    `/appointments/${appointmentId}/ticket`,
    { method: "GET", raw: true },
  )
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `ticket-${appointmentId}.pdf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
