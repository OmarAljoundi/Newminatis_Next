import { calculateDiscountAsNumber } from "@/lib";
import { CartItem } from "@/store/Model/CartItem";
import { eOrderStatus } from "@/types/TOrder";
import { TProductReview, eReviewStatus } from "@/types/TProductReview";
import { TProductVariant } from "@/types/TProductVariant";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { ReadonlyURLSearchParams } from "next/navigation";

export const findDuplicates = (arr: TProductVariant[]) => {
  let sorted_arr = arr.slice().sort();

  let results: TProductVariant[] = [];
  let words: String[] = [];

  sorted_arr.map((item) => {
    if (item?.label && !words.includes(item.label)) {
      results.push(item);
      words.push(item.label);
    }
  });

  return results;
};

export const findMatchingLabel = (label: string, arr: TProductVariant[]) => {
  let sorted_arr = arr.slice().sort();
  const _label = arr.find((x) => x.label == label);

  let results: TProductVariant[] = [];
  if (_label) {
    sorted_arr.map((item) => {
      if (_label.label === item.label) {
        results.push(item);
      }
    });
  }

  return results;
};

export const GrapQueries = (data: any) => {
  var _SearchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 0,
  };

  var Categories = "";
  var Tags = "";
  var page = 0;
  for (const x of data) {
    if (x[0].toLowerCase().includes("category")) {
      Categories += `${x[1]},`;
    }
    if (x[0].toLowerCase().includes("tag")) {
      Tags += `${x[1]},`;
    }
    if (x[0].toLowerCase().includes("others")) {
      _SearchQuery.FilterByOptions.push({
        FilterFor: x[1],
        FilterOperator: eFilterOperator.Equal,
        MemberName: "others",
      });
    }
    if (x[0].toLowerCase().includes("size")) {
      _SearchQuery.FilterByOptions.push({
        FilterFor: x[1],
        FilterOperator: eFilterOperator.Equal,
        MemberName: "size",
      });
    }
    if (x[0].toLowerCase().includes("color")) {
      _SearchQuery.FilterByOptions.push({
        FilterFor: x[1],
        FilterOperator: eFilterOperator.Equal,
        MemberName: "color",
      });
    }

    if (x[0].toLowerCase().includes("min")) {
      _SearchQuery.FilterByOptions.push({
        FilterFor: x[1],
        FilterOperator: eFilterOperator.Equal,
        MemberName: "minprice",
      });
    }
    if (x[0].toLowerCase().includes("max")) {
      _SearchQuery.FilterByOptions.push({
        FilterFor: x[1],
        FilterOperator: eFilterOperator.Equal,
        MemberName: "maxprice",
      });
    }
    if (x[0].toLowerCase().includes("sort")) {
      _SearchQuery.OrderByOptions = [];
      if (x[1] == "low" || x[1] == "high") {
        _SearchQuery.OrderByOptions.push({
          SortOrder: x[1] == "low" ? Order.ASC : Order.DESC,
          MemberName: "Price",
        });
      } else if (x[1] == "newest") {
        _SearchQuery.OrderByOptions.push({
          MemberName: "CreatedDate",
          SortOrder: Order.DESC,
        });
      }
    } else {
      _SearchQuery.OrderByOptions.push({
        MemberName: "Priority",
        SortOrder: Order.DESC,
      });
    }
    if (x[0].toLowerCase().includes("page")) {
      page = Number(x[1]);
    }
  }

  if (Categories !== "") {
    _SearchQuery.FilterByOptions.push({
      FilterFor: Categories,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "category",
    });
  }

  if (Tags !== "") {
    _SearchQuery.FilterByOptions.push({
      FilterFor: Tags,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "tags",
    });
  }

  _SearchQuery.PageIndex = page;

  return _SearchQuery;
};

export const calculateCart = (cart: CartItem[]) => {
  var total = 0;
  cart.map((i) => {
    total += i.price * i.qty;
  });
  return total;
};

export enum eColor {
  Black = 1,
  Gray = 2,
  White = 3,
  Red = 4,
  Green = 5,
  Yellow = 6,
  Orange = 7,
}

export const MapColors = (n: number) => {
  switch (n) {
    case eColor.Black as Number:
      return "Black";
    case eColor.Gray as Number:
      return "Grey";
    case eColor.Green as Number:
      return "Green";
    case eColor.Orange as Number:
      return "Orange";
    case eColor.Red as Number:
      return "Red";
    case eColor.White as Number:
      return "White";
  }
};

export const GetSKU = (name: string, color: number, size: string) => {
  return `NM-${name.replace(/ /g, "")}-0${color}-${size}`;
};
export const getDatesBetween = (
  minEddm: Date,
  maxEdd: Date,
  currentDate: Date
) => {
  var _maxEdd = new Date(maxEdd);
  var _minEdd = new Date(minEddm);
  var _currentDate = new Date(currentDate);

  if (_maxEdd.getDate() == _currentDate.getDate()) {
    return "<strong>Today!</<strong>";
  } else {
    return `between <strong>${_minEdd.toDateString()}</strong> and <strong>${_maxEdd.toDateString()}</strong>`;
  }
};

export const MapStatus = (n: number) => {
  switch (n) {
    case eOrderStatus.Processing as Number:
      return "Processing";
    case eOrderStatus.Delieverd as Number:
      return "Delieverd";
    case eOrderStatus.Canceled as Number:
      return "Canceled";
    case eOrderStatus.UnderDelievery as Number:
      return "Under Delievery";
    default:
      return "Unknown Status";
  }
};

export const GetProductRatings = (productReviews: TProductReview[]) => {
  if (
    productReviews.filter((x) => x.status == eReviewStatus.Approved).length > 0
  ) {
    var total = 0;
    productReviews
      .filter((x) => x.status == eReviewStatus.Approved)
      .map((i) => {
        total += i.stars || 0;
      });
    return total / productReviews.length;
  }
  return -1;
};

export const calcualteQty = (cart: CartItem[]) => {
  var total = 0;
  cart.map((i) => {
    total += i.qty;
  });
  return total;
};
export const isHTMLString = (str: string): boolean => {
  // Regular expression to match HTML tags
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;

  return htmlRegex.test(str);
};

export const removeDuplicates = (arr) => {
  if (arr) return arr?.filter((item, index) => arr.indexOf(item) === index);

  return null;
};

export const getSizeFromSKU = (value: string) => {
  return value.split("-")[3] == "F" ? "FREE SIZE" : value.split("-")[3];
};
export const getSizeAsOne = (value: string) => {
  return value.toUpperCase() == "FREE SIZE" ? "F" : value.toUpperCase();
};

export const getTotalPrice = (cartList: CartItem[] = []) =>
  cartList.reduce(
    (accum, item) =>
      accum + calculateDiscountAsNumber(item.price, item.salePrice) * item.qty,
    0
  );

export const createUrlWithSearch = (
  key: string | string[],
  value: string | string[] | null,
  searchParams: ReadonlyURLSearchParams | null,
  pathname: string | null
) => {
  const current = new URLSearchParams(Array.from(searchParams!.entries()));
  if (Array.isArray(key) && Array.isArray(value)) {
    key.forEach((element, index) => {
      current.set(element as string, value[index]);
    });
    const search = current.toString();
    const query = search ? `?${search}` : "";
    return `${pathname}${query}`;
  } else if (Array.isArray(key) && !value) {
    key.forEach((element) => {
      current.delete(element as string);
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    return `${pathname}${query}`;
  }
  if (!value) {
    current.delete(key as string);
  } else {
    current.set(key as string, value as string);
  }
  const search = current.toString();
  const query = search ? `?${search}` : "";
  return `${pathname}${query}`;
};
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
