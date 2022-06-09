import { toast } from 'react-toastify';

const toastStyle = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const toastError = (text) => toast.error(`${text}`, toastStyle);

export const toastSuccess = (text) => toast.success(`${text}`, toastStyle);
