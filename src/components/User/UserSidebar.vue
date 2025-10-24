<template>
  <div class="relative">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-dark-navy text-white w-64 min-h-screen transform transition-transform duration-300 ease-in-out fixed lg:static z-40',
        { '-translate-x-full lg:translate-x-0': !isOpen },
        { 'translate-x-0': isOpen },
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header -->
        <div class="p-4 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <div
              class="h-10 w-10 bg-primary-blue rounded-full flex items-center justify-center"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="h-5 w-5 text-white"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-white">
                {{ authStore.user?.name }}
              </p>
              <p class="text-xs text-silver-gray">
                {{ authStore.user?.email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            :class="[
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
              isActiveRoute(item.path)
                ? 'bg-primary-blue text-white'
                : 'text-silver-gray hover:bg-gray-800 hover:text-white',
            ]"
            @click="closeSidebar"
          >
            <font-awesome-icon :icon="item.icon" class="h-4 w-4 mr-3" />
            {{ item.name }}
            <span
              v-if="item.badge"
              class="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-gray-700">
          <div class="space-y-3">
            <!-- Quick Stats -->
            <div class="bg-gray-800 rounded-lg p-3">
              <p class="text-xs text-silver-gray mb-1">Available Balance</p>
              <p class="text-lg font-semibold text-white">
                {{ formatCurrency(authStore.user?.balance || 0) }}
              </p>
            </div>

            <!-- Support Link -->
            <router-link
              to="/contact"
              class="flex items-center px-3 py-2 text-sm text-silver-gray hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              @click="closeSidebar"
            >
              <font-awesome-icon
                :icon="['fas', 'headset']"
                class="h-4 w-4 mr-3"
              />
              Support
            </router-link>
          </div>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile (outside sidebar) -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ease-in-out"
      @click="closeSidebar"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const route = useRoute();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-sidebar"]);

const navigation = computed(() => [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: ["fas", "tachometer-alt"],
  },
  {
    name: "Investments",
    path: "/user/investments",
    icon: ["fas", "chart-line"],
  },
  {
    name: "Transactions",
    path: "/user/transactions",
    icon: ["fas", "exchange-alt"],
  },
  {
    name: "Deposit",
    path: "/user/deposit",
    icon: ["fas", "plus-circle"],
  },
  {
    name: "Withdraw",
    path: "/user/withdraw",
    icon: ["fas", "minus-circle"],
  },
  {
    name: "Swap",
    path: "/user/swap",
    icon: ["fas", "sync-alt"],
  },
  {
    name: "KYC Verification",
    path: "/user/kyc",
    icon: ["fas", "id-card"],
    badge: authStore.user?.kyc ? "✓" : "!",
  },
  {
    name: "Profile",
    path: "/user/profile",
    icon: ["fas", "user-cog"],
  },
]);

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path + "/");
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: authStore.user?.currency || "USD",
  }).format(amount);
};

const closeSidebar = () => {
  emit("close-sidebar");
};
</script>
