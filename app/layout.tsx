import { Plus_Jakarta_Sans, Inter, Hind_Siliguri } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { cn } from "@/lib/utils"
import { BackToTop } from "@/components/shared/back-to-top"
import { FloatingLangSwitcher } from "@/components/shared/lang-switcher"

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

const fontBangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
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
      className={cn("antialiased", fontHeading.variable, fontSans.variable, fontBangla.variable)}
    >
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function(){});
}
`,
          }}
        />
        <Providers>
          {children}
          <FloatingLangSwitcher />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}
