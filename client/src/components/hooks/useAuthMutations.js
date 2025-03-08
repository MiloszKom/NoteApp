import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login, signup, logout } from "../api/authApis";
import { successAlert, errorAlert } from "../utils/toastAlert";

export const useAuthMutations = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      successAlert(data.message);
      auth.login(data);
      navigate("/");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signup,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      successAlert(data.message);
      auth.login(data);
      navigate("/");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onError: (error) => {
      errorAlert(error.response.data.message);
    },
    onSuccess: (data) => {
      successAlert(data.message);
      auth.logout();
      navigate("/login");
    },
  });

  return {
    logoutMutation,
    loginMutation,
    signUpMutation,
  };
};
