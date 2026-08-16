"use client"

import * as React from "react"
import { X, ShieldCheck, Film } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface HeroVideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc?: string
}

export function HeroVideoModal({
  isOpen,
  onClose,
  videoSrc = "/videos/nins-hero-intro.mp4",
}: HeroVideoModalProps) {
  const { dict } = useLanguage()
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  // Auto-play when opened, pause when closed
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {
          // Handled if browser blocks autoplay with sound
        })
      }
    } else {
      document.body.style.overflow = ""
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on Escape key
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-6 md:p-10 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950 shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <Film className="h-4 w-4" />
            </span>
            <div>
              <h3
                id="video-modal-title"
                className="font-heading text-sm sm:text-base font-bold text-white leading-tight"
              >
                {dict.hero.videoModalTitle || "National Institute of Neurosciences & Hospital"}
              </h3>
              <p className="text-xs text-slate-400 hidden sm:block">
                {dict.hero.videoModalSub || "Official Institutional Video Documentary"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-rose-600 hover:text-white"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            className="h-full w-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-900/90 px-5 py-3 text-xs text-slate-300 sm:px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>NINS Government Healthcare Facility • Sher-e-Bangla Nagar, Dhaka</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-slate-200">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </div>
  )
}
