// Data layer barrel. One hook file per backend resource, per PRD §4/§8.
// PRD-prescribed set (add as each phase lands):
//   useAuthQuery, useBedQuery, useDepartmentQuery, useDoctorQuery,
//   useScheduleQuery, useAppointmentQuery, usePaymentQuery,
//   useMedicalRecordQuery, usePrescriptionQuery, useDashboardQuery,
//   useNotificationQuery, useReportQuery
export { useProfile } from "./useAuthQuery"
export {
  useLiveBoard,
  useBeds,
  useUpdateBedStatus,
} from "./useBedQuery"
export type { UpdateBedStatusPayload } from "./useBedQuery"
export { useDepartments, useDepartment } from "./useDepartmentQuery"
export type { DepartmentParams } from "./useDepartmentQuery"
export { useDoctors, useDoctor } from "./useDoctorQuery"
export type { DoctorParams } from "./useDoctorQuery"
export { useSchedules } from "./useScheduleQuery"
export {
  useDoctorAppointments,
  useAppointment,
  useBookWithPayment,
} from "./useAppointmentQuery"
export type {
  CreateAppointmentPayload,
  BookWithPaymentResult,
  DoctorAppointmentsResult,
} from "./useAppointmentQuery"
