import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import React from "react";
import ProductImagesSection from "@/pages-sections/product/ProductImagesSection";
import ProductInfoSection from "@/pages-sections/product/ProductInfoSection";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductRelatedSection from "@/pages-sections/product/ProductRelatedSection";
import { Metadata } from "next";
import NotFoundSupport from "@/app/not-found";
import { getProductData } from "@/lib/serverActions";
import ProductService from "@/service/ProductService";

type Params = {
  params: {
    slug: string;
  };
};

async function getProduct(slug: string) {
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

  const data = await getProductData(SearchQuery);

  return data;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;
  const data = await getProduct(slug);
  const { product } = data;
  if (product) {
    const p_name = product?.friendlyName ?? product.name;
    return {
      title: product?.friendlyName,
      description: product?.shortDescription,
      openGraph: {
        title: p_name.charAt(0).toUpperCase() + p_name.slice(1).toLowerCase(),
        description: product.shortDescription.toLowerCase(),
        url: `https://newminatis.com/product/${product.name.toLowerCase()}-0${
          product.color
        }`,
        type: "website",
        images: product.productImages?.map((x) => x.imageUrl),
        siteName: "Newminatis",
      },
      keywords: product.tags,

      other: {
        "og:price:amount": product.price.toString(),
        "og:price:currency": "USD",
        "product:brand": "Newminatis",
        "product:gender":
          product.categoryId == 34
            ? "Unisex"
            : product.categoryId == 11
            ? "Female"
            : "Male",
        "product:price:amount": product.price.toString(),
        "product:price:currency": "USD",
        "product:retailer_item_id": `NM-${product.name.replace(/ /g, "")}-0${
          product.color
        }`,
        "product:category": "5388",
        "product:condition": "new",
      },
    };
  }
  return {
    title: "Error - Product not found",
  };
}

export default async function SingleProductPage({ params: { slug } }: Params) {
  const _response = await getProduct(slug);
  if (_response.product == null) {
    return <NotFoundSupport />;
  }

  return (
    <div className="mx-auto max-w-2xl py-4 px-0 sm:py-6 lg:max-w-7xl lg:px-8">
      {/* <ReviewModel product={_response.product} /> */}

      <div>
        <Breadcrumb
          link={[
            "/",
            "/shop",
            `${_response?.product?.name.toLowerCase()}-${
              _response?.product?.color
            }`,
          ]}
          title={["Home", "Shop", _response?.product?.friendlyName]}
        />
      </div>
      <div className="md:divide-y-2">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2  lg:grid-cols-2 xl:gap-x-8">
          <ProductImagesSection product={_response?.product} />
          <ProductInfoSection response={_response} />
        </div>

        <ProductRelatedSection
          related={_response?.product?.relatedProducts || ""}
          id={_response?.product?.id}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const SearchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 0,
  };
  SearchQuery.FilterByOptions.push({
    FilterFor: 1,
    MemberName: "Status",
    FilterOperator: eFilterOperator.Equal,
  });

  const response = await ProductService.searchShop(SearchQuery);

  return response.data.products.map((product) => ({
    slug: `${product.name.toLowerCase()}-0${product.color.toString()}`,
  }));
}
