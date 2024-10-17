import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"

import "@/styles/globals.css"

import Script from "next/script"

import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Singular Singularity",
  description: "My Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={"en"}>
      <head>
        <link rel="preload" href="/images/profile.webp" as="image"></link>
        <script type={"text/javascript"} src={"/scripts/simplex.js"} async />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <header>{/* <Header /> */}</header>

        {children}

        <footer>
          <Footer />
        </footer>

        <canvas id="lightning-trail">
          <Script src={"/scripts/trail.js"} />
        </canvas>
      </body>
    </html>
  )
}
