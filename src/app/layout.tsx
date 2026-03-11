import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Sans_3, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { AgentationWrapper } from "@/components/AgentationWrapper";
import Script from "next/script";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manohargupta.com"),
  title: {
    default: "Manohar Gupta — Renewable Energy Professional & Builder",
    template: "%s | Manohar Gupta",
  },
  description: "Portfolio of Manohar Gupta — Manager at ReNew, IIT Roorkee engineer, IIM Rohtak gold medalist. Specializing in renewable energy project finance, solar design, and building technology solutions.",
  keywords: [
    "renewable energy",
    "project finance",
    "solar",
    "IIT Roorkee",
    "IIM Rohtak",
    "solar plant design",
    "financial modeling",
    "renewable energy India",
  ],
  authors: [{ name: "Manohar Gupta" }],
  creator: "Manohar Gupta",
  publisher: "Manohar Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manohargupta.com",
    siteName: "Manohar Gupta",
    title: "Manohar Gupta — Renewable Energy Professional & Builder",
    description: "Portfolio of Manohar Gupta — Manager at ReNew, IIT Roorkee engineer, IIM Rohtak gold medalist. Specializing in renewable energy project finance, solar design, and building technology solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manohar Gupta - Renewable Energy Professional & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manohar Gupta — Renewable Energy Professional & Builder",
    description: "Portfolio of Manohar Gupta — Manager at ReNew, IIT Roorkee engineer, IIM Rohtak gold medalist.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} ${serif.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {process.env.NODE_ENV === "development" && <AgentationWrapper />}
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
