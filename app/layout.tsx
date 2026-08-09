import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";
import { KineticTypeField } from "@/components/effects/KineticTypeField";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <CustomCursor />
        <KineticTypeField />
        {children}
      </body>
    </html>
  );
}
