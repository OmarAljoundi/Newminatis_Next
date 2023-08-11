import { FC, ReactNode, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Navigations from "./Navigations";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CustomerDashboardLayout: FC<Props> = ({ children }) => {
  const route = useRouter();
  const user = useAppSelector((x) => x.Store.AuthReducer.Auth);
  useEffect(() => {
    if (!user) route.push("/");
  }, [user]);
  return (
    <Container sx={{ my: "2rem" }}>
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Navigations />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerDashboardLayout;
