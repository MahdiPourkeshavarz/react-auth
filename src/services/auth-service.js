import axios from "axios";
import { BASE_URL, REFRESH_TOKEN_URL } from "../constants/url";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403) {
      originalRequest._retry = true;
      const resp = await getrefreshToken();
      const accessToken = resp.access;
      localStorage.setItem("accessToken", accessToken);
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

const getrefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const resp = await axios.post(
      `${REFRESH_TOKEN_URL}/api/accounts/refresh/`,
      { refresh: refreshToken }
    );
    console.log(resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};
