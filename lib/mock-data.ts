/**
 * DEMO MODE — All static mock data used in place of real API responses.
 * Every piece of data here mirrors the exact TypeScript types from @/types.
 * To customise the demo, edit values in this file only.
 */

import type {
  User,
  Department,
  DoctorProfile,
  Schedule,
  Appointment,
  Bed,
  BedAvailability,
  Payment,
  AppNotification,
  MedicalRecord,
  Prescription,
  Leave,
  PathologyReport,
  GalleryItem,
  DashboardStats,
  OverviewStats,
  AppointmentTrendDay,
  DoctorDashboard,
  DoctorStats,
  TodayQueueItem,
  BackupInfo,
  Paginated,
  SearchResponse,
  UnreadCount,
} from "@/types"

import {
  Role,
  AppointmentStatus,
  PaymentStatus,
  BedType,
  LeaveStatus,
  LeaveType,
  PathologyStatus,
  TestCategory,
  GalleryCategory,
  NotificationType,
} from "@/types"

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const DEMO_USER: User = {
  _id: "usr-admin-001",
  email: "admin@nins.gov.bd",
  name: "Prof. Dr. Tanvir Ahmed",
  role: Role.SUPER_ADMIN,
  phone: "+8801711-000001",
  createdAt: "2024-01-15T08:00:00Z",
}

export const MOCK_USERS: User[] = [
  DEMO_USER,
  {
    _id: "usr-staff-001",
    email: "staff@nins.gov.bd",
    name: "Md. Rafiqul Islam",
    role: Role.HOSPITAL_STAFF,
    phone: "+8801712-000002",
    createdAt: "2024-02-10T09:00:00Z",
  },
  {
    _id: "usr-doctor-001",
    email: "dr.hasan@nins.gov.bd",
    name: "Dr. Md. Hasanuzzaman",
    role: Role.DOCTOR,
    phone: "+8801713-000003",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "usr-doctor-002",
    email: "dr.sultana@nins.gov.bd",
    name: "Dr. Fatema Sultana",
    role: Role.DOCTOR,
    phone: "+8801714-000004",
    createdAt: "2024-01-22T10:00:00Z",
  },
  {
    _id: "usr-doctor-003",
    email: "dr.rahman@nins.gov.bd",
    name: "Dr. Anisur Rahman",
    role: Role.DOCTOR,
    phone: "+8801715-000005",
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    _id: "usr-patient-001",
    email: "rahim@gmail.com",
    name: "Rahim Uddin",
    role: Role.PATIENT,
    phone: "+8801816-111001",
    createdAt: "2024-03-05T11:00:00Z",
  },
  {
    _id: "usr-patient-002",
    email: "karim@gmail.com",
    name: "Abdul Karim",
    role: Role.PATIENT,
    phone: "+8801817-222002",
    createdAt: "2024-03-10T11:00:00Z",
  },
  {
    _id: "usr-patient-003",
    email: "begum@gmail.com",
    name: "Nasreen Begum",
    role: Role.PATIENT,
    phone: "+8801818-333003",
    createdAt: "2024-04-01T11:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Departments
// ---------------------------------------------------------------------------

export const MOCK_DEPARTMENTS: Department[] = [
  {
    _id: "dept-001",
    name: "Neurology",
    code: "NEURO",
    description:
      "Comprehensive diagnosis and treatment of disorders of the nervous system including epilepsy, stroke, Parkinson's disease, and multiple sclerosis.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    units: [
      { _id: "unit-001", name: "Stroke Unit", code: "SU" },
      { _id: "unit-002", name: "Epilepsy Unit", code: "EU" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dept-002",
    name: "Neurosurgery",
    code: "NSURG",
    description:
      "Surgical treatment of conditions affecting the brain, spine, and peripheral nervous system, including tumours, aneurysms, and spinal disc disease.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
    units: [
      { _id: "unit-003", name: "Brain Tumour Unit", code: "BTU" },
      { _id: "unit-004", name: "Spinal Surgery Unit", code: "SSU" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "dept-003",
    name: "Neurophysiology",
    code: "NPHYS",
    description:
      "Diagnostic services including EEG, EMG, nerve conduction studies, and evoked potentials for evaluation of neurological conditions.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    units: [{ _id: "unit-005", name: "EEG Lab", code: "EEG" }],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    _id: "dept-004",
    name: "Neuro-Radiology",
    code: "NRAD",
    description:
      "Advanced neuroimaging including 3T MRI, multi-slice CT, digital angiography, and interventional neuro-radiology procedures.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
    units: [
      { _id: "unit-006", name: "MRI Unit", code: "MRI" },
      { _id: "unit-007", name: "CT Unit", code: "CT" },
    ],
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    _id: "dept-005",
    name: "Paediatric Neurology",
    code: "PNEUR",
    description:
      "Specialised care for children with neurological conditions including cerebral palsy, developmental delays, febrile seizures, and childhood epilepsy.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
    units: [{ _id: "unit-008", name: "Child Neurology Clinic", code: "CNC" }],
    createdAt: "2024-02-01T00:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Doctors
// ---------------------------------------------------------------------------

export const MOCK_DOCTORS: DoctorProfile[] = [
  {
    _id: "doc-001",
    userId: MOCK_USERS[2],
    bmdcReg: "BMDC-12345",
    designation: "Professor & Head",
    departmentId: MOCK_DEPARTMENTS[0],
    specialties: ["Epilepsy", "Stroke", "Movement Disorders"],
    qualifications: ["MBBS", "MD (Neurology)", "FCPS", "MRCP (UK)"],
    bio: "Professor Hasanuzzaman has over 20 years of experience in clinical neurology with a special interest in epilepsy management and stroke rehabilitation.",
    availability: "Sunday–Thursday, 9:00 AM – 1:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    _id: "doc-002",
    userId: MOCK_USERS[3],
    bmdcReg: "BMDC-23456",
    designation: "Associate Professor",
    departmentId: MOCK_DEPARTMENTS[1],
    specialties: ["Brain Tumours", "Spinal Surgery", "Vascular Neurosurgery"],
    qualifications: ["MBBS", "MS (Neurosurgery)", "FCPS"],
    bio: "Dr. Sultana is a leading neurosurgeon specialising in minimally invasive brain tumour resection and complex spinal reconstructions.",
    availability: "Monday–Wednesday, 10:00 AM – 2:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    createdAt: "2024-01-22T00:00:00Z",
  },
  {
    _id: "doc-003",
    userId: MOCK_USERS[4],
    bmdcReg: "BMDC-34567",
    designation: "Consultant",
    departmentId: MOCK_DEPARTMENTS[2],
    specialties: ["EEG Interpretation", "EMG", "Nerve Conduction Studies"],
    qualifications: ["MBBS", "MD (Neurophysiology)", "DM"],
    bio: "Dr. Rahman leads the neurophysiology unit with expertise in intraoperative neuromonitoring and complex EEG analysis.",
    availability: "Tuesday–Thursday, 8:00 AM – 12:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    _id: "doc-004",
    userId: {
      _id: "usr-doctor-004",
      name: "Dr. Shahadat Hossain",
      email: "dr.shahadat@nins.gov.bd",
      role: Role.DOCTOR,
    },
    bmdcReg: "BMDC-45678",
    designation: "Senior Consultant",
    departmentId: MOCK_DEPARTMENTS[3],
    specialties: ["Neuroimaging", "Interventional Neuro-Radiology"],
    qualifications: ["MBBS", "DMRD", "MD (Radiology)"],
    bio: "Dr. Hossain specialises in advanced neuroimaging interpretation and performs interventional procedures including cerebral angioplasty.",
    availability: "Sunday–Monday, 9:00 AM – 1:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    _id: "doc-005",
    userId: {
      _id: "usr-doctor-005",
      name: "Dr. Tahmina Khanam",
      email: "dr.tahmina@nins.gov.bd",
      role: Role.DOCTOR,
    },
    bmdcReg: "BMDC-56789",
    designation: "Assistant Professor",
    departmentId: MOCK_DEPARTMENTS[4],
    specialties: ["Paediatric Epilepsy", "Cerebral Palsy", "Developmental Neurology"],
    qualifications: ["MBBS", "MD (Paediatric Neurology)", "FCPS (Paed)"],
    bio: "Dr. Khanam is a compassionate paediatric neurologist with a decade of experience managing childhood epilepsy and neurodevelopmental disorders.",
    availability: "Wednesday–Thursday, 9:00 AM – 1:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    createdAt: "2024-02-15T00:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Schedules
// ---------------------------------------------------------------------------

export const MOCK_SCHEDULES: Schedule[] = [
  {
    _id: "sch-001",
    doctorId: MOCK_DOCTORS[0],
    dayOfWeek: 0, // Sunday
    startTime: "09:00",
    endTime: "13:00",
    maxPatients: 20,
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    _id: "sch-002",
    doctorId: MOCK_DOCTORS[0],
    dayOfWeek: 2, // Tuesday
    startTime: "09:00",
    endTime: "13:00",
    maxPatients: 20,
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    _id: "sch-003",
    doctorId: MOCK_DOCTORS[1],
    dayOfWeek: 1, // Monday
    startTime: "10:00",
    endTime: "14:00",
    maxPatients: 15,
    createdAt: "2024-01-26T00:00:00Z",
  },
  {
    _id: "sch-004",
    doctorId: MOCK_DOCTORS[2],
    dayOfWeek: 3, // Wednesday
    startTime: "08:00",
    endTime: "12:00",
    maxPatients: 18,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    _id: "sch-005",
    doctorId: MOCK_DOCTORS[3],
    dayOfWeek: 0, // Sunday
    startTime: "09:00",
    endTime: "13:00",
    maxPatients: 12,
    createdAt: "2024-02-10T00:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Appointments
// ---------------------------------------------------------------------------

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    _id: "appt-001",
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[0],
    scheduleId: MOCK_SCHEDULES[0],
    appointmentDate: "2026-08-10",
    serialNumber: 1,
    status: AppointmentStatus.CONFIRMED,
    createdAt: "2026-08-05T10:00:00Z",
  },
  {
    _id: "appt-002",
    patientId: MOCK_USERS[6],
    doctorId: MOCK_DOCTORS[1],
    scheduleId: MOCK_SCHEDULES[2],
    appointmentDate: "2026-08-11",
    serialNumber: 2,
    status: AppointmentStatus.PENDING,
    createdAt: "2026-08-06T09:00:00Z",
  },
  {
    _id: "appt-003",
    patientId: MOCK_USERS[7],
    doctorId: MOCK_DOCTORS[0],
    scheduleId: MOCK_SCHEDULES[0],
    appointmentDate: "2026-08-10",
    serialNumber: 3,
    status: AppointmentStatus.CONFIRMED,
    createdAt: "2026-08-04T14:00:00Z",
  },
  {
    _id: "appt-004",
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[2],
    scheduleId: MOCK_SCHEDULES[3],
    appointmentDate: "2026-08-07",
    serialNumber: 1,
    status: AppointmentStatus.COMPLETED,
    createdAt: "2026-08-01T08:00:00Z",
  },
  {
    _id: "appt-005",
    patientId: MOCK_USERS[6],
    doctorId: MOCK_DOCTORS[3],
    scheduleId: MOCK_SCHEDULES[4],
    appointmentDate: "2026-08-03",
    serialNumber: 4,
    status: AppointmentStatus.CANCELLED,
    createdAt: "2026-07-28T11:00:00Z",
  },
  {
    _id: "appt-006",
    patientId: MOCK_USERS[7],
    doctorId: MOCK_DOCTORS[1],
    scheduleId: MOCK_SCHEDULES[2],
    appointmentDate: "2026-08-12",
    serialNumber: 5,
    status: AppointmentStatus.CONFIRMED,
    createdAt: "2026-08-06T07:30:00Z",
  },
  {
    _id: "appt-007",
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[4],
    scheduleId: MOCK_SCHEDULES[1],
    appointmentDate: "2026-08-13",
    serialNumber: 2,
    status: AppointmentStatus.PENDING,
    createdAt: "2026-08-06T08:00:00Z",
  },
  {
    _id: "appt-008",
    patientId: MOCK_USERS[6],
    doctorId: MOCK_DOCTORS[0],
    scheduleId: MOCK_SCHEDULES[0],
    appointmentDate: "2026-07-28",
    serialNumber: 6,
    status: AppointmentStatus.COMPLETED,
    createdAt: "2026-07-20T09:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Beds
// ---------------------------------------------------------------------------

export const MOCK_BEDS: Bed[] = [
  // ICU
  {
    _id: "bed-icu-01",
    bedNumber: "ICU-01",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward A",
    isOccupied: true,
    currentPatientName: "Rahim Uddin",
    admittedAt: "2026-08-04T06:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-icu-02",
    bedNumber: "ICU-02",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward A",
    isOccupied: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-icu-03",
    bedNumber: "ICU-03",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward A",
    isOccupied: true,
    currentPatientName: "Abdul Karim",
    admittedAt: "2026-08-05T14:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-icu-04",
    bedNumber: "ICU-04",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward B",
    isOccupied: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-icu-05",
    bedNumber: "ICU-05",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward B",
    isOccupied: true,
    currentPatientName: "Nasreen Begum",
    admittedAt: "2026-08-06T02:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-icu-06",
    bedNumber: "ICU-06",
    type: BedType.ICU,
    wardName: "Neuro-ICU Ward B",
    isOccupied: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  // HDU
  {
    _id: "bed-hdu-01",
    bedNumber: "HDU-01",
    type: BedType.HDU,
    wardName: "HDU Ward C",
    isOccupied: true,
    currentPatientName: "Jakir Hossain",
    admittedAt: "2026-08-03T10:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-hdu-02",
    bedNumber: "HDU-02",
    type: BedType.HDU,
    wardName: "HDU Ward C",
    isOccupied: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-hdu-03",
    bedNumber: "HDU-03",
    type: BedType.HDU,
    wardName: "HDU Ward C",
    isOccupied: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "bed-hdu-04",
    bedNumber: "HDU-04",
    type: BedType.HDU,
    wardName: "HDU Ward D",
    isOccupied: true,
    currentPatientName: "Salma Khatun",
    admittedAt: "2026-08-05T18:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export const MOCK_LIVE_BOARD: BedAvailability[] = [
  {
    type: BedType.ICU,
    total: 6,
    occupied: 3,
    available: 3,
    wards: ["Neuro-ICU Ward A", "Neuro-ICU Ward B"],
  },
  {
    type: BedType.HDU,
    total: 4,
    occupied: 2,
    available: 2,
    wards: ["HDU Ward C", "HDU Ward D"],
  },
]

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export const MOCK_PAYMENTS: Payment[] = [
  {
    _id: "pay-001",
    appointmentId: MOCK_APPOINTMENTS[0],
    patientId: MOCK_USERS[5],
    tranId: "TXN-20260810-001",
    amount: 500,
    currency: "BDT",
    status: PaymentStatus.VALIDATED,
    bankTransactionId: "BKASH-9981234",
    gatewayName: "bKash",
    paidAt: "2026-08-05T10:05:00Z",
    createdAt: "2026-08-05T10:00:00Z",
  },
  {
    _id: "pay-002",
    appointmentId: MOCK_APPOINTMENTS[1],
    patientId: MOCK_USERS[6],
    tranId: "TXN-20260811-002",
    amount: 500,
    currency: "BDT",
    status: PaymentStatus.PENDING,
    createdAt: "2026-08-06T09:00:00Z",
  },
  {
    _id: "pay-003",
    appointmentId: MOCK_APPOINTMENTS[2],
    patientId: MOCK_USERS[7],
    tranId: "TXN-20260810-003",
    amount: 500,
    currency: "BDT",
    status: PaymentStatus.VALIDATED,
    bankTransactionId: "NAGAD-7654321",
    gatewayName: "Nagad",
    paidAt: "2026-08-04T14:10:00Z",
    createdAt: "2026-08-04T14:00:00Z",
  },
  {
    _id: "pay-004",
    appointmentId: MOCK_APPOINTMENTS[4],
    patientId: MOCK_USERS[6],
    tranId: "TXN-20260803-004",
    amount: 500,
    currency: "BDT",
    status: PaymentStatus.CANCELLED,
    createdAt: "2026-07-28T11:00:00Z",
  },
  {
    _id: "pay-005",
    appointmentId: MOCK_APPOINTMENTS[7],
    patientId: MOCK_USERS[6],
    tranId: "TXN-20260728-005",
    amount: 500,
    currency: "BDT",
    status: PaymentStatus.VALIDATED,
    bankTransactionId: "BKASH-6612345",
    gatewayName: "bKash",
    paidAt: "2026-07-20T09:05:00Z",
    createdAt: "2026-07-20T09:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    _id: "notif-001",
    userId: DEMO_USER,
    type: NotificationType.APPOINTMENT_BOOKED,
    title: "New Appointment Booked",
    message: "Rahim Uddin has booked an appointment with Prof. Dr. Hasanuzzaman for 10 Aug 2026.",
    read: false,
    createdAt: "2026-08-06T09:05:00Z",
  },
  {
    _id: "notif-002",
    userId: DEMO_USER,
    type: NotificationType.LEAVE_REQUESTED,
    title: "Leave Request Submitted",
    message: "Dr. Anisur Rahman has submitted a sick leave request for 12–13 Aug 2026. Please review.",
    read: false,
    createdAt: "2026-08-05T14:30:00Z",
  },
  {
    _id: "notif-003",
    userId: DEMO_USER,
    type: NotificationType.PATHOLOGY_REPORT_READY,
    title: "Pathology Report Ready",
    message: "Lab report for patient Nasreen Begum (EEG study) is now available for review.",
    read: false,
    createdAt: "2026-08-05T11:00:00Z",
  },
  {
    _id: "notif-004",
    userId: DEMO_USER,
    type: NotificationType.APPOINTMENT_CONFIRMED,
    title: "Appointment Confirmed",
    message: "Appointment for Abdul Karim with Dr. Fatema Sultana on 11 Aug has been confirmed.",
    read: true,
    createdAt: "2026-08-04T16:00:00Z",
  },
  {
    _id: "notif-005",
    userId: DEMO_USER,
    type: NotificationType.SCHEDULE_CHANGED,
    title: "Schedule Updated",
    message: "Dr. Shahadat Hossain's schedule for Sunday has been updated to 9:00 AM – 1:00 PM.",
    read: true,
    createdAt: "2026-08-03T10:00:00Z",
  },
]

export const MOCK_UNREAD_COUNT: UnreadCount = { count: 3 }

// ---------------------------------------------------------------------------
// Medical Records
// ---------------------------------------------------------------------------

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    _id: "rec-001",
    appointmentId: MOCK_APPOINTMENTS[3],
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[2],
    chiefComplaint: "Recurrent episodes of loss of consciousness with tonic-clonic movements",
    presentIllness:
      "Patient presents with 3 episodes in the past 2 months. Each episode lasts 2–3 minutes followed by post-ictal confusion. No aura reported.",
    pastHistory: "No prior neurological illness. No family history of epilepsy.",
    examinationFindings: "Alert and oriented. No focal neurological deficits. EEG reveals generalised spike-wave discharges.",
    vitals: {
      bloodPressure: "120/80",
      pulse: 78,
      temperature: 37.1,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 65,
      height: 168,
    },
    diagnosis: ["Generalised epilepsy, uncontrolled", "Rule out secondary causes"],
    notes: "Commence sodium valproate 500mg BD. Repeat EEG in 4 weeks. Advise no driving.",
    followUpDate: "2026-09-07",
    status: "ACTIVE" as never,
    createdAt: "2026-08-07T10:00:00Z",
  },
  {
    _id: "rec-002",
    appointmentId: MOCK_APPOINTMENTS[7],
    patientId: MOCK_USERS[6],
    doctorId: MOCK_DOCTORS[0],
    chiefComplaint: "Sudden onset right-sided weakness and slurred speech",
    presentIllness: "Patient developed sudden right hemiparesis 4 hours prior to presentation. NIHSS score: 8.",
    pastHistory: "Hypertension for 5 years, on amlodipine. Non-smoker.",
    examinationFindings: "Right facial droop. Right arm weakness (MRC grade 3/5). Broca's aphasia. CT brain: left MCA territory hypodensity.",
    diagnosis: ["Ischaemic stroke, left MCA territory", "Hypertension"],
    notes: "Admitted to stroke unit. IV alteplase administered. Physiotherapy referral made.",
    status: "ACTIVE" as never,
    createdAt: "2026-07-28T12:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Prescriptions
// ---------------------------------------------------------------------------

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    _id: "presc-001",
    medicalRecordId: MOCK_MEDICAL_RECORDS[0],
    appointmentId: MOCK_APPOINTMENTS[3],
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[2],
    medicines: [
      { name: "Sodium Valproate", dosage: "500mg", frequency: "BD", duration: "3 months", instructions: "Take after meals" },
      { name: "Clonazepam", dosage: "0.5mg", frequency: "OD at night", duration: "1 month", instructions: "For breakthrough seizures" },
    ],
    tests: [
      { name: "EEG", instructions: "Repeat in 4 weeks with sleep deprivation protocol" },
      { name: "MRI Brain with contrast", instructions: "FLAIR and DWI sequences required" },
    ],
    advice: [
      "Avoid driving or operating heavy machinery",
      "Do not miss medications",
      "Keep a seizure diary",
      "Follow up in 4 weeks",
    ],
    nextVisitDate: "2026-09-07",
    createdAt: "2026-08-07T10:30:00Z",
  },
]

// ---------------------------------------------------------------------------
// Leave Requests
// ---------------------------------------------------------------------------

export const MOCK_LEAVES: Leave[] = [
  {
    _id: "leave-001",
    doctorId: MOCK_DOCTORS[2],
    doctorUserId: MOCK_USERS[4],
    type: LeaveType.SICK,
    startDate: "2026-08-12",
    endDate: "2026-08-13",
    reason: "Acute viral illness with fever. Medical certificate attached.",
    status: LeaveStatus.PENDING,
    createdAt: "2026-08-05T14:30:00Z",
  },
  {
    _id: "leave-002",
    doctorId: MOCK_DOCTORS[0],
    doctorUserId: MOCK_USERS[2],
    type: LeaveType.PLANNED,
    startDate: "2026-09-01",
    endDate: "2026-09-05",
    reason: "Attending International Neurology Conference in Singapore.",
    status: LeaveStatus.APPROVED,
    reviewedBy: DEMO_USER,
    reviewedAt: "2026-08-03T10:00:00Z",
    createdAt: "2026-07-25T09:00:00Z",
  },
  {
    _id: "leave-003",
    doctorId: MOCK_DOCTORS[1],
    doctorUserId: MOCK_USERS[3],
    type: LeaveType.CASUAL,
    startDate: "2026-08-20",
    endDate: "2026-08-20",
    reason: "Personal errand.",
    status: LeaveStatus.REJECTED,
    reviewedBy: DEMO_USER,
    reviewedAt: "2026-08-04T09:00:00Z",
    rejectionReason: "Insufficient notice period. Patient appointments already scheduled.",
    createdAt: "2026-08-03T11:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Pathology
// ---------------------------------------------------------------------------

export const MOCK_PATHOLOGY: PathologyReport[] = [
  {
    _id: "path-001",
    patientId: MOCK_USERS[7],
    doctorId: MOCK_DOCTORS[0],
    appointmentId: "appt-003",
    testName: "Routine EEG (Waking + Drowsy)",
    testCategory: TestCategory.OTHER,
    notes: "24-hour ambulatory EEG requested. Patient has nocturnal events.",
    status: PathologyStatus.COMPLETED,
    resultSummary: "Interictal epileptiform discharges noted in the left temporal region. Background rhythm normal.",
    resultValues: [
      { parameter: "Background Rhythm", value: "8–10 Hz alpha", referenceRange: "8–12 Hz", flag: "NORMAL" as never },
      { parameter: "Epileptiform Activity", value: "Present (left temporal)", referenceRange: "Absent", flag: "HIGH" as never },
    ],
    orderedAt: "2026-08-04T10:00:00Z",
    completedAt: "2026-08-05T11:00:00Z",
    createdAt: "2026-08-04T10:00:00Z",
  },
  {
    _id: "path-002",
    patientId: MOCK_USERS[6],
    doctorId: MOCK_DOCTORS[1],
    testName: "MRI Brain with Contrast (3T)",
    testCategory: TestCategory.IMAGING,
    notes: "Post-operative scan. Look for residual tumour.",
    status: PathologyStatus.IN_PROGRESS,
    orderedAt: "2026-08-06T08:00:00Z",
    createdAt: "2026-08-06T08:00:00Z",
  },
  {
    _id: "path-003",
    patientId: MOCK_USERS[5],
    doctorId: MOCK_DOCTORS[2],
    testName: "Nerve Conduction Study (NCS)",
    testCategory: TestCategory.OTHER,
    notes: "Bilateral upper and lower limb NCS for suspected GBS.",
    status: PathologyStatus.SAMPLE_COLLECTED,
    orderedAt: "2026-08-05T09:00:00Z",
    createdAt: "2026-08-05T09:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export const MOCK_GALLERY: GalleryItem[] = [
  {
    _id: "gal-001",
    title: "New 3T MRI Scanner Installation",
    description: "State-of-the-art 3 Tesla MRI machine installed in the Neuro-Radiology department.",
    imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
    r2Key: "gallery/mri-scanner.jpg",
    category: GalleryCategory.FACILITY,
    isActive: true,
    createdAt: "2024-06-01T00:00:00Z",
  },
  {
    _id: "gal-002",
    title: "World Brain Day 2024 Health Camp",
    description: "Free neurological screening camp held on World Brain Day with over 200 patients served.",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
    r2Key: "gallery/brain-day-camp.jpg",
    category: GalleryCategory.HEALTH_CAMP,
    isActive: true,
    createdAt: "2024-07-22T00:00:00Z",
  },
  {
    _id: "gal-003",
    title: "Neurosurgery ICU Renovation",
    description: "Fully renovated Neuro-ICU with 6 new advanced monitoring stations.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    r2Key: "gallery/icu-renovation.jpg",
    category: GalleryCategory.FACILITY,
    isActive: true,
    createdAt: "2024-08-15T00:00:00Z",
  },
  {
    _id: "gal-004",
    title: "International Neurology Symposium",
    description: "NINS hosted the 5th South Asian Neurology Symposium with 300+ international delegates.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    r2Key: "gallery/symposium.jpg",
    category: GalleryCategory.EVENT,
    isActive: true,
    createdAt: "2024-11-10T00:00:00Z",
  },
  {
    _id: "gal-005",
    title: "Best Neuroscience Centre Award",
    description: "NINS received the National Healthcare Excellence Award for Best Neuroscience Centre 2024.",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800",
    r2Key: "gallery/award.jpg",
    category: GalleryCategory.ACHIEVEMENT,
    isActive: true,
    createdAt: "2024-12-05T00:00:00Z",
  },
]

// ---------------------------------------------------------------------------
// Staff (for StaffManager)
// ---------------------------------------------------------------------------

export const MOCK_STAFF: User[] = MOCK_USERS.filter(
  (u) => u.role === Role.SUPER_ADMIN || u.role === Role.HOSPITAL_STAFF,
)

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------

export const MOCK_OVERVIEW_STATS: OverviewStats = {
  totalPatients: 1284,
  totalDoctors: 47,
  totalDepartments: 5,
  totalAppointments: 3621,
  todayAppointments: 38,
  todayCompleted: 24,
  todayCancelled: 3,
}

export const MOCK_APPOINTMENT_TREND: AppointmentTrendDay[] = [
  { date: "2026-07-31", total: 32, completed: 28, cancelled: 2, pending: 2 },
  { date: "2026-08-01", total: 35, completed: 30, cancelled: 3, pending: 2 },
  { date: "2026-08-02", total: 28, completed: 25, cancelled: 1, pending: 2 },
  { date: "2026-08-03", total: 41, completed: 36, cancelled: 3, pending: 2 },
  { date: "2026-08-04", total: 38, completed: 33, cancelled: 2, pending: 3 },
  { date: "2026-08-05", total: 44, completed: 38, cancelled: 4, pending: 2 },
  { date: "2026-08-06", total: 38, completed: 24, cancelled: 3, pending: 11 },
]

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  overview: MOCK_OVERVIEW_STATS,
  bedStatus: {
    icu: { total: 6, occupied: 3, available: 3 },
    hdu: { total: 4, occupied: 2, available: 2 },
  },
  appointmentTrends: MOCK_APPOINTMENT_TREND,
  topDepartments: [
    { departmentId: "dept-001", name: "Neurology", appointmentCount: 1420 },
    { departmentId: "dept-002", name: "Neurosurgery", appointmentCount: 980 },
    { departmentId: "dept-004", name: "Neuro-Radiology", appointmentCount: 760 },
    { departmentId: "dept-003", name: "Neurophysiology", appointmentCount: 310 },
    { departmentId: "dept-005", name: "Paediatric Neurology", appointmentCount: 151 },
  ],
  recentAppointments: [
    { id: "appt-001", patientName: "Rahim Uddin", doctorName: "Prof. Dr. Hasanuzzaman", date: "2026-08-10", status: AppointmentStatus.CONFIRMED, serialNumber: 1 },
    { id: "appt-002", patientName: "Abdul Karim", doctorName: "Dr. Fatema Sultana", date: "2026-08-11", status: AppointmentStatus.PENDING, serialNumber: 2 },
    { id: "appt-003", patientName: "Nasreen Begum", doctorName: "Prof. Dr. Hasanuzzaman", date: "2026-08-10", status: AppointmentStatus.CONFIRMED, serialNumber: 3 },
    { id: "appt-006", patientName: "Nasreen Begum", doctorName: "Dr. Fatema Sultana", date: "2026-08-12", status: AppointmentStatus.CONFIRMED, serialNumber: 5 },
    { id: "appt-007", patientName: "Rahim Uddin", doctorName: "Dr. Tahmina Khanam", date: "2026-08-13", status: AppointmentStatus.PENDING, serialNumber: 2 },
  ],
}

// ---------------------------------------------------------------------------
// Doctor Dashboard
// ---------------------------------------------------------------------------

const TODAY_QUEUE: TodayQueueItem[] = [
  { appointmentId: "appt-001", serialNumber: 1, patientName: "Rahim Uddin", patientPhone: "+8801816-111001", status: AppointmentStatus.CONFIRMED, appointmentDate: "2026-08-10" },
  { appointmentId: "appt-003", serialNumber: 3, patientName: "Nasreen Begum", patientPhone: "+8801818-333003", status: AppointmentStatus.CONFIRMED, appointmentDate: "2026-08-10" },
  { appointmentId: "appt-008", serialNumber: 6, patientName: "Abdul Karim", patientPhone: "+8801817-222002", status: AppointmentStatus.COMPLETED, appointmentDate: "2026-08-10" },
]

const DOCTOR_STATS: DoctorStats = {
  totalToday: 8,
  completedToday: 3,
  pendingToday: 5,
  upcomingThisWeek: 24,
  totalPatientsSeen: 412,
}

export const MOCK_DOCTOR_DASHBOARD: DoctorDashboard = {
  doctor: {
    id: "doc-001",
    designation: "Professor & Head",
    departmentName: "Neurology",
    profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
  },
  todayQueue: TODAY_QUEUE,
  stats: DOCTOR_STATS,
  recentRecords: [
    {
      _id: "rec-001",
      patientId: { _id: "usr-patient-001", name: "Rahim Uddin", phone: "+8801816-111001" },
      doctorId: "doc-001",
      chiefComplaint: "Recurrent episodes of loss of consciousness",
      diagnosis: ["Generalised epilepsy, uncontrolled"],
      createdAt: "2026-08-07T10:00:00Z",
    },
  ],
  recentPrescriptions: [
    {
      _id: "presc-001",
      patientId: { _id: "usr-patient-001", name: "Rahim Uddin", phone: "+8801816-111001" },
      doctorId: "doc-001",
      medicines: [{ name: "Sodium Valproate", dosage: "500mg", frequency: "BD", duration: "3 months" }],
      createdAt: "2026-08-07T10:30:00Z",
    },
  ],
}

// ---------------------------------------------------------------------------
// Backups
// ---------------------------------------------------------------------------

export const MOCK_BACKUPS: BackupInfo[] = [
  { key: "backup/nins-db-2026-08-06T02-00-00.gz", size: 12582912, lastModified: "2026-08-06T02:01:34Z" },
  { key: "backup/nins-db-2026-08-05T02-00-00.gz", size: 12390400, lastModified: "2026-08-05T02:01:18Z" },
  { key: "backup/nins-db-2026-08-04T02-00-00.gz", size: 12107776, lastModified: "2026-08-04T02:01:45Z" },
  { key: "backup/nins-db-2026-08-03T02-00-00.gz", size: 11943936, lastModified: "2026-08-03T02:01:22Z" },
  { key: "backup/nins-db-2026-08-02T02-00-00.gz", size: 11739136, lastModified: "2026-08-02T02:00:59Z" },
]

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export const MOCK_SEARCH_RESPONSE: SearchResponse = {
  results: [
    { type: "patient", id: "usr-patient-001", name: "Rahim Uddin", email: "rahim@gmail.com", phone: "+8801816-111001" },
    { type: "doctor", id: "doc-001", name: "Prof. Dr. Md. Hasanuzzaman", designation: "Professor & Head", department: "Neurology", bmdcReg: "BMDC-12345" },
    { type: "appointment", id: "appt-001", patientName: "Rahim Uddin", appointmentDate: "2026-08-10", serialNumber: 1, status: AppointmentStatus.CONFIRMED },
  ],
  meta: { total: 3, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false },
}

// ---------------------------------------------------------------------------
// Helpers: paginate a flat array
// ---------------------------------------------------------------------------

export function paginate<T>(
  items: T[],
  page = 1,
  limit = 10,
): Paginated<T> {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const start = (page - 1) * limit
  return {
    data: items.slice(start, start + limit),
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

/** Simulates a network delay so mutations feel real. */
export async function mockDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
