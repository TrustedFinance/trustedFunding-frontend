<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <AdminSidebar 
      :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
      class="fixed inset-y-0 left-0 z-50 lg:static lg:inset-0 transform transition-transform duration-300 ease-in-out"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <AdminHeader @toggle-sidebar="toggleSidebar" />

      <!-- Main Content Area -->
      <main class="flex-1 overflow-auto">
        <div class="p-4 sm:p-6 lg:p-8">
          <router-view />
        </div>
      </main>

      <!-- Footer -->
      <AdminFooter @refresh-data="handleRefreshData" />
    </div>

    <!-- Mobile Sidebar Backdrop -->
    <div 
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import AdminFooter from '@/components/Admin/AdminFooter.vue'

const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)

// Check if user is admin
onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    router.push('/admin/login')
  }
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleRefreshData = () => {
  // This will be handled by individual components
  window.dispatchEvent(new CustomEvent('admin-refresh-data'))
}

// Close sidebar on route change (mobile)
const unwatch = router.afterEach(() => {
  if (isSidebarOpen.value) {
    isSidebarOpen.value = false
  }
})

onUnmounted(() => {
  unwatch()
})
</script>