import { X } from "lucide-react";
import { JSX } from "react";
import { toast } from "sonner";

interface IUiToastProps {
  toastContent: any;
  icon: JSX.Element;
  message: string;
  className: string;
}

const UiToast = ({
  toastContent,
  icon,
  message,
  className,
}: IUiToastProps): React.ReactNode => {
  return (
    <section
      id="toast"
      className={`flex items-center gap-10 shadow-xl w-full p-2 
        rounded-lg border justify-center ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon}

        <p className="text-sm font-medium ">
          {message || "Something went Wrong"}
        </p>
      </div>
      <button
        onClick={() => toast.dismiss(toastContent)}
        type="button"
        className=" "
      >
        <X className="size-4 text-body" />
      </button>
    </section>
  );
};

export default UiToast;
