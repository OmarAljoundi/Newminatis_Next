"use client";
import { GrapQueries, getSubCategories } from "@/helpers/Extensions";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { TProduct } from "@/types/TProduct";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { useParams, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Box from "@mui/material/Box";
import { ProductCardLoading } from "@/components/loading/ProductCardLoading";
import useWindowSize from "@/hooks/useWindowSize";
import ProductList from "./ProductList";
import { useQuery } from "react-query";
import { TProductCategory } from "@/types/TProductCategory";

export default function ProductSection() {
  const { onSearchShop, CreateLoad, onGetCategories } = useProductService();
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<TProduct[]>([]);
  const windows = useWindowSize();
  const [hasNextItems, setHasNextItems] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [fetching, setFetching] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();

  const { data: categories, isLoading } = useQuery(
    "Categories",
    () => onGetCategories() as Promise<TProductCategory[]>,
    {
      enabled: true,
      cacheTime: 60000,
    }
  );
  const fetchItems = useCallback(
    async (clear?: boolean) => {
      if (fetching) {
        return;
      }

      setFetching(true);

      try {
        var _SQ = GrapQueries(searchParams?.entries());
        _SQ.PageIndex = clear ? 0 : pageIndex + 1;
        _SQ.PageSize = 12;
        _SQ.FilterByOptions.push({
          FilterFor: 1,
          FilterOperator: eFilterOperator.Equal,
          MemberName: "Status",
        });
        if (params?.category && isLoading == false) {
          _SQ.FilterByOptions.push({
            MemberName: "category",
            FilterFor: categories?.find(
              (x) =>
                x.description.toLowerCase() ==
                (params?.category as string).toLowerCase()
            )?.name,
            FilterOperator: eFilterOperator.Equal,
          });
        }
        if (params?.subCategory && isLoading == false) {
          _SQ.FilterByOptions.push({
            MemberName: "subcategory",
            FilterFor: getSubCategories(
              params!.category as string,
              categories || []
            )?.find((x) => x.description.toLowerCase() == params!.subCategory)
              ?.id,
            FilterOperator: eFilterOperator.Equal,
          });
        }
        if (_SQ.OrderByOptions.length == 0) {
          _SQ.OrderByOptions.push({
            MemberName: "Priority",
            SortOrder: Order.DESC,
          });
        }

        setPageIndex(pageIndex + 1);

        const { products, total } = (await onSearchShop(
          _SQ
        )) as IProductResponse;

        setTotal(total);
        let _ALL_PRODUCTS = products.length + items.length;

        if (clear) {
          setPageIndex(0);
          _ALL_PRODUCTS = products.length;
          setItems(products);
        } else {
          setItems([...items, ...products]);
        }

        if (total > _ALL_PRODUCTS) {
          setHasNextItems(true);
        } else {
          setHasNextItems(false);
        }
      } finally {
        setFetching(false);
      }
    },
    [items, fetching, hasNextItems, searchParams, isLoading]
  );
  useEffect(() => {
    window.scroll(0, 0);
    var SearchQuery = GrapQueries(searchParams?.entries());
    SearchQuery.PageSize = 12;
    SearchQuery.FilterByOptions.push({
      FilterFor: 1,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "Status",
    });
    if (params?.category && isLoading == false) {
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
    if (SearchQuery.OrderByOptions.length == 0) {
      SearchQuery.OrderByOptions.push({
        MemberName: "Priority",
        SortOrder: Order.DESC,
      });
    }

    handleFilterData(SearchQuery);
  }, [searchParams, isLoading]);

  useEffect(() => {
    fetchItems(true);
  }, [searchParams, isLoading]);

  const handleFilterData = async (SearchQuery: SearchQuery) => {
    const result = (await onSearchShop(SearchQuery)) as IProductResponse;
    //setData(result.products)
    setTotal(result.total);
  };
  const loader = (
    <Box mt={2}>
      <ProductCardLoading loop={3} />
    </Box>
  );
  return (
    <InfiniteScroll
      loadMore={() => fetchItems(false)}
      hasMore={hasNextItems}
      loader={loader}
      threshold={windows > 992 ? 600 : 1500}
    >
      <ProductList products={items} />
    </InfiniteScroll>
  );
}
