import { useLoginMutation } from "@/api/auth/auth.mutations";
import { LoginRequest } from "@/api/auth/auth-api.types";
import { setApiFormErrors } from "@/lib/formErrors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTE_PAGES } from "@/constants/pages";

const useLoginForm = () => {
  const form = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (values) => {
    loginMutation
      .mutateAsync(values)
      .then(() => {
        navigate(ROUTE_PAGES.dashboard);
      })
      .catch((err) => {
        setApiFormErrors(err, form.setError);
      });
  };

  return {
    form,
    loginMutation,
    onSubmit,
  };
};

export default useLoginForm;
