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
  getTotalPriceAfterTax,
  priceAfterTax,
} from "@/helpers/Extensions";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { calculateDiscountAsNumber, currency } from "@/lib";
import CheckVoucherIcon from "@/components/CheckVoucherIcon";
import { useSession } from "next-auth/react";
import AddressInfo from "./AddressInfo";
import {
  getShippingMessage,
  isEligableForFreeShipping,
} from "@/helpers/Summery";
import Link from "next/link";
import { BlurImage } from "@/components/BlurImage";
import { Tiny } from "@/components/Typography";

export type CheckoutSummaryProps = {
  Voucher?: string;
  Total: number;
  Type: string;
  ShippingCost?: number | null;
  TaxCost?: number | null;
  DutyCost?: number | null;
  TaxRate?: number | null;
  TotalDiscount?: number | null;
};

export type Props = {
  Voucher?: string;
  Type: string;
  Total: number;
  TotalDiscount?: number | null;
  ShippingCost?: number | null;
  TaxCost?: number | null;
  DutyCost?: number | null;
  TaxRate?: number | null;
  setCheckoutSummary: React.Dispatch<
    React.SetStateAction<CheckoutSummaryProps>
  >;
  guestAddress?: TUserGuest;
};

const CheckoutSummary: FC<Props> = ({
  Voucher,
  TotalDiscount = 0,
  ShippingCost,
  setCheckoutSummary,
  guestAddress,
  DutyCost,
  TaxCost,
  TaxRate,
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
      total: 0,
      subTotal: getTotalPrice(state),
      userId: (authedSession?.user?.id ?? guestAddress?.id) || 0,
      voucher: _Voucher,
      voucherType: "",
      countryCode:
        (authedSession?.user?.userAddress[authedSession?.user?.selectedAddress]
          .country ??
          guestAddress?.country) ||
        null,
      shippingCost: 0,
      weight: calcualteQty(state || []) * 0.5,
    };
    const result = (await CreateCheckoutSession(
      session
    )) as IShoppingSessionResponse;
    if (result.success) {
      Cookies.set("Session", result.shoppingSession.id.toString());
      setCheckoutSummary({
        TotalDiscount: result.shoppingSession.totalDiscount,
        Total: result.shoppingSession.total,
        Voucher: result.shoppingSession.voucher || "",
        Type: result.shoppingSession.voucherType || "",
        ShippingCost: result.shoppingSession.shippingCost,
        DutyCost: result.shoppingSession.dutyAmount,
        TaxCost: result.shoppingSession.taxAmount,
        TaxRate: result.shoppingSession.taxRate,
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

  const getShippingLabel = () => {
    if (isEligableForFreeShipping(state)) {
      return "Free Shipping!";
    }
    if (pathname!.includes("payment")) return currency(ShippingCost!, _setting);

    return "Calculate at payment";
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
                Price:{" "}
                {priceAfterTax(
                  item.price,
                  _setting,
                  TaxRate || 0,
                  item.salePrice,
                  item.qty
                )}
                {!!item.salePrice && (
                  <Tiny
                    sx={{ ml: 0.4, mb: 0.5, fontSize: "9px" }}
                    color="#D3C4AB"
                  >
                    <del>
                      {currency(
                        item.price * ((TaxRate || 0) / 100 + 1),
                        _setting
                      )}
                    </del>
                  </Tiny>
                )}
              </span>
              <span className="text-[8px] font-bold text-gray-500">
                * VAT Inclusive
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
        {getShippingMessage(state, _setting)}
      </div>

      <div className="py-3 grid grid-cols-2">
        <div className="grid gap-y-1">
          <span className="text-xs font-medium">SubTotal</span>
          {!!TotalDiscount && (
            <span className="text-xs font-medium text-red-500">Discount</span>
          )}
          {!!TotalDiscount && (
            <span className="text-xs font-medium text-red-500">
              Voucher Applied
            </span>
          )}
          <span className="text-xs font-medium">Shipping & handling</span>
          {!!DutyCost && <span className="text-xs font-medium">Duties</span>}
        </div>
        <div className="grid justify-items-end gap-y-1">
          <span className="text-xs font-medium">
            {currency(getTotalPriceAfterTax(state, TaxRate || 0), _setting)}
          </span>
          {!!TotalDiscount && (
            <span className="text-xs font-medium text-red-500">
              -{currency(TotalDiscount, _setting)}
            </span>
          )}
          {!!TotalDiscount && (
            <span className="text-xs font-medium text-red-500"> {Voucher}</span>
          )}
          <span className="text-xs font-medium">{getShippingLabel()}</span>
          {!!DutyCost && (
            <span className="text-xs font-medium">
              {currency(DutyCost!, _setting)}
            </span>
          )}
        </div>
      </div>

      <div className="py-3 grid grid-cols-2 border-t-2 border-gray-400">
        <div className="grid gap-y-1">
          <span className="text-lg font-bold">
            Total{" "}
            <span className="text-sm font-bold text-gray-400">
              (VAT Inclusive)
            </span>
          </span>
        </div>
        <div className="grid justify-items-end gap-y-1">
          <span className="text-lg font-bold">{currency(Total, _setting)}</span>
        </div>
      </div>

      <AddressInfo guestAddress={guestAddress} />

      <div className="grid grid-cols-2  pt-3 gap-x-2">
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
    </Card>
  );
};

export default CheckoutSummary;
