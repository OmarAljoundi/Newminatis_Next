import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { TProductCategory } from "@/types/TProductCategory";
import {
  FilterByOptions,
  Order,
  OrderByOptions,
  eFilterOperator,
} from "@/types/TSearchQuery";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useQuery } from "react-query";

export type FeaturedProductsProp = {
  category: TProductCategory;
  close: () => void;
};

export const FeaturedProducts: FC<FeaturedProductsProp> = ({
  close,
  category,
}) => {
  const { onSearchShop } = useProductService();

  const fetchProducts = async () => {
    var _FO: FilterByOptions = {
      FilterFor: category.name,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "category",
    };
    var _OP: OrderByOptions = {
      MemberName: "Priority",
      SortOrder: Order.DESC,
    };

    var result = await onSearchShop({
      FilterByOptions: [_FO],
      OrderByOptions: [_OP],
      PageIndex: 0,
      PageSize: 2,
    });
    return (result as IProductResponse).products;
  };

  const { data: featured, isLoading } = useQuery(
    category.name,
    () => fetchProducts(),
    {
      cacheTime: 60000,
      enabled: !!category.name,
    }
  );

  if (isLoading) {
    return (
      <div className="col-start-2 grid grid-cols-2 gap-x-8">
        {Array.from(new Array(2)).map((i) => (
          <div key={i} className="group relative text-base sm:text-sm">
            <Skeleton
              variant="rectangular"
              className="aspect-[1/1]"
              sx={{
                borderRadius: "0",
                width: "100%",
                height: "100%",
                minHeight: "100%",
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="col-start-2 grid grid-cols-2 gap-x-8">
      {featured?.map((item) => (
        <div key={item.name} className="group relative text-base sm:text-sm">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden  bg-gray-100 group-hover:opacity-75">
            <Image
              src={item.mainImage || ""}
              alt={item.name}
              title={item.name}
              fill={true}
              className="object-cover object-center"
            />
          </div>
          <div className="grid lg:grid-cols-2 justify-items-center mt-2">
            <Link
              href={`/product/${item.name.toLowerCase()}-0${item.color.toString()}`}
              className="block font-medium text-gray-900  text-sm"
              onClick={() => close()}
            >
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {item.name}
            </Link>
            <span
              color="primary"
              aria-hidden="true"
              className="text-sm text-gray-900 font-medium text-right"
            >
              Shop now
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
