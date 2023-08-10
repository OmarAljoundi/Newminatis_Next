import { BestSellerLoading } from "@/components/loading/BestSellerLoading";
import { InstagramLoading } from "@/components/loading/InstagramLoading";
import AboutSection from "@/pages-sections/home/AboutSection";
import BestSellerSection from "@/pages-sections/home/BestSellerSection";
import CollectionSection from "@/pages-sections/home/CollectionSection";
import ContributionSection from "@/pages-sections/home/ContributionSection";
import HeroSection from "@/pages-sections/home/HeroSection";
import InstagramSection from "@/pages-sections/home/InstagramSection";
import ValueSection from "@/pages-sections/home/ValueSection";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Newminatis: Shop for the Latest Fashion Trends",
  description:
    "Shop the latest fashion trends at Newminatis. We offer a wide variety of clothing for men and women at affordable prices. Check out our selection today!",
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
        <Suspense fallback={<BestSellerLoading />}>
          <BestSellerSection />
        </Suspense>
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
        <Suspense fallback={<InstagramLoading />}>
          <InstagramSection />
        </Suspense>
      </section>
    </div>
  );
}
