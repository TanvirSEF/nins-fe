// Data layer barrel. One hook file per backend resource, per PRD §4/§8.
// PRD-prescribed set (add as each phase lands):
//   useAuthQuery, useBedQuery, useDepartmentQuery, useDoctorQuery,
//   useScheduleQuery, useAppointmentQuery, usePaymentQuery,
//   useMedicalRecordQuery, usePrescriptionQuery, useDashboardQuery,
//   useNotificationQuery, useReportQuery
export { useProfile } from "./useAuthQuery"
