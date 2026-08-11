"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { UserCheck, ArrowRight, Calendar, MapPin } from "lucide-react"

const featuredDoctorsList = [
  {
    name: "Dr. Sadekur Rahman",
    title: "Associate Professor",
    department: "Department of Neurosurgery",
    degrees: "MBBS, MS (Neurosurgery), FCPS",
    opdSchedule: "Sat & Tue (9:00 AM - 1:00 PM)",
    room: "Room 305 (3rd Floor)",
    image: "/images/dr._sadekur_rahman.webp",
  },
  {
    name: "Dr. Fahmida Rouf",
    title: "Associate Professor",
    department: "Department of Neurology",
    degrees: "MBBS, MD (Neurology)",
    opdSchedule: "Sun & Wed (9:00 AM - 1:00 PM)",
    room: "Room 204 (2nd Floor)",
    image: "/images/dr.fahmida_rouf.webp",
  },
  {
    name: "Dr. Sadeka Afrin",
    title: "Assistant Professor",
    department: "Pediatric Neurology & Stroke",
    degrees: "MBBS, MD (Pediatric Neurology)",
    opdSchedule: "Mon & Thu (8:30 AM - 1:30 PM)",
    room: "Room 208 (2nd Floor)",
    image: "/images/Dr.Sadeka_Afrin.webp",
  },
]

export function FeaturedDoctors() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-100 dark:border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <UserCheck className="h-3.5 w-3.5" />
              Specialist Faculty
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Prominent Physicians &amp; Consultants
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Renowned professors, neurosurgeons, and neurologists leading specialized outpatient clinics and surgeries at NINS.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shrink-0"
          >
            Browse Full Faculty (100+)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDoctorsList.map((doctor) => (
            <div
              key={doctor.name}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
            >
              {/* Doctor Avatar Box */}
              <div className="relative mx-auto h-52 w-44 overflow-hidden rounded-xl border border-slate-300/80 bg-white shadow-xs dark:border-white/15 dark:bg-slate-800">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="176px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="mt-5 space-y-2 text-center">
                <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  {doctor.title}
                </span>
                <h3 className="font-heading text-base font-bold text-foreground leading-snug">
                  {doctor.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  {doctor.degrees}
                </p>
                <p className="text-xs font-semibold text-foreground pt-1">
                  {doctor.department}
                </p>
              </div>

              {/* OPD Schedule Info Box */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3.5 text-left text-xs space-y-1.5 dark:border-white/10 dark:bg-slate-950">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{doctor.opdSchedule}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-info shrink-0" />
                  <span>{doctor.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
