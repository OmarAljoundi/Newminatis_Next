import { Box, Button, Chip, Container } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { H2, Paragraph } from "../Typography";
import Link from "next/link";

export const EmptyCart = () => {
  return (
    <Container>
      <Box
        py={6}
        justifyContent={"center"}
        display={"grid"}
        justifyItems={"center"}
        maxWidth={"600px"}
        m={"auto"}
      >
        <Chip
          sx={{
            width: "96px",
            height: "96px",
            borderRadius: "47px",
            backgroundColor: "#646f79",
          }}
          icon={
            <LocalMallIcon
              sx={{
                width: "42px",
                height: "37px",
                marginRight: "-20px!important",
                color: "white",
              }}
              color="action"
            />
          }
        />
        <H2>Your cart is currently empty</H2>
        <Paragraph textAlign={"center"} sx={{ my: "15px" }}>
          Before proceed to checkout you must add some products to your shopping
          cart. You will find a lot of interesting products on our Shop page.
        </Paragraph>
        <Link href={"/shop"}>
          <Button
            color="marron"
            variant="contained"
            sx={{
              marginTop: "15px",
              fontSize: "20px",
              paddingX: "40px",
            }}
          >
            Start Shopping
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
