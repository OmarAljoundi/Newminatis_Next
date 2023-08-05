import { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type ProductQuantityProps = {
  quantity: number;
  handleSetQuantity: (q: number) => void;
  size: string | null;
  maxQuantity: number;
};
export const ProductQuantity: FC<ProductQuantityProps> = ({
  quantity,
  handleSetQuantity,
  size,
  maxQuantity,
}) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <button
        className="w-11 h-11 cursor-pointer -inset-px rounded-md border-2 border-gray-200 bg-white flex justify-center items-center hover:bg-gray-50 disabled:bg-gray-50"
        disabled={quantity == 1 || !size}
        onClick={() => handleSetQuantity(quantity - 1)}
      >
        <AiOutlineMinus />
      </button>
      <div className="w-11 h-11 -inset-px rounded-md border-2 border-gray-200 bg-white flex justify-center items-center">
        {quantity}
      </div>
      <button
        className="w-11 h-11 cursor-pointer  -inset-px rounded-md border-2 border-gray-200 bg-white flex justify-center items-center hover:bg-gray-50 disabled:bg-gray-50"
        onClick={() => handleSetQuantity(quantity + 1)}
        disabled={!size || maxQuantity == quantity}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};
