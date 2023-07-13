import { Card, Skeleton } from "@mui/material";
import React from "react";
import AddressFormSkeleton from "../checkout/AddressFormSkeleton";

export default function AddressCardsLoading() {
  return (
    <div className="grid grid-cols-2 gap-x-3 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 h-fit">
        {Array.from(new Array(2)).map((i) => (
          <Card key={i}>
            <div className="flex gap-x-2 items-baseline">
              <div className="grid w-3/4">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
              <div className="flex justify-end w-1/4">
                <Skeleton
                  width={24}
                  height={40}
                  sx={{ borderRadius: "100%" }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div>
        <AddressFormSkeleton />
      </div>
    </div>
  );
}
