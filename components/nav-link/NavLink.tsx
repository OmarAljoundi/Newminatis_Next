import { styled } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";

import React, { AnchorHTMLAttributes, CSSProperties } from "react";

// component props interface
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  style?: CSSProperties;
  className?: string;
}
// styled component
const StyledLink = styled("a")<{ active_route?: string }>(
  ({ theme, active_route }) => ({
    position: "relative",
    transition: "color 150ms ease-in-out",

    "&:hover": { color: `${theme.palette.primary.main} !important` },
  })
);

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  style,
  className,
  ...props
}) => {
  const pathname = "/";

  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };
  // active route
  const currentRoute = checkRouteMatch();

  return (
    <Link href={href}>
      <StyledLink
        href={href}
        style={style}
        className={clsx(className)}
        active_route={currentRoute ? "active" : ""}
        {...props}
      >
        {children}
      </StyledLink>
    </Link>
  );
};

export default NavLink;
