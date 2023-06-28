const categories = [
  {
    id: "men",
    name: "Men",
    featured: [
      {
        name: "Dune",
        href: "/product/dune-2",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-57-/41498650x_.webp",
        imageAlt: "Dune Clothing",
      },
      {
        name: "LATOPOLIS",
        href: "/product/latopolis-1",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-45-/14428656x_.webp",
        imageAlt: "LATOPOLIS",
      },
    ],
    sections: [
      {
        id: "Men clothing",
        items: [
          {
            title: "Jackets and Hoodies",
            url: "shop/men/jackets-and-hoodies",
            border: "1px solid #0000004d",
          },
          {
            title: "Short Sleeve T- Shirts",
            url: "shop/men/short-sleeve-TShirts",
            border: "1px solid #0000004d",
          },
          {
            title: "Long Sleeve T- Shirts",
            url: "shop/men/long-sleeve-TShirts",
            border: "1px solid #0000004d",
          },
          {
            title: "Sleeveless Tops",
            url: "shop/men/sleeveless-tops",
            border: "1px solid #0000004d",
          },
          {
            title: "Kimonos / Cardigans",
            url: "shop/men/kimonos-cardigans",
            border: "1px solid #0000004d",
          },

          {
            title: "Pants",
            url: "shop/men/pants",
            border: "1px solid #0000004d",
          },
          {
            title: "Shorts",
            url: "shop/men/shorts",
            border: "1px solid #0000004d",
          },
          {
            title: "Dune collection",
            url: "shop/men/dune",
          },
        ],
      },
    ],
  },
  {
    id: "women",
    name: "Women",
    featured: [
      {
        name: "REVANA",
        href: "/product/revana-1",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-55-/66129251.jpg",
        imageAlt: "Revana Clothing",
      },
      {
        name: "AVALON",
        href: "/product/avalon-1",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-71-/0O4A7203x_.webp",
        imageAlt: "AVALON Clothing",
      },
    ],
    sections: [
      {
        id: "Women clothing",
        items: [
          {
            title: "Tops",
            url: "shop/women/tops",
            border: "1px solid #0000004d",
          },
          {
            title: "Jackets and hoodies ",
            url: "shop/women/jackets-and-hoodies",
            border: "1px solid #0000004d",
          },
          {
            title: "Kimonos / Cardigans",
            url: "shop/women/kimonos-cardigans",
            border: "1px solid #0000004d",
          },
          {
            title: "Skirts ",
            url: "shop/women/skirts",
            border: "1px solid #0000004d",
          },
          {
            title: "Pants",
            url: "shop/women/pants",
            border: "1px solid #0000004d",
          },
          {
            title: "Shorts ",
            url: "shop/women/shorts",
            border: "1px solid #0000004d",
          },
          {
            title: "Dune collection",
            url: "shop/women/dune",
          },
        ],
      },
    ],
  },
  {
    id: "unisex",
    name: "Unisex",
    featured: [
      {
        name: "UNTOLD",
        href: "/product/untold-2",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-58-/66827243x_.webp",
        imageAlt: "UNTOLD Clothing",
      },
      {
        name: "DAYDREAMER",
        href: "/product/daydreamer-2",
        imageSrc:
          "https://newminatis.s3.eu-central-1.amazonaws.com/product-42-/3D2A8196x_.webp",
        imageAlt: "DAYDREAMER Clothing",
      },
    ],
    sections: [
      {
        id: "Unisex clothing",
        items: [
          {
            title: "Tops ",
            url: "shop/unisex/tops",
            border: "1px solid #0000004d",
          },

          {
            title: "Jackets and hoodies ",
            url: "shop/unisex/jackets-and-hoodies",
            border: "1px solid #0000004d",
          },
          {
            title: "Kimonos / Cardigans",
            url: "shop/unisex/kimonos-cardigans",
            border: "1px solid #0000004d",
          },
          {
            title: "Pants",
            url: "shop/unisex/pants",
            border: "1px solid #0000004d",
          },
          {
            title: "Shorts",
            url: "shop/unisex/shorts",
            border: "1px solid #0000004d",
          },

          { title: "Dune collection", url: "shop/unisex/dune" },
        ],
      },
    ],
  },
];

export const navigation = {
  categories,
  pages: [
    { name: "About Us", href: "/our_stroy" },
    { name: "Blogs", href: "/blogs" },
  ],
};
