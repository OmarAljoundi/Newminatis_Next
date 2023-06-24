import { cloneElement, FC, useEffect, useState, ReactNode } from "react";
import clsx from "clsx";
import { Box, Drawer, styled } from "@mui/material";
import Scrollbar from "./Scrollbar";

// styled component
const Wrapper = styled(Box)(() => ({ "& .handle": { cursor: "pointer" } }));

// ================================================================
type SidenavProps = {
  open?: boolean;
  width?: number;
  children: ReactNode;
  handle?: React.ReactElement;
  toggleSidenav?: () => void;
  position?: "left" | "right";
};
// ================================================================

const Sidenav: FC<SidenavProps> = (props) => {
  const {
    position,
    open,
    width = 280,
    handle,
    children,
    toggleSidenav,
  } = props;

  const [sidenavOpen, setSidenavOpen] = useState(open);
  const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen);

  useEffect(() => setSidenavOpen(open), [open]);

  return (
    <Wrapper>
      <Drawer
        anchor={position}
        open={sidenavOpen}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{ style: { width } }}
        sx={{ zIndex: 15001, overflowX: "hidden" }}
      >
        <Scrollbar autoHide={true} sx={{ height: "100%" }}>
          {children}
        </Scrollbar>
      </Drawer>

      {handle &&
        cloneElement(handle, {
          onClick: toggleSidenav || handleToggleSidenav,
          className: clsx(handle.props?.className, "handle"),
        })}
    </Wrapper>
  );
};

// set default component props
Sidenav.defaultProps = { width: 280, position: "left", open: false };

export default Sidenav;
