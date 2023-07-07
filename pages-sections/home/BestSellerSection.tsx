"use client";
import { FC, useEffect, useState } from "react";
import { Box, Grid, Theme, useMediaQuery } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { TProduct } from "@/types/TProduct";
import useWindowSize from "@/hooks/useWindowSize";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import CategorySectionCreator from "@/components/CategorySectionCreator";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
import ShopCard from "@/components/product-card/ShopCard";
import { ProductCardLoading } from "@/components/loading/ProductCardLoading";
import Image from "next/image";

const BestSellerSection: FC = () => {
  const [NewminatisOptions, setProducts] = useState<TProduct[]>([]);
  const { onSearchShop, CreateLoad } = useProductService();
  const width = useWindowSize();
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const handleFetchProducts = (): Promise<IProductResponse> => {
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

    return new Promise(async (resolve, reject) => {
      resolve((await onSearchShop(SearchQuery)) as IProductResponse);
    });
  };

  useEffect(() => {
    Promise.all([handleFetchProducts()]).then((r) => {
      setProducts(r[0].products);
    });
  }, []);
  return (
    <CategorySectionCreator
      alignItems={"baseline"}
      icon={
        <Image
          width={40}
          height={30}
          src="/assets/images/logos/newminatis-LOGO-black.png"
          alt="Newminatis Logo"
        />
      }
      title="BEST SELLERS"
      seeMoreLink="/shop"
    >
      {width > 0 && (
        <Box mb={3.5} sx={{ position: "relative" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2">
            {(CreateLoad ? Array.from(new Array(4)) : NewminatisOptions)?.map(
              (item, index) => (
                <div>
                  {item ? (
                    <Box py={0.5} sx={{ height: "100%" }}>
                      {!downSm ? (
                        <ShopCard
                          discount={(item.salePrice as unknown as number) ?? 0}
                          product={item}
                        />
                      ) : (
                        <ShopMobileCard
                          discount={(item.salePrice as unknown as number) ?? 0}
                          product={item}
                        />
                      )}
                    </Box>
                  ) : (
                    <ProductCardLoading />
                  )}
                </div>
              )
            )}
          </div>
        </Box>
      )}
    </CategorySectionCreator>
  );
};

export default BestSellerSection;
