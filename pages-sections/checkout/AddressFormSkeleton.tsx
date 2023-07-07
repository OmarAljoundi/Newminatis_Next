import { Card, Skeleton } from "@mui/material";
import React from "react";

export default function AddressFormSkeleton() {
  return (
    <div>
      <Card elevation={5}>
        <div className="grid grid-cols-2 justify-between">
          <Skeleton className="w-1/3" height={50} />
          <Skeleton className="w-1/3 ml-auto" height={50} />
        </div>
        <div className="grid">
          <Skeleton className="w-full ml-auto" height={50} />
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <Skeleton className="w-full ml-auto" height={50} />
          <Skeleton className="w-full ml-auto" height={50} />
        </div>

        <div className="grid grid-cols-2 gap-x-3">
          <Skeleton className="w-full ml-auto" height={50} />
          <Skeleton className="w-full ml-auto" height={50} />
        </div>

        <div className="grid grid-cols-2 gap-x-3">
          <Skeleton className="w-full ml-auto" height={50} />
          <Skeleton className="w-full ml-auto" height={50} />
        </div>

        <div className="grid grid-cols-1">
          <Skeleton className="w-full ml-auto" height={50} />
        </div>
        <div className="grid">
          <Skeleton className="w-full ml-auto" height={50} />
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-x-4 pt-8">
        <Skeleton className="w-full ml-auto" height={60} />
        <Skeleton className="w-full ml-auto" height={60} />
      </div>
    </div>
  );
}
