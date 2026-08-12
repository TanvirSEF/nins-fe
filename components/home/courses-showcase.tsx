"use client"

import * as React from "react"
import Link from "next/link"
import { GraduationCap, BookOpen, ArrowRight, Info } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface DisciplineItem {
  id: number
  name: string
  nameBn: string
}

interface CourseProgram {
  id: string
  label: string
  labelBn: string
  headerTitle: string
  headerTitleBn: string
  disciplines: DisciplineItem[]
}

const coursesData: CourseProgram[] = [
  {
    id: "md",
    label: "MD",
    labelBn: "এমডি",
    headerTitle: "MD Program (Doctor of Medicine)",
    headerTitleBn: "এমডি প্রোগ্রাম (ডক্টর অফ মেডিসিন)",
    disciplines: [
      { id: 1, name: "Neurology", nameBn: "নিউরোলজি (Neurology)" },
      { id: 2, name: "Pediatric Neurology", nameBn: "পিডিয়াট্রিক নিউরোলজি (Pediatric Neurology)" },
      { id: 3, name: "Clinical Neurophysiology", nameBn: "ক্লিনিক্যাল নিউরোফিজিওলজি" },
      { id: 4, name: "Critical Care Medicine (Neuro-ICU)", nameBn: "ক্রিটিক্যাল কেয়ার মেডিসিন (নিউরো-আইসিইউ)" },
      { id: 5, name: "Neuroradiology & Diagnostic Imaging", nameBn: "নিউরোরেডিওলজি ও ডায়াগনস্টিক ইমেজিং" },
      { id: 6, name: "Neuropathology & CSF Diagnostics", nameBn: "নিউরোপ্যাথোলজি ও সিএসএফ ডায়াগনস্টিকস" },
      { id: 7, name: "Neuro-Rehabilitation Medicine", nameBn: "নিউরো-রিহ্যাবিলিটেশন মেডিসিন" },
      { id: 8, name: "Neuro-Psychiatry & Behavioral Science", nameBn: "নিউরো-সাইকিয়াট্রি ও বিহেভিয়ারেল সাইন্স" },
      { id: 9, name: "Comprehensive Stroke Medicine", nameBn: "কম্প্রিহেনসিভ স্ট্রোক মেডিসিন" },
      { id: 10, name: "Movement Disorders & Neuro-Degenerative Care", nameBn: "মুভমেন্ট ডিসঅর্ডারস ও নিউরো-কেয়ার" },
    ],
  },
  {
    id: "ms",
    label: "MS",
    labelBn: "এমএস",
    headerTitle: "MS Program (Master of Surgery)",
    headerTitleBn: "এমএস প্রোগ্রাম (মাস্টার অফ সার্জারি)",
    disciplines: [
      { id: 1, name: "Neurosurgery", nameBn: "নিউরোসার্জারি (Neurosurgery)" },
      { id: 2, name: "Pediatric Neurosurgery", nameBn: "পিডিয়াট্রিক নিউরোসার্জারি" },
      { id: 3, name: "Spine & Spinal Cord Surgery", nameBn: "স্পাইন ও স্পাইনাল কর্ড সার্জারি" },
      { id: 4, name: "Vascular Neurosurgery & Aneurysm Unit", nameBn: "ভাস্কুলার নিউরোসার্জারি ও অ্যানিউরিজম" },
      { id: 5, name: "Endoscopic Skull Base Neurosurgery", nameBn: "এন্ডোস্কোপিক স্কাল বেস নিউরোসার্জারি" },
      { id: 6, name: "Neuro-Trauma & Emergency Surgical Unit", nameBn: "নিউরো-ট্রমা ও ইমার্জেন্সি সার্জিক্যাল ইউনিট" },
      { id: 7, name: "Stereotactic & Functional Neurosurgery", nameBn: "স্টিরিওট্যাকটিক ও ফাংশনাল নিউরোসার্জারি" },
      { id: 8, name: "Neuro-Oncology Surgical Unit", nameBn: "নিউরো-অনকোলজি সার্জিক্যাল ইউনিট" },
    ],
  },
  {
    id: "mphil",
    label: "M.PHIL",
    labelBn: "এম.ফিল",
    headerTitle: "M.Phil Program (Master of Philosophy)",
    headerTitleBn: "এম.ফিল প্রোগ্রাম (মাস্টার অফ ফিলোসফি)",
    disciplines: [
      { id: 1, name: "Neuroanatomy", nameBn: "নিউরোঅ্যানাটমি (Neuroanatomy)" },
      { id: 2, name: "Neurophysiology", nameBn: "নিউরোফিজিওলজি (Neurophysiology)" },
      { id: 3, name: "Neuropharmacology", nameBn: "নিউরোফার্মাকোলজি (Neuropharmacology)" },
      { id: 4, name: "Neuropathology & Histopathology", nameBn: "নিউরোপ্যাথোলজি ও হিস্টোপ্যাথোলজি" },
    ],
  },
  {
    id: "fcps",
    label: "FCPS",
    labelBn: "এফসিপিএস",
    headerTitle: "FCPS Residency & Fellowship (BCPS)",
    headerTitleBn: "এফসিপিএস রেসিডেন্সি ও ফেলোশিপ (বিসিপিএস)",
    disciplines: [
      { id: 1, name: "FCPS in Neurology", nameBn: "এফসিপিএস নিউরোলজি" },
      { id: 2, name: "FCPS in Neurosurgery", nameBn: "এফসিপিএস নিউরোসার্জারি" },
      { id: 3, name: "FCPS in Pediatric Neurology", nameBn: "এফসিপিএস পিডিয়াট্রিক নিউরোলজি" },
      { id: 4, name: "FCPS in Neuro-Anesthesia", nameBn: "এফসিপিএস নিউরো-অ্যানেস্থেসিয়া" },
    ],
  },
  {
    id: "diploma",
    label: "DIPLOMA",
    labelBn: "ডিপ্লোমা",
    headerTitle: "Diploma Courses & Certifications",
    headerTitleBn: "ডিপ্লোমা কোর্স ও সার্টিফিকেট প্রোগ্রাম",
    disciplines: [
      { id: 1, name: "Diploma in Clinical Neurology (DCN)", nameBn: "ডিপ্লোমা ইন ক্লিনিক্যাল নিউরোলজি" },
      { id: 2, name: "Diploma in Neuro-Anesthesia (DNA)", nameBn: "ডিপ্লোমা ইন নিউরো-অ্যানেস্থেসিয়া" },
      { id: 3, name: "Diploma in Diagnostic Neuroradiology", nameBn: "ডিপ্লোমা ইন ডায়াগনস্টিক নিউরোরেডিওলজি" },
      { id: 4, name: "Diploma in Neurosurgical Nursing", nameBn: "ডিপ্লোমা ইন নিউরোসার্জিক্যাল নার্সিং" },
    ],
  },
  {
    id: "nursing",
    label: "BSC IN NURSING",
    labelBn: "বিএসসি ইন নার্সিং",
    headerTitle: "BSc & Special Post-Basic Neuro Nursing",
    headerTitleBn: "বিএসসি ও স্পেশাল পোস্ট-বেসিক নিউরো নার্সিং",
    disciplines: [
      { id: 1, name: "BSc in Specialized Neuro-Nursing", nameBn: "বিএসসি ইন স্পেশালাইজড নিউরো-নার্সিং" },
      { id: 2, name: "Post-Basic ICU & HDU Nursing Diploma", nameBn: "পোস্ট-বেসিক আইসিইউ ও এইচডিইউ নার্সিং" },
      { id: 3, name: "Operation Theater (OT) Neuro-Nursing", nameBn: "অপারেশন থিয়েটার নিউরো-নার্সিং" },
    ],
  },
  {
    id: "fellowship",
    label: "ADVANCED FELLOWSHIP PROGRAMME",
    labelBn: "অ্যাডভান্সড ফেলোশিপ প্রোগ্রাম",
    headerTitle: "Advanced Post-Doctoral Fellowships",
    headerTitleBn: "অ্যাডভান্সড পোস্ট-ডক্টরাল ফেলোশিপ",
    disciplines: [
      { id: 1, name: "Interventional Neuroradiology (FINR)", nameBn: "ইন্টারভেনশনাল নিউরোরেডিওলজি (FINR)" },
      { id: 2, name: "Stroke & Neuro-Vascular Medicine", nameBn: "স্ট্রোক ও নিউরো-ভাস্কুলার মেডিসিন" },
      { id: 3, name: "Epilepsy & Electroencephalography (EEG)", nameBn: "এপিলেপসি ও ইলেক্ট্রোএনসেফালোগ্রাফি" },
      { id: 4, name: "Neuro-Endoscopy & Skull Base Surgery", nameBn: "নিউরো-এন্ডোস্কোপি ও স্কাল বেস সার্জারি" },
      { id: 5, name: "Pediatric Neuro-Development Fellowship", nameBn: "পিডিয়াট্রিক নিউরো-ডেভেলপমেন্ট ফেলোশিপ" },
    ],
  },
]

export function CoursesShowcase() {
  const { lang } = useLanguage()
  const isBn = lang === "bn"
  const [activeTabId, setActiveTabId] = React.useState("md")

  const currentProgram =
    coursesData.find((p) => p.id === activeTabId) || coursesData[0]

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 lg:py-24 dark:bg-slate-950/60 border-t border-slate-100 dark:border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {isBn ? "কোর্সসমূহ" : "Courses"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto font-bangla">
            {isBn
              ? "এমবিবিএস ডিগ্রি সমাপ্তির পর নিওরোসাইন্সেস বিশেষায়িত শিক্ষা। রোগ নির্ণয়, চিকিৎসা ও রোগীবান্ধব সেবায় দক্ষ চিকিৎসক গড়ে তোলাই আমাদের লক্ষ্য।"
              : "It is pursued after completing an MBBS (Bachelor of Medicine and Bachelor of Surgery) degree. The program aims to develop highly skilled medical professionals with expertise in diagnosis, treatment, and patient care."}
          </p>
        </div>

        {/* Main Content Layout: Left Vertical Tabs + Right Display Card Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Side Vertical Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {coursesData.map((tab) => {
              const isActive = activeTabId === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`w-full shrink-0 lg:shrink text-left rounded-xl px-4 py-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "bg-[#094856] text-white shadow-md dark:bg-teal-700"
                      : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:border-white/10 dark:hover:bg-slate-800"
                  }`}
                >
                  <GraduationCap
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-white" : "text-[#094856] dark:text-teal-400"
                    }`}
                  />
                  <span className="truncate font-bangla">
                    {isBn ? tab.labelBn : tab.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Side Content Display Card Box */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden dark:border-white/10 dark:bg-slate-900">
              {/* Card Box Dark Teal Header Bar */}
              <div className="bg-[#094856] px-5 py-4 sm:px-6 sm:py-5 text-white flex items-center justify-between dark:bg-teal-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-white font-bangla">
                    {isBn ? currentProgram.headerTitleBn : currentProgram.headerTitle}
                  </h3>
                </div>

                <Link
                  href="/academic/courses"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#094856] shrink-0"
                >
                  {isBn ? "বিস্তারিত দেখুন" : "View More"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 2-Column Grid of Numbered Disciplines */}
              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentProgram.disciplines.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => alert(`Selected course: ${item.name}`)}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100/90 hover:shadow-2xs dark:border-white/5 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 cursor-pointer"
                    >
                      <div className="flex items-center min-w-0 pr-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200 mr-3">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#094856] dark:group-hover:text-teal-300 transition-colors font-bangla truncate">
                          {isBn ? item.nameBn : item.name}
                        </span>
                      </div>

                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-[#094856] dark:group-hover:text-teal-300 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info Counter Line */}
              <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center gap-1.5 dark:bg-slate-900/50 dark:border-white/5">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-bangla">
                  {isBn
                    ? `${currentProgram.disciplines.length} টি বিষয়ে ভর্তি প্রক্রিয়া ও কোর্স সূচি অন্তর্ভুক্ত`
                    : `Showing up to ${currentProgram.disciplines.length} disciplines`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
