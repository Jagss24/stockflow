import { useMutation } from "@tanstack/react-query";
import { loginUserAPI, logoutUserAPI } from "./auth.api";
import { handleNetworkError } from "@/lib/toast";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUserAPI,
    onError: handleNetworkError,
  });
};

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutUserAPI,
    onError: handleNetworkError,
  });
};

export { useLoginMutation, useLogoutMutation };
