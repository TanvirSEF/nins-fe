"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RemoteImage } from "@/components/shared/RemoteImage"
import { ImageIcon, Loader2, Upload } from "lucide-react"

/**
 * File picker + thumbnail preview for the multipart image endpoints
 * (department image / doctor profile picture). Accepts jpeg/png/webp (≤5MB
 * enforced server-side). Calls `onUpload` with the chosen File.
 */
export function ImageUpload({
  currentUrl,
  onUpload,
  loading,
  label = "Image",
}: {
  currentUrl?: string
  onUpload: (file: File) => void
  loading?: boolean
  label?: string
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = "" // allow re-selecting the same file
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
        <RemoteImage
          src={currentUrl}
          alt={label}
          width={64}
          height={64}
          className="size-full object-cover"
          fallback={<ImageIcon className="size-5 text-muted-foreground" />}
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onFile}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Upload className="size-4" />
        )}
        {currentUrl ? "Replace" : "Upload"}
      </Button>
    </div>
  )
}
