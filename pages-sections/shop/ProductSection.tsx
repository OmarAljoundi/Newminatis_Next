"use client";
import { GrapQueries } from "@/helpers/Extensions";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { TProduct } from "@/types/TProduct";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Box from "@mui/material/Box";
import { ProductCardLoading } from "@/components/loading/ProductCardLoading";
import useWindowSize from "@/hooks/useWindowSize";
import ProductList from "./ProductList";

export default function ProductSection() {
  const { onSearchShop, CreateLoad } = useProductService();
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<TProduct[]>([]);
  const windows = useWindowSize();
  const [hasNextItems, setHasNextItems] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [fetching, setFetching] = useState(false);
  const searchParams = useSearchParams();
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
    [items, fetching, hasNextItems, searchParams]
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
    if (SearchQuery.OrderByOptions.length == 0) {
      SearchQuery.OrderByOptions.push({
        MemberName: "Priority",
        SortOrder: Order.DESC,
      });
    }

    handleFilterData(SearchQuery);
  }, [searchParams]);

  useEffect(() => {
    fetchItems(true);
  }, [searchParams]);

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
