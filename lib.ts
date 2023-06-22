import ceil from "lodash/ceil";
import { differenceInMinutes } from "date-fns";
import { TSetting } from "./types/TSetting";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  date - which is created comment data
 * @returns string - formatted from now
 */

function getDateDifference(date: string | number | Date) {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";

  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;

  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

function renderProductCount(
  page: number,
  perPageProduct: number,
  totalProduct: number
) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }
  return `Showing ${startNumber - 1}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @param  currency - currency
 * @returns - RETURN NEW PRICE
 */

function calculateDiscount(
  price: number,
  discount: number,
  setting: TSetting | null
) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount, setting);
}
function calculateDiscountAsNumber(price: number, discount: number) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return afterDiscount;
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  currency - PRODUCT currency
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

function currency(
  price: number,
  setting: TSetting | null,
  fraction: number = 0
) {
  const formatCurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: setting?.currencyCode ?? "USD",
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  });

  return formatCurrency.format(price * (setting?.rate ?? 1));
}

export {
  renderProductCount,
  calculateDiscount,
  currency,
  getDateDifference,
  calculateDiscountAsNumber,
};
