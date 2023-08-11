"use client";
import useUserService from "@/hooks/useUserService";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { getCsrfToken, useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function AddressCards() {
  const csrfToken = getCsrfToken();
  const { data: authedSession, update } = useSession();
  const { onDeleteAddress } = useUserService();
  const searchParams = useSearchParams();

  const deleteAddress = async (id: number) => {
    const result = (await onDeleteAddress(id)) as IBaseResponse;
    if (result.success) {
      let userAddress = [...(authedSession?.user.userAddress || [])];
      userAddress.map((i) => {
        if (i.id == id) {
          i.active = false;
        }
      });
      update({
        userAddress: userAddress,
        selectedAddress: authedSession?.user.selectedAddress || 0,
      });

      toast.success("Address Deleted Successfully", {
        duration: 5000,
      });
    }
  };

  console.log("authedSession", authedSession);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 h-fit">
      <div
        className={`${
          searchParams?.get("address") ? "opacity-75" : "opacity-100"
        } cursor-pointer border border-dashed border-gray-300 relative pt-1 pb-3 px-3 shadow-lg opacity-100 bg-white`}
      >
        <div className="grid justify-items-center items-center h-full gap-y-4">
          <MapPinIcon width={40} />
          <Button
            color="primary"
            className="h-8 text-xs"
            LinkComponent={Link}
            href="/my-profile"
          >
            Add new address
          </Button>
        </div>
      </div>
      {authedSession!.user.userAddress?.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer border border-gray-300 relative pt-1 pb-3 px-3 shadow-lg ${
            searchParams?.get("address") == item.id.toString()
              ? "opacity-100"
              : "opacity-75"
          }  bg-white`}
        >
          <div className="flex gap-x-2 items-baseline">
            <div className="grid w-3/4">
              <span className="font-medium truncate">
                {item.firstName} {item.lastName}
              </span>

              <span className="font-medium truncate">
                {item.country}
                {item.city && (
                  <span>
                    {", "}
                    {item.city}
                  </span>
                )}
              </span>
              <span className="font-medium">{item.phoneNumber}</span>
              <span className="font-medium truncate">{item.addressLine}</span>
            </div>
            <div className="flex justify-end w-1/4">
              <IconButton
                size="small"
                color="error"
                onClick={() => deleteAddress(item.id)}
              >
                <DeleteOutline
                  sx={{
                    fontSize: 20,
                  }}
                />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                LinkComponent={Link}
                href={`/my-profile?address=${item.id}`}
              >
                <EditOutlined
                  sx={{
                    fontSize: 20,
                  }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
