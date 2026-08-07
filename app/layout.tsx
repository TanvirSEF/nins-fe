import { Plus_Jakarta_Sans, Inter } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { cn } from "@/lib/utils"

// PRD Section 3.2 typography stack — consolidated to 2 fonts to minimise
// network round-trips. Geist, Geist_Mono, and Noto_Sans_Bengali have been
// removed; system-ui / monospace fallbacks in globals.css cover those roles.
const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontHeading.variable, fontSans.variable)}
    >
      <body suppressHydrationWarning>
        {/* Register self-destructing SW → clears all stale Turbopack chunks from browser cache */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function(){});
}
`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
