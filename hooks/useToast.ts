'use client'

import { ToastOptions, toast } from "react-toastify";


type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';
interface PromiseToastMessages<T> {
    pending: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
}

const useToast = () => {
    const showToast = (
        message: string,
        type: ToastType = 'default',
        options?: ToastOptions
    ) => {
        const toastOptions: ToastOptions = {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: '!rounded-lg !font-sans !text-sm',
            ...options
        }


        switch (type) {
            case 'success':
                toast.success(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            case 'warning':
                toast.warning(message, toastOptions);
                break;
            case 'info':
                toast.info(message, toastOptions);
                break;
            default:
                toast(message, toastOptions);
        }
    };

    const toastPromise = async <T,>(
        promise: Promise<T>, 
        messages: PromiseToastMessages<T>,
        options?: ToastOptions,
    ) => {
        return toast.promise(promise, {
            pending: messages.pending,
            success:
            {
                render({ data }) {
                    return typeof data === "function" ? messages.success(data as T) : messages.success;
                },
                ...options
            },
            error: {
                render({ data }) {
                    return typeof data === "function" ? messages.error(data as T) : messages.error;
                },
                ...options
            }
        })
    }
    return { showToast, toastPromise };
};

export default useToast;