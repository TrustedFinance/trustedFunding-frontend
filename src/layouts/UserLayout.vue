<template>
  <div class="h-screen flex overflow-hidden bg-cool-light">
    <!-- Fixed Sidebar -->
    <UserSidebar
      :is-open="isSidebarOpen"
      @close-sidebar="closeSidebar"
      class="flex-shrink-0"
    />

    <!-- Main Area -->
    <div class="flex flex-col flex-1 min-w-0">
      <UserHeader @toggle-sidebar="toggleSidebar" />

      <!-- Scrollable Main Content -->
      <main class="flex-1 overflow-y-auto p-6">
       <router-view :key="$route.fullPath" />
      </main>

      <UserFooter />
    </div>

    <ToastContainer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserSidebar from "@/components/User/UserSidebar.vue"
import UserHeader from "@/components/User/UserHeader.vue"
import UserFooter from "@/components/User/UserFooter.vue"
import ToastContainer from "@/components/Atoms/ToastContainer.vue"

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>
