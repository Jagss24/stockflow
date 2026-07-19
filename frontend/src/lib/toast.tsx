import UiToast from "@/components/ui/Toast/UiToast";
import { ApiErrorResponse } from "@/types/react-query";
import { AxiosError } from "axios";
import { CheckCircle, TriangleAlertIcon } from "lucide-react";
import { toast } from "sonner";

function handleSuccessToast({ message }: { message: string }) {
  return toast.custom((t) => {
    return (
      <UiToast
        className="border-success/20 bg-white shadow-success/10 self-center"
        toastContent={t}
        message={message}
        icon={
          <CheckCircle className="bg-success/80 p-2 size-7 text-white rounded-md" />
        }
      />
    );
  });
}

function handleNetworkError(error: AxiosError<ApiErrorResponse>) {
  const message =
    error?.response?.data.message || "Something went wrong! Please try again.";

  handleErrorToast({ message });
}

function handleErrorToast({ message }: { message: string }) {
  return toast.custom((t) => {
    return (
      <UiToast
        className="border-error/20 bg-white shadow-error/10 self-center"
        toastContent={t}
        message={message}
        icon={
          <TriangleAlertIcon className="bg-error/80 p-2 size-7 text-white rounded-md" />
        }
      />
    );
  });
}

export { handleErrorToast, handleNetworkError, handleSuccessToast };
