import { Box, BoxProps } from "@mui/material";

const FlexBetween: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    {...props}
  >
    {children}
  </Box>
);

export default FlexBetween;
