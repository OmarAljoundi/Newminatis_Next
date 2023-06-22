import { FC } from "react";
import { IconButton } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// ===============================================================
type Props = { onSuccess: boolean; onError: boolean; show: boolean };
// ===============================================================

const CheckVoucherIcon: FC<Props> = ({ onError, onSuccess, show }) => {
  return (
    <IconButton>
      {onError && show && (
        <ErrorOutlineIcon fontSize="small" sx={{ color: "red" }} />
      )}
      {onSuccess && show && (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: "lightgreen" }} />
      )}
    </IconButton>
  );
};

export default CheckVoucherIcon;
