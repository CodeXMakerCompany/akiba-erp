import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const baseURL =
  process.env.REACT_APP_ENV_ENVIRONMENT === "prod"
    ? "https://ftav0l2ixa.execute-api.us-east-2.amazonaws.com/prod/api"
    : "http://localhost:3001/api";

const apiInstance = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return axios.create(config);
};

interface MyConfig {
  headers: {
    Authorization: string;
  };
  withCredentials: boolean;
}
const options: MyConfig = {
  headers: {
    Authorization: "Bearer my-token",
  },
  withCredentials: false,
};
const customApiInstance = (baseURL: string): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL,
    timeout: 5000,
    ...options,
  };

  return axios.create(config);
};

export default apiInstance;

export { apiInstance, customApiInstance };
