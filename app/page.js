import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/effects/Marquee";
import CursorFollower from "@/components/effects/CursorFollower";
import ScrollProgress from "@/components/effects/ScrollProgress";
import { sections } from "@/data/sections";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <Marquee />
        {sections.map(({ id, component: SectionComponent }) => (
          <SectionComponent key={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}
