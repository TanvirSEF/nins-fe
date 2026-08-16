"use client"

import * as React from "react"
import Image from "next/image"
import { Video, Play, X, Clock, ExternalLink, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const videoItems = [
  {
    id: 1,
    title: {
      en: "Inauguration Ceremony: Newly Expanded 500-Bed NINS Hospital",
      bn: "সম্প্রসারিত ৫০০ শয্যার এনআইএনএস ভবনের শুভ উদ্বোধনী অনুষ্ঠান",
    },
    thumbnail: "/images/1.webp",
    duration: "Full HD",
    date: {
      en: "Aug 15, 2026",
      bn: "১৫ আগস্ট ২০২৬",
    },
    category: {
      en: "Inauguration",
      bn: "উদ্বোধনী অনুষ্ঠান",
    },
    description: {
      en: "The official inauguration ceremony of the newly expanded 500-bed National Institute of Neurosciences and Hospital, Dhaka (Saturday, August 15, 2026).",
      bn: "জাতীয় নিউরোসায়েন্সেস ইনস্টিটিউট ও হাসপাতালের নবনির্মিত সম্প্রসারিত ৫০০ শয্যা ভবনের শুভ উদ্বোধন অনুষ্ঠান (শনিবার, ১৫ আগস্ট ২০২৬)।",
    },
    videoUrl: "/videos/nins-hero-intro.mp4",
    isFeatured: true,
  },
  {
    id: 2,
    title: {
      en: "Health Minister Best Performance Award Ceremony Highlights",
      bn: "স্বাস্থ্যমন্ত্রী সেরা পারফরম্যান্স পুরস্কার প্রদান অনুষ্ঠান",
    },
    thumbnail: "/images/dghs-awardex-2020.webp",
    duration: "05:20",
    date: {
      en: "2020",
      bn: "২০২০",
    },
    category: {
      en: "Events",
      bn: "অনুষ্ঠান",
    },
    description: {
      en: "Recognizing outstanding contributions in national neuroscience healthcare and institutional excellence.",
      bn: "জাতীয় নিউরোসায়েন্স স্বাস্থ্যসেবায় অসামান্য অবদানের স্বীকৃতিস্বরূপ প্রাপ্ত সম্মাননা।",
    },
    videoUrl: "", // Placeholder for YouTube/MP4
    isFeatured: false,
  },
  {
    id: 3,
    title: {
      en: "Financial Assistance & Rehabilitation Program Overview",
      bn: "স্ট্রোক ও পক্ষাঘাত পুনর্বাসন সহায়তা কর্মসূচি",
    },
    thumbnail: "/images/Financial_Assistance_Distribution_Ceremony_for_Stroke_and_Paralysis_Patients.webp",
    duration: "04:15",
    date: {
      en: "2026",
      bn: "২০২৬",
    },
    category: {
      en: "Patient Care",
      bn: "রোগী সেবা",
    },
    description: {
      en: "Assisting stroke and paralysis patients with specialized rehabilitation support and government subsidies.",
      bn: "স্ট্রোক ও পক্ষাঘাত আক্রান্ত রোগীদের বিশেষ পুনর্বাসন সহায়তা ও সরকারি সহায়তা কর্মসূচি।",
    },
    videoUrl: "", // Placeholder for YouTube/MP4
    isFeatured: false,
  },
]

export function VideoGallerySection() {
  const [playingVideo, setPlayingVideo] = React.useState<typeof videoItems[0] | null>(null)
  const { dict, lang } = useLanguage()
  const t = dict.video

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-24 text-white border-t border-white/10">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-info/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
            <Video className="h-3.5 w-3.5" />
            {t.badge}
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.heading}
          </h2>
          <p className="text-sm text-slate-300">
            {t.subtext}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoItems.map((item) => {
            const title = item.title[lang] || item.title.en
            const category = item.category[lang] || item.category.en
            const date = item.date[lang] || item.date.en
            const description = item.description[lang] || item.description.en

            return (
              <div
                key={item.id}
                onClick={() => setPlayingVideo(item)}
                className={`group cursor-pointer overflow-hidden rounded-2xl border bg-slate-950/80 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  item.isFeatured
                    ? "border-sky-500/50 ring-1 ring-sky-500/30 hover:border-sky-400"
                    : "border-white/10 hover:border-primary/50"
                }`}
              >
                {/* Thumbnail Frame */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={item.thumbnail}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-115 group-hover:bg-primary">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-sky-300 border border-white/10 backdrop-blur-md">
                      {category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-slate-200 border border-white/10 backdrop-blur-md">
                      <Clock className="h-3 w-3 text-primary" />
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{date}</span>
                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 uppercase">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-sm font-bold text-white transition-colors group-hover:text-primary leading-snug line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <span>{t.watchVideo}</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Video Player Modal */}
        {playingVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-lg animate-in fade-in duration-200"
            onClick={() => setPlayingVideo(null)}
          >
            <div
              className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-white/20 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white backdrop-blur-md hover:bg-rose-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Container Frame */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {playingVideo.videoUrl ? (
                  <video
                    src={playingVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <>
                    <Image
                      src={playingVideo.thumbnail}
                      alt={playingVideo.title[lang] || playingVideo.title.en}
                      fill
                      sizes="100vw"
                      className="object-cover opacity-30"
                    />
                    <div className="relative z-10 space-y-4 max-w-md p-6 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/40 animate-pulse">
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {playingVideo.title[lang] || playingVideo.title.en}
                      </h3>
                      <div className="rounded-xl border border-white/10 bg-white/10 p-3 text-xs text-slate-300 backdrop-blur-md">
                        <p className="font-semibold text-primary">{t.playerPlaceholder}</p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {t.playerHint}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-5 bg-slate-950 border-t border-white/10 text-white">
                <h4 className="font-heading text-sm font-bold text-white mb-1">
                  {playingVideo.title[lang] || playingVideo.title.en}
                </h4>
                <p className="text-xs text-slate-400">
                  {playingVideo.description[lang] || playingVideo.description.en}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
