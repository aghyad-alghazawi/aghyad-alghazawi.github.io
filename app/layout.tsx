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
  title: process.env.TITLE,
  description: process.env.DESCRIPTION,
  keywords: process.env.TAGS,
  authors: [{ name: process.env.AUTHOR, url: `https://${process.env.DOMAIN}` }],
  metadataBase: new URL(`https://${process.env.DOMAIN}`),
  openGraph: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    url: `https://${process.env.DOMAIN}`,
    siteName: process.env.TITLE,
    images: [
      {
        url: "/images/thumbnail.webp",
        width: 800,
        height: 600,
        alt: process.env.AUTHOR,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    images: ["/images/thumbnail.webp"],
  },
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
        {/* <script type={"text/javascript"} src={"/scripts/simplex.js"} async /> */}
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
