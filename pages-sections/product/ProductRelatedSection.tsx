"use client";
import { FC, useEffect, useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { Navigation, Autoplay, Scrollbar, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { TProduct } from "@/types/TProduct";
import useProductService from "@/hooks/useProductService";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { IProductResponse } from "@/interface/IProductResponse";
import ShopCard from "@/components/product-card/ShopCard";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
type RelatedProductsProps = { related: string; id: number };

const ProductRelatedSection: FC<RelatedProductsProps> = ({ related, id }) => {
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { onSearchShop } = useProductService();
  const collectRelatedProducts = async () => {
    const SearchQuery: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: 0,
      PageSize: 0,
    };
    if (related) {
      SearchQuery.FilterByOptions.push({
        FilterFor: related,
        FilterOperator: eFilterOperator.Equal,
        MemberName: "listids",
      });
      const result = (await onSearchShop(SearchQuery)) as IProductResponse;
      if (result.success) {
        var _products: TProduct[] = [];
        related?.split(",")?.map((i, index) => {
          //@ts-ignore
          _products[index] = result?.products?.find(
            (x) => x.id == (i as unknown as number)
          );
        });
        setRelatedProducts(_products);
      }
    }
  };

  useEffect(() => {
    collectRelatedProducts();
  }, []);
  return (
    <article className="mt-10">
      {relatedProducts?.length > 0 && (
        <h2 className="px-3 lg:px-0 text-xl lg:text-2xl mb-3">
          Related Products
        </h2>
      )}

      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          350: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        speed={1200}
        spaceBetween={4}
        scrollbar={true}
        navigation={false}
        modules={[Keyboard, Scrollbar, Navigation, Autoplay]}
        className="swiper-related"
      >
        {relatedProducts
          ?.filter((x) => x.id != id)
          .map((item, index) => (
            <>
              <SwiperSlide style={{ height: "auto" }}>
                {!downSm ? (
                  <ShopCard
                    classes="pb-4"
                    discount={(item.salePrice as unknown as number) ?? 0}
                    product={item}
                    perImage={1}
                  />
                ) : (
                  <ShopMobileCard
                    classes="pb-4"
                    discount={(item.salePrice as unknown as number) ?? 0}
                    perImage={1}
                    product={item}
                  />
                )}
              </SwiperSlide>
            </>
          ))}
      </Swiper>
    </article>
  );
};

export default ProductRelatedSection;
