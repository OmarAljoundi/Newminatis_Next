import Button from "@mui/material/Button";
import { useSpring, animated } from "react-spring";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FC } from "react";
import { FlexBetween } from "@/components/flex-box";
import { H3 } from "@/components/Typography";
import Link from "next/link";

const PasswordChange = () => {
  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={containerStyle}
      className="row flex-row-reverse m-auto py-5 px-8"
    >
      <FlexBetween justifyContent={"flex-start"} columnGap="5px" my="15px">
        <CheckCircleIcon color="success" fontSize="large" />
        <H3 textAlign={"center"}>Password Changed Successfully</H3>
      </FlexBetween>
      <Link href={"/auth/login"}>
        <Button fullWidth color="primary">
          Go Back To Login
        </Button>
      </Link>
    </animated.div>
  );
};

export default PasswordChange;
