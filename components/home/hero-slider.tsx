"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  { src: "/images/1.webp", alt: "NINS Image 1" },
  { src: "/images/2.webp", alt: "NINS Image 2" },
  { src: "/images/3.webp", alt: "NINS Image 3" },
  { src: "/images/4.webp", alt: "NINS Image 4" },
  { src: "/images/6.webp", alt: "NINS Image 6" },
  { src: "/images/7.webp", alt: "NINS Image 7" },
  { src: "/images/8.webp", alt: "NINS Image 8" },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  React.useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered, nextSlide])

  return (
    <div
      className="group relative w-full overflow-hidden bg-slate-950 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 100% Edge-to-Edge Full-width Image Container */}
      <div className="relative h-[360px] sm:h-[460px] md:h-[540px] lg:h-[600px] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 opacity-80 group-hover:opacity-100 hover:bg-primary hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-md transition-all duration-200 opacity-80 group-hover:opacity-100 hover:bg-primary hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between bg-slate-950/70 px-8 py-3.5 backdrop-blur-md">
        {/* Indicators Dots */}
        <div className="flex items-center gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="hidden sm:flex items-center gap-2">
          {heroImages.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-10 w-16 overflow-hidden rounded border transition-all duration-200 ${
                idx === currentIndex
                  ? "border-primary ring-2 ring-primary/60 scale-105 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
