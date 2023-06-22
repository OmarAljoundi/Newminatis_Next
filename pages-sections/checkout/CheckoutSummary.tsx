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
import { Close } from "@mui/icons-material";
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
      {state?.map((item) => (
        <FlexBetween mb={1} key={item.id} columnGap={"10px"}>
          <FlexBetween key={item.name} columnGap={"10px"}>
            <Link
              href={`/product/${item.name.toLowerCase()}-${item.color.toString()}`}
            >
              <Avatar
                src={item.imgUrl}
                sx={{ width: "75px", height: "75px" }}
              />
            </Link>
            <Box display={"grid"} width={120}>
              <Typography
                color="grey.600"
                display={"block"}
                className="text-12 "
              >
                Item: {item.name}
              </Typography>
              <Typography
                color="grey.600"
                display={"block"}
                className="text-12 "
              >
                Size: {item.size}
              </Typography>
              <Typography
                color="grey.600"
                display={"block"}
                className="text-12"
              >
                Quantity: {item.qty}
              </Typography>
            </Box>
          </FlexBetween>
          <Box display={"grid"} width={70}>
            <Span color="grey.600" className="text-12">
              {calculateDiscount(item.price, item.salePrice, _setting)}
              {!!item.salePrice && (
                <Tiny
                  sx={{ ml: 0.4, mb: 0.5, fontSize: "9px" }}
                  color="#D3C4AB"
                >
                  <del>{currency(item.price, _setting)}</del>
                </Tiny>
              )}
            </Span>

            <Box
              fontWeight={600}
              fontSize="14px"
              color="primary.main"
              className="text-12 "
              mt={0.5}
            >
              {currency(
                calculateDiscountAsNumber(item.price, item.salePrice) *
                  item.qty,
                _setting
              )}
            </Box>
          </Box>
          <Tooltip title="Remove Item">
            <IconButton
              size="small"
              sx={{ marginLeft: 2.5 }}
              onClick={() => handleCartAmountChange(item)}
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        </FlexBetween>
      ))}

      <Divider sx={{ mb: "1rem" }} />

      <FlexBetween mb={1}>
        <Typography
          color="grey.600"
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          SubTotal:
        </Typography>
        <Typography
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          {currency(getTotalPrice(state), _setting)}
        </Typography>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Typography
          color="grey.600"
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          Shipping:
        </Typography>
        <Typography
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          FREE!
        </Typography>
      </FlexBetween>

      {Discount > 0 && (
        <>
          <FlexBetween mb={1}>
            <Typography
              fontSize="18px"
              fontWeight="600"
              lineHeight="1"
              textAlign="right"
              mb={1}
              color="#D3C4AB"
            >
              Discount:
            </Typography>
            <Typography
              fontSize="18px"
              fontWeight="600"
              lineHeight="1"
              textAlign="right"
              mb={1}
              color="#D3C4AB"
            >
              -{Type == "Fixed" ? "$" : "%"}
              {Discount}
            </Typography>
          </FlexBetween>

          <FlexBetween mb={1}>
            <Typography
              color="grey.600"
              fontSize="18px"
              fontWeight="600"
              lineHeight="1"
              textAlign="right"
              mb={1}
            >
              Voucher Applied:
            </Typography>
            <Typography
              fontSize="18px"
              fontWeight="600"
              lineHeight="1"
              textAlign="right"
              mb={1}
            >
              {Voucher}
            </Typography>
          </FlexBetween>
        </>
      )}

      <FlexBetween mb={1}>
        <Typography
          color="grey.600"
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          Total:
        </Typography>
        <Typography
          fontSize="18px"
          fontWeight="600"
          lineHeight="1"
          textAlign="right"
          mb={1}
        >
          {Discount > 0
            ? currency(Total, _setting)
            : currency(getTotalPrice(state), _setting)}
        </Typography>
      </FlexBetween>
      {pathname!.includes("payment") && (
        <>
          <Divider sx={{ mb: "1rem" }} />
          <FlexBetween mb={1}>
            <Typography color="grey.600">Name:</Typography>
            <ShortSpan mb={0.5} color="black" width={"60%"}>
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
            </ShortSpan>
          </FlexBetween>
          <FlexBetween mb={1}>
            <Typography color="grey.600">Address Line:</Typography>
            <ShortSpan mb={0.5} color="black" width={"60%"}>
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.addressLine ??
                  guestAddress?.addressLine
              }
            </ShortSpan>
          </FlexBetween>

          {
            //@ts-ignore
            (auth?.userAddress[auth.selectedAddress]?.deliveryInstructions ||
              guestAddress?.deliveryInstructions) && (
              <FlexBetween mb={1}>
                <Typography color="grey.600">Delievry Instructions:</Typography>
                <H6 mb={0.5}>
                  <ShortSpan mb={0.5} color="black" width={"60%"}>
                    {
                      //@ts-ignore
                      auth?.userAddress[auth.selectedAddress]
                        ?.deliveryInstructions ??
                        guestAddress?.deliveryInstructions
                    }
                  </ShortSpan>
                </H6>
              </FlexBetween>
            )
          }

          <FlexBetween mb={1}>
            <Typography color="grey.600">Country/City:</Typography>
            <ShortSpan mb={0.5} color="black" width={"60%"}>
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
            </ShortSpan>
          </FlexBetween>

          {
            //@ts-ignore
            (auth?.userAddress[auth.selectedAddress]?.postalCode ||
              guestAddress?.postalCode) && (
              <FlexBetween mb={1}>
                <Typography color="grey.600">Postal Code:</Typography>
                <ShortSpan mb={0.5} color="black" width={"60%"}>
                  <Span color="black">
                    {
                      //@ts-ignore
                      auth?.userAddress[auth.selectedAddress]?.postalCode ??
                        guestAddress?.postalCode
                    }
                  </Span>
                </ShortSpan>
              </FlexBetween>
            )
          }

          <FlexBetween mb={1}>
            <Typography color="grey.600">Contact Number:</Typography>
            <ShortSpan mb={0.5} color="black" width={"60%"}>
              {
                //@ts-ignore
                auth?.userAddress[auth.selectedAddress]?.phoneNumber ??
                  guestAddress?.phoneNumber
              }
            </ShortSpan>
          </FlexBetween>

          <Link href="cart/checkout">
            <Button
              sx={{
                color: "black",
                background: "#D3C4AB",
                fontWeight: "bold",
                "&.MuiLoadingButton-root:hover": {
                  background: "#D3C4AB",
                },
                "& .MuiLoadingButton-loadingIndicator": {
                  color: "black",
                },
                ":disabled": {
                  color: "black",
                  opacity: "0.5",
                },
              }}
              variant="outlined"
            >
              Change my shipping location
            </Button>
          </Link>
        </>
      )}

      {pathname!.includes("payment") && (
        <>
          <Divider sx={{ mt: "1rem", mb: "1rem" }} />
          <div className="d-flex">
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

            <LoadingButton
              loading={orderLoad}
              onClick={handleVoucherApplied}
              type="submit"
              disabled={_Voucher == ""}
              fullWidth
              color="marron"
              sx={{ width: "100%", maxWidth: "110px" }}
            >
              Apply Voucher
            </LoadingButton>
          </div>
        </>
      )}
    </Card>
  );
};

export default CheckoutSummary;
