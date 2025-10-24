import { ref } from "vue";

const toasts = ref([]);

export function useToast() {
  const showToast = (message, type = "info", duration = 5000) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message, duration) =>
    showToast(message, "success", duration);
  const error = (message, duration) => showToast(message, "error", duration);
  const warning = (message, duration) =>
    showToast(message, "warning", duration);
  const info = (message, duration) => showToast(message, "info", duration);

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
  };
}
