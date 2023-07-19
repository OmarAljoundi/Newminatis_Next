import { IProductResponse } from "@/interface/IProductResponse";
import { InstgramResponse } from "@/interface/InstgramResponse";
import AboutSection from "@/pages-sections/home/AboutSection";
import BestSellerSection from "@/pages-sections/home/BestSellerSection";
import CollectionSection from "@/pages-sections/home/CollectionSection";
import ContributionSection from "@/pages-sections/home/ContributionSection";
import HeroSection from "@/pages-sections/home/HeroSection";
import { InstagramSection } from "@/pages-sections/home/InstagramSection";
import ValueSection from "@/pages-sections/home/ValueSection";
import ProductService from "@/service/ProductService";
import SettingService from "@/service/SettingService";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
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

const handleFetchProducts = async () => {
  let SearchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 8,
  };
  SearchQuery.FilterByOptions.push({
    FilterFor: 1,
    FilterOperator: eFilterOperator.Equal,
    MemberName: "Status",
  });

  SearchQuery.OrderByOptions.push({
    MemberName: "Priority",
    SortOrder: Order.DESC,
  });

  return (await ProductService.searchShop(SearchQuery)).data;
};

const handleFetchInstagramData = async () => {
  const response =
    (await SettingService.getInstgramFeed()) as AxiosResponse<InstgramResponse>;

  return response.data.instagram;
};

export default async function Home() {
  const [getBestSeller, instagramFees] = await Promise.all([
    handleFetchProducts(),
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
