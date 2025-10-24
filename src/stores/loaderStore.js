import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loader", () => {
  const isLoading = ref(false);
  const progress = ref(0);
  const message = ref("");

  // Simple API for flexibility
  const start = (msg = "Loading...") => {
    isLoading.value = true;
    progress.value = 0;
    message.value = msg;
    simulateProgress();
  };

  const stop = () => {
    progress.value = 100;
    setTimeout(() => {
      isLoading.value = false;
      message.value = "";
      progress.value = 0;
    }, 300); // allow smooth fade
  };

  // Optional smart progress simulation (for long API or route changes)
  const simulateProgress = () => {
    progress.value = 0;
    const step = () => {
      if (!isLoading.value || progress.value >= 95) return;
      progress.value += Math.random() * 5;
      setTimeout(step, 200);
    };
    step();
  };

  return { isLoading, progress, message, start, stop };
});
