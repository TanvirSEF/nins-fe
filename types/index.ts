export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  HOSPITAL_STAFF = "HOSPITAL_STAFF",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export interface User {
  _id: string
  email: string
  name: string
  role: Role
  phone?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface HospitalUnit {
  name: string
  code: string
}

export interface Department {
  _id: string
  name: string
  code: string
  description?: string
  image?: string
  units?: HospitalUnit[]
  createdAt?: string
  updatedAt?: string
}

export interface DoctorProfile {
  _id: string
  userId: string | User
  bmdcReg: string
  designation: string
  departmentId: string | Department
  unitId?: string
  specialties?: string[]
  qualifications?: string[]
  bio?: string
  availability?: string
  profilePicture?: string
  createdAt?: string
  updatedAt?: string
}

export interface Schedule {
  _id: string
  doctorId: string | DoctorProfile
  dayOfWeek: number // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string // HH:mm
  endTime: string // HH:mm
  maxPatients: number
  createdAt?: string
  updatedAt?: string
}

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface Appointment {
  _id: string
  patientId: string | User
  doctorId: string | DoctorProfile
  scheduleId: string | Schedule
  appointmentDate: string // YYYY-MM-DD
  serialNumber: number
  status: AppointmentStatus
  createdAt?: string
  updatedAt?: string
}

export enum BedType {
  ICU = "ICU",
  HDU = "HDU",
}

export interface Bed {
  _id: string
  bedNumber: string
  type: BedType
  wardName: string
  isOccupied: boolean
  currentPatientName?: string
  admittedAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface BedTypeStats {
  total: number
  occupied: number
  available: number
}

/**
 * Shape returned by `GET /bed-management/live-board` — an array with one entry
 * per bed type (ICU, HDU). Note: the backend returns an ARRAY, not a keyed
 * object, so consumers index by `.type`.
 */
export interface BedAvailability extends BedTypeStats {
  type: BedType
  wards: string[]
}

export enum PaymentStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface Payment {
  _id: string
  appointmentId: string | Appointment
  patientId: string | User
  tranId: string
  valId?: string
  amount: number
  currency: string
  status: PaymentStatus
  sessionKey?: string
  bankTransactionId?: string
  cardType?: string
  cardNo?: string
  cardBrand?: string
  cardIssuer?: string
  gatewayName?: string
  storeAmount?: number
  riskLevel?: string
  errorReason?: string
  paidAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface Vitals {
  bloodPressure?: string
  pulse?: number
  temperature?: number
  respiratoryRate?: number
  oxygenSaturation?: number
  weight?: number
  height?: number
}

export enum MedicalRecordStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface MedicalRecord {
  _id: string
  appointmentId: string | Appointment
  patientId: string | User
  doctorId: string | DoctorProfile
  chiefComplaint: string
  presentIllness?: string
  pastHistory?: string
  examinationFindings?: string
  vitals?: Vitals
  diagnosis: string[]
  notes?: string
  followUpDate?: string
  status: MedicalRecordStatus
  createdAt?: string
  updatedAt?: string
}

export interface PrescriptionMedicine {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

export interface PrescriptionTest {
  name: string
  instructions?: string
}

export interface Prescription {
  _id: string
  medicalRecordId: string | MedicalRecord
  appointmentId: string | Appointment
  patientId: string | User
  doctorId: string | DoctorProfile
  medicines: PrescriptionMedicine[]
  tests: PrescriptionTest[]
  advice: string[]
  notes?: string
  nextVisitDate?: string
  createdAt?: string
  updatedAt?: string
}

export enum NotificationType {
  APPOINTMENT_BOOKED = "APPOINTMENT_BOOKED",
  APPOINTMENT_CONFIRMED = "APPOINTMENT_CONFIRMED",
  APPOINTMENT_CANCELLED = "APPOINTMENT_CANCELLED",
  APPOINTMENT_COMPLETED = "APPOINTMENT_COMPLETED",
  APPOINTMENT_STATUS_CHANGED = "APPOINTMENT_STATUS_CHANGED",
  SCHEDULE_CHANGED = "SCHEDULE_CHANGED",
  LEAVE_REQUESTED = "LEAVE_REQUESTED",
  LEAVE_APPROVED = "LEAVE_APPROVED",
  LEAVE_REJECTED = "LEAVE_REJECTED",
  TEST_ORDERED = "TEST_ORDERED",
  PATHOLOGY_REPORT_READY = "PATHOLOGY_REPORT_READY",
}

export interface AppNotification {
  _id: string
  userId: string | User
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  read: boolean
  emailSent?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface Paginated<T> {
  data: T[]
  meta: PaginatedMeta
}

/* ─── Dashboard (admin) ─────────────────────────────────────────────────── */

export interface OverviewStats {
  totalPatients: number
  totalDoctors: number
  totalDepartments: number
  totalAppointments: number
  todayAppointments: number
  todayCompleted: number
  todayCancelled: number
}

/** One day in the 7-day appointment trend (`GET /dashboard/stats/appointments-trend`). */
export interface AppointmentTrendDay {
  date: string // YYYY-MM-DD
  total: number
  completed: number
  cancelled: number
  pending: number
}

export interface TopDepartment {
  departmentId: string
  name: string
  appointmentCount: number
}

export interface RecentAppointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  status: AppointmentStatus
  serialNumber: number
}

/** Full `GET /dashboard/stats` payload (SUPER_ADMIN, HOSPITAL_STAFF). */
export interface DashboardStats {
  overview: OverviewStats
  bedStatus: { icu: BedTypeStats; hdu: BedTypeStats }
  appointmentTrends: AppointmentTrendDay[]
  topDepartments: TopDepartment[]
  recentAppointments: RecentAppointment[]
}

/* ─── Doctor dashboard ──────────────────────────────────────────────────── */

export interface DoctorInfo {
  id: string
  designation: string
  departmentName: string | null
  profilePicture: string | null
}

export interface TodayQueueItem {
  appointmentId: string
  serialNumber: number
  patientName: string
  patientPhone: string | null
  status: AppointmentStatus
  appointmentDate: string
}

export interface DoctorStats {
  totalToday: number
  completedToday: number
  pendingToday: number
  upcomingThisWeek: number
  totalPatientsSeen: number
}

export interface RecentMedicalRecord {
  _id: string
  patientId: { _id: string; name: string; phone: string }
  doctorId: string
  chiefComplaint: string
  diagnosis: string[]
  createdAt: string
}

export interface RecentPrescription {
  _id: string
  patientId: { _id: string; name: string; phone: string }
  doctorId: string
  medicines: PrescriptionMedicine[]
  createdAt: string
}

/** Full `GET /doctor-dashboard` payload (DOCTOR). */
export interface DoctorDashboard {
  doctor: DoctorInfo
  todayQueue: TodayQueueItem[]
  stats: DoctorStats
  recentRecords: RecentMedicalRecord[]
  recentPrescriptions: RecentPrescription[]
}

export interface DoctorStatsResponse {
  doctor: DoctorInfo
  stats: DoctorStats
}

/* ─── Medical record / prescription inputs (mirror backend DTOs) ────────── */

export interface CreateMedicalRecordInput {
  appointmentId: string
  chiefComplaint: string
  presentIllness?: string
  pastHistory?: string
  examinationFindings?: string
  vitals?: Vitals
  diagnosis: string[]
  notes?: string
  followUpDate?: string // YYYY-MM-DD
}

export interface CreatePrescriptionInput {
  medicalRecordId: string
  medicines: PrescriptionMedicine[]
  tests?: PrescriptionTest[]
  advice?: string[]
  notes?: string
  nextVisitDate?: string // YYYY-MM-DD
}

/* ─── Notifications ─────────────────────────────────────────────────────── */

export interface NotificationParams {
  page: number
  limit: number
  read?: boolean
  type?: NotificationType
  [key: string]: unknown
}

export interface UnreadCount {
  count: number
}

export interface MarkAllReadResult {
  modified: number
}

/* ─── Reports ───────────────────────────────────────────────────────────── */

export interface ReportRange {
  startDate: string
  endDate?: string
}
