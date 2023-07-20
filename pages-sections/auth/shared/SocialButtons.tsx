import { Dispatch, FC, Fragment, SetStateAction, useEffect } from "react";
import useUserService from "@/hooks/useUserService";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Facebook from "@/components/icons/login-icons/Facebook";
import Google from "@/components/icons/login-icons/Google";
// =======================================
type SocialButtonsProps = {
  message: string;
  setLoad: Dispatch<SetStateAction<boolean>>;
};
// =======================================

const SocialButtons: FC<SocialButtonsProps> = ({ message, setLoad }) => {
  const { userLoad } = useUserService();
  const handleFormSubmit = async (type: "google" | "facebook") => {
    setLoad(true);
    signIn(type, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success(message);
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    setLoad(userLoad);
  }, [userLoad]);

  return (
    <Fragment>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 px-4 py-4">
        <button
          onClick={() => handleFormSubmit("google")}
          className="flex items-center
           bg-white border border-gray-300 
            shadow-md max-w-xs px-6 py-2 text-xs font-medium
             text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-gray-500"
        >
          <Google />
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => handleFormSubmit("facebook")}
          className="flex items-center
           bg-white border border-gray-300 
            shadow-md max-w-xs px-6 py-2 text-xs font-medium text-gray-800
             hover:bg-gray-200 focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-gray-500"
        >
          <Facebook />

          <span>Continue with Facebook</span>
        </button>
      </div>
    </Fragment>
  );
};

export default SocialButtons;
