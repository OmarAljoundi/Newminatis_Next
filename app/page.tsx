export const revalidate = 86400;
export const dynamic = "auto";
import { PrepareSQObject } from "@/helpers/Extensions";
import { InstgramResponse } from "@/interface/InstgramResponse";
import { searchProducts } from "@/lib/serverActions";
import AboutSection from "@/pages-sections/home/AboutSection";
import BestSellerSection from "@/pages-sections/home/BestSellerSection";
import CollectionSection from "@/pages-sections/home/CollectionSection";
import ContributionSection from "@/pages-sections/home/ContributionSection";
import HeroSection from "@/pages-sections/home/HeroSection";
import { InstagramSection } from "@/pages-sections/home/InstagramSection";
import ValueSection from "@/pages-sections/home/ValueSection";
import SettingService from "@/service/SettingService";
import { AxiosResponse } from "axios";
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

const handleFetchInstagramData = async () => {
  const response =
    (await SettingService.getInstgramFeed()) as AxiosResponse<InstgramResponse>;

  return response.data.instagram;
};

export default async function Home() {
  const _SQ = PrepareSQObject(undefined, 8);
  const [getBestSeller, instagramFees] = await Promise.all([
    searchProducts(_SQ),
    handleFetchInstagramData(),
  ]);

  return (
    <div>
      <section>
        <HeroSection />
      </section>
      <section>
        <CollectionSection />
      </section>
      <section>
        <BestSellerSection productResponse={getBestSeller} />
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
        <InstagramSection instagramFeeds={instagramFees} />
      </section>
    </div>
  );
}
