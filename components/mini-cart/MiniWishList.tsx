import { FC, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AddItemWish, RemoveItemWish } from "@/store/Wishlist/Wishlist-action";
import { updateWishlist } from "@/store/Wishlist/ThunkAPI";
import { FlexBetween, FlexBox } from "../flex-box";
import { TProduct } from "@/types/TProduct";
import Link from "next/link";
import { H5, Paragraph, Span } from "../Typography";
import { calculateDiscount, currency } from "@/lib";

// =========================================================
type MiniWishListProps = { toggleWishList: () => void };
// =========================================================

const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  bottom: "2px",
  right: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontSize: "17px",
  height: "24px",
}));
const MiniWishList: FC<MiniWishListProps> = ({ toggleWishList }) => {
  const { palette } = useTheme();
  const wishlistList = useAppSelector(
    (state) => state.Store.WishlistReducer?.wishlistItems
  );
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const dispatch = useAppDispatch();
  // const { enqueueSnackbar } = useSnackbar()
  const handleCartAmountChange = (
    product: TProduct,
    type: "Remove" | "Add"
  ) => {
    if (type == "Add") {
      dispatch(AddItemWish(product));
    } else {
      dispatch(RemoveItemWish(product));
    }
  };

  useEffect(() => {
    dispatch(updateWishlist(wishlistList || []));
  }, []);

  return (
    <Box p={1}>
      <Box overflow="auto">
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          {/* <img width={24} alt="WISHLIST" src={WISHLIST} /> */}
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {wishlistList?.length} items
          </Box>
        </FlexBox>

        <Divider />

        {wishlistList?.length == 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            {/* <img width={96} alt="WISHLIST" src={WISHLIST} /> */}
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your wishList is empty.
            </Box>
          </FlexBox>
        )}

        {wishlistList?.map((item: TProduct) => (
          <FlexBox
            py={2}
            px={2.5}
            key={item.id}
            columnGap={1}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleCartAmountChange(item, "Remove")}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </Button>
            </FlexBox>

            <Link
              href={`/product/${item.name.toLowerCase()}-${item.color?.toString()}`}
              onClick={toggleWishList}
            >
              <Avatar
                alt={item.friendlyName}
                src={item.mainImage || ""}
                sx={{
                  mx: 2,
                  width: 76,
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Link>

            <Box
              flex="1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              position="relative"
            >
              <Link
                href={`/product/${item.name.toLowerCase()}-${item.color?.toString()}`}
                onClick={toggleWishList}
              >
                <FlexBetween>
                  <H5
                    color={"black"}
                    ellipsis
                    fontSize="14px"
                    className="title"
                  >
                    {item.name}
                  </H5>

                  {!!item.salePrice && (
                    <StyledChip
                      color="secondary"
                      size="small"
                      label={`${item.salePrice}% off`}
                    />
                  )}
                </FlexBetween>
                <Paragraph
                  ellipsis
                  fontSize="14px"
                  className="title"
                  fontWeight={"bold"}
                >
                  {item.shortDescription}
                </Paragraph>
              </Link>

              {!!item.salePrice && (
                <Box color="grey.600">
                  Original Price <del>{currency(item.price, _setting)}</del>
                </Box>
              )}

              <Span color="grey.600">
                {calculateDiscount(item.price, item.salePrice || 0, _setting)}
              </Span>
            </Box>
            <Link
              href={`/product/${item.name.toLowerCase()}-${item.color?.toString()}`}
              onClick={toggleWishList}
            >
              <Box display={"grid"}>
                <Button color="secondary">View Item</Button>
              </Box>
            </Link>
          </FlexBox>
        ))}
      </Box>
    </Box>
  );
};

export default MiniWishList;
