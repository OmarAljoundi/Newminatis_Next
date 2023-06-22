import { Box, Button } from "@mui/material";
import { useSpring, animated } from "react-spring";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FC } from "react";
import { FlexBetween } from "@/components/flex-box";
import { H3 } from "@/components/Typography";
type Prop = {
  handleSetType: (type: string) => void;
};
const PasswordChange: FC<Prop> = ({ handleSetType }) => {
  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={containerStyle}
      className="row flex-row-reverse m-auto py-5"
    >
      <FlexBetween justifyContent={"flex-start"} columnGap="5px" my="15px">
        <CheckCircleIcon color="success" fontSize="large" />
        <H3 textAlign={"center"}>Password Changed Successfully</H3>
      </FlexBetween>

      <Button
        //color="dark"
        fullWidth
        onClick={() => handleSetType("LOGIN")}
      >
        Go Back To Login
      </Button>
    </animated.div>
  );
};

export default PasswordChange;
