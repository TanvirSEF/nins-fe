export const dynamic = "force-dynamic"

/**
 * Dependency-free liveness probe for the Docker `HEALTHCHECK` and Dokploy.
 * No auth, no DB — just confirms the Next server process answers HTTP.
 */
export function GET() {
  return Response.json({ status: "ok" })
}
