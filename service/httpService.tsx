import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookie from "js-cookie";

const onRequest = (config: AxiosRequestConfig): any => {
  const token = Cookie.get("token");

  return {
    ...config,
    baseURL: `${process.env.NEXT_PUBLIC_URL_PRODUCTION!}`,
    timeout: 500000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const onRequestFormData = (config: AxiosRequestConfig): any => {
  const token = Cookie.get("token");

  return {
    ...config,
    baseURL: `${process.env.NEXT_PUBLIC_URL_PRODUCTION!}`,
    timeout: 500000,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // ref.current?.continuousStart()
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  //ref.current?.complete()
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  //ref.current?.complete()
  return Promise.reject(error);
};

export function http(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}

export function httpFormData(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequestFormData, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
