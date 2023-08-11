import ImCheck from "@/public/assets/icons/ImCheck";
import ImLock from "@/public/assets/icons/ImLock";
import ImUnlock from "@/public/assets/icons/ImUnlock";
import { StepIconProps } from "@mui/material/StepIcon";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
export const Steps = [
  {
    header: "Enter Your Email",
    delay: 0,
    icon: <ImLock />,
  },
  {
    header: "Verifiy Your Email",
    delay: 350,
    icon: <ImCheck />,
  },
  {
    header: "Change Your Password",
    delay: 700,
    icon: <ImUnlock />,
  },
];

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[700],
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: "#D3C4AB",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    background: "#D3C4AB",
  }),
}));

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: any = {};

  Steps.map((step, index) => {
    icons[index + 1] = step.icon;
  });

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, #dc3254 0%, #c52d47 48%, #91305b 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, #dc3254 0%, #c52d47 48%, #91305b 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

export const labelStyle = {
  span: {
    background:
      "-webkit-linear-gradient(90deg,#dc3254 0%,#c52d47 48%,#91305b 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};
