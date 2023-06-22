export const layoutConstant = {
  topbarHeight: 40,
  headerHeight: 80,
  mobileNavHeight: 64,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
  grocerySidenavWidth: 280,
};

// MEGAMENU DATA
export const megaMenusMen = [
  [
    {
      title: "Home",
      child: [
        { title: "Market 1", url: "/market-1" },
        { title: "Furniture", url: "/furniture-shop" },
        { title: "Grocery-v1", url: "/grocery1" },
        { title: "Grocery-v2", url: "/grocery2" },
        { title: "Grocery-v3", url: "/grocery3" },
        { title: "Health and Beauty", url: "/healthbeauty-shop" },
        { title: "Fashion", url: "/fashion-shop" },
        { title: "Gift Store", url: "/gift-shop" },
        { title: "Gadget", url: "/gadget-shop" },
      ],
    },
  ],

  [
    {
      title: "User Account",
      child: [
        { title: "Order List", url: "/orders" },
        { title: "Order Details", url: "/orders/5452423" },
        { title: "View Profile", url: "/profile" },
        { title: "Edit Profile", url: "/profile/edit" },
        { title: "Address List", url: "/address" },
        { title: "Add Address", url: "/address/512474" },
        { title: "All tickets", url: "/support-tickets" },
        { title: "Ticket details", url: "/support-tickets/512474" },
        { title: "Wishlist", url: "/wish-list" },
      ],
    },
  ],

  [
    {
      title: "Vendor Account",
      child: [
        { title: "Dashboard", url: "/vendor/dashboard" },
        { title: "Profile", url: "/vendor/account-setting" },
      ],
    },
    {
      title: "Products",
      child: [
        { title: "All products", url: "/admin/products" },
        { title: "Add/Edit product", url: "/admin/products/248104" },
      ],
    },
    {
      title: "Orders",
      child: [
        { title: "All orders", url: "/admin/orders" },
        { title: "Order details", url: "/admin/orders/248104" },
      ],
    },
  ],

  [
    {
      title: "Sale Page",
      child: [
        { title: "Sales Version 1", url: "/sale-page-1" },
        { title: "Sales Version 2", url: "/sale-page-2" },
      ],
    },
    {
      title: "Shop",
      child: [
        {
          title: "Search product",
          url: "/product/search/mobile phone",
        },
        { title: "Single product", url: "/product/34324321" },
        { title: "Cart", url: "/cart" },
        { title: "Checkout", url: "/checkout" },
        { title: "Alternative Checkout", url: "/checkout-alternative" },
        { title: "Order confirmation", url: "/order-confirmation" },
      ],
    },
  ],
];

// MAIN NAVIGATION DATA
export const navbarNavigations = [
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Men",

    child: [
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
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Women",

    child: [
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
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Unisex",
    child: [
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
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "About us",
    url: "/our-story",
    border: "2px solid #878787",
    text: "text-14",
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Blogs",
    url: "/blogs",
    text: "text-14",
  },
];
export const variants = [
  {
    label: "S",
    value: "S",
  },
  {
    label: "M",
    value: "M",
  },
  {
    label: "L",
    value: "L",
  },
  {
    label: "XL",
    value: "XL",
  },
  {
    label: "FREE SIZE",
    value: "F",
  },
];

export const currencyList = [
  { title: "USD", display: "USD", imgUrl: "/assets/images/flags/usa.png" },
  { title: "EUR", display: "EUR", imgUrl: "/assets/images/flags/uk.png" },
  { title: "AED", display: "AED", imgUrl: "/assets/images/flags/bd.png" },
];

export const ex_countries = ["ax", "aq"];

export const ShippingInfoText = `Orders are usually processed and shipped within 1 working day of purchase.`;

export const RefundText = `The customer need to receive a notification emails as written here, 1 email when we receive the return, 1 email when refund is approved or rejected. We can call the email e.g return received and refund. You can use the text here for the email content. E.g we have received your returned shipment, we will inspect the item and get back to you ASAP. For the refund email, we can say your refund has been approved and we will process the payment soon. You should receive your refund within 7-10 working days. If you have any concerns, please do not hesitate to reply to this email`;

export const Our_story_1 = `NEWMINATIS is a high fashion inspired brand with a futuristic twist. Our project is beyond fashion.
We are representing a world-spread culture which works to unite the Raver’s community.`;
export const Our_story_2 = `Expressing the concept of our multifunctional project that combines fashion, art, music and people.
Our high-tech materials reflect the electromagnetic field of the human body.`;
export const Our_story_3 = `We are passionate about asymmetrical and deconstructed clothing designs.
We use innovative methods to incorporate our vision into an existing work of art for the community spiritual warriors.
Allowing human beings to transcend humanity into a natural state of the soul.`;
export const Our_story_4 = `Our community goes by the expression: be yourself, be Newminatis. We care about music, lifestyle, thoughts & values.
Our fashion is designed to be artistic, inspired and unique.`;
export const Our_story_5 = `The combination of art, music people, and futuristic dreams has generated the concept of our deconstructive and unique uniforms.`;
export const Our_story_6 = `NEWMINATIS is a high-end unique fashion brand created by a lover of dance music.
A US based company which was established in San Francisco in 2022.`;
export const contribution = `Our concern for a sustainable environment sets a high value for Newminatis in the industry.
Our community is helping counteract climate change by directing a fraction of Newminatis's revenue towards initiative which removes carbon dioxide from the atmosphere.`;
