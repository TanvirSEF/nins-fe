"use client"

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Menu, X, ChevronDown } from "lucide-react"

const NavbarAuth = dynamic(
  () => import("./navbar-auth").then((m) => ({ default: m.NavbarAuth })),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
    ),
  },
)

const NavbarAuthMobile = dynamic(
  () => import("./navbar-auth").then((m) => ({ default: m.NavbarAuthMobile })),
  { ssr: false },
)

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: { label: string; href: string }[] }

const navItems: NavItem[] = [
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
  { label: "NOC", href: "/noc" },
  { label: "IRB", href: "/irb" },
  { label: "Notice", href: "/notice" },
  { label: "Gallery", href: "/gallery" },
  { label: "Forms", href: "/forms" },
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
        className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        {item.label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="animate-in absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-lg border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur-md fade-in slide-in-from-top-1 duration-150">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <DropdownNavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Auth CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <NavbarAuth />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
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
        <div className="animate-in border-b border-slate-100 bg-white px-6 py-4 duration-150 fade-in slide-in-from-top-2 md:hidden dark:border-white/10 dark:bg-slate-950">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileOpenIdx(mobileOpenIdx === idx ? null : idx)
                      }
                      className="flex w-full items-center justify-between py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileOpenIdx === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileOpenIdx === idx && (
                      <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
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
                    className="block py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-50 pt-3 dark:border-white/5">
            <NavbarAuthMobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
