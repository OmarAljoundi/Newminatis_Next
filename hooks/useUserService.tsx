import UserService from "@/service/UserService";
import { TResetPasswordRequest } from "@/types/TResetPasswordRequest";
import { TUser } from "@/types/TUser";
import { TUserAddress } from "@/types/TUserAddress";
import { TUserGuest } from "@/types/TUserGuest";
import { TUserRegisterRequest } from "@/types/TUserRegisterRequest";
import Cookies from "js-cookie";
import { useState } from "react";

const useUserService = () => {
  const [userLoad, setUserLoad] = useState(false);

  const onAuthByEmail = (data: TUser) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.authByEmail(data)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onCreateGuest = (data: TUserGuest) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.createGuest(data)
        .then((res) => {
          setUserLoad(false);
          Cookies.set("GUEST_EMAIL", data.email);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onGetGuest = (email: string) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.getGuest(email)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onAuthByThirdParty = (data: TUser) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.authByThirdParty(data)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onRegister = (data: TUserRegisterRequest) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.register(data)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onPostAddress = (data: TUserAddress) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.addAddress(data)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onDeleteAddress = (id: number) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.deleteAddress(id)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onGetUserOrders = () => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.getUserOrders()
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  const onResetPasswordRequest = (email: string) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.resetPasswordRequest(email)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };
  const onResetPasswordCodeCheck = (req: TResetPasswordRequest) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.ResetPasswordCodeCheck(req)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };
  const onResetPassword = (req: TResetPasswordRequest) => {
    setUserLoad(true);
    return new Promise((resolve, reject) => {
      UserService.ResetPassword(req)
        .then((res) => {
          setUserLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setUserLoad(false);
          reject(err);
        });
    });
  };

  return {
    onAuthByEmail,
    onRegister,
    userLoad,
    onPostAddress,
    onDeleteAddress,
    onAuthByThirdParty,
    onGetUserOrders,
    onResetPasswordRequest,
    onResetPasswordCodeCheck,
    onCreateGuest,
    onResetPassword,
    onGetGuest,
  };
};

export default useUserService;
