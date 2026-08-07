"use client"

import * as React from "react"
import Link from "next/link"
import {
  MapPin,
  ExternalLink,
  Globe,
  Share2,
  Video,
  MessageSquare,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react"

const usefulGovtLinks = [
  { label: "Prime Minister's Office", href: "https://pmo.gov.bd" },
  { label: "Ministry of Health & Family Welfare", href: "https://mohfw.gov.bd" },
  { label: "Directorate General of Health Services (DGHS)", href: "https://dghs.gov.bd" },
  { label: "Access to Information (a2i)", href: "https://a2i.gov.bd" },
  { label: "Ministry of Education", href: "https://moedu.gov.bd" },
  { label: "Ministry of Finance", href: "https://mof.gov.bd" },
  { label: "Ministry of Planning", href: "https://plandiv.gov.bd" },
  { label: "Dhaka University (DU)", href: "https://du.ac.bd" },
]

const pabxDirectory = [
  { title: "Information Desk (24/7)", phone: "+880-2-41024584", highlight: true },
  { title: "Emergency Doctor (EMO)", phone: "+880-2-41024572", highlight: true },
  { title: "Director PABX", phone: "+880-02-41024570" },
  { title: "Joint Director PABX", phone: "+880-02-41024584" },
  { title: "Deputy Director PABX", phone: "+880-02-41024575" },
  { title: "Email Address", phone: "nins@hospi.dghs.gov.bd", isEmail: true },
  { title: "Official Website", phone: "www.nins.gov.bd", isWeb: true },
]

const visitorCountDigits = ["1", "1", "3", "3", "6", "1", "2"]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0A192F] text-slate-200 border-t border-slate-800">
      {/* Subtle Glow Elements */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Main Footer Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Column 1: Hospital Brand, Address, Socials & Visitor Counter (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-400">
                <Building2 className="h-3.5 w-3.5" />
                Govt. Tertiary Neuroscience Center
              </div>
              <h3 className="font-heading text-lg font-extrabold text-white leading-snug">
                National Institute of Neurosciences &amp; Hospital
              </h3>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-1">
                <MapPin className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>
                  Sher-e-Bangla Nagar, Agargaon, Dhaka-1207, Bangladesh
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Social Media Connections
              </span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Globe, label: "Official Web Portal", href: "https://nins.gov.bd" },
                  { icon: MessageSquare, label: "Official Page", href: "#" },
                  { icon: Video, label: "YouTube Channel", href: "#" },
                  { icon: Share2, label: "Social Media", href: "#" },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-400 hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Digital Live Visitor Counter */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Users className="h-4 w-4" />
                <span>TOTAL VISITS COUNTER</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                {visitorCountDigits.map((digit, idx) => (
                  <div
                    key={idx}
                    className="flex h-9 w-7 items-center justify-center rounded-lg border border-cyan-500/40 bg-slate-950 font-mono text-base font-black text-cyan-300 shadow-inner"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                Official Visitor Tracker • NINS Portal
              </p>
            </div>
          </div>

          {/* Column 2: Useful Government Links (4 Cols) */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Useful Government Links
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {usefulGovtLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-cyan-500/70 transition-transform group-hover:translate-x-0.5" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Directory & PABX Numbers (4 Cols) */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              PABX &amp; Contact Directory
            </h4>

            {/* Structured Modern PABX Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
              <div className="divide-y divide-slate-800 text-xs">
                {pabxDirectory.map((item) => (
                  <div
                    key={item.title}
                    className={`flex items-center justify-between px-3.5 py-2.5 ${
                      item.highlight ? "bg-cyan-950/40" : ""
                    }`}
                  >
                    <span className="font-semibold text-slate-300">
                      {item.title}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        item.highlight
                          ? "text-cyan-400"
                          : item.isEmail
                          ? "text-amber-400"
                          : item.isWeb
                          ? "text-emerald-400"
                          : "text-slate-200"
                      }`}
                    >
                      {item.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <p>
              Copyright © 2012-2026 NINS (National Institute of Neurosciences &amp; Hospital). All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/notice" className="transition-colors hover:text-cyan-400">
              Notice Board
            </Link>
            <Link href="/noc" className="transition-colors hover:text-cyan-400">
              NOC
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-cyan-400">
              Gallery
            </Link>
            <a href="https://bangladesh.gov.bd" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan-400">
              National Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
