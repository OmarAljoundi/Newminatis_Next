import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Zoom,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, forwardRef, useState } from "react";
import StraightenIcon from "@mui/icons-material/Straighten";
import SizeGuidTable from "./ProductSizeGuidTable";
import { Close } from "@mui/icons-material";
import { TProduct } from "@/types/TProduct";
import { H4 } from "@/components/Typography";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom style={{ transitionDelay: "200ms" }} ref={ref} {...props} />;
});

type SizeGuidProp = {
  product: TProduct;
};
const ProductSizeGuid: FC<SizeGuidProp> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <span
        className="text-sm font-medium text-gray-700 hover:text-gray-300 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Size Guide{" "}
        <StraightenIcon
          sx={{ transform: " rotate(45deg)", fontSize: "0.875rem" }}
        />
      </span>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: "345px",
            width: "100%",
            maxWidth: 800,
            padding: "0",
          },
          role: "drawer",
        }}
      >
        <DialogTitle sx={{ pb: 0 }}>
          <H4 textAlign={"center"}>{`HOW TO MEASURE FOR ${
            product.friendlyName ?? product.name
          }?`}</H4>
        </DialogTitle>

        <DialogContent sx={{ px: 0 }}>
          <Box mb={2.5} mt={2.5} px={0}>
            <SizeGuidTable
              productSizeGuide={product?.productSizeGuide}
              productType={product?.type}
            />
          </Box>
        </DialogContent>
        <IconButton
          size="medium"
          onClick={handleClose}
          sx={{
            position: "absolute",
            left: 5,
            top: 5,
            zIndex: 3,
          }}
        >
          <Close fontSize="medium" sx={{ color: "black" }} />
        </IconButton>
      </Dialog>
    </div>
  );
};

export default ProductSizeGuid;
