"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Hospital Details */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              National Institute of Neurosciences
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              A premier tertiary hospital dedicated to advanced care, medical
              education, and clinical research in neurological sciences.
            </p>
          </div>

          {/* Column 2: Location */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Location & Address
            </h4>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Sher-E-Bangla Nagar, Agargaon,
                <br />
                Dhaka-1207, Bangladesh
              </span>
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Emergency Helpline
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+880 2-9140833</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>info@nins.gov.bd</span>
              </div>
            </div>
          </div>

          {/* Column 4: Hours */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Working Hours
            </h4>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <strong>Outpatient Department</strong>
                <br />
                Sat - Thu: 8:00 AM - 2:00 PM
                <br />
                Emergency & Trauma: 24 Hours Open
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-50 pt-8 text-xs text-muted-foreground sm:flex-row dark:border-white/5">
          <p>
            © 2026 National Institute of Neurosciences & Hospital. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-all hover:text-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-all hover:text-foreground hover:underline"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
