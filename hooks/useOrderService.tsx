import OrderService from "@/service/OrderService";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { Items, TOrderRequest } from "@/types/TOrderRequest";
import { TOrderRequestGuest } from "@/types/TOrderRequestGuest";
import { useState } from "react";

const useOrderService = () => {
  const [orderLoad, setOrderLoad] = useState(false);

  const onCreateOrder = (data: TOrderRequest) => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.createOrder(data)
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  const onCreateGuestOrder = (data: TOrderRequestGuest) => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.createGuestOrder(data)
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  const onCheckStock = (data: Items[]) => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.checkStock(data)
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  const GetOrders = () => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.getOrders()
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  const GetOrderDetails = (id: number) => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.getOrderDetails(id)
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  const CreateCheckoutSession = (session: TShoppingSession) => {
    setOrderLoad(true);
    return new Promise((resolve, reject) => {
      OrderService.createCheckoutSession(session)
        .then((res) => {
          setOrderLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setOrderLoad(false);
          reject(err);
        });
    });
  };

  return {
    onCreateOrder,
    onCreateGuestOrder,
    GetOrders,
    GetOrderDetails,
    orderLoad,
    CreateCheckoutSession,
    onCheckStock,
  };
};

export default useOrderService;
