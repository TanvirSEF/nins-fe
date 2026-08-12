"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, PhoneCall, Calendar, Activity, Stethoscope, ShieldCheck, Building2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const AUTOPLAY_DURATION = 5000

const SLIDE_META = [
  {
    id: "premier-neuroscience",
    bgImage: "/images/1.webp",
    titleHighlightClass: "text-sky-300",
    primaryHref: "/forms",
    primaryIcon: <Calendar className="h-4 w-4" />,
    primaryClass: "bg-primary hover:bg-primary/90 text-white shadow-md",
    secondaryHref: "tel:+88029140752",
    secondaryIcon: <PhoneCall className="h-4 w-4 text-emerald-400" />,
    secondaryClass: "border border-white/30 bg-slate-900/40 hover:bg-white/20 text-white backdrop-blur-md",
  },
  {
    id: "stroke-unit",
    bgImage: "/images/2.webp",
    titleHighlightClass: "text-emerald-300",
    primaryHref: "tel:+88029140752",
    primaryIcon: <PhoneCall className="h-4 w-4" />,
    primaryClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md",
    secondaryHref: "/diagnostic-facilities/ot-charge",
    secondaryIcon: <Activity className="h-4 w-4 text-sky-300" />,
    secondaryClass: "border border-white/30 bg-slate-900/40 hover:bg-white/20 text-white backdrop-blur-md",
  },
  {
    id: "specialist-faculty",
    bgImage: "/images/3.webp",
    titleHighlightClass: "text-cyan-300",
    primaryHref: "/doctors",
    primaryIcon: <Stethoscope className="h-4 w-4" />,
    primaryClass: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-md",
    secondaryHref: "/departments",
    secondaryIcon: <ShieldCheck className="h-4 w-4 text-cyan-300" />,
    secondaryClass: "border border-white/30 bg-slate-900/40 hover:bg-white/20 text-white backdrop-blur-md",
  },
  {
    id: "hospital-facilities",
    bgImage: "/images/4.webp",
    titleHighlightClass: "text-sky-300",
    primaryHref: "/diagnostic-facilities/neuro-intervention",
    primaryIcon: <Building2 className="h-4 w-4" />,
    primaryClass: "bg-primary hover:bg-primary/90 text-white shadow-md",
    secondaryHref: "#contact",
    secondaryIcon: <PhoneCall className="h-4 w-4 text-emerald-400" />,
    secondaryClass: "border border-white/30 bg-slate-900/40 hover:bg-white/20 text-white backdrop-blur-md",
  },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [progressKey, setProgressKey] = React.useState(0)
  const touchStartRef = React.useRef<number>(0)
  const { dict } = useLanguage()

  const heroDict = [
    dict.hero.slide1,
    dict.hero.slide2,
    dict.hero.slide3,
    dict.hero.slide4,
  ]

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDE_META.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDE_META.length) % SLIDE_META.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setProgressKey((prev) => prev + 1)
  }

  // Auto-play
  React.useEffect(() => {
    if (isHovered) return
    const timer = setInterval(nextSlide, AUTOPLAY_DURATION)
    return () => clearInterval(timer)
  }, [isHovered, nextSlide])

  // Keyboard Navigation
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prevSlide()
      else if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  return (
    <section
      className="group relative w-full overflow-hidden bg-slate-950 text-white min-h-[440px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="NINS Hospital Hero Showcase"
    >
      {/* Stacked Slides */}
      <div className="relative w-full h-full min-h-[440px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center">
        {SLIDE_META.map((meta, index) => {
          const isActive = index === currentIndex
          const t = heroDict[index]

          return (
            <div
              key={meta.id}
              className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Photo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={meta.bgImage}
                  alt={t.titlePrefix + " " + t.titleHighlight}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-102"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
              </div>

              {/* Content */}
              <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12 py-10 sm:py-14">
                <div className="max-w-2xl space-y-4 sm:space-y-5">
                  {/* Eyebrow */}
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-700 text-slate-200 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: "150ms" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{t.eyebrow}</span>
                  </div>

                  {/* Title */}
                  <h1
                    className={`font-heading text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15] text-white transition-all duration-700 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: "280ms" }}
                  >
                    {t.titlePrefix}{" "}
                    <span className={meta.titleHighlightClass}>{t.titleHighlight}</span>{" "}
                    {t.titleSuffix}
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base lg:text-lg leading-relaxed text-slate-200 max-w-xl transition-all duration-700 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    {t.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`pt-2 flex flex-wrap items-center gap-3.5 transition-all duration-700 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: "520ms" }}
                  >
                    <Link
                      href={meta.primaryHref}
                      className={`inline-flex items-center gap-2.5 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-103 active:scale-95 ${meta.primaryClass}`}
                    >
                      {meta.primaryIcon}
                      <span>{t.primaryBtn}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={meta.secondaryHref}
                      className={`inline-flex items-center gap-2.5 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-103 active:scale-95 ${meta.secondaryClass}`}
                    >
                      {meta.secondaryIcon}
                      <span>{t.secondaryBtn}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5" role="tablist">
        {SLIDE_META.map((meta, idx) => (
          <button
            key={meta.id}
            onClick={() => goToSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 bg-cyan-400 shadow-sm"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            role="tab"
            aria-selected={idx === currentIndex}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div
        key={progressKey}
        className={`absolute bottom-0 left-0 h-1 bg-cyan-400 z-30 ${
          isHovered ? "opacity-40" : "animate-[progress_5s_linear_infinite]"
        }`}
        style={{ width: isHovered ? "100%" : "0%" }}
      />
    </section>
  )
}
