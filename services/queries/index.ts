// Data layer barrel. One hook file per backend resource, per PRD §4/§8.
export { useProfile } from "./useAuthQuery"
export {
  useLiveBoard,
  useBeds,
  useUpdateBedStatus,
} from "./useBedQuery"
export type { UpdateBedStatusPayload } from "./useBedQuery"
export {
  useDepartments,
  useDepartment,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
  useUploadDepartmentImage,
} from "./useDepartmentQuery"
export type { DepartmentParams } from "./useDepartmentQuery"
export {
  useDoctors,
  useDoctor,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
  useUploadDoctorPicture,
} from "./useDoctorQuery"
export type { DoctorParams } from "./useDoctorQuery"
export {
  useSchedules,
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
} from "./useScheduleQuery"
export { useCreateStaff, useDeleteStaff } from "./useStaffQuery"
export {
  useDoctorAppointments,
  useAppointment,
  useBookWithPayment,
  useMyTickets,
  useCancelAppointment,
  useUpdateAppointmentStatus,
} from "./useAppointmentQuery"
export type {
  CreateAppointmentPayload,
  BookWithPaymentResult,
  DoctorAppointmentsResult,
  MyTicketsParams,
  UpdateAppointmentStatusPayload,
} from "./useAppointmentQuery"
export { useMyPayments } from "./usePaymentQuery"
export type { MyPaymentsParams } from "./usePaymentQuery"
export {
  useMyRecords,
  useMedicalRecordByAppointment,
  useCreateMedicalRecord,
} from "./useMedicalRecordQuery"
export type { MyRecordsParams } from "./useMedicalRecordQuery"
export {
  useMyPrescriptions,
  usePrescriptionByAppointment,
  useCreatePrescription,
} from "./usePrescriptionQuery"
export type { MyPrescriptionsParams } from "./usePrescriptionQuery"
export {
  useDashboardStats,
  useDashboardOverview,
  useAppointmentTrend,
  useBedStatus,
} from "./useDashboardQuery"
export {
  useDoctorDashboard,
  useTodayQueue,
  useDoctorStats,
} from "./useDoctorDashboardQuery"
export {
  useNotifications,
  useUnreadCount,
  useMarkAllRead,
  useMarkRead,
  useDeleteNotification,
} from "./useNotificationQuery"
export {
  downloadRevenueExcel,
  downloadRevenuePdf,
  downloadPatientsExcel,
  downloadPatientsPdf,
} from "./useReportQuery"
