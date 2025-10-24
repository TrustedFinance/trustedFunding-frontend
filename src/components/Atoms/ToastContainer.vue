<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'p-4 rounded-lg shadow-lg border transform transition-all duration-300',
        toastClasses[toast.type]
      ]"
      @click="removeToast(toast.id)"
    >
      <div class="flex items-center justify-between">
        <span class="font-medium">{{ toast.message }}</span>
        <button class="ml-4 text-lg hover:opacity-70">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/toast';

const { toasts, removeToast } = useToast();

const toastClasses = {
  success: 'bg-green-100 border-green-400 text-green-800',
  error: 'bg-red-100 border-red-400 text-red-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  info: 'bg-blue-100 border-blue-400 text-blue-800'
};
</script>