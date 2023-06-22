import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Stepper, { Step } from "../stepper/Stepper";
import { usePathname, useRouter } from "next/navigation";

/**
 *  Used:
 *  1. cart page
 *  2. checkout page
 *  3. payment page
 */

// ======================================================
type CheckoutNavLayoutProps = {
  children: ReactNode;
  isCartEmpty?: boolean;
};
// ======================================================
const _stepperList: Step[] = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: true },
  { title: "Review", disabled: true },
];
const CheckoutNavLayout: FC<CheckoutNavLayoutProps> = ({
  children,
  isCartEmpty,
}) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [stepperList, setStepperList] = useState<Step[]>(_stepperList);

  const router = useRouter();
  const pathname = usePathname();

  const newState = (value: string) =>
    stepperList.map((obj) => {
      if (obj.title === value) {
        return { ...obj, disabled: false };
      }
      return obj;
    });

  const handleStepChange = (step: number) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/payment");
        break;
      case 3:
        router.push("/review_order");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);

        break;
      case "/payment":
        setSelectedStep(3);
        setStepperList(newState("Payment"));
        break;
      case "/review_order":
        setSelectedStep(4);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <Container sx={{ my: 4 }}>
      {!isCartEmpty && (
        <Box mb={3} display={{ sm: "block", xs: "none" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stepper
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {children}
    </Container>
  );
};

export default CheckoutNavLayout;
