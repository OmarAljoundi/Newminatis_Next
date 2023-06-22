import { Add, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Zoom,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ValueVsQuantity } from "../../types/TProductInventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { TProduct } from "@/types/TProduct";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { CartItem } from "@/store/Model/CartItem";
import { GetSKU } from "@/helpers/Extensions";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import ProductService from "@/service/ProductService";
import Link from "next/link";
import { H2, H4, Paragraph } from "../Typography";
import { FlexBetween, FlexBox } from "../flex-box";
import { TooltipError, TooltipStock } from "../Tooltips";
type CartModelProps = {
  toggleDrawer: () => void;
  product: TProduct;
  discount: number;
};
const AddToCardModel: FC<CartModelProps> = ({
  product,
  toggleDrawer,
  discount,
}) => {
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const [valueVsQuantity, setValueVsQuantity] = useState<ValueVsQuantity[]>([]);
  const [stock, setStock] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string>("");
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [loadStock, setLoadStock] = useState(true);
  const cartItem = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const disableChip = (value) =>
    valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;

  const { name, price, salePrice, id, color, sku, subSku, mainImage } = product;

  const [openTool, setOpenTool] = useState(false);

  const handleToolClose = () => {
    setOpenTool(false);
  };

  const handleToolOpen = () => {
    setOpenTool(true);
  };

  const [openToolInfo, setOpenToolInfo] = useState(false);

  const handleToolCloseInfo = () => {
    setOpenToolInfo(false);
  };

  const handleCartAmountChange = () => {
    var __price =
      salePrice && salePrice > 0
        ? calculateDiscountAsNumber(price, salePrice)
        : price;
    var cart: CartItem = {
      id: id,
      name: name,
      price: __price,
      salePrice: salePrice || 0,
      qty: qty,
      slug: name,
      imgUrl: mainImage || "",
      sku: GetSKU(name, color, size),
      color: color,
      size: size,
      stock:
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity || 0,
    };
    setStock(cart?.stock || null);

    if (!cartItem?.find((x) => x.sku == GetSKU(name, color, size))) {
      dispatch(AddItem(cart));
      toggleDrawer();
      //   toasterSuccess(
      //     `Item added to cart <br/> <div class="d-flex"><div>Cart Total:</div><div style="position:absolute;right:20px"> ${currency(
      //       getTotalPrice() + __price * qty,
      //       _setting
      //     )}</div></div>`,
      //     () => route("/cart")
      //   );
    } else if (qty != 0) {
      var qttyy =
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity ?? 0;
      if (qty > qttyy) {
        //enqueueSnackbar(`Only avaliable ${qttyy} pieces you can't add more`);
        return;
      }
      dispatch(UpdateItem(cart));
      toggleDrawer();
      //   toasterSuccess(
      //     `Item added to cart <br/> <div class="d-flex"><div>Cart Total:</div><div style="position:absolute;right:20px"> ${currency(
      //       getTotalPrice() + __price * qty,
      //       _setting
      //     )}</div></div>`,
      //     () => route("/cart")
      //   );
    } else {
      dispatch(RemoveItem(cart));
    }
  };
  const executeLongRunningtask = async (value: string) => {
    return new Promise((resolve, reject) => {
      var stock: ValueVsQuantity = {
        quantity: 0,
        variable: value,
      };
      ProductService.getQuantity({
        inventory_type: "domestic",
        sku: value,
      }).then((x) => {
        if (
          x.data.status.response == true &&
          x.data.inventory.quantity != "0"
        ) {
          stock.quantity = x.data.inventory.quantity as unknown as number;
        }
        resolve(stock);
      });
    });
  };

  const executeAllLongRunningTasks = async () => {
    var x = product.subSku ?? "";
    return await Promise.all(x.split(",")?.map(executeLongRunningtask));
  };

  useEffect(() => {
    setLoadStock(true);
    executeAllLongRunningTasks().then((res) => {
      setValueVsQuantity(res as ValueVsQuantity[]);
      setLoadStock(false);
    });
  }, []);

  useEffect(() => {
    if (size !== "") {
      handleToolClose();
      var _Stock = valueVsQuantity.find(
        (x) => x.variable == GetSKU(name, color, size)
      )?.quantity;
      setStock(_Stock || null);
    } else {
      setStock(null);
    }
  }, [size]);

  return (
    <Box px={4} py={1}>
      <Grid container item columnSpacing={3} mt={2} position="relative">
        <Grid item xs={4}>
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
          >
            <img src={product.mainImage || ""} width={"100%"} />
          </Link>
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
          >
            <Button variant="text" sx={{ paddingLeft: "0", paddingRight: "0" }}>
              {" "}
              <span className="text-10" style={{ textDecoration: "underline" }}>
                {" "}
                View Product Details
              </span>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Stack className="details">
            <H2 className="text-12">{product.friendlyName}</H2>
            <Paragraph className="text-12">
              {product.shortDescription}
            </Paragraph>
            <FlexBox alignItems="center" gap={1} className="text-12">
              <Box color={"black"} className="text-12">
                <H4 color="black" fontWeight={100} className="text-12">
                  {calculateDiscount(product.price, discount, _setting)}
                </H4>
              </Box>

              {!!discount && (
                <Box color="grey.600">
                  <del>{currency(product.price, _setting)}</del>
                </Box>
              )}
            </FlexBox>

            <FlexBetween justifyContent={"start"}>
              {product.subSku && (
                <Box
                  color="grey.600"
                  mt={1}
                  display="block"
                  position={"relative"}
                  pb={"20px"}
                >
                  {product.subSku.split(",")?.map((value) => (
                    <>
                      {valueVsQuantity.find((x) => x.variable == value) !=
                      null ? (
                        <Chip
                          className="shadow"
                          color="primary"
                          key={value}
                          label={
                            value.split("-")[3] == "F"
                              ? "FREE SIZE"
                              : value.split("-")[3]
                          }
                          onClick={() => setSize(value.split("-")[3])}
                          disabled={disableChip(value)}
                          sx={{
                            height:
                              value.split("-")[3] == "F" ? "40px" : "30px",
                            width: value.split("-")[3] == "F" ? "80px" : "40px",
                            ":hover": {
                              color: "white",
                            },

                            "&.MuiButtonBase-root.Mui-disabled::after ": {
                              borderBottom: "0.20em solid black",
                              content: '""',
                              left: 0,

                              position: "absolute",
                              right: 0,
                              top: "50%",
                              width: "40%",
                              margin: "auto",
                            },

                            borderRadius: "0",
                            marginLeft: "2px",
                            marginRight: "2px",
                            background:
                              value.split("-")[3] == size ? "#D3C4AB" : "white",

                            color: "black",
                          }}
                        />
                      ) : (
                        <Skeleton
                          variant="circular"
                          sx={{
                            background: "gray",
                            display: "inline-block",
                            height: "30px",
                            width: "40px",
                            borderRadius: "0",
                            marginLeft: "2px",
                            marginRight: "2px",
                          }}
                        />
                      )}
                    </>
                  ))}
                </Box>
              )}
            </FlexBetween>
            {valueVsQuantity.filter((x) => x.quantity > 0).length != 0 && (
              <FlexBetween>
                <TooltipError
                  arrow
                  TransitionComponent={Zoom}
                  disableHoverListener
                  disableTouchListener
                  onClose={handleToolClose}
                  placement="bottom"
                  title="Please select a size"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        color: "white",
                        backgroundColor: "#E53935",
                        "& .MuiTooltip-arrow": {
                          color: "#E53935",
                        },
                      },
                    },
                  }}
                >
                  <Button
                    className="shadow text-10"
                    color="secondary"
                    onClick={() => {
                      if (size == "") {
                        handleToolOpen();
                      } else {
                        handleCartAmountChange();
                      }
                    }}
                    sx={{
                      marginRight: "-8px",
                      border: "none",
                      width: "fit-content",
                      fontSize: "9px",
                      padding: "5px 10px",
                      borderRadius: 0,
                      textTransform: "uppercase",
                      background: "black",
                      color: "white",
                      ":disabled": {
                        textDecoration: "none",
                      },
                      "&:hover": {
                        border: "none",
                        background: "transparent",
                        color: "black",
                        opacity: "0.9",
                      },
                    }}
                  >
                    ADD TO CART
                  </Button>
                </TooltipError>

                <TooltipStock
                  arrow
                  TransitionComponent={Zoom}
                  open={stock && stock == 1 ? true : false}
                  onClose={handleToolCloseInfo}
                  placement="bottom"
                  title="Only one left in stock"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        color: "red",
                        backgroundColor: "#E53935",
                        "& .MuiTooltip-arrow": {
                          color: "red",
                        },
                      },
                    },
                  }}
                >
                  <div>
                    <FlexBox alignItems="center" justifyContent={"center"}>
                      <IconButton
                        disabled={qty == 1}
                        onClick={() => setQty(qty - 1)}
                        sx={{
                          py: 0.1,
                          px: 0.1,
                          border: "1px solid #d5d5d5",
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>

                      <Box
                        sx={{
                          margin: "0 10px",
                          textAlign: "center",
                        }}
                      >
                        <Chip
                          label={qty || 1}
                          sx={{
                            background: "white",
                            fontSize: "20px",
                          }}
                        />
                      </Box>

                      <IconButton
                        sx={{
                          py: 0.1,
                          px: 0.1,
                          border: "1px solid #d5d5d5",
                        }}
                        disabled={qty >= (stock || 0)}
                        onClick={() => setQty(qty + 1)}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </FlexBox>
                  </div>
                </TooltipStock>
              </FlexBetween>
            )}
          </Stack>
        </Grid>
        <IconButton
          size="medium"
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            right: -25,
            top: 0,
            zIndex: 3,
          }}
        >
          <Close fontSize="medium" sx={{ color: "black" }} />
        </IconButton>
      </Grid>
    </Box>
  );
};

export default AddToCardModel;
