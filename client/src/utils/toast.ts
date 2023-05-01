import { ToastOptions, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    pauseOnFocusLoss: false,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      return;
  }
};
