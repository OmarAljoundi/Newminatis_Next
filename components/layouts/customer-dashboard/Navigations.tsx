import { FC, Fragment, useEffect } from "react";
import { Card, styled } from "@mui/material";
import { CreditCard, Person, Place, Logout } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Cookies from "js-cookie";
import { ResetUser } from "../../../store/Auth/Auth-action";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { H3, H5 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import NavLink, { NavLinkProps } from "@/components/nav-link/NavLink";

// custom styled components
const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));

type StyledNavLinkProps = { isCurrentPath: boolean };

const StyledNavLink = styled<FC<StyledNavLinkProps & NavLinkProps>>(
  ({ children, isCurrentPath, ...rest }) => (
    <NavLink {...rest}>{children}</NavLink>
  )
)<StyledNavLinkProps>(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? "#D3C4AB" : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? "#D3C4AB" : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": { color: "white" },
  },
}));

const Navigations = () => {
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const logout = () => {
    Cookies.remove("token");
    dispatch(ResetUser());
  };
  const linkList = [
    {
      title: "DASHBOARD",
      list: [
        { href: "/profile", title: "Profile Info", icon: Person },
        {
          href: "/orders",
          title: "Orders",
          icon: ShoppingBagOutlined,
        },
        {
          href: "/address",
          title: "Addresses",
          icon: Place,
        },
        // {
        //     href: '/payment-methods',
        //     title: 'Payment Methods',
        //     icon: CreditCard,
        // },
      ],
    },
  ];

  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <H3 p="26px 30px 1rem" color="grey.600">
            {item.title}
          </H3>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname!.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  sx={{ color: "white" }}
                  fontSize="small"
                  className="nav-icon"
                />
                <H5 display={"inline-block"}>{item.title}</H5>
              </FlexBox>
            </StyledNavLink>
          ))}
          <StyledNavLink onClick={logout} isCurrentPath={false} href="/">
            <FlexBox alignItems="center" gap={1}>
              <Logout color="inherit" fontSize="small" className="nav-icon" />
              <H5 display={"inline-block"}>Logout</H5>
            </FlexBox>
          </StyledNavLink>
        </Fragment>
      ))}
    </MainContainer>
  );
};

export default Navigations;
