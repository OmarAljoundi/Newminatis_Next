import { FC } from "react";
import Box from "@mui/material/Box";

type SpacerProps = { mt?: string; mb?: string };

const Spacer: FC<SpacerProps> = ({ mt, mb }) => {
  return <Box mt={mt} mb={mb} />;
};

export default Spacer;
