import { FC, ReactNode } from "react";
import { H2, H3 } from "./Typography";
import { FlexBetween, FlexBox } from "./flex-box";
import { Button } from "@mui/material";
import Link from "next/link";

// ===================================================
type CategorySectionHeaderProps = {
  title?: string;
  icon?: ReactNode;
  seeMoreLink?: string;
};
// ===================================================

const CategorySectionHeader: FC<CategorySectionHeaderProps> = (props) => {
  const { title, seeMoreLink, icon } = props;

  return (
    <FlexBetween px={1} mb={2}>
      <FlexBox alignItems="center" gap={1}>
        {icon && <FlexBox alignItems="center">{icon}</FlexBox>}
        <H3 lineHeight="1" className="text-18 md:text-14">
          {title}
        </H3>
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <Button
            variant="text"
            color="dark"
            sx={{
              color: "black",
              background: "transparent",
              border: "none",
              textDecoration: "underline",
            }}
          >
            SHOW ALL
          </Button>
        </Link>
      )}
    </FlexBetween>
  );
};

export default CategorySectionHeader;
