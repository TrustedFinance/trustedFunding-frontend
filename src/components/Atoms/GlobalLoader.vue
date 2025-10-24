<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    >
      <!-- Spinner -->
      <div
        class="relative w-16 h-16 border-4 border-t-transparent border-primary-blue rounded-full animate-spin"
      ></div>

      <!-- Progress Bar -->
      <div class="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-1 bg-primary-blue transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <!-- Text -->
      <p class="mt-3 text-gray-700 text-sm font-medium tracking-wide">
        {{ message }}
      </p>
    </div>
  </transition>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLoaderStore } from "@/stores/loaderStore";

const loader = useLoaderStore();
const { isLoading, progress, message } = storeToRefs(loader);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
