// Payment-oversight integration test (1.4) against the LIVE backend.
// Read-only: exercises GET /payments (all), GET /payments/:id, and the live
// GET /payments/transaction/:tranId. Creates nothing — no cleanup needed.
// Run: node scripts/test-payments.mjs
const BASE = "https://nins.zephlotech.com/api"
const ADMIN = { email: "superadmin@nins.gov.bd", password: "nins@2026" }

const results = []
const ok = (name, cond, detail = "") =>
  results.push({ name, pass: !!cond, detail })

async function call(path, { method = "GET", token, params } = {}) {
  let url = BASE + path
  if (params) {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) if (v != null) sp.set(k, v)
    const q = sp.toString()
    if (q) url += "?" + q
  }
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
  })
  const t = await res.text()
  let j = null
  try {
    j = t ? JSON.parse(t) : null
  } catch {}
  return { status: res.status, data: j?.data, raw: t }
}

;(async () => {
  const loginRes = await fetch(BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ADMIN),
  })
  const tok = (await loginRes.json()).data?.token
  ok("superadmin login", !!tok)

  if (!tok) return finish()

  /* ── All-payments ledger ────────────────────────────────────────────── */
  const all = (
    await call("/payments", { token: tok, params: { page: 1, limit: 5 } })
  ).data
  ok(
    "1.4 GET /payments is paginated { data, meta }",
    Array.isArray(all?.data) && typeof all?.meta?.total === "number",
    `total=${all?.meta?.total ?? 0}`,
  )

  // Status filter works (e.g. only VALIDATED).
  const validated = (
    await call("/payments", {
      token: tok,
      params: { page: 1, limit: 5, status: "VALIDATED" },
    })
  ).data
  ok(
    "1.4 status filter excludes non-matches",
    (validated?.data ?? []).every((p) => p.status === "VALIDATED"),
    `${validated?.data?.length ?? 0} validated`,
  )

  const first = all?.data?.[0]
  if (first) {
    /* ── Single payment detail ─────────────────────────────────────────── */
    const one = (await call(`/payments/${first._id}`, { token: tok })).data
    ok(
      "1.4 GET /payments/:id returns populated payment",
      one?._id === first._id && typeof one?.tranId === "string",
      one?.tranId,
    )
    ok(
      "1.4 list payment carries patient + appointment",
      typeof one?.patientId === "object" &&
        typeof one?.appointmentId === "object",
    )

    /* ── Live transaction verify ───────────────────────────────────────── */
    const txn = (
      await call(`/payments/transaction/${first.tranId}`, { token: tok })
    ).data
    ok(
      "1.4 transaction lookup returns { local, sslcommerz }",
      txn?.local?.tranId === first.tranId &&
        typeof txn?.local?.status === "string" &&
        typeof txn?.sslcommerz === "object",
      `local=${txn?.local?.status} | ssl keys=${
        txn?.sslcommerz ? Object.keys(txn.sslcommerz).length : 0
      }`,
    )
  } else {
    ok("1.4 payment exists to test detail/txn against", false, "no payments in DB")
  }

  finish()
})().catch((e) => {
  console.error("FATAL:", e)
  process.exit(1)
})

function finish() {
  console.log("\n=== Payment oversight (1.4) integration test ===")
  for (const r of results) {
    console.log(
      `${r.pass ? "✅" : "❌"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`,
    )
  }
  const failed = results.filter((r) => !r.pass).length
  console.log(
    `\n${failed === 0 ? "ALL GREEN ✅" : `${failed} FAILED ❌`}  (${results.length - failed}/${results.length} passed)`,
  )
}
