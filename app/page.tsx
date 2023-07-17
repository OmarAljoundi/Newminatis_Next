import AboutSection from "@/pages-sections/home/AboutSection";
import BestSellerSection from "@/pages-sections/home/BestSellerSection";
import CollectionSection from "@/pages-sections/home/CollectionSection";
import ContributionSection from "@/pages-sections/home/ContributionSection";
import HeroSection from "@/pages-sections/home/HeroSection";
import { InstagramSection } from "@/pages-sections/home/InstagramSection";
import ValueSection from "@/pages-sections/home/ValueSection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis | Unique alternative and concept clothing",
  description:
    "Newminatis | Unique Rave Clothing | Tech-wear | Festival Fashion | Men, Women & Unisex | Music | Art | People",
  keywords: [
    "Rave clothing",
    "Tech wear",
    "Reconstructed clothing",
    "Cyberpunk clothing",
    "Festival clothing",
  ],
};

export default async function Home() {
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
        <ValueSection extraClass="py-7 md:py-14 mx-auto" mode="light" />
      </section>
      <section>
        <InstagramSection />
      </section>
    </div>
  );
}
