"use client";
import { FC, ReactNode } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Container from "@mui/material/Container";
import CategorySectionHeader from "./CategorySectionHeader";

// ==============================================================
interface Props extends BoxProps {
  title?: string;
  icon?: ReactNode;
  seeMoreLink?: string;
}
// ==============================================================

const CategorySectionCreator: FC<Props> = (props) => {
  const { icon, title, children, seeMoreLink, ...others } = props;

  return (
    <Box mb={3.5} {...others}>
      <Container sx={{ pb: "0", px: 0.4 }}>
        {title && (
          <CategorySectionHeader
            title={title}
            seeMoreLink={seeMoreLink}
            icon={icon}
          />
        )}

        {children}
      </Container>
    </Box>
  );
};

export default CategorySectionCreator;
