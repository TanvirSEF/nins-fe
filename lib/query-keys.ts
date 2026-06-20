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
}
