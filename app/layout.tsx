import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";

import "@/styles/globals.css";
import { GradientField } from "@/components/effects/GradientField";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://doodledynamo.com"),
  title: {
    default: "Doodle Dynamo | SEO, Web Development & Branding",
    template: "%s | Doodle Dynamo",
  },
  description:
    "Doodle Dynamo builds distinctive brands, high-performing websites, and measurable growth systems for ambitious businesses.",
  keywords: [
    "digital agency",
    "SEO agency",
    "web development",
    "branding agency",
    "Lahore digital agency",
  ],
  openGraph: {
    title: "Doodle Dynamo | Ideas built to move",
    description:
      "Strategy, design, and technology working together to build momentum for ambitious brands.",
    type: "website",
    locale: "en_PK",
    siteName: "Doodle Dynamo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f6f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <GradientField />
        {children}
      </body>
    </html>
  );
}
