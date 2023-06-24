import { FC, Fragment, useState } from "react";
import { Grid, Pagination, Theme, useMediaQuery } from "@mui/material";
import { TProduct } from "@/types/TProduct";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
import ShopCard from "@/components/product-card/ShopCard";

// ========================================================
type ProductListProps = {
  products: TProduct[];
};
// ========================================================

const ProductList: FC<ProductListProps> = ({ products }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Grid container spacing={1} rowSpacing={2}>
        {products?.map((item: TProduct, index: number) => (
          <Grid item lg={4} sm={6} xs={6} key={item?.id ?? index}>
            {downSm ? (
              <ShopMobileCard
                discount={(item.salePrice as unknown as number) ?? 0}
                product={item}
                fadeType={(index + 1) % 2 == 0 ? "fade-left" : "fade-right"}
              />
            ) : (
              <ShopCard
                discount={(item.salePrice as unknown as number) ?? 0}
                product={item}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProductList;
