"use client";
import { GrapQueries, getSubCategories } from "@/helpers/Extensions";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { TProduct } from "@/types/TProduct";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import {
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { ProductCardLoading } from "@/components/loading/ProductCardLoading";
import useWindowSize from "@/hooks/useWindowSize";
import ProductList from "./ProductList";
import { useInfiniteQuery, useQuery } from "react-query";
import { TProductCategory } from "@/types/TProductCategory";
import { useInView } from "react-intersection-observer";
import { forwardRef } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
import ShopCard from "@/components/product-card/ShopCard";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function ProductSection() {
  const { ref, inView } = useInView();
  const LIMIT = 12;
  const { onSearchShop, onGetCategories } = useProductService();
  const searchParams = useSearchParams();
  const params = useParams();

  const { data: categories, isFetched } = useQuery(
    "Categories",
    () => onGetCategories() as Promise<TProductCategory[]>,
    {
      enabled: true,
      cacheTime: 60000,
    }
  );

  const fetchProducts = async (page: number) => {
    var SearchQuery = GrapQueries(searchParams);
    SearchQuery.PageSize = LIMIT;
    SearchQuery.PageIndex = page;
    SearchQuery.FilterByOptions.push({
      FilterFor: 1,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "Status",
    });
    if (params?.category && isFetched == true) {
      SearchQuery.FilterByOptions.push({
        MemberName: "category",
        FilterFor: categories?.find(
          (x) =>
            x.description.toLowerCase() ==
            (params?.category as string).toLowerCase()
        )?.name,
        FilterOperator: eFilterOperator.Equal,
      });
    }
    if (params?.subCategory) {
      SearchQuery.FilterByOptions.push({
        MemberName: "subcategory",
        FilterFor: getSubCategories(
          params!.category as string,
          categories || []
        ).find((x) => x.description == (params?.subCategory as string))?.id,
        FilterOperator: eFilterOperator.Equal,
      });
    }
    if (SearchQuery.OrderByOptions.length == 0) {
      SearchQuery.OrderByOptions.push({
        MemberName: "Priority",
        SortOrder: Order.DESC,
      });
    }
    const result = (await onSearchShop(SearchQuery)) as IProductResponse;
    return result.products;
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    "products",
    ({ pageParam = 0 }) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === LIMIT ? allPages.length : undefined;
        return nextPage;
      },
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!isFetching) {
      refetch();
    }
  }, [searchParams]);

  const content =
    isSuccess &&
    data.pages.map((page) =>
      page.map((item, i) => {
        if (page.length === i + 1) {
          return <ProductCard ref={ref} key={item.id} product={item} />;
        }
        return <ProductCard key={item.id} product={item} />;
      })
    );

  if ((isRefetching && !isFetchingNextPage) || isLoading) {
    return <ProductCardLoading loop={6} />;
  }

  console.log("isLoading", isLoading);
  if (
    ((isFetched && data?.pages.map((x) => x.length)[0]) || 0) == 0 &&
    !isLoading
  ) {
    return (
      <div className="grid mx-auto justify-items-center">
        <ExclamationCircleIcon color="black" className="text-normal w-12" />
        <div className="mt-4 grid justify-items-center">
          <span className="text-normal font-bold">
            Your search returend no result
          </span>
          <span className="text-xs font-bold">
            Try clear some filters or change the collection
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid  md:grid-cols-3 grid-cols-2 gap-3">{content}</div>
      {isFetchingNextPage && <ProductCardLoading loop={3} />}
    </>
  );
}

interface ProductProps {
  product: TProduct;
}

const ProductCard = forwardRef<HTMLDivElement, ProductProps>(
  ({ product }, ref) => {
    const downSm = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down("md")
    );
    const productContent = (
      <div>
        {downSm ? (
          <ShopMobileCard
            discount={(product.salePrice as unknown as number) ?? 0}
            product={product}
          />
        ) : (
          <ShopCard
            discount={(product.salePrice as unknown as number) ?? 0}
            product={product}
          />
        )}
      </div>
    );

    const content = ref ? (
      <article ref={ref}>{productContent}</article>
    ) : (
      <article>{productContent}</article>
    );

    return content;
  }
);
