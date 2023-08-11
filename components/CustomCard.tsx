import { FC } from "react";
import Card, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";
// ===============================================
interface CustomCardProps extends CardProps {
  hoverEffect?: boolean;
}
// ===============================================

const CustomCard = styled<FC<CustomCardProps>>(
  ({ hoverEffect, children, ...rest }) => <Card {...rest}>{children}</Card>
)<CustomCardProps>(({ theme, hoverEffect }) => ({
  overflow: "unset",
  borderRadius: "8px",
  transition: "all 250ms ease-in-out",
  "&:hover": { ...(hoverEffect && { boxShadow: theme.shadows[3] }) },
}));

CustomCard.defaultProps = { hoverEffect: false };

export default CustomCard;
