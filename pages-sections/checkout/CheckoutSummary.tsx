"use client";
import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Cookies from "js-cookie";
import { Close, Delete } from "@mui/icons-material";
import { TUserGuest } from "@/types/TUserGuest";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useOrderService from "@/hooks/useOrderService";
import { usePathname } from "next/navigation";
import { CartItem } from "@/store/Model/CartItem";
import { RemoveItem } from "@/store/CartItem/Cart-action";
import { toast } from "react-hot-toast";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { getTotalPrice } from "@/helpers/Extensions";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { FlexBetween } from "@/components/flex-box";
import Link from "next/link";
import { H6, ShortSpan, Span, Tiny } from "@/components/Typography";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import CheckVoucherIcon from "@/components/CheckVoucherIcon";

export type CheckoutSummaryProps = {
  Discount?: number;
  Voucher?: string;
  Total: number;
  Type: string;
};

export type Props = {
  Discount?: number;
  Voucher?: string;
  Type: string;
  Total: number;
  setCheckoutSummary: React.Dispatch<
    React.SetStateAction<CheckoutSummaryProps>
  >;
  guestAddress?: TUserGuest;
};

const CheckoutSummary: FC<Props> = ({
  Voucher,
  Discount = 0,
  setCheckoutSummary,
  guestAddress,
  Type,
  Total,
}) => {
  const state = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const auth = useAppSelector((state) => state.Store.AuthReducer.Auth);
  const [onError, setOnError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const { CreateCheckoutSession, orderLoad } = useOrderService();
  const [_Voucher, setVoucher] = useState<string>(Voucher ?? "");
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);

  const handleCartAmountChange = (item: CartItem) => {
    dispatch(RemoveItem(item));
    toast.success(`Item ${item.name} removed from cart`);
  };

  const handleVoucherApplied = async () => {
    const Session = Cookies.get("Session");
    const session: TShoppingSession = {
      id: Session ? (Session as unknown as number) : 0,
      checkedout: false,
      createdDate: null,
      discount: 0.0,
      expired: new Date(),
      total: getTotalPrice(state),
      userId: (auth?.id ?? guestAddress?.id) || 0,
      voucher: _Voucher,
      voucherType: "",
    };
    const result = (await CreateCheckoutSession(
      session
    )) as IShoppingSessionResponse;
    if (result.success) {
      Cookies.set("Session", result.shoppingSession.id.toString());
      setCheckoutSummary({
        Discount: result.shoppingSession.discount,
        Total: result.shoppingSession.total,
        Voucher: result.shoppingSession.voucher || "",
        Type: result.shoppingSession.voucherType || "",
      });
      setOnSuccess(true);
      setOnError(false);
      setShow(true);
    } else {
      setErrorMessage(result.message);
      setOnError(true);
      setShow(true);
      toast.error(result.message);
    }
  };

  useEffect(() => {
    if (Voucher) {
      setOnError(false);

      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!_Voucher) {
      setOnError(false);
    }
  }, [_Voucher]);

  const handleVoucherChange = (e) => {
    setOnSuccess(false);
    setVoucher(e);

    if (e == Voucher) {
      setOnError(false);
      setShow(true);
    }
  };

  return (
    <Card elevation={1} role={"drawer"}>
      <div className="border-b-2 pb-3 border-gray-400 grid gap-y-3">
        {state?.map((item) => (
          <div key={item.id} className="grid grid-cols-4 gap-4 items-center">
            <div className="grid">
              <Link
                href={`/product/${item.name.toLowerCase()}-${item.color.toString()}`}
              >
                <Avatar
                  src={item.imgUrl}
                  sx={{ width: "75px", height: "75px" }}
                />
              </Link>
            </div>
            <div className="grid ">
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-xs font-medium"> Size: {item.size}</span>
              <span className="text-xs font-medium"> Quantity: {item.qty}</span>
            </div>
            <div className="grid justify-items-center">
              <span className="text-sm font-bold">
                {currency(
                  calculateDiscountAsNumber(item.price, item.salePrice) *
                    item.qty,
                  _setting
                )}
                {!!item.salePrice && (
                  <Tiny
                    sx={{ ml: 0.4, mb: 0.5, fontSize: "9px" }}
                    color="#D3C4AB"
                  >
                    <del>{currency(item.price, _setting)}</del>
                  </Tiny>
                )}
              </span>
            </div>
            <div>
              <Tooltip title="Remove Item">
                <IconButton
                  size="small"
                  sx={{ marginLeft: 2.5 }}
                  onClick={() => handleCartAmountChange(item)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      <div className="py-3 grid grid-cols-2">
        <div className="grid gap-y-1">
          <span className="text-sm font-medium">SubTotal:</span>
          <span className="text-sm font-medium">Shipping:</span>
          {Discount > 0 && (
            <span className="text-sm font-medium">Discount:</span>
          )}
          {Discount > 0 && (
            <span className="text-sm font-medium">Voucher Applied:</span>
          )}
          {<span className="text-sm font-medium">Total:</span>}
        </div>
        <div className="grid justify-items-end gap-y-1">
          <span className="text-sm font-medium">
            {currency(getTotalPrice(state), _setting)}
          </span>
          <span className="text-sm font-medium">FREE</span>
          {Discount > 0 && (
            <span className="text-sm font-medium">
              -{Type == "Fixed" ? "$" : "%"}
              {Discount}
            </span>
          )}
          {Discount > 0 && (
            <span className="text-sm font-medium"> {Voucher}</span>
          )}
          <span className="text-sm font-medium">
            {Discount > 0
              ? currency(Total, _setting)
              : currency(getTotalPrice(state), _setting)}
          </span>
        </div>
      </div>

      {pathname!.includes("payment") && (
        <div className="grid grid-cols-2 border-t-2 border-gray-400 py-3  gap-y-2">
          <div className="grid gap-y-1">
            <span className="text-sm font-medium">Name:</span>
            <span className="text-sm font-medium">Address Line:</span>
            <span className="text-sm font-medium"> Delievry Instructions:</span>
            <span className="text-sm font-medium">Country/City:</span>
            <span className="text-sm font-medium">Postal Code:</span>
            <span className="text-sm font-medium">Contact Number:</span>
          </div>
          <div className="grid justify-items-end gap-y-1">
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.firstName ??
                  guestAddress?.firstName
              }
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.lastName ??
                  guestAddress?.lastName
              }
            </span>
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.addressLine ??
                  guestAddress?.addressLine
              }
            </span>
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.deliveryInstructions ??
                  guestAddress?.deliveryInstructions
              }
            </span>
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.country ??
                  guestAddress?.country
              }
              {", "}
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.state ??
                  guestAddress?.state
              }
            </span>
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.postalCode ??
                  guestAddress?.postalCode
              }
            </span>
            <span className="text-sm font-medium">
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.phoneNumber ??
                  guestAddress?.phoneNumber
              }
            </span>
          </div>
          <Link href="/checkout" className="col-span-2">
            <Button color="secondary" fullWidth variant="text">
              Change my shipping location
            </Button>
          </Link>
        </div>
      )}

      {pathname!.includes("payment") && (
        <>
          <div className="grid grid-cols-3 border-t-2 border-gray-400 pt-3 gap-x-4">
            <div className="col-span-2">
              <TextField
                placeholder="Voucher"
                variant="outlined"
                size="small"
                value={_Voucher}
                defaultValue={Voucher}
                fullWidth
                onChange={(e) => handleVoucherChange(e.target.value)}
                error={ErrorMessage != ""}
                onBlur={() => {
                  setErrorMessage("");
                  setOnError(false);
                }}
                InputProps={{
                  endAdornment: (
                    <CheckVoucherIcon
                      show={show}
                      onError={onError}
                      onSuccess={onSuccess}
                    />
                  ),
                }}
              />
            </div>

            <LoadingButton
              loading={orderLoad}
              onClick={handleVoucherApplied}
              type="submit"
              disabled={_Voucher == ""}
              fullWidth
              color="primary"
              variant="contained"
            >
              <span className="text-xs font-medium"> Voucher</span>
            </LoadingButton>
          </div>
        </>
      )}
    </Card>
  );
};

export default CheckoutSummary;
