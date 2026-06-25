export const qk = {
  profile: ["auth", "profile"] as const,
  departments: (p?: Record<string, unknown>) => ["departments", p] as const,
  doctors: (p?: Record<string, unknown>) => ["doctors", p] as const,
  doctor: (id: string) => ["doctors", id] as const,
  schedules: (doctorId: string) => ["schedules", "doctor", doctorId] as const,
  liveBoard: ["beds", "live-board"] as const,
  beds: (type?: string) => ["beds", { type }] as const,
  myTickets: (p?: Record<string, unknown>) =>
    ["appointments", "mine", p] as const,
  doctorAppts: (doctorId: string, date?: string) =>
    ["appointments", "doctor", doctorId, { date }] as const,
  myPayments: (p?: Record<string, unknown>) => ["payments", "mine", p] as const,
  myRecords: (p?: Record<string, unknown>) =>
    ["medical-records", "mine", p] as const,
  myPrescriptions: (p?: Record<string, unknown>) =>
    ["prescriptions", "mine", p] as const,
  dashboardStats: ["dashboard", "stats"] as const,
  doctorDashboard: ["doctor-dashboard"] as const,
  notifications: (p?: Record<string, unknown>) => ["notifications", p] as const,
  unreadCount: ["notifications", "unread"] as const,
  medicalRecords: (p?: Record<string, unknown>) =>
    ["medical-records", p] as const,
  medicalRecordByAppointment: (id: string) =>
    ["medical-records", "appointment", id] as const,
  prescriptions: (p?: Record<string, unknown>) =>
    ["prescriptions", p] as const,
  prescriptionByAppointment: (id: string) =>
    ["prescriptions", "appointment", id] as const,
  doctorQueue: ["doctor-dashboard", "queue"] as const,
  doctorStats: ["doctor-dashboard", "stats"] as const,
  myLeaves: (p?: Record<string, unknown>) => ["leave", "mine", p] as const,
  leaves: (p?: Record<string, unknown>) => ["leave", "all", p] as const,
  leave: (id: string) => ["leave", "detail", id] as const,
  myReports: (p?: Record<string, unknown>) => ["pathology", "mine", p] as const,
  patientReports: (patientId: string, p?: Record<string, unknown>) =>
    ["pathology", "patient", patientId, p] as const,
  reports: (p?: Record<string, unknown>) => ["pathology", "all", p] as const,
  report: (id: string) => ["pathology", "detail", id] as const,
}
