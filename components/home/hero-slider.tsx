"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Calendar,
  Activity,
  Stethoscope,
  ShieldCheck,
  Building2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { HeroVideoModal } from "./hero-video-modal"

const AUTOPLAY_DURATION = 6000

interface SlideMeta {
  id: string
  bgImage: string
  bgVideo?: string
  titleHighlightClass: string
  primaryHref: string
  primaryIcon: React.ReactNode
  primaryClass: string
  secondaryHref: string
  secondaryIcon: React.ReactNode
  secondaryClass: string
}

const SLIDE_META: SlideMeta[] = [
  {
    id: "premier-neuroscience",
    bgImage: "/images/1.webp",
    bgVideo: "/videos/nins-hero-intro.mp4",
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
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false)
  const [isVideoMuted, setIsVideoMuted] = React.useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(true)

  const touchStartRef = React.useRef<number>(0)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
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

  // Handle Video element playback sync with active slide and modal
  React.useEffect(() => {
    if (!videoRef.current) return

    if (currentIndex === 0 && !isVideoModalOpen && isVideoPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until interaction
      })
    } else {
      videoRef.current.pause()
    }
  }, [currentIndex, isVideoModalOpen, isVideoPlaying])

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsVideoPlaying(true)
    } else {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsVideoMuted(videoRef.current.muted)
  }

  // Auto-play slider (pauses if hovering or video modal is active)
  React.useEffect(() => {
    if (isHovered || isVideoModalOpen) return
    const timer = setInterval(nextSlide, AUTOPLAY_DURATION)
    return () => clearInterval(timer)
  }, [isHovered, isVideoModalOpen, nextSlide])

  // Keyboard Navigation
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isVideoModalOpen) return
      if (e.key === "ArrowLeft") prevSlide()
      else if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isVideoModalOpen])

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
    <>
      <section
        className="group relative w-full overflow-hidden bg-slate-950 text-white min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="NINS Hospital Hero Showcase"
      >
        {/* Stacked Slides */}
        <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center">
          {SLIDE_META.map((meta, index) => {
            const isActive = index === currentIndex
            const t = heroDict[index]
            const hasVideo = Boolean(meta.bgVideo)

            return (
              <div
                key={meta.id}
                className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Background Layer: Video or Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {hasVideo ? (
                    <>
                      {/* Video Stream */}
                      <video
                        ref={videoRef}
                        src={meta.bgVideo}
                        poster={meta.bgImage}
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-102"
                      />
                    </>
                  ) : (
                    <Image
                      src={meta.bgImage}
                      alt={t.titlePrefix + " " + t.titleHighlight}
                      fill
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-102"
                      priority={index === 0}
                    />
                  )}

                  {/* High-Contrast Gradient Scrim for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />
                </div>

                {/* Content */}
                <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12 py-10 sm:py-14">
                  <div className="max-w-2xl space-y-4 sm:space-y-5">
                    {/* Eyebrow */}
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-700 text-slate-200 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: "150ms" }}
                    >
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
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

                    {/* Action Buttons */}
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

                      {hasVideo ? (
                        <button
                          type="button"
                          onClick={() => setIsVideoModalOpen(true)}
                          className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/40 bg-sky-950/60 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-sky-200 backdrop-blur-md transition-all duration-300 hover:bg-sky-500/20 hover:scale-103 hover:border-sky-400 active:scale-95 shadow-lg group/btn"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition-transform group-hover/btn:scale-110">
                            <Play className="h-3 w-3 fill-current ml-0.5" />
                          </span>
                          <span>{dict.hero.watchVideo || "Watch Hospital Tour"}</span>
                        </button>
                      ) : (
                        <Link
                          href={meta.secondaryHref}
                          className={`inline-flex items-center gap-2.5 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-103 active:scale-95 ${meta.secondaryClass}`}
                        >
                          {meta.secondaryIcon}
                          <span>{t.secondaryBtn}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ambient Video Floating Quick-Controls (Bottom Right) */}
        {currentIndex === 0 && (
          <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 p-1.5 backdrop-blur-md shadow-xl transition-all duration-300">
            {/* Play/Pause Button */}
            <button
              onClick={toggleVideoPlayback}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              title={isVideoPlaying ? (dict.hero.pauseVideo || "Pause video") : (dict.hero.playVideo || "Play video")}
              aria-label="Toggle playback"
            >
              {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleVideoMute}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              title={isVideoMuted ? (dict.hero.unmuteVideo || "Unmute sound") : (dict.hero.muteVideo || "Mute sound")}
              aria-label="Toggle audio"
            >
              {isVideoMuted ? <VolumeX className="h-3.5 w-3.5 text-rose-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>

            {/* Fullscreen HD Modal Trigger */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 transition-colors hover:bg-sky-500/40"
              title={dict.hero.watchVideo || "Watch Fullscreen"}
              aria-label="Open fullscreen video modal"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

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
            isHovered || isVideoModalOpen ? "opacity-40" : "animate-[progress_6s_linear_infinite]"
          }`}
          style={{ width: isHovered || isVideoModalOpen ? "100%" : "0%" }}
        />
      </section>

      {/* Full HD Accessible Video Modal */}
      <HeroVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/videos/nins-hero-intro.mp4"
      />
    </>
  )
}
