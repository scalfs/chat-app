import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/presentation/components/ui/toast";
import { useState } from "react";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  placement?: "top" | "bottom";
  variant?: "solid" | "outline";
}

export const useCustomToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = useState<string>("0");

  const showToast = ({
    title = "Hello!",
    description = "This is a toast message.",
    duration = 10000,
    placement = "bottom",
    variant = "solid",
  }: ToastOptions) => {
    if (toast.isActive(toastId)) toast.close(toastId);

    const newId = String(Math.random());
    setToastId(newId);

    toast.show({
      id: newId,
      placement,
      duration,
      render: ({ id }) => {
        return (
          <Toast nativeID={`toast-${id}`} action="muted" variant={variant}>
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  return { showToast };
};
