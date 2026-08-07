"use client"

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Menu, X, ChevronDown, Home } from "lucide-react"

const NavbarAuth = dynamic(
  () => import("./navbar-auth").then((m) => ({ default: m.NavbarAuth })),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-white/5" />
    ),
  },
)

const NavbarAuthMobile = dynamic(
  () => import("./navbar-auth").then((m) => ({ default: m.NavbarAuthMobile })),
  { ssr: false },
)

type NavItem =
  | { label: string; href: string; isHome?: boolean; children?: undefined }
  | { label: string; href?: undefined; isHome?: undefined; children: { label: string; href: string }[] }

const navItems: NavItem[] = [
  { label: "Home", href: "/", isHome: true },
  {
    label: "Administration",
    children: [
      { label: "Director", href: "/administration/director" },
      { label: "Joint Director", href: "/administration/joint-director" },
      { label: "List of Directors", href: "/administration/list-of-directors" },
      { label: "Deputy Director", href: "/administration/deputy-director" },
      { label: "Assistant Director", href: "/administration/assistant-director" },
      { label: "Administrative Officer (A.O.)", href: "/administration/administrative-officer" },
      { label: "Office Staff", href: "/administration/office-staff" },
      { label: "PA to Director & Joint Director", href: "/administration/pa-to-director" },
    ],
  },
  {
    label: "Departments",
    children: [
      { label: "Neurology & Allied Departments", href: "/departments/neurology" },
      { label: "Neurosurgery & Allied Departments", href: "/departments/neurosurgery" },
      { label: "Laboratory Science Departments", href: "/departments/laboratory-science" },
      { label: "Basic Science Department", href: "/departments/basic-science" },
      { label: "Cardiology Department", href: "/departments/cardiology" },
      { label: "Neuro-Anesthesia", href: "/departments/neuro-anesthesia" },
      { label: "Department of Psychiatry", href: "/departments/psychiatry" },
      { label: "Department of Critical Care Medicine", href: "/departments/critical-care" },
      { label: "Dept. of Neuroradiology & Imaging", href: "/departments/neuroradiology" },
      { label: "Dept. of Physical Medicine & Neurorehabilitation", href: "/departments/physical-medicine" },
      { label: "Neuro-Endocrinology", href: "/departments/neuro-endocrinology" },
      { label: "Emergency Department", href: "/departments/emergency" },
    ],
  },
  {
    label: "Academic",
    children: [
      { label: "Academic Council", href: "/academic/council" },
      { label: "Academic Activities", href: "/academic/activities" },
      { label: "Institutional Review Board (IRB)", href: "/academic/irb" },
      { label: "Academic Courses", href: "/academic/courses" },
      { label: "Disciplinary Committee", href: "/academic/disciplinary-committee" },
      { label: "Infection Prevention & Control Committee", href: "/academic/infection-prevention" },
      { label: "Research Activities", href: "/academic/research" },
      { label: "Death Review Committee", href: "/academic/death-review" },
      { label: "Maintenance Committee", href: "/academic/maintenance" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Indoor Patient", href: "/services/indoor-patient" },
      { label: "Outdoor Patient", href: "/services/outdoor-patient" },
      { label: "Emergency", href: "/services/emergency" },
      { label: "Intensive Care Unit (ICU)", href: "/services/icu" },
      { label: "Pain Medicine Unit", href: "/services/pain-medicine" },
      { label: "Neurology Clinic Distribution", href: "/services/neurology-clinic" },
    ],
  },
  {
    label: "Diagnostic Facilities",
    children: [
      { label: "Neuro-Radiology & Imaging test", href: "/diagnostic-facilities/neuroradiology" },
      { label: "MRI & CT SCAN PRICE LIST", href: "/diagnostic-facilities/mri-ct-price-list" },
      { label: "Neuro-Pathology Test", href: "/diagnostic-facilities/neuropathology" },
      { label: "Microbiology & Immunology Tests", href: "/diagnostic-facilities/microbiology" },
      { label: "Biochemical test", href: "/diagnostic-facilities/biochemical" },
      { label: "Blood Transfusion Tests", href: "/diagnostic-facilities/blood-transfusion" },
      { label: "Neuro-Physiology Tests", href: "/diagnostic-facilities/neurophysiology" },
      { label: "Neuro-intervention", href: "/diagnostic-facilities/neuro-intervention" },
      { label: "Diagnostic Tests", href: "/diagnostic-facilities/diagnostic-tests" },
      { label: "OT Charge", href: "/diagnostic-facilities/ot-charge" },
    ],
  },
  {
    label: "Publications",
    children: [
      { label: "Journal", href: "/publications/journal" },
      { label: "Yearbook", href: "/publications/yearbook" },
      { label: "Health Bulletin", href: "/publications/health-bulletin" },
      { label: "International Published Articles", href: "/publications/international-articles" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Notice Board & Announcements", href: "/notice" },
      { label: "Tender Notices", href: "/notice?category=Tender" },
      { label: "NOC Approvals", href: "/noc" },
      { label: "Institutional Review Board (IRB)", href: "/irb" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Download Forms", href: "/forms" },
    ],
  },
]

function DropdownNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  // Close on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-200"
      >
        {item.isHome && <Home className="h-3.5 w-3.5 text-primary" />}
        {item.label}
      </Link>
    )
  }

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-200"
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {open && (
        <div className="animate-in absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md fade-in slide-in-from-top-1 duration-150 dark:border-white/10 dark:bg-slate-900/95">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3.5 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:text-slate-200"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mobileOpenIdx, setMobileOpenIdx] = React.useState<number | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/95 shadow-2xs">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Desktop Navigation (Organized into 8 clean items) */}
        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {navItems.map((item) => (
            <DropdownNavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Auth CTA */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <NavbarAuth />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center p-2 text-slate-700 transition-colors hover:text-primary lg:hidden ml-auto dark:text-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="animate-in border-b border-slate-200 bg-white px-6 py-4 duration-150 fade-in slide-in-from-top-2 lg:hidden dark:border-white/10 dark:bg-slate-950">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileOpenIdx(mobileOpenIdx === idx ? null : idx)
                      }
                      className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-200"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileOpenIdx === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileOpenIdx === idx && (
                      <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-xs font-medium text-slate-600 hover:text-primary dark:text-slate-300"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-200"
                  >
                    {item.isHome && <Home className="h-4 w-4 text-primary" />}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-white/5">
            <NavbarAuthMobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
