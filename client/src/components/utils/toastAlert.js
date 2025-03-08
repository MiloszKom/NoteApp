import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: false,
};

export const successAlert = (message = "Operation completed successfully!") => {
  toast.success(message, toastOptions);
};

export const errorAlert = (message = "Unexpected error occured.") => {
  toast.error(message, toastOptions);
};
