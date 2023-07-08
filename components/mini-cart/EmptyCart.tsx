import { Button } from "@mui/material";
import Link from "next/link";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";

export const EmptyCart = () => {
  return (
    <div className="max-w-7xl">
      <div className="py-12 grid justify-center items-center  justify-items-center max-w-xl px-4 mx-auto">
        <BuildingStorefrontIcon width={50} color="black" />
        <span className="text-2xl">Your cart is currently empty</span>
        <p className="text-center my-4 text-lg">
          Before proceed to checkout you must add some products to your shopping
          cart. You will find a lot of interesting products on our Shop page.
        </p>
        <Link href={"/shop"}>
          <Button
            color="primary"
            variant="contained"
            sx={{
              marginTop: "15px",
              fontSize: "20px",
              paddingX: "40px",
            }}
          >
            Start Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};
