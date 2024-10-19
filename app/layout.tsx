import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"

import "@/styles/globals.css"

import Script from "next/script"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

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
        <meta
          name="google-site-verification"
          content="Wfi-L480X8UbwCH846R0XmkJcVpN5gIAVeZ_4uM1s2o"
        />
        <link rel="preload" href="/images/profile.webp" as="image"></link>
        {/* <script type={"text/javascript"} src={"/scripts/simplex.js"} async /> */}
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {/* <canvas
          id="c"
          className="w-[28vw] h-[30vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-[3rem] mt-[7rem]"
        >
          <Script src={"/scripts/lightning.js"} />
        </canvas> */}

        <header>
          <Header />
        </header>

        {children}

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
