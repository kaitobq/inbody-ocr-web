import toast from "react-hot-toast"

export const useToast = () => {
  const successToast = (msg: string) => {
    toast.success(msg, {
      duration: 3000,
      position: "top-right",
    })
  }

  const errorToast = (msg: string) => {
    toast.error(msg, {
      duration: 3000,
      position: "top-right",
    })
  }

  const loadingToast = (msg: string) => {
    toast.loading(msg, {
      duration: 3000,
      position: "top-right",
    })
  }

  return {
    success: successToast,
    error: errorToast,
    loading: loadingToast,
  }
}
