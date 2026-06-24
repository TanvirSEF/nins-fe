import {
  LayoutDashboard,
  CalendarPlus,
  Ticket,
  CreditCard,
  FileText,
  Pill,
  Users,
  CalendarDays,
  BedDouble,
  CalendarClock,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { Role } from "@/types"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  /**
   * Phase 0 ships only the role landing page; every other item points at a
   * route built in a later phase. Disabled items render as inert rows so they
   * can never 404 — they get enabled when their page lands.
   */
  enabled: boolean
  /** One-line summary shown on the role overview's roadmap cards. */
  description?: string
}

const ADMIN_NAV: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    label: "Bed Management",
    href: "/dashboard/admin/beds",
    icon: BedDouble,
    enabled: true,
    description: "Live ICU/HDU occupancy and bed status updates.",
  },
  {
    label: "Appointments",
    href: "/dashboard/admin/appointments",
    icon: CalendarClock,
    enabled: true,
    description: "Confirm, cancel, and oversee outpatient bookings.",
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: BarChart3,
    enabled: true,
    description: "Export revenue and patient reports as PDF or Excel.",
  },
]

/**
 * Role → nav tree. Routes mirror PRD §7 (patient booking terminal, doctor
 * workspace, admin revenue & audit). Admin nav is shared by SUPER_ADMIN and
 * HOSPITAL_STAFF (both map to /dashboard/admin/* per PRD §10).
 */
export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  [Role.PATIENT]: [
    {
      label: "Overview",
      href: "/dashboard/patient",
      icon: LayoutDashboard,
      enabled: true,
    },
    {
      label: "Book Appointment",
      href: "/dashboard/patient/book",
      icon: CalendarPlus,
      enabled: true,
      description: "Find a consultant, pick a slot, and reserve your serial.",
    },
    {
      label: "My Tickets",
      href: "/dashboard/patient/tickets",
      icon: Ticket,
      enabled: true,
      description: "Your appointment history and downloadable PDF tickets.",
    },
    {
      label: "Payments",
      href: "/dashboard/patient/payments",
      icon: CreditCard,
      enabled: true,
      description: "Track registration fees and transaction status.",
    },
    {
      label: "Medical Records",
      href: "/dashboard/patient/records",
      icon: FileText,
      enabled: true,
      description: "Clinical notes and vitals from your consultations.",
    },
    {
      label: "Prescriptions",
      href: "/dashboard/patient/prescriptions",
      icon: Pill,
      enabled: true,
      description: "Medicines, tests, and advice from your doctors.",
    },
  ],
  [Role.DOCTOR]: [
    {
      label: "Overview",
      href: "/dashboard/doctor",
      icon: LayoutDashboard,
      enabled: true,
    },
    {
      label: "Patient Queue",
      href: "/dashboard/doctor/queue",
      icon: Users,
      enabled: true,
      description: "Today's confirmed appointments, ordered by serial number.",
    },
    {
      label: "Appointments",
      href: "/dashboard/doctor/appointments",
      icon: CalendarDays,
      enabled: false,
      description: "Open a consultation to record vitals and prescribe.",
    },
  ],
  [Role.SUPER_ADMIN]: ADMIN_NAV,
  [Role.HOSPITAL_STAFF]: ADMIN_NAV,
}
