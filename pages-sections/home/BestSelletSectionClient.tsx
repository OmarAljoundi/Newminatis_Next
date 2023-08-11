"use client";
import { FC } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import { IProductResponse } from "@/interface/IProductResponse";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
import ShopCard from "@/components/product-card/ShopCard";
import { ProductCardLoading } from "@/components/loading/ProductCardLoading";

const BestSellerSectionClient: FC<{ productResponse: IProductResponse }> = ({
  productResponse,
}) => {
  const width = useWindowSize();
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box mb={3.5} sx={{ position: "relative" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2">
        {productResponse?.products?.map((item, index) => (
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
        ))}
      </div>
    </Box>
  );
};

export default BestSellerSectionClient;
