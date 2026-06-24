// Validates the multipart image-upload path end-to-end against the live
// backend (the wire that lib/api-client `form?` + useUploadDepartmentImage use).
// Creates a throwaway department, uploads a 1x1 PNG, asserts an image URL is
// returned, then deletes the department. Run: node scripts/upload-smoke.mjs
const BASE = "https://nins.zephlotech.com/api"
const ADMIN = { email: "superadmin@nins.gov.bd", password: "nins@2026" }
const RUN = Date.now()
// 1x1 transparent PNG.
const PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

async function call(path, { method = "GET", token, body, params } = {}) {
  let url = BASE + path
  if (params) {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params))
      if (v != null) sp.set(k, v)
    const q = sp.toString()
    if (q) url += "?" + q
  }
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const t = await res.text()
  let j = null
  try {
    j = t ? JSON.parse(t) : null
  } catch {}
  return { status: res.status, data: j?.data, raw: t }
}

;(async () => {
  const tok = (await call("/auth/login", { method: "POST", body: ADMIN })).data
    ?.token
  console.log("admin login:", tok ? "ok" : "FAILED")

  const dept = await call("/departments", {
    method: "POST",
    token: tok,
    body: { name: `UpSmoke ${RUN}`, code: `UP${String(RUN).slice(-6)}` },
  })
  const id = dept.data?._id
  console.log("created throwaway dept:", id)

  const bytes = Buffer.from(PNG_B64, "base64")
  const fd = new FormData()
  fd.append("file", new Blob([bytes], { type: "image/png" }), "test.png")

  const up = await fetch(`${BASE}/departments/${id}/image`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + tok },
    body: fd,
  })
  const ut = await up.text()
  let uj = null
  try {
    uj = JSON.parse(ut)
  } catch {}
  console.log("upload status:", up.status)
  console.log("image url:", uj?.data?.image ?? "(none)")
  console.log(
    "RESULT:",
    up.status === 200 && typeof uj?.data?.image === "string"
      ? "PASS — multipart upload works"
      : "FAIL",
  )

  await call(`/departments/${id}`, { method: "DELETE", token: tok })
  console.log("cleaned up")
})()
