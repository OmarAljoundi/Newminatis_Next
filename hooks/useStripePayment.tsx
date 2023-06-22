import PaymentService from "@/service/PaymentService";
import {
  TCheckoutRequest,
  TCheckoutSavedCardRequest,
} from "@/types/TCheckoutRequest";
import { TUserStripePayment } from "@/types/TUser";
import { useState } from "react";

const useStripePayment = () => {
  const [paymentLoad, setPaymentLoad] = useState(false);

  const onCreateSession = (data: TCheckoutRequest) => {
    setPaymentLoad(true);
    return new Promise((resolve, reject) => {
      PaymentService.session(data)
        .then((res) => {
          setPaymentLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setPaymentLoad(false);
          reject(err);
        });
    });
  };

  const onCreateUser = (data: TUserStripePayment) => {
    setPaymentLoad(true);
    return new Promise((resolve, reject) => {
      PaymentService.createCustomer(data)
        .then((res) => {
          setPaymentLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setPaymentLoad(false);
          reject(err);
        });
    });
  };

  const onCreateIntent = () => {
    setPaymentLoad(true);
    return new Promise((resolve, reject) => {
      PaymentService.createIntent(1099)
        .then((res) => {
          setPaymentLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setPaymentLoad(false);
          reject(err);
        });
    });
  };

  const onDeletePayment = (paymentId: string) => {
    setPaymentLoad(true);
    return new Promise((resolve, reject) => {
      PaymentService.deletePayment(paymentId)
        .then((res) => {
          setPaymentLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setPaymentLoad(false);
          reject(err);
        });
    });
  };

  const onChargeSavedCard = (data: TCheckoutSavedCardRequest) => {
    setPaymentLoad(true);
    return new Promise((resolve, reject) => {
      PaymentService.chargeSavedCard(data)
        .then((res) => {
          setPaymentLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setPaymentLoad(false);
          reject(err);
        });
    });
  };

  return {
    onCreateSession,
    onCreateUser,
    paymentLoad,
    onChargeSavedCard,
    onCreateIntent,
    onDeletePayment,
  };
};

export default useStripePayment;
