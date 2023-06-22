import { useState } from "react";
import { Close, Settings, ShoppingBagOutlined } from "@mui/icons-material";
import {
  Box,
  styled,
  Tooltip,
  IconButton,
  ClickAwayListener,
  Badge,
  Drawer,
} from "@mui/material";

import MiniCart from "./mini-cart/MiniCart";
import { useAppSelector } from "@/hooks/useRedux";
import { calcualteQty } from "@/helpers/Extensions";

// custom styled components
const MainContainer = styled(Box)(({ theme }) => ({
  top: 50,
  right: 50,
  zIndex: 1501,

  position: "fixed",
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  right: 50,
  zIndex: 99,
  bottom: 50,
  padding: 12,
  color: "#fff",
  position: "fixed",
  borderRadius: "50%",
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.primary.main,
  ":hover": { backgroundColor: theme.palette.primary.main },
}));

const CartSticky = () => {
  const [showBody, setShowBody] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const cartItems = useAppSelector((state) =>
    calcualteQty(state.Store.CartReducer?.CartItems || [])
  );
  return (
    <>
      <ClickAwayListener onClickAway={() => setShowBody(false)}>
        <MainContainer className="hide">
          <Tooltip
            title="My Cart"
            placement="left"
            sx={{
              width: "60px",
              height: "60px",
              bottom: "6.5rem",
              right: "2rem",
            }}
          >
            <StyledIconButton onClick={toggleSidenav}>
              {!showBody && (
                <Badge
                  badgeContent={cartItems}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      top: "-3px",
                      right: "-2px",
                    },
                  }}
                >
                  <ShoppingBagOutlined fontSize="large" />
                </Badge>
              )}
              {showBody && <Close />}
            </StyledIconButton>
          </Tooltip>
        </MainContainer>
      </ClickAwayListener>
      <Drawer
        open={sidenavOpen}
        anchor="right"
        onClose={toggleSidenav}
        PaperProps={{
          role: "drawer",
        }}
      >
        <MiniCart toggleSidenav={toggleSidenav} open={sidenavOpen} />
      </Drawer>
    </>
  );
};

export default CartSticky;
