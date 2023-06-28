import Image from "next/image";
import React from "react";

export default function ProductSpecialIcons() {
  return (
    <div className="grid grid-cols-3 justify-items-center items-center mt-5">
      {Icons.map((item, index) => (
        <div
          className="grid justify-items-center items-center gap-2"
          key={index}
        >
          <Image
            style={{ height: "46px" }}
            width={60}
            height={46}
            alt={item.title}
            priority={true}
            src={item.image}
          />
          <h1 className="font-semibold text-xs text-center">{item.title}</h1>
        </div>
      ))}
    </div>
  );
}

const Icons = [
  {
    title: "FREE RETURN",
    image: "/assets/images/high-quality-02.svg",
  },
  {
    title: "SECURE PAYMENT",
    image: "/assets/images/secure-payement-03.svg",
  },
  {
    title: "FREE DELIVERY",
    image: "/assets/images/free-delivery-01.svg",
  },
];
