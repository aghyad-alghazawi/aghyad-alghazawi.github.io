import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";






import "@/styles/globals.css";



import Script from "next/script";



import { Footer } from "@/components/footer";





const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Singular Singularity",
  description: "Portfolio for Aghyad Alghazawi",
  keywords: "portfolio, Aghyad Alghazawi, web developer, design, software engineer, React, Next.js",
  authors: [
    { name: "Aghyad Alghazawi", url: "https://aghyad-alghazawi.github.io/" },
  ],
  openGraph: {
    title: "Singular Singularity",
    description: "Portfolio for Aghyad Alghazawi",
    url: "https://aghyad-alghazawi.github.io/", 
    siteName: "Singular Singularity",
    images: [
      {
        url: "/images/thumbnail.webp",
        width: 800,
        height: 600,
        alt: "Aghyad Alghazawi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singular Singularity",
    description: "Portfolio for Aghyad Alghazawi",
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