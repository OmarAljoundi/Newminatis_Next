import { FC, Fragment, useState } from "react";
import StraightenIcon from "@mui/icons-material/Straighten";
import { TProduct } from "@/types/TProduct";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductSizeGuidTable from "./ProductSizeGuidTable";
type SizeGuidProp = {
  product: TProduct;
};
const ProductSizeGuid: FC<SizeGuidProp> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="text-sm font-medium text-gray-700 hover:text-gray-300 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Size Guide{" "}
          <StraightenIcon
            sx={{ transform: " rotate(45deg)", fontSize: "0.875rem" }}
          />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader className="overflow-auto">
          <DialogTitle className="text-xs md:text-base">
            HOW TO MEASURE FOR {product.friendlyName ?? product.name} ?
          </DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              <ProductSizeGuidTable
                productSizeGuide={product?.productSizeGuide}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSizeGuid;
