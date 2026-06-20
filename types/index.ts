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

export interface LiveBoard {
  ICU: BedTypeStats
  HDU: BedTypeStats
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
