import { Role } from "@/types"

/**
 * Maps each role to its landing route. Single source of truth, shared by the
 * `/dashboard` index redirector and the post-login redirect.
 */
export const ROLE_HOME: Record<Role, string> = {
  [Role.PATIENT]: "/dashboard/patient",
  [Role.DOCTOR]: "/dashboard/doctor",
  [Role.SUPER_ADMIN]: "/dashboard/admin",
  [Role.HOSPITAL_STAFF]: "/dashboard/admin",
}

/**
 * Resolve a safe post-login destination. Honors a `?redirect=` deep link ONLY
 * when it stays inside the user's own role area; otherwise sends them to their
 * role home.
 *
 * Without this, a cross-role redirect leaks a user onto another role's page:
 * e.g. an admin URL left in the address bar (set by `RoleGate` when auth drops
 * on a `/dashboard/admin/*` page) would dump a freshly-logged-in doctor onto an
 * admin route and trigger the "Access Restricted" gate. Role-aware resolution
 * makes that impossible.
 */
export function resolvePostLoginPath(
  requested: string | null,
  role: Role | null,
): string {
  const home = role ? (ROLE_HOME[role] ?? "/dashboard") : "/dashboard"
  if (!requested || !requested.startsWith("/")) return home
  // Only same-role deep links are safe — never bounce into another role's area.
  return requested === home || requested.startsWith(`${home}/`)
    ? requested
    : home
}
