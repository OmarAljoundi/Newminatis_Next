import { CartItem } from "@/store/Model/CartItem";
import { calculateCart, getTotalPrice } from "./Extensions";
import { currency } from "@/lib";
import { TSetting } from "@/types/TSetting";
import { CheckCircleIcon, TruckIcon } from "@heroicons/react/24/solid";

export const getShippingMessage = (
  state: CartItem[] = [],
  _setting: TSetting | null
) => {
  if (!isEligableForFreeShipping(state)) {
    const percentage = 100 - ((300 - calculateCart(state || [])) / 300) * 100;

    return (
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <div className="mb-1 text-[10px] font-bold uppercase">
            Add {currency(300 - calculateCart(state || []), _setting)} to be
            Eligible for free shipping
          </div>
          <div className="mb-1 text-xs font-bold">
            <TruckIcon width={20} />
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-gray-700">
          <div
            className={`bg-gray-600 h-2.5 rounded-sm dark:bg-gray-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <div className="mb-1 text-[10px] font-bold uppercase">
            Awesome, You Are Eligiblele For Free Shipping!
          </div>
          <div className="mb-1 text-xs font-medium">
            <CheckCircleIcon width={20} color="green" />
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-gray-700">
          <div className="bg-gray-600 h-2.5 rounded-sm dark:bg-gray-300 w-full"></div>
        </div>
      </div>
    );
  }
};
export const isEligableForFreeShipping = (state: CartItem[] = []) => {
  return getTotalPrice(state) > 300;
};
