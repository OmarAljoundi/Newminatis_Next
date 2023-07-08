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
import {
  calcualteQty,
  calculateCart,
  getTotalPrice,
} from "@/helpers/Extensions";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { FlexBetween } from "@/components/flex-box";
import Link from "next/link";
import { H6, ShortSpan, Span, Tiny } from "@/components/Typography";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import CheckVoucherIcon from "@/components/CheckVoucherIcon";
import { useSession } from "next-auth/react";
import AddressInfo from "./AddressInfo";
import { BlurImage } from "@/components/BlurImage";
import { CheckCircleIcon, TruckIcon } from "@heroicons/react/20/solid";

export type CheckoutSummaryProps = {
  Discount?: number;
  Voucher?: string;
  Total: number;
  Type: string;
  ShippingCost?: number | null;
};

export type Props = {
  Discount?: number;
  Voucher?: string;
  Type: string;
  Total: number;
  ShippingCost?: number | null;
  setCheckoutSummary: React.Dispatch<
    React.SetStateAction<CheckoutSummaryProps>
  >;
  guestAddress?: TUserGuest;
};

const CheckoutSummary: FC<Props> = ({
  Voucher,
  Discount = 0,
  ShippingCost,
  setCheckoutSummary,
  guestAddress,
  Type,
  Total,
}) => {
  const state = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const { data: authedSession } = useSession();
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
      userId: (authedSession?.user?.id ?? guestAddress?.id) || 0,
      voucher: _Voucher,
      voucherType: "",
      countryCode:
        (authedSession?.user?.userAddress[authedSession?.user?.selectedAddress]
          .country ??
          guestAddress?.country) ||
        null,
      shippingCost: 0,
      weight: calcualteQty(state || []) * 0.5 + 0.5,
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
        ShippingCost: result.shoppingSession.shippingCost,
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

  const getShippingMessage = () => {
    if (ShippingCost != null) {
      if (ShippingCost > 0) {
        return (
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <div className="mb-1 text-[10px] font-bold uppercase">
                Add {currency(200 - calculateCart(state || []), _setting)} to be
                Eligible for free shipping
              </div>
              <div className="mb-1 text-xs font-bold">
                <TruckIcon width={20} />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-gray-700">
              <div className="bg-gray-600 h-2.5 rounded-sm dark:bg-gray-300 w-2/4"></div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <div className="mb-1 text-[10px] font-bold uppercase">
                Awesome, You Are EligabEligiblele For Free Shipping!
              </div>
              <div className="mb-1 text-xs font-medium">
                <CheckCircleIcon width={20} color="green" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-gray-700">
              <div className="bg-gray-600 h-2.5 rounded-sm dark:bg-gray-300 w-full"></div>
            </div>
          </div>
        );
      }
    }
    return <span></span>;
  };
  return (
    <Card elevation={1} role={"drawer"}>
      <div className="border-b-2 pb-3 border-gray-400 grid gap-y-3">
        {state?.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 gap-4 items-center rounded-lg"
          >
            <div className="grid">
              <Link
                href={`/product/${item.name.toLowerCase()}-${item.color.toString()}`}
              >
                <BlurImage
                  image={item.imgUrl || ""}
                  width={75}
                  height={80}
                  customAspect=" rounded-lg"
                  q={100}
                  loading="eager"
                  priority="high"
                />
              </Link>
            </div>
            <div className="grid col-span-2 gap-y-1">
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-xs font-medium"> Size: {item.size}</span>
              <span className="text-xs font-medium"> Quantity: {item.qty}</span>
              <span className="text-xs font-medium">
                Price:
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
        {getShippingMessage()}
      </div>

      <div className="py-3 grid grid-cols-2">
        <div className="grid gap-y-1">
          <span className="text-xs font-medium">SubTotal:</span>
          <span className="text-xs font-medium">Shipping and handling:</span>

          {Discount > 0 && (
            <span className="text-xs font-medium text-red-500">Discount:</span>
          )}
          {Discount > 0 && (
            <span className="text-xs font-medium text-red-500">
              Voucher Applied:
            </span>
          )}
          {<span className="text-xs font-medium">Total:</span>}
        </div>
        <div className="grid justify-items-end gap-y-1">
          <span className="text-xs font-medium">
            {currency(getTotalPrice(state), _setting)}
          </span>
          <span className="text-xs font-medium">
            {pathname!.includes("payment")
              ? ShippingCost
                ? currency(ShippingCost, _setting)
                : "FREE"
              : "Calculated In Payment Step"}
          </span>
          {Discount > 0 && (
            <span className="text-xs font-medium text-red-500">
              -{Type == "Fixed" ? "$" : "%"}
              {Discount}
            </span>
          )}
          {Discount > 0 && (
            <span className="text-xs font-medium text-red-500"> {Voucher}</span>
          )}
          <span className="text-xs font-medium">
            {currency(Total, _setting)}
          </span>
        </div>
      </div>

      {pathname!.includes("payment") && (
        <AddressInfo guestAddress={guestAddress} />
      )}

      {pathname!.includes("payment") && (
        <>
          <div className="grid grid-cols-2 border-t-2 border-gray-400 pt-3 gap-x-2">
            <div className="min-w-[65%]">
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
              <span className="text-xs font-medium">Apply Voucher</span>
            </LoadingButton>
          </div>
        </>
      )}
    </Card>
  );
};

export default CheckoutSummary;
