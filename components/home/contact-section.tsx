"use client"

import * as React from "react"
import { MapPin, Phone, Clock, Mail, ShieldAlert } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function ContactSection() {
  const { dict } = useLanguage()
  const t = dict.contact

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Address & Emergency Details */}
          <div className="space-y-8 lg:col-span-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3.5 py-1 text-xs font-bold text-destructive">
                <ShieldAlert className="h-3.5 w-3.5" />
                {t.badge}
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {t.heading}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.subtext}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.addressTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.addressText}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.hotlineTitle}</h3>
                <p className="text-xs font-semibold text-foreground">+880 2-9140752</p>
                <p className="text-[11px] text-muted-foreground">24/7 Casualty &amp; Stroke Unit</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10 text-info">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.hoursTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.hoursText}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs dark:border-white/10 dark:bg-slate-900/40 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.emailTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  nins@hospi.dghs.gov.bd
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Frame */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-xl dark:border-white/10 dark:bg-slate-900 h-[380px] sm:h-[440px] w-full">
              <iframe
                title="NINS Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.082725472856!2d90.3697!3d23.779!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b9a674487b%3A0x6b74e84b7f433917!2sNational%20Institute%20of%20Neurosciences%20%26%20Hospital!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
