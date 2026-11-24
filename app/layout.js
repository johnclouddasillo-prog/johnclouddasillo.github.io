import "./globals.css";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

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
  metadataBase: new URL("https://yardy.dev"),
  title: "Jerald Dasillo | Clipper and Video Editor",
  description:
    "Portfolio of Jerald Dasillo (yardy), a clipper and video editor who creates short, replayable edits and Minecraft mods.",
  openGraph: {
    title: "Jerald Dasillo | Clipper and Video Editor",
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
        {children}
      </body>
    </html>
  );
}
