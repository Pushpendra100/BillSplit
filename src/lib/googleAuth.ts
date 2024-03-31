import axios, { InternalAxiosRequestConfig } from "axios";

const base_url = "http://localhost:3000";
const API = axios.create({ baseURL: base_url, withCredentials: true });

API.interceptors.request.use(
  (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const item = localStorage.getItem("user_info");
    if (item) {
      const userInfo = JSON.parse(item);
      req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return req;
  }
);

export const signInGoogle = async (accessToken: string) => {
  try {
    const { data } = await API.post("/api/users/signin", {
      googleAccessToken: accessToken,
    });
    if (data.error) {
      return {
        result: false,
        message:
          "Login Failed",
      };
    }
    return { result: data.user, message: "Login success" };
  } catch (error) {
    console.log(error);
    return { result: false, message: "Login Failed" };
  }
};

export const signUpGoogle = async (accessToken: string) => {
  try {
    const { data } = await API.post("/api/users/signup", {
      googleAccessToken: accessToken,
    });
    if (data.error) {
      return {
        result: false,
        message:
          "Registration Failed, account already exist with the given email",
      };
    }
    return { result: data.user, message: "Registration success" };
  } catch (error) {
    console.log(error);
    return {
      result: false,
      message:
        "Registration Failed, account already exist with the given email",
    };
  }
};
