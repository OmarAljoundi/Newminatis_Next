import AboutSection from "@/pages-sections/home/AboutSection";
import BestSellerSection from "@/pages-sections/home/BestSellerSection";
import CollectionSection from "@/pages-sections/home/CollectionSection";
import ContributionSection from "@/pages-sections/home/ContributionSection";
import HeroSection from "@/pages-sections/home/HeroSection";
import { InstagramSection } from "@/pages-sections/home/InstagramSection";
import ValueSection from "@/pages-sections/home/ValueSection";
import React from "react";

export default function Home() {
  return (
    <div>
      <section>
        <HeroSection />
      </section>
      <section>
        <CollectionSection />
      </section>
      <section>
        <BestSellerSection />
      </section>
      <section>
        <AboutSection />
      </section>
      <section>
        <ContributionSection />
      </section>

      <section>
        <ValueSection />
      </section>
      <section>
        <InstagramSection />
      </section>
    </div>
  );
}
