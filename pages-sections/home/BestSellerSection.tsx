import CategorySectionCreator from "@/components/CategorySectionCreator";
import Image from "next/image";
import BestSellerSectionClient from "./BestSelletSectionClient";
import { PrepareSQObject } from "@/helpers/Extensions";
import { searchProducts } from "@/lib/serverActions";

export default async function BestSellerSection() {
  const _SQ = PrepareSQObject(undefined, 8);
  const _productResponse = await searchProducts(_SQ, 86400);
  return (
    <CategorySectionCreator
      alignItems={"baseline"}
      icon={
        <Image
          width={40}
          height={30}
          src="/assets/images/logos/newminatis-LOGO-black.png"
          alt="Newminatis Logo"
        />
      }
      title="BEST SELLERS"
      seeMoreLink="/shop"
    >
      <BestSellerSectionClient productResponse={_productResponse} />
    </CategorySectionCreator>
  );
}
