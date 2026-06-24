"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

/**
 * Enter-to-add / blur-to-add tag input used for the free-text array fields on
 * the clinical forms (diagnosis, advice). Backed by a controlled string[].
 */
export function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}) {
  const [input, setInput] = React.useState("")

  const add = React.useCallback(() => {
    const v = input.trim()
    if (v && !values.includes(v)) onChange([...values, v])
    setInput("")
  }, [input, values, onChange])

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-2 py-1.5 focus-within:ring-2 focus-within:ring-ring">
      {values.map((v, i) => (
        <Badge key={`${v}-${i}`} variant="secondary" className="gap-1">
          {v}
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded-sm hover:bg-foreground/10"
            aria-label={`Remove ${v}`}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        value={input}
        placeholder={values.length === 0 ? placeholder : ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            add()
          }
        }}
        onBlur={add}
      />
    </div>
  )
}
