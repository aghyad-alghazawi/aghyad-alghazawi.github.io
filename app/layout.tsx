import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"

import "@/styles/globals.css"

import Script from "next/script"
import { Providers } from "@/providers/providers"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LightningTrail } from "@/components/lightning"

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
    siteName: process.env.HEADER,
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
    creator: process.env.AUTHOR,
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="google-site-verification"
          content="Wfi-L480X8UbwCH846R0XmkJcVpN5gIAVeZ_4uM1s2o"
        />
        <link rel="preload" href="/images/profile.webp" as="image"/>
        <script type={"text/javascript"} src={"/scripts/simplex.js"} async />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <Providers>
          <header>
            <Header />
          </header>

          <main>{children}</main>

          <footer>
            <Footer />
          </footer>

          <LightningTrail
            speed={0.1}
            maxTrailPoints={20}
            segmentRange={[5, 10]}
            glowIntensity={15}
            lineWidthRange={[1, 3]}
            color="rgba(0, 0, 0, 1)"
            // glowColor="rgba(0, 0, 0, 0.75)"
          />
        </Providers>
      </body>
    </html>
  )
}
