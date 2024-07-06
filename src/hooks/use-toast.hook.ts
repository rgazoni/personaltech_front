import { Bounce, ToastPosition, toast } from "react-toastify";

const toastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const useToast = () => {

  const notify = (message: string) => {
    toast(message, toastOptions);
  }

  const notifyError = (message: string) => {
    toast.error(message, toastOptions);
  }

  return { notify, notifyError };
}
