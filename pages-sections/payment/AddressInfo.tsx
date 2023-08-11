import { TUserGuest } from "@/types/TUserGuest";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
const AddressInfo: FC<{ guestAddress: TUserGuest | undefined }> = ({
  guestAddress,
}) => {
  const { data: authedSession } = useSession();

  if (authedSession?.user.userAddress.length == 0 && guestAddress == undefined)
    return null;

  return (
    <div className="grid grid-cols-2 border-t-2 border-gray-400 py-3  gap-y-2">
      <div className="grid gap-y-2">
        <span className="text-xs font-medium uppercase">Name:</span>
        <span className="text-xs font-medium uppercase">Address Line:</span>
        <span className="text-xs font-medium uppercase">
          {" "}
          Delivery Instructions:
        </span>
        <span className="text-xs font-medium uppercase">Country/City:</span>
        <span className="text-xs font-medium uppercase">Postal Code:</span>
        <span className="text-xs font-medium uppercase">Contact Number:</span>
      </div>
      <div className="grid justify-items-end gap-y-2">
        <span className="text-xs font-medium text-right truncate w-3/4">
          {authedSession?.user.userAddress[authedSession?.user.selectedAddress]
            ?.firstName ?? guestAddress?.firstName}
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.lastName ?? guestAddress?.lastName}
        </span>
        <span className="text-xs font-medium text-right truncate w-3/4">
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.addressLine ?? guestAddress?.addressLine}
        </span>
        <span className="text-xs font-medium text-right truncate w-3/4">
          {(authedSession?.user?.userAddress[
            authedSession?.user.selectedAddress
          ]?.deliveryInstructions ??
            guestAddress?.deliveryInstructions) ||
            "N/A"}
        </span>
        <span className="text-xs font-medium text-right truncate w-3/4">
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.country ?? guestAddress?.country}
          {", "}
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.state ?? guestAddress?.state}
        </span>
        <span className="text-xs font-medium text-right truncate w-3/4">
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.postalCode ?? guestAddress?.postalCode}
        </span>
        <span className="text-xs font-medium text-right truncate w-3/4">
          {authedSession?.user?.userAddress[authedSession?.user.selectedAddress]
            ?.phoneNumber ?? guestAddress?.phoneNumber}
        </span>
      </div>
      <Link href="/checkout" className="col-span-2 ">
        <Button color="secondary" fullWidth variant="text">
          Change my shipping location
        </Button>
      </Link>
    </div>
  );
};

export default AddressInfo;
