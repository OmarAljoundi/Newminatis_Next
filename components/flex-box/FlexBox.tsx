import { Box, BoxProps } from "@mui/material";

const FlexBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

export default FlexBox;
