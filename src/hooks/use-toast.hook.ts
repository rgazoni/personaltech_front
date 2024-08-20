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

type ToastType = 'success' | 'error';

export const useToast = () => {

  const notify = (type: ToastType, message: string) => {
    toast[type](message, toastOptions);
  }

  return { notify };
}
