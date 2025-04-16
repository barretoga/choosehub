import axios from "axios";
import { getToken } from "~/utils";

export const api = (path = "") => {
  return `${process.env.API_URL}${path}`;
};

const httpClient = axios.create({
  baseURL: api(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    const { accessToken } = JSON.parse(token);

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export { httpClient };
