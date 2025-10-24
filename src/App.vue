<template>
  <div id="app" class="font-sans">
    <!-- Show global loader while hydration occurs -->
    <GlobalLoader v-if="!authHydrated" />

    <transition name="fade" mode="out-in">
      <!-- Render the active layout only after auth hydration -->
      <component
        v-if="authHydrated"
        :is="layout"
        :key="layout.name + '-' + $route.fullPath"
      />
    </transition>

    <!-- Global Components -->
    <scroll-to-top />
    <ToastContainer />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// --- Layout Components ---
import PublicLayout from "@/layouts/PublicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import NoneLayout from "@/layouts/NoneLayout.vue";

// --- Other Global Components ---
import GlobalLoader from "@/components/Atoms/GlobalLoader.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import ToastContainer from "@/components/Atoms/ToastContainer.vue";

const route = useRoute();
const authStore = useAuthStore();
authStore.initializeAuth();
const authHydrated = ref(false); // local flag to control UI rendering

/**
 * 1️⃣ Ensure hydration on initial app mount
 * Loads token + user from localStorage and optionally refreshes profile
 */
onMounted(async () => {
  try {
    authStore.initializeAuth();

    if (authStore.isAuthenticated) {
      await authStore.fetchUserProfile().catch(() => {
        authStore.clearAuth();
      });
    }
  } catch (err) {
    console.error("App hydration error:", err);
    authStore.clearAuth();
  } finally {
    authHydrated.value = true; // Show the main app once ready
  }
});

/**
 * 2️⃣ Compute layout based on current route's meta
 * Falls back to parent meta if child route doesn’t define a layout.
 */
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

/**
 * 3️⃣ Optional: Re-hydrate if route changes after logout/login
 */
watch(
  () => route.fullPath,
  async () => {
    if (!authStore.user && localStorage.getItem("authToken")) {
      await authStore.ensureHydrated();
    }
  }
);
</script>

<style>
/* Smooth fade between layouts */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Basic global font styling */
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}
</style>
