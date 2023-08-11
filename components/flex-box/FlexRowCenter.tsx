import Box, { BoxProps } from "@mui/material/Box";

const FlexRowCenter: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" justifyContent="center" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexRowCenter;
