"use client";
import * as React from "react";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import { Chip, emphasize, styled } from "@mui/material";
import { TProduct } from "@/types/TProduct";
type BreadcrumbsProp = {
  product: TProduct;
};
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = "#D3C4AB";
  return {
    backgroundColor: "transparent",
    height: theme.spacing(3),

    color: "black",
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
    "& .MuiChip-icon": {
      color: "black",
    },
    "& .MuiChip-label": {
      padding: "0 6px",
    },
  };
}) as typeof Chip;
export const Breadcrumbs: React.FC<BreadcrumbsProp> = ({ product }) => {
  const [children, setChildren] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    if (product) {
      var _children: JSX.Element[] = [];
      _children.push(
        <StyledBreadcrumb component="a" href="/" clickable label="Home" />
      );
      _children.push(
        <StyledBreadcrumb component="a" href="/shop" clickable label="Shop" />
      );

      if (product.salePrice && product.salePrice > 0) {
        _children.push(
          <StyledBreadcrumb
            component="a"
            href="/shop?others0=onsale"
            label="On Sale"
            clickable
          />
        );
      }

      _children.push(
        <StyledBreadcrumb
          component="span"
          label={product.friendlyName ?? product.name}
        />
      );
      setChildren(_children);
    }
  }, []);

  return (
    <BreadcrumbsMUI aria-label="breadcrumb" separator="›">
      {children}
    </BreadcrumbsMUI>
  );
};
