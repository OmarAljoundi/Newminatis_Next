import { Dispatch, FC, Fragment, SetStateAction, useEffect } from "react";
import { Box, Button, Divider } from "@mui/material";
import Cookies from "js-cookie";
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useAppDispatch } from "@/hooks/useRedux";
import useUserService from "@/hooks/useUserService";
import { RegisterType, Role, TUser } from "@/types/TUser";
import { IUserResponse } from "@/interface/IUserResponse";
import { SetUser } from "@/store/Auth/Auth-action";
import { FlexBox } from "@/components/flex-box";
// =======================================
type SocialButtonsProps = {
  onClose?: () => void;
  message: string;
  setLoad: Dispatch<SetStateAction<boolean>>;
};
// =======================================

const SocialButtons: FC<SocialButtonsProps> = ({
  message,
  onClose,
  setLoad,
}) => {
  const { onAuthByThirdParty, userLoad } = useUserService();
  const dispatch = useAppDispatch();

  //const { enqueueSnackbar } = useSnackbar()

  const onSuccess = async (access_token: string) => {
    const userInfo = await axios
      .get(process.env.NEXT_PUBLIC_PUBLIC_GOOGLE_AUTH_API || "", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data);

    if (userInfo) {
      var user: TUser = {
        id: 0,
        email: userInfo?.email,
        role: Role.User,
        type: RegisterType.Google,
      };
      const result = (await onAuthByThirdParty(user)) as IUserResponse;
      if (!result.success) {
        //enqueueSnackbar(result.message)
      } else {
        dispatch(SetUser(result.user));
        //enqueueSnackbar(message)
        Cookies.set("token", result.token);
        if (onClose) {
          onClose();
        }
      }
    }
  };

  const handleFBLogin = async (res: any) => {
    if (res) {
      var user: TUser = {
        id: 0,
        email: res.email,
        role: Role.User,
        type: RegisterType.Facebook,
      };
      const result = (await onAuthByThirdParty(user)) as IUserResponse;
      if (!result.success) {
        //enqueueSnackbar(result.message)
      } else {
        dispatch(SetUser(result.user));
        //enqueueSnackbar(message)
        Cookies.set("token", result.token);
        if (onClose) {
          onClose();
        }
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse.access_token),
    onError(errorResponse) {
      //enqueueSnackbar(errorResponse.error_description)
    },
    flow: "implicit",
  });

  useEffect(() => {
    setLoad(userLoad);
  }, [userLoad]);

  return (
    <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width="200px" mx="auto">
          <Divider />
        </Box>

        <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="grey.600" bgcolor="background.paper" px={2}>
            or
          </Box>
        </FlexBox>
      </Box>

      <Button
        onClick={() => login()}
        disabled={userLoad}
        className="googleButton"
        size="medium"
        fullWidth
        //color="dark"
        sx={{ height: 44 }}
      >
        {/* <Image src="/assets/images/icons/google-1.svg" alt="google" /> */}
        <Box fontSize="12px" ml={1}>
          Continue with Google
        </Box>
      </Button>

      {/* <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID as string}
                callback={handleFBLogin}
                fields="name,email"
                redirectUri="https://newminatis.com/accounts/facebook/login/callback/"
                autoLoad={false}
                render={(renderProps: any) => (
                    <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled || userLoad}
                        className="facebookButton"
                        size="medium"
                        color="dark"
                        fullWidth
                        sx={{ height: 44, mt: 1 }}
                    >
                        <Image
                            src="/assets/images/icons/facebook-filled-white.svg"
                            alt="facebook"
                        />
                        <Box fontSize="12px" ml={1}>
                            Continue with Facebook
                        </Box>
                    </Button>
                )}
            /> */}
    </Fragment>
  );
};

export default SocialButtons;
