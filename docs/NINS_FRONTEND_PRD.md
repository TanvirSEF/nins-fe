# 📑 NINS Frontend — PRD & UI/UX Design System Blueprint

> **System:** NINS — National Institute of Neurosciences & Hospital, Enterprise Gateway
> **Owner:** Tanvir Hasan
> **Status:** Living document — kept in sync with `nins-backend`
> **Last verified against backend:** 2026-06-15

---

## 0. How to read this document

This PRD is written for **humans and AI coding agents alike**. Every endpoint, field name, role, enum value, and status code below was extracted directly from the NestJS backend source (`nins-backend/src`), not invented. If the backend changes, update this file in the same PR.

> **⚠️ Corrections from the original draft PRD** (these were wrong in the draft and are now fixed):
> 1. **Auth is Bearer-token in the `Authorization` header — NOT cookies.** The backend uses `passport-jwt` with `ExtractJwt.fromAuthHeaderAsBearerToken()`. The frontend must store the JWT client-side and send `Authorization: Bearer <token>`. Do **not** rely on `credentials: 'include'` / cookies.
> 2. **Backend base URL is `http://localhost:3000/api`** (port 3000, global prefix `/api`) — **not** `localhost:5000`.
> 3. **Every successful API response is wrapped:** `{ success: true, data: T }`. Every error is `{ statusCode, message, error, timestamp, path }`. The API client **must unwrap `.data`**.
> 4. **Report endpoints are `/reports/revenue/excel` & `/reports/revenue/pdf`** (plural `reports`, date-range query params) — not `/report/excel`.
> 5. **Prescriptions require a `medicalRecordId`.** The real clinical flow is: **Appointment → (status COMPLETED) → MedicalRecord → Prescription.** A prescription cannot be created without a medical record.
> 6. **Serial numbers reset per-day via date-scoped queries** (computed as `existingCount + 1`), not a midnight cron. The appointment is still effectively serial-1-at-midnight because the count query is day-bounded.

---

## 1. System Overview

NINS is a high-concurrency healthcare platform — **not** a content site. It serves four distinct user types on one codebase:

| # | Role (backend `Role` enum) | What they do in the frontend |
|---|---|---|
| 1 | `PATIENT` | Browse public ICU/HDU board, book outpatient serials, pay the registration fee, download tickets, view prescriptions & medical records |
| 2 | `DOCTOR` | View today's patient queue, create medical records, write prescriptions, manage own dashboard/leave |
| 3 | `HOSPITAL_STAFF` | Assign/release ICU & HDU beds, confirm/cancel appointments, export reports, onboard doctors & schedules |
| 4 | `SUPER_ADMIN` | Everything staff can do + CRUD on departments/doctors/schedules, delete records, full audit access |

The frontend must natively enforce, validate, and mirror the constraints already encoded in the backend (day-of-week matching, daily capacity caps, leave blocking, double-booking prevention, role-scoped routes).

---

## 2. Frontend Architecture

| Concern | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, already scaffolded in `nins-fe`) |
| Server Components | Default; client islands only where interactivity is required |
| State / data fetching | **TanStack Query v5** (`@tanstack/react-query`) over native `fetch` |
| Styling | **Tailwind CSS v4** + **shadcn/ui** (already configured, style `radix-nova`) |
| Icons | `lucide-react` (already installed) |
| Realtime | **Socket.IO client** → backend `notifications` namespace |
| Forms / validation | `react-hook-form` + `zod` (mirrors backend `class-validator` rules) |
| Charts | `recharts` (wraps behind `components/charts/`) |
| Package manager | pnpm (matches backend + existing lockfile) |

> **Note on the existing scaffold:** `nins-fe` already has `ThemeProvider` (`d` toggles dark mode), `globals.css` with shadcn tokens, and a `Button` component. Build on top of it — don't regenerate.

---

## 3. Design System & Brand Tokens

### 3.1 Color palette
| Token | Hex | Use |
|---|---|---|
| Primary — Deep Govt Teal | `#005A5B` → `#0A4D4F` | Nav, primary CTA, structural headers |
| Neutral — Slate Dark Blue | `#1E293B` | Headings, sidebars, high-contrast text |
| Emergency — Crimson Red | `#EF4444` | Occupied, quota-full, cancelled, errors |
| Success — Emerald Mint | `#10B981` | Vacant, confirmed, paid, success toasts |
| Canvas — Slate Light | `#F8FAFC` | Dashboard background |

These map onto shadcn CSS variables in `app/globals.css` (`--primary`, `--destructive`, `--secondary`, `--background`, etc.). Override the existing `oklch()` defaults with the brand teal for `--primary` / `--primary-foreground`.

### 3.2 Typography
| Face | Role |
|---|---|
| `Plus Jakarta Sans` | Page headers, hero titles, numeric counters, stats |
| `Geist` / `Geist Mono` | Nav text, buttons, form inputs, tables, tabs (Geist Mono already loaded) |
| `Inter` | Dense prose — prescriptions, medical records, pathology reports (already loaded as `--font-sans`) |
| `Noto Sans Bengali` | Bengali localization fallback |

### 3.3 Structural primitives (shadcn mappings)
- **Card:** `border border-slate-100 bg-white rounded-lg shadow-sm`
- **Borders:** `border-slate-200` — flat, no heavy drop-shadows

---

## 4. Directory Layout (Next.js App Router conventions)

> The backend uses `src/`, but `nins-fe` is **already** a flat root (no `src/`). Keep the existing structure and extend it.

```text
app/
├── (public)/                 # Unauthenticated, SEO-friendly, cached
│   ├── page.tsx              # Landing — Live ICU/HDU board widget
│   ├── departments/
│   │   ├── page.tsx          # Department directory (GET /departments)
│   │   └── [id]/page.tsx     # Department detail + its doctors
│   └── doctors/
│       ├── page.tsx          # Doctor directory (filters: dept, designation, specialty)
│       └── [id]/page.tsx     # Doctor profile + schedules (GET /doctors/:id, /schedules/doctor/:id)
├── (auth)/
│   ├── login/page.tsx        # POST /auth/login
│   └── register/page.tsx     # POST /auth/register
├── dashboard/
│   ├── layout.tsx            # Auth guard + role router (redirect by role)
│   ├── patient/              # PATIENT workspace
│   │   ├── page.tsx          # Overview
│   │   ├── book/page.tsx     # Multi-step booking stepper → POST /appointments/book
│   │   ├── tickets/page.tsx  # GET /appointments/my-tickets, download PDF
│   │   ├── payments/page.tsx # GET /payments/history
│   │   ├── records/page.tsx  # GET /medical-records/patient/my-records
│   │   └── prescriptions/page.tsx  # GET /prescriptions/patient/my-prescriptions
│   ├── doctor/               # DOCTOR workspace
│   │   ├── page.tsx          # GET /doctor-dashboard
│   │   ├── queue/page.tsx    # GET /doctor-dashboard/today-queue
│   │   └── [appointmentId]/  # Medical record + prescription composer
│   └── admin/                # SUPER_ADMIN + HOSPITAL_STAFF
│       ├── page.tsx          # GET /dashboard/stats
│       ├── beds/page.tsx     # Bed management (assign/release)
│       ├── appointments/page.tsx
│       └── reports/page.tsx  # /reports/revenue/{excel,pdf}, /reports/patients/{excel,pdf}
├── layout.tsx                # (exists) fonts, ThemeProvider, QueryProvider, SocketProvider
└── providers.tsx             # NEW: QueryClientProvider + SocketProvider + Toaster
components/
├── ui/                       # (exists) shadcn primitives
├── charts/                   # NEW: recharts wrappers
└── shared/                   # NEW: Navbar, Footer, LiveBedBoard, RoleGate, StatCard
hooks/
├── useAuth.ts                # Session/token state
└── useSocket.ts              # Socket.IO notifications listener
lib/
├── utils.ts                  # (exists) cn()
├── api-client.ts             # NEW: fetch wrapper (unwrap {success,data}, Bearer auth)
├── auth.ts                   # NEW: token storage, login/logout, role gate helpers
└── query-keys.ts             # NEW: centralized TanStack Query keys
services/
└── queries/                  # NEW: one file per resource
    ├── useAuthQuery.ts
    ├── useBedQuery.ts
    ├── useDepartmentQuery.ts
    ├── useDoctorQuery.ts
    ├── useScheduleQuery.ts
    ├── useAppointmentQuery.ts
    ├── usePaymentQuery.ts
    ├── useMedicalRecordQuery.ts
    ├── usePrescriptionQuery.ts
    ├── useDashboardQuery.ts
    ├── useNotificationQuery.ts
    └── useReportQuery.ts
types/
└── *.ts                      # NEW: TS interfaces mirroring backend schemas (Section 9)
```

---

## 5. The API Contract (read this before writing any fetch call)

### 5.1 Base URL & conventions
- **Base:** `process.env.NEXT_PUBLIC_API_URL` → default `http://localhost:3000/api`
- **Auth:** `Authorization: Bearer <jwt>` header on every non-public request.
- **Pagination:** query params `page` (1-based) + `limit` (1–100, default 10).
- **Public endpoints** (no token): `POST /auth/login`, `POST /auth/register`, `GET /bed-management/live-board`, `GET /bed-management/beds`, `GET /departments`, `GET /doctors`, `GET /schedules/doctor/:doctorId`, `GET /appointments/doctor/:doctorId`, health.

### 5.2 Response envelope (SUCCESS)
```jsonc
// TransformInterceptor wraps EVERY successful response:
{
  "success": true,
  "data": <T>            // ← the apiClient must return THIS
}
```
For paginated endpoints `T` is:
```jsonc
{
  "data": [<item>, ...],
  "meta": {
    "total": 100, "page": 1, "limit": 10,
    "totalPages": 10, "hasNextPage": true, "hasPrevPage": false
  }
}
```

### 5.3 Response envelope (ERROR) — `HttpExceptionFilter`
```jsonc
{
  "statusCode": 400,
  "message": "Doctor is not available on this day",  // ← human-readable, often an array for validation
  "error": "Bad Request",
  "timestamp": "2026-06-15T10:00:00.000Z",
  "path": "/api/appointments"
}
```
> `message` may be a **string or string[]** (class-validator arrays). The apiClient must normalize both.

### 5.4 Reference `apiClient` (CORRECTED — Bearer, not cookies)
```ts
// lib/api-client.ts
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(public statusCode: number, public messages: string[]) {
    super(messages.join('; '));
  }
}

type Options = RequestInit & {
  json?: unknown;
  params?: Record<string, string | number | undefined>;
  token?: string | null;
  /** return raw Response (for blob/PDF downloads) instead of parsed JSON */
  raw?: boolean;
};

export async function apiClient<T>(endpoint: string, opts: Options = {}): Promise<T> {
  const { json, params, token, raw, headers, ...rest } = opts;

  let url = `${BASE}${endpoint}`;
  if (params) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params))
      if (v !== undefined) sp.set(k, String(v));
    url += `?${sp.toString()}`;
  }

  const res = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
    cache: 'no-store', // backend uses Redis cache; don't add Next fetch cache on top
  });

  if (raw) {
    if (!res.ok) throw await ApiError.fromResponse(res);
    return res as unknown as T; // caller reads .blob()
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msgs = Array.isArray(body.message) ? body.message : [body.message || 'Request failed'];
    throw new ApiError(body.statusCode ?? res.status, msgs);
  }

  const payload = await res.json();
  // Unwrap the { success, data } envelope
  return (payload?.data ?? payload) as T;
}
```

---

## 6. Full Endpoint Reference

> Role column = who may call it (enforced server-side; frontend must also gate the UI).

### 6.1 Auth (`/auth`)
| Method | Path | Role | Body / Query | Returns (`data`) |
|---|---|---|---|---|
| POST | `/auth/register` | Public | `{ email, password, name, phone? }` | `{ user, token }` |
| POST | `/auth/login` | Public | `{ email, password }` | `{ user, token }` |
| GET | `/auth/profile` | Any auth | — | `User` |
| PATCH | `/auth/profile` | Any auth | `{ name?, phone? }` | `User` |

**Payload rules:** `email` valid, `password` min 8 chars, `name` required, `phone` optional.

### 6.2 Departments (`/departments`)
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/departments?page&limit` | Public | Paginated |
| GET | `/departments/:id` | Public | — |
| POST | `/departments` | SUPER_ADMIN | `{ name, code, description?, image?, units?[] }` |
| PATCH | `/departments/:id` | SUPER_ADMIN | partial |
| PATCH | `/departments/:id/image` | SUPER_ADMIN | multipart `file` (≤5MB) |
| DELETE | `/departments/:id` | SUPER_ADMIN | — |

### 6.3 Doctors (`/doctors`)
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/doctors?page&limit&departmentId&designation&specialty` | Public | Paginated + filterable |
| GET | `/doctors/:id` | Public | — |
| POST | `/doctors` | SUPER_ADMIN, HOSPITAL_STAFF | onboard |
| PATCH | `/doctors/:id` | SUPER_ADMIN | — |
| PATCH | `/doctors/:id/profile-picture` | SUPER_ADMIN | multipart ≤5MB |
| DELETE | `/doctors/:id` | SUPER_ADMIN | — |

### 6.4 Schedules (`/schedules`)
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/schedules/doctor/:doctorId` | **Public** | returns array — used by booking step 3 |
| GET | `/schedules/:id` | Public | — |
| POST | `/schedules` | SUPER_ADMIN, HOSPITAL_STAFF | `{ doctorId, dayOfWeek(0–6), startTime(HH:mm), endTime(HH:mm), maxPatients? }` |
| PATCH | `/schedules/:id` | SUPER_ADMIN, HOSPITAL_STAFF | — |
| DELETE | `/schedules/:id` | SUPER_ADMIN | — |

### 6.5 Bed Management (`/bed-management`)
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/bed-management/live-board` | **Public** | aggregated `{ ICU, HDU }` stats |
| GET | `/bed-management/beds?type=ICU\|HDU` | Public | all beds (filter by type) |
| GET | `/bed-management/beds/:id` | Public | — |
| PATCH | `/bed-management/beds/:id` | SUPER_ADMIN, HOSPITAL_STAFF | `{ isOccupied, currentPatientName? }` |

### 6.6 Appointments (`/appointments`)
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/appointments` | PATIENT | book without payment → returns `Appointment` |
| POST | `/appointments/book` | PATIENT | book + init payment → `{ appointmentId, tranId, gatewayPageURL }` |
| GET | `/appointments/my-tickets?page&limit&status&doctorId` | Any auth | patient's history |
| GET | `/appointments/doctor/:doctorId?date=YYYY-MM-DD` | **Public** | used for capacity check |
| GET | `/appointments/:id` | Any auth | populated doc |
| GET | `/appointments/:id/ticket` | Owner or staff | **PDF blob** (`raw: true`) |
| PATCH | `/appointments/:id/status` | PATIENT(can CANCEL own) / STAFF / ADMIN | `{ status }` |
| DELETE | `/appointments/:id` | SUPER_ADMIN | — |

**Server-enforced booking rules (mirror in UX, but server is source of truth):**
1. Schedule must belong to the chosen doctor.
2. `appointmentDate.getDay()` must equal `schedule.dayOfWeek`.
3. Doctor must not be on approved leave overlapping that date.
4. No duplicate active booking (same patient+doctor+date, excluding CANCELLED).
5. Daily count < `schedule.maxPatients` → else 400 *"All booking slots for this date are full"*.
6. `serialNumber = existingCount + 1` (day-bounded → effectively resets daily).

### 6.7 Payments (`/payments`)
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/payments/init/:appointmentId` | PATIENT | `{ tranId, gatewayPageURL }` |
| POST | `/payments/ipn` | Public (SSLCommerz server) | — |
| ALL | `/payments/callback/success` | Public | redirect target |
| ALL | `/payments/callback/fail` | Public | redirect target |
| ALL | `/payments/callback/cancel` | Public | redirect target |
| GET | `/payments/history?page&limit` | PATIENT | own payments |
| GET | `/payments/transaction/:tranId` | SUPER_ADMIN, HOSPITAL_STAFF | live status query |
| GET | `/payments?page&limit` | SUPER_ADMIN, HOSPITAL_STAFF | all payments |
| GET | `/payments/:id` | SUPER_ADMIN, HOSPITAL_STAFF | — |

**Frontend payment flow:** `POST /appointments/book` → get `gatewayPageURL` → `window.location = gatewayPageURL` (SSLCommerz hosted page) → on return, show success/fail/cancel screen based on the callback, then `GET /appointments/:id` to confirm status. Ticket PDF only unlocks once the appointment is `CONFIRMED` (i.e. paid).

### 6.8 Medical Records (`/medical-records`)
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/medical-records` | DOCTOR | requires completed appointment |
| GET | `/medical-records/patient/my-records` | PATIENT | own records |
| GET | `/medical-records/appointment/:appointmentId` | Any auth | — |
| GET | `/medical-records?page&limit` | DOCTOR, STAFF, ADMIN | — |
| GET | `/medical-records/:id` | Any auth | — |
| PATCH | `/medical-records/:id` | SUPER_ADMIN | — |
| DELETE | `/medical-records/:id` | SUPER_ADMIN | — |

### 6.9 Prescriptions (`/prescriptions`)
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/prescriptions` | DOCTOR | **requires `medicalRecordId`** |
| GET | `/prescriptions/patient/my-prescriptions` | PATIENT | own |
| GET | `/prescriptions/medical-record/:medicalRecordId` | Any auth | — |
| GET | `/prescriptions/appointment/:appointmentId` | Any auth | — |
| GET | `/prescriptions?page&limit` | DOCTOR, STAFF, ADMIN | — |
| GET | `/prescriptions/:id` | Any auth | — |
| PATCH | `/prescriptions/:id` | SUPER_ADMIN | — |
| DELETE | `/prescriptions/:id` | SUPER_ADMIN | — |

### 6.10 Dashboard (`/dashboard`)
| Method | Path | Role | Returns |
|---|---|---|---|
| GET | `/dashboard/stats` | SUPER_ADMIN, HOSPITAL_STAFF | full `DashboardStatsResponse` (overview, bedStatus, trends, topDepts, recent) |
| GET | `/dashboard/stats/overview` | same | `OverviewStats` |
| GET | `/dashboard/stats/appointments-trend` | same | 7-day `AppointmentTrendDay[]` |
| GET | `/dashboard/stats/bed-status` | same | `{ icu, hdu }` each `{ total, occupied, available }` |

### 6.11 Doctor Dashboard (`/doctor-dashboard`)
| Method | Path | Role | Returns |
|---|---|---|---|
| GET | `/doctor-dashboard` | DOCTOR | full dashboard |
| GET | `/doctor-dashboard/today-queue` | DOCTOR | today's appointments |
| GET | `/doctor-dashboard/stats` | DOCTOR | summary |

### 6.12 Notifications (`/notifications`) + Socket.IO
| Method | Path | Role |
|---|---|---|
| GET | `/notifications?page&limit` | Any auth |
| GET | `/notifications/unread-count` | Any auth |
| PATCH | `/notifications/read-all` | Any auth |
| PATCH | `/notifications/:id/read` | Any auth (owner) |
| DELETE | `/notifications/:id` | Any auth (owner) |

**Socket.IO:** connect to `<BASE without /api>/notifications` (namespace `notifications`). Auth via `auth: { token }` **or** `query: { token }` — strip `Bearer ` prefix. On connect the server joins the socket to room `user:<sub>`. Listen for events emitted by `sendToUser` (see `NotificationType` enum). Standard `message`/type-named events → fire a toast + invalidate `['notifications']`.

### 6.13 Reports (`/reports`) — all return **binary blobs** (`raw: true`)
| Method | Path | Role | Query |
|---|---|---|---|
| GET | `/reports/revenue/excel` | SUPER_ADMIN, HOSPITAL_STAFF | `startDate`, `endDate` (required) |
| GET | `/reports/revenue/pdf` | same | `startDate`, `endDate` (required) |
| GET | `/reports/patients/excel` | same | `startDate?`, `endDate?` |
| GET | `/reports/patients/pdf` | same | `startDate?`, `endDate?` |

---

## 7. Core Module Blueprints

### 7.1 Real-Time ICU/HDU Bed Board (public + staff)
- **Data:** `GET /bed-management/live-board` (summary) + `GET /bed-management/beds?type=ICU|HDU` (grid).
- **Public widget** `components/shared/LiveBedBoard.tsx`:
  - Tabs: `ICU` ↔ `HDU`.
  - Two summary cards: `Total Vacant` (mint) & `Occupied` (crimson).
  - Grid of bed boxes. `isOccupied===false` → green "VACANT — READY FOR ADMISSION". `isOccupied===true` → amber card with `bedNumber`, `currentPatientName`, elapsed-since `admittedAt`.
- **Staff drawer** (shadcn `Sheet`, only when role ∈ {STAFF, ADMIN}): clicking a bed opens the form `PATCH /bed-management/beds/:id` with `{ isOccupied, currentPatientName }`.
- **Invalidation:** on success → `queryClient.invalidateQueries({ queryKey: ['beds'] })` and `['live-board']`.

### 7.2 Outpatient Booking Terminal (PATIENT) — `/dashboard/patient/book`
Multi-step stepper:
1. **Department** — `GET /departments` → searchable dropdown. Show `[CODE] Name`.
2. **Doctor** — `GET /doctors?departmentId=…` → cards with Name, `designation`, `bmdcReg`.
3. **Date + Slot** — `GET /schedules/doctor/:doctorId` → show available weekdays (`dayOfWeek` 0–6). Calendar must disable days not in the doctor's schedules. On date select:
   - **Weekday guard:** if selected day ∉ schedules → red alert *"The selected clinician does not maintain active outpatient hours on this weekday."* and block.
   - **Quota guard:** `GET /appointments/doctor/:doctorId?date=YYYY-MM-DD` → compare `totalBooked` to the chosen schedule's `maxPatients`. If full → disable checkout + show *"Daily appointment slot limits fully exhausted for this date."*
4. **Checkout** — `POST /appointments/book` → redirect to `gatewayPageURL`.
5. **Confirmation** — show `serialNumber` with note: *"Serials are day-scoped; the next date starts from 1."* Offer ticket PDF download (`GET /appointments/:id/ticket`, only when CONFIRMED).

### 7.3 Doctor Clinical Workspace — `/dashboard/doctor/*`
- **Queue** — `GET /doctor-dashboard/today-queue`. Left rail sorted by `serialNumber`. Status pills: `PENDING` (slate), `CONFIRMED` (teal), `COMPLETED` (muted strike-through). Roles: only DOCTOR.
- **Clinical flow per appointment:**
  1. Mark appointment `COMPLETED` via `PATCH /appointments/:id/status` (staff/admin can; doctor sees the patient then a staff/admin confirms — **verify** the exact transition the product wants).
  2. **Create Medical Record** `POST /medical-records` (needs completed appointment) → returns `medicalRecordId`.
  3. **Create Prescription** `POST /prescriptions` with that `medicalRecordId`.
- **Prescription composer:**
  - Dynamic symptom/chief-complaint tags.
  - Medicines table rows: `name`, `dosage`, `frequency` (e.g. `1+0+1`), `duration`, optional `instructions`.
  - Optional tests array, advice array, notes, `nextVisitDate`.
  - CTA "Sign & Dispatch" → on success, server emits a Socket.IO notification to the patient → toast on patient's terminal.

### 7.4 Admin Revenue & Audit — `/dashboard/admin/*`
- **Stat cards:** `GET /dashboard/stats/overview` → `todayAppointments`, ICU % via `/dashboard/stats/bed-status`, staff counts.
- **Charts:** `GET /dashboard/stats/appointments-trend` (7-day area chart), `/dashboard/stats` → `topDepartments` (bar).
- **Exports:** date-range picker → buttons calling `/reports/revenue/{excel,pdf}` and `/reports/patients/{excel,pdf}` with `raw: true`, then trigger blob download. Role-gated to SUPER_ADMIN + HOSPITAL_STAFF.

---

## 8. State Hooks — Reference Implementations

### 8.1 Query keys (`lib/query-keys.ts`)
```ts
export const qk = {
  profile: ['auth', 'profile'] as const,
  departments: (p?: Record<string, unknown>) => ['departments', p] as const,
  doctors: (p?: Record<string, unknown>) => ['doctors', p] as const,
  doctor: (id: string) => ['doctors', id] as const,
  schedules: (doctorId: string) => ['schedules', 'doctor', doctorId] as const,
  liveBoard: ['beds', 'live-board'] as const,
  beds: (type?: string) => ['beds', { type }] as const,
  myTickets: (p?: Record<string, unknown>) => ['appointments', 'mine', p] as const,
  doctorAppts: (doctorId: string, date?: string) =>
    ['appointments', 'doctor', doctorId, { date }] as const,
  myPayments: (p?: Record<string, unknown>) => ['payments', 'mine', p] as const,
  myRecords: (p?: Record<string, unknown>) => ['medical-records', 'mine', p] as const,
  myPrescriptions: (p?: Record<string, unknown>) => ['prescriptions', 'mine', p] as const,
  dashboardStats: ['dashboard', 'stats'] as const,
  doctorDashboard: ['doctor-dashboard'] as const,
  notifications: (p?: Record<string, unknown>) => ['notifications', p] as const,
};
```

### 8.2 Booking + payment mutation (`services/queries/useAppointmentQuery.ts`)
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { qk } from '@/lib/query-keys';
import { useAuth } from '@/hooks/useAuth';

export interface CreateAppointmentPayload {
  doctorId: string;
  scheduleId: string;
  appointmentDate: string; // YYYY-MM-DD
}
export interface BookWithPaymentResult {
  appointmentId: string;
  tranId: string;
  gatewayPageURL: string;
}

export function useBookWithPayment() {
  const qc = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      apiClient<BookWithPaymentResult>('/appointments/book', {
        method: 'POST',
        json: payload,
        token,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
```

---

## 9. TypeScript Types (mirror backend schemas)

```ts
// types/index.ts — excerpt; generate the rest 1:1 from backend schemas.

export enum Role { SUPER_ADMIN = 'SUPER_ADMIN', HOSPITAL_STAFF = 'HOSPITAL_STAFF', DOCTOR = 'DOCTOR', PATIENT = 'PATIENT' }

export interface User {
  _id: string; email: string; name: string; role: Role; phone?: string;
  createdAt?: string; updatedAt?: string;
}

export interface AuthResponse { user: User; token: string; }

export interface Department {
  _id: string; name: string; code: string; description?: string;
  image?: string; units?: { name: string; code: string }[];
  createdAt?: string; updatedAt?: string;
}

export interface DoctorProfile {
  _id: string; userId: string; bmdcReg: string; designation: string;
  departmentId: string; unitId?: string; specialties?: string[];
  qualifications?: string[]; bio?: string; availability?: string;
  profilePicture?: string; createdAt?: string; updatedAt?: string;
}

export interface Schedule {
  _id: string; doctorId: string; dayOfWeek: number; // 0=Sun … 6=Sat
  startTime: string; endTime: string; maxPatients: number;
  createdAt?: string; updatedAt?: string;
}

export enum AppointmentStatus { PENDING='PENDING', CONFIRMED='CONFIRMED', CANCELLED='CANCELLED', COMPLETED='COMPLETED' }
export interface Appointment {
  _id: string; patientId: string | User; doctorId: string | DoctorProfile;
  scheduleId: string | Schedule; appointmentDate: string; serialNumber: number;
  status: AppointmentStatus; createdAt?: string; updatedAt?: string;
}

export enum BedType { ICU='ICU', HDU='HDU' }
export interface Bed {
  _id: string; bedNumber: string; type: BedType; wardName: string;
  isOccupied: boolean; currentPatientName?: string; admittedAt?: string;
  createdAt?: string; updatedAt?: string;
}
export interface LiveBoard { ICU: BedTypeStats; HDU: BedTypeStats; }
export interface BedTypeStats { total: number; occupied: number; available: number; }

export enum PaymentStatus { PENDING='PENDING', VALIDATED='VALIDATED', FAILED='FAILED', CANCELLED='CANCELLED' }
export interface Payment {
  _id: string; appointmentId: string; patientId: string; tranId: string;
  valId?: string; amount: number; currency: string; status: PaymentStatus;
  paidAt?: string; createdAt?: string; updatedAt?: string;
  /* + optional SSLCommerz card/bank fields */
}

export interface MedicalRecord {
  _id: string; appointmentId: string; patientId: string; doctorId: string;
  chiefComplaint: string; presentIllness?: string; pastHistory?: string;
  examinationFindings?: string; vitals?: { bloodPressure?: string; pulse?: number;
    temperature?: number; respiratoryRate?: number; oxygenSaturation?: number;
    weight?: number; height?: number; };
  diagnosis: string[]; notes?: string; followUpDate?: string;
  status: 'ACTIVE' | 'ARCHIVED'; createdAt?: string; updatedAt?: string;
}

export interface Prescription {
  _id: string; medicalRecordId: string; appointmentId: string;
  patientId: string; doctorId: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string; instructions?: string }[];
  tests?: { name: string; instructions?: string }[];
  advice: string[]; notes?: string; nextVisitDate?: string;
  createdAt?: string; updatedAt?: string;
}

export enum NotificationType {
  APPOINTMENT_BOOKED='APPOINTMENT_BOOKED', APPOINTMENT_CONFIRMED='APPOINTMENT_CONFIRMED',
  APPOINTMENT_CANCELLED='APPOINTMENT_CANCELLED', APPOINTMENT_COMPLETED='APPOINTMENT_COMPLETED',
  APPOINTMENT_STATUS_CHANGED='APPOINTMENT_STATUS_CHANGED', SCHEDULE_CHANGED='SCHEDULE_CHANGED',
  LEAVE_REQUESTED='LEAVE_REQUESTED', LEAVE_APPROVED='LEAVE_APPROVED', LEAVE_REJECTED='LEAVE_REJECTED',
  TEST_ORDERED='TEST_ORDERED', PATHOLOGY_REPORT_READY='PATHOLOGY_REPORT_READY',
}
export interface AppNotification {
  _id: string; userId: string; type: NotificationType; title: string;
  message: string; data?: Record<string, unknown>; read: boolean;
  emailSent?: boolean; createdAt?: string; updatedAt?: string;
}

export interface Paginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number;
    hasNextPage: boolean; hasPrevPage: boolean; };
}
```

---

## 10. Auth & Route Protection Rules

1. **Token storage:** keep JWT in memory (React context) + optional `localStorage` for persistence. Attach via `Authorization: Bearer` — **not** cookies.
2. **`useAuth`** exposes `{ user, token, role, login(), register(), logout() }`. On 401 anywhere → call `logout()` and redirect to `/login`.
3. **Route guards** (`components/shared/RoleGate.tsx` + `dashboard/layout.tsx`):
   - No token → redirect `/login`.
   - Wrong role for a route (e.g. PATIENT on `/dashboard/doctor`) → render a **403 Forbidden** screen (do not silently redirect — show the modal the PRD asks for).
   - Role-to-route map:
     - `/dashboard/patient/*` → PATIENT
     - `/dashboard/doctor/*` → DOCTOR
     - `/dashboard/admin/*` → SUPER_ADMIN, HOSPITAL_STAFF
4. **Public pages** (`(public)`, `(auth)`) skip the guard.

---

## 11. Implementation Directives for any contributor / AI agent

1. **No placeholders.** Every component ships with concrete TS types from Section 9 and real query wiring. Truncation annotations (`// …rest`) are banned in shipped code.
2. **Server is the source of truth.** Mirror business rules in the UX (weekday, quota, leave), but always handle the backend's 400/409 gracefully — never trust the client alone.
3. **Always unwrap** `{ success, data }`. Always normalize error `message` (string | string[]).
4. **Semantic Tailwind tokens** matching the brand palette; reuse shadcn primitives.
5. **Role-gate every protected route and mutation button.** A PATIENT must never see doctor controls.
6. **Invalidate the right query keys** after every mutation (see Section 8.1).
7. **Blob downloads** (tickets, reports) use `apiClient(..., { raw: true })` → `res.blob()` → object URL.
8. **Next.js 16 note:** per `AGENTS.md`, Next 16 has breaking changes. Consult `node_modules/next/dist/docs/` for App Router specifics before relying on memorized Next 13/14 patterns.

---

## 12. Open product questions (resolve before building these screens)

- **Appointment → COMPLETED transition:** who flips an appointment to COMPLETED — the doctor, or staff/admin? The backend allows STAFF/ADMIN to set any status; doctors are not explicitly granted status changes. Confirm the intended UX.
- **Bengali localization scope:** full i18n (`next-intl`) or selective? If full, the directory layout needs a `[locale]` segment.
- **Public doctor directory search:** the `GET /doctors` filter supports `departmentId`, `designation`, `specialty` (partial). Confirm whether free-text search across name is needed (no backend field for name search today — would need a `/search` integration; a `search` module exists).
