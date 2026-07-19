import { useMutation } from "@tanstack/react-query";
import { loginUserAPI } from "./auth.api";
import { handleNetworkError } from "@/lib/toast";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUserAPI,
    onError: handleNetworkError,
  });
};

export { useLoginMutation };
