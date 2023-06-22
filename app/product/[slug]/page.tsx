import { IProductResponse } from "@/interface/IProductResponse";
import ProductService from "@/service/ProductService";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { AxiosResponse } from "axios";
import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumb";
import ProductImagesSection from "@/pages-sections/product/ProductImagesSection";
import ProductInfoSection from "@/pages-sections/product/ProductInfoSection";

type Params = {
  params: {
    slug: string;
  };
};
export default async function SingleProductPage({ params: { slug } }: Params) {
  const SearchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 0,
  };
  SearchQuery.FilterByOptions.push({
    FilterFor: (slug as string).split("-")[0],
    MemberName: "Name",
    FilterOperator: eFilterOperator.Contains,
  });
  SearchQuery.FilterByOptions.push({
    FilterFor: 1,
    MemberName: "Status",
    FilterOperator: eFilterOperator.Equal,
  });
  SearchQuery.FilterByOptions.push({
    FilterFor: (slug as string).split("-")[1],
    MemberName: "Color",
    FilterOperator: eFilterOperator.Equal,
  });

  const _response = (await ProductService.searchOne(
    SearchQuery
  )) as AxiosResponse<IProductResponse>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
      {/* <ReviewModel product={_response.product} /> */}

      <div>
        <Breadcrumbs product={_response?.data?.product} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2  lg:grid-cols-2 xl:gap-x-8">
        <ProductImagesSection product={_response?.data?.product} />
        <ProductInfoSection response={_response?.data} />
      </div>

      {/* <RelatedProducts
              related={_response.product?.relatedProducts}
              id={_response.product?.id}
            /> */}
    </div>
  );
}
