import { Close } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { H1, H2, H3, H5, Span } from "./Typography";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import EmailService from "@/service/EmailService";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { toast } from "react-hot-toast";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom style={{ transitionDelay: "200ms" }} ref={ref} {...props} />;
});

const SubscribeNewsletter = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const result = (await EmailService.postEmail(
      email
    )) as AxiosResponse<IBaseResponse>;
    if (result.data.success) {
      toast.success(
        "Congratulation! You have successfully subscribed to our newsletter"
      );
      handleClose();
    } else {
      toast.error("You have already subscribed to our newsletter");
    }
    setLoading(false);
  };

  useEffect(() => {
    const current = new Date();
    current.setDate(current.getDate() + 7);
    var Newsletter = Cookies.get("Newsletter");
    if (!Newsletter) {
      Cookies.set("Newsletter", "true", {
        expires: current,
        secure: true,
      });
      setTimeout(() => {
        setOpen(true);
      }, 12000);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            minWidth: "345px",
            width: "90%",
            padding: "10px",
          },
          role: "drawer",
        }}
      >
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
        <DialogTitle>
          <Box textAlign={"center"}>
            <img
              width={90}
              height={70}
              src={require("../images/newminatis-LOGO-black-02.png")}
              alt="newminatis-logo"
            />
          </Box>
          <H1 textAlign={"center"} color="black">
            Join The Tribe
          </H1>
        </DialogTitle>

        <DialogContent>
          <H3 textAlign={"center"} mb={2} color="black">
            Enjoy 10% off your order when joining our Newsletter
          </H3>
          <form onSubmit={handleSubmitForm}>
            <Box mb={3}>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                value={email}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": {
                    background: "white",
                  },
                }}
                placeholder="Email Address"
              />
            </Box>

            <LoadingButton
              type="submit"
              color="marron"
              loading={loading}
              fullWidth
              disabled={!isValidEmail()}
              sx={{
                color: "black",
                background: "#D3C4AB",
                padding: "10px 50px",
                fontWeight: "bold",
                "&.MuiLoadingButton-root:hover": {
                  background: "#D3C4AB",
                },
                "& .MuiLoadingButton-loadingIndicator": {
                  color: "black",
                },
                ":disabled": {
                  color: "black",
                  opacity: "0.5",
                },
              }}
            >
              <Span
                style={
                  loading ? { visibility: "hidden" } : { visibility: "visible" }
                }
              >
                GET MY 10% OFF
              </Span>
            </LoadingButton>
            <H5 color={"black"} mt={2}>
              * We offer FREE WORLDWIDE EXPRESS SHIPPING
            </H5>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscribeNewsletter;
