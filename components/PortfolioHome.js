"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/effects/Marquee";
import CursorFollower from "@/components/effects/CursorFollower";
import ScrollProgress from "@/components/effects/ScrollProgress";
import { sections } from "@/data/sections";
import { roles } from "@/data/roles";

export default function PortfolioHome() {
  const [activeRole, setActiveRole] = useState("clipper");

  useEffect(() => {
    const roleFromUrl = new URLSearchParams(window.location.search).get("role");
    if (roles.some((role) => role.id === roleFromUrl)) setActiveRole(roleFromUrl);
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <Marquee />
        {sections.map(({ id, component: SectionComponent }) =>
          id === "work" ? (
            <SectionComponent key={id} activeRole={activeRole} />
          ) : (
            <SectionComponent key={id} />
          )
        )}
      </main>
      <Footer />
    </>
  );
}
