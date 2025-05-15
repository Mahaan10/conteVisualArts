import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-fit max-w-sm font-iran-marker">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toast.type === "success"
                  ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {toast.type === "success" ? (
                <HiCheck className="h-5 w-5" />
              ) : (
                <HiX className="h-5 w-5" />
              )}
            </div>
            <div className="mr-3 text-xs font-normal">{toast.message}</div>
          </Toast>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
