<template>
  <div id="app" class="font-sans">
    <component :is="layout" />

    <scroll-to-top />
    <ToastContainer />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import PublicLayout from "@/layouts/PublicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import NoneLayout from "@/layouts/NoneLayout.vue";

import ScrollToTop from "@/components/ScrollToTop.vue";
import ToastContainer from "@/components/Atoms/ToastContainer.vue";

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    authStore.initializeAuth();

    if (authStore.isAuthenticated) {
      await authStore.fetchUserProfile().catch(() => {
        authStore.clearAuth();
      });
    }
  } catch (err) {
    console.error("Auth initialization failed:", err);
    authStore.clearAuth();
  }
});

const layout = computed(() => {
  const matched = route.matched.find((r) => r.meta?.layout);
  const layoutName = matched?.meta?.layout || "PublicLayout";

  switch (layoutName) {
    case "UserLayout":
      return UserLayout;
    case "AdminLayout":
      return AdminLayout;
    case "NoneLayout":
      return NoneLayout;
    default:
      return PublicLayout;
  }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}
</style>
