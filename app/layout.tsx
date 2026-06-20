import {
  Plus_Jakarta_Sans,
  Geist,
  Inter,
  Noto_Sans_Bengali,
} from "next/font/google"
import { Geist_Mono } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { cn } from "@/lib/utils"

// PRD Section 3.2 typography stack
const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontUi = Geist({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
})

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      className={cn(
        "antialiased",
        fontHeading.variable,
        fontUi.variable,
        fontSans.variable,
        fontBengali.variable,
        fontMono.variable
      )}
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
