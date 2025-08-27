import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./components/react-query-provider";
import FlashToast from "./components/FlashToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiloList — Conquer Chaos, One Task at a Time",
  description:
    "A quirky to-do app built by Milo, because even chaos needs structure 🧠⚡️",
  openGraph: {
    title: "MiloList — Conquer Chaos, One Task at a Time",
    description:
      "A quirky to-do app built by Milo, because even chaos needs structure 🧠⚡️",
    url: "https://full-stack-todolist-beta.vercel.app",
    siteName: "MiloList",
    images: [
      {
        url: "https://full-stack-todolist-beta.vercel.app/todomiloimg.png",
        width: 1200,
        height: 630,
        alt: "MiloList Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiloList — Conquer Chaos, One Task at a Time",
    description:
      "A quirky to-do app built by Milo, because even chaos needs structure 🧠⚡️",
    images: ["https://full-stack-todolist-beta.vercel.app/todomiloimg.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <div className="flex h-full min-h-screen w-full flex-col justify-between">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <Toaster />
              <FlashToast />
              <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
