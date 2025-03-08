import { axiosRequest } from "../utils/axiosRequest";
const API_URL = process.env.REACT_APP_API_URL;

export const checkCookies = async () => {
  return axiosRequest({
    method: "GET",
    url: `${API_URL}/api/v1/users/checkCookies`,
  });
};

export const login = async (data) => {
  return axiosRequest({
    method: "POST",
    url: `${API_URL}/api/v1/users/login`,
    data,
  });
};

export const signup = async (data) => {
  return axiosRequest({
    method: "POST",
    url: `${API_URL}/api/v1/users/signup`,
    data,
  });
};

export const logout = async () => {
  return axiosRequest({
    method: "GET",
    url: `${API_URL}/api/v1/users/logout`,
  });
};
