import { Box, Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { H1 } from "./Typography";

type LegalHeaderProp = {
  title: string;
  LEGAL_HEADER: string;
};

export const LegalHeader: FC<LegalHeaderProp> = ({ title, LEGAL_HEADER }) => {
  const [load, setLoad] = useState(false);
  const styles = {
    container: {
      backgroundImage: `url(${LEGAL_HEADER})`,
    },
  };
  useEffect(() => {
    var image = new Image();
    image.src = LEGAL_HEADER;
    image.onload = () => {
      setLoad(true);
    };
  }, []);
  return (
    <>
      {load && (
        <Container
          style={styles.container}
          maxWidth={false}
          sx={{
            paddingTop: {
              xs: "5px",
              sm: "5px",
              md: "70px",
            },
            paddingBottom: {
              xs: "25px",
              sm: "25px",
              md: "70px",
            },
            paddingX: {
              xs: "25px",
              sm: "25px",
              md: "0",
            },
            position: "relative",
            zIndex: "2",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#000000",
              opacity: "0.6",
              transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              position: "absolute",
              zIndex: "-1",
            }}
          ></Box>
          <Box>
            <H1 textAlign={"center"} color={"white"} sx={{ fontSize: "54px" }}>
              {title}
            </H1>
          </Box>
        </Container>
      )}
    </>
  );
};
