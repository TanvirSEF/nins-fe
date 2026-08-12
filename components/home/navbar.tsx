"use client"

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Menu, X, ChevronDown, Home } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import type { Dictionary } from "@/context/language-context"

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

function buildNavItems(t: Dictionary["nav"]): NavItem[] {
  return [
    { label: t.home, href: "/", isHome: true },
    {
      label: t.administration,
      children: [
        { label: t.director, href: "/administration/director" },
        { label: t.jointDirector, href: "/administration/joint-director" },
        { label: t.listOfDirectors, href: "/administration/list-of-directors" },
        { label: t.deputyDirector, href: "/administration/deputy-director" },
        { label: t.assistantDirector, href: "/administration/assistant-director" },
        { label: t.administrativeOfficer, href: "/administration/administrative-officer" },
        { label: t.officeStaff, href: "/administration/office-staff" },
        { label: t.paToDirector, href: "/administration/pa-to-director" },
      ],
    },
    {
      label: t.departments,
      children: [
        { label: t.neurology, href: "/departments/neurology" },
        { label: t.neurosurgery, href: "/departments/neurosurgery" },
        { label: t.labScience, href: "/departments/laboratory-science" },
        { label: t.basicScience, href: "/departments/basic-science" },
        { label: t.cardiology, href: "/departments/cardiology" },
        { label: t.neuroAnesthesia, href: "/departments/neuro-anesthesia" },
        { label: t.psychiatry, href: "/departments/psychiatry" },
        { label: t.criticalCare, href: "/departments/critical-care" },
        { label: t.neuroradiology, href: "/departments/neuroradiology" },
        { label: t.physicalMedicine, href: "/departments/physical-medicine" },
        { label: t.neuroEndocrinology, href: "/departments/neuro-endocrinology" },
        { label: t.emergency, href: "/departments/emergency" },
      ],
    },
    {
      label: t.academic,
      children: [
        { label: t.academicCouncil, href: "/academic/council" },
        { label: t.academicActivities, href: "/academic/activities" },
        { label: t.irb, href: "/academic/irb" },
        { label: t.academicCourses, href: "/academic/courses" },
        { label: t.disciplinaryCommittee, href: "/academic/disciplinary-committee" },
        { label: t.infectionPrevention, href: "/academic/infection-prevention" },
        { label: t.researchActivities, href: "/academic/research" },
        { label: t.deathReview, href: "/academic/death-review" },
        { label: t.maintenanceCommittee, href: "/academic/maintenance" },
      ],
    },
    {
      label: t.services,
      children: [
        { label: t.indoorPatient, href: "/services/indoor-patient" },
        { label: t.outdoorPatient, href: "/services/outdoor-patient" },
        { label: t.emergencyService, href: "/services/emergency" },
        { label: t.icu, href: "/services/icu" },
        { label: t.painMedicine, href: "/services/pain-medicine" },
        { label: t.neurologyClinic, href: "/services/neurology-clinic" },
      ],
    },
    {
      label: t.diagnosticFacilities,
      children: [
        { label: t.neuroRadiologyTest, href: "/diagnostic-facilities/neuroradiology" },
        { label: t.mriCtPrice, href: "/diagnostic-facilities/mri-ct-price-list" },
        { label: t.neuroPathology, href: "/diagnostic-facilities/neuropathology" },
        { label: t.microbiology, href: "/diagnostic-facilities/microbiology" },
        { label: t.biochemical, href: "/diagnostic-facilities/biochemical" },
        { label: t.bloodTransfusion, href: "/diagnostic-facilities/blood-transfusion" },
        { label: t.neuroPhysiology, href: "/diagnostic-facilities/neurophysiology" },
        { label: t.neuroIntervention, href: "/diagnostic-facilities/neuro-intervention" },
        { label: t.diagnosticTests, href: "/diagnostic-facilities/diagnostic-tests" },
        { label: t.otCharge, href: "/diagnostic-facilities/ot-charge" },
      ],
    },
    {
      label: t.publications,
      children: [
        { label: t.journal, href: "/publications/journal" },
        { label: t.yearbook, href: "/publications/yearbook" },
        { label: t.healthBulletin, href: "/publications/health-bulletin" },
        { label: t.internationalArticles, href: "/publications/international-articles" },
      ],
    },
    {
      label: t.more,
      children: [
        { label: t.noticeBoard, href: "/notice" },
        { label: t.tenderNotices, href: "/notice?category=Tender" },
        { label: t.nocApprovals, href: "/noc" },
        { label: t.institutionalReviewBoard, href: "/irb" },
        { label: t.photoGallery, href: "/gallery" },
        { label: t.downloadForms, href: "/forms" },
      ],
    },
  ]
}

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
  const { dict } = useLanguage()
  const navItems = buildNavItems(dict.nav)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/95 shadow-2xs">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Desktop Navigation */}
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
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 dark:border-white/5">
            <NavbarAuthMobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
