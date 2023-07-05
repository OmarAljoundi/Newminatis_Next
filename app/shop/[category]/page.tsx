import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import React from "react";

type Params = {
  params: {
    category: string;
  };
};
export default async function ShopCategoryPage({
  params: { category },
}: Params) {
  return <Breadcrumb link={[""]} title={[category]} />;
}
