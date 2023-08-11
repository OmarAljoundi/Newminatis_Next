import { FC, useState } from "react";
import Drawer from "@mui/material/Drawer";

import { TProduct } from "@/types/TProduct";
import AddToCardModel from "../models/AddToCartModel";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShopCardLayout } from "./ShopCardLayout";

// ========================================================
type ProductCardProps = {
  discount: number;
  product: TProduct;
  perImage?: number;
  classes?: string;
};
// ========================================================

const ShopMobileCard: FC<ProductCardProps> = ({
  product,
  discount,
  perImage = 4,
  classes = "",
}) => {
  const [addToCart, setAddToCart] = useState(false);
  const toggleCartModel = () => setAddToCart(!addToCart);

  return (
    <>
      <ShopCardLayout
        classes={classes}
        discount={discount}
        perImage={perImage}
        product={product}
        addToCart={
          <button
            className="title rounded-none text-xs uppercase  flex items-center justify-center  border border-transparent bg-black px-2 py-1
             text-white shadow-sm hover:bg-slate-700"
            onClick={toggleCartModel}
          >
            Add to cart
          </button>
        }
      />
      <Drawer
        open={addToCart}
        anchor="bottom"
        onClose={toggleCartModel}
        PaperProps={{
          sx: { paddingBottom: "35px", width: "100%" },
        }}
      >
        <AddToCardModel
          toggleDrawer={toggleCartModel}
          product={product}
          discount={discount}
        />
      </Drawer>
    </>
  );
};

export default ShopMobileCard;
