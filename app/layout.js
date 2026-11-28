import "./globals.css";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import SiteAtmosphere from "@/components/effects/SiteAtmosphere";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://jeralddasillo.me"),
  title: "Jerald Dasillo | Independent Creative",
  description:
    "Portfolio of Jerald Dasillo (yardy): short-form editing, solo game development, concept design, and 3D modeling.",
  openGraph: {
    title: "Jerald Dasillo | Independent Creative",
    description:
      "Short-form clips, video editing, and Minecraft mod side projects.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <SiteAtmosphere />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
