import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookie from "js-cookie";

const onRequest = (
  config: AxiosRequestConfig,
  forceLive?: boolean,
  token?: string
): any => {
  return {
    ...config,
    baseURL: `${
      forceLive
        ? process.env.NEXT_PUBLIC_URL_PRODUCTION!
        : process.env.NEXT_PUBLIC_URL_STAGING!
    }`,
    timeout: 500000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const onRequestFormData = (
  config: AxiosRequestConfig,
  forceLive?: boolean
): any => {
  return {
    ...config,
    baseURL: `${
      forceLive
        ? process.env.NEXT_PUBLIC_URL_PRODUCTION!
        : process.env.NEXT_PUBLIC_URL_STAGING!
    }`,
    timeout: 500000,
    headers: {
      Accept: "application/json",
    },
  };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export function http(
  axiosInstance: AxiosInstance,
  forceLive?: boolean,
  token?: string
): AxiosInstance {
  axiosInstance.interceptors.request.use(
    (config) => onRequest(config, forceLive, token),
    onRequestError
  );
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}

export function httpFormData(
  axiosInstance: AxiosInstance,
  forceLive?: boolean
): AxiosInstance {
  axiosInstance.interceptors.request.use(
    (config) => onRequestFormData(config, forceLive),
    onRequestError
  );
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
