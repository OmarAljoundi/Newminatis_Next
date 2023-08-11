import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CustomCard from "../CustomCard";
type Options = {
  value: string;
  theme: "black" | "white";
  productSize: string;
};
export const SizeChip = styled(Chip)((options: Options) => ({
  height: "40px",
  width: options.value.split("-")[3] == "F" ? "auto" : "60px",
  padding: "4px 6px",
  "& .MuiChip-label": {
    fontSize: "15px",
    paddingLeft: "4px",
    paddingRight: "4px",
  },
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

  marginLeft: "2px",
  marginRight: "2px",
  background:
    options.value.split("-")[3] == options.productSize ? "#D3C4AB" : "white",
  border: "1px solid white",
  borderRadius: "4px",
  color: options.value.split("-")[3] == options.productSize ? "white" : "black",
}));

export const StyledCustomCard = styled(CustomCard)(() => ({
  height: "100%",
  margin: "auto",
  color: "white",
  display: "flex",
  overflow: "hidden",
  borderRadius: "0",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  border: "none",
  boxShadow: "none!important",
  ":hover": { "& .hover-box": { opacity: 1 } },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block ",
}));

export const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontSize: "16px",
  position: "absolute",
}));

export const ContentWrapper = styled(Box)(() => ({
  padding: "1rem 1rem 4rem 1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    // whiteSpace: 'nowrap',
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    lineClamp: 2,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  },
}));

export const ProductCardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  margin: "auto",
  color: "white",
  display: "flex",
  overflow: "hidden",
  borderRadius: "0",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  border: "none",
  padding: "0",
  boxShadow: "none!important",
  ["@media only screen and (max-width: 678px)"]: { padding: "0" },
  ":hover": { "& .hover-box": { opacity: 1 } },
}));
