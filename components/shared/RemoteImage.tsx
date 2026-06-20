"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"

interface RemoteImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | undefined | null
  fallback: React.ReactNode
}

/**
 * next/image wrapper for remote images that may be unreachable or slow.
 * - `unoptimized`: the browser loads the raw URL directly (no `/_next/image`
 *   server fetch), so an unreachable host can't cause a server 500.
 * - We track WHICH src failed; a different src re-attempts automatically (no
 *   reset effect needed). On failure the caller-provided fallback shows. The
 *   fallback should fill the same space as the image (e.g. `absolute inset-0`
 *   for `fill` images).
 */
export function RemoteImage({
  src,
  fallback,
  alt,
  ...rest
}: RemoteImageProps) {
  const [failedSrc, setFailedSrc] = React.useState<string | null>(null)
  const failed = !!src && failedSrc === src

  if (!src || failed) return <>{fallback}</>

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      unoptimized
      onError={() => setFailedSrc(src)}
    />
  )
}
