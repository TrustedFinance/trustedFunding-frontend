<template>
  <header class="bg-white  border-b border-silver-gray">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left: Mobile Menu Button -->
        <div class="flex items-center lg:hidden">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md text-gray-400 hover:text-highlight-text hover:bg-cool-light"
          >
            <font-awesome-icon :icon="['fas', 'bars']" class="h-5 w-5" />
          </button>
        </div>

        <!-- Center: Balance and Quick Stats -->
        <div class="hidden md:flex items-center space-x-6">
          <div class="text-center">
            <p class="text-xs text-gray-500">Total Balance</p>
            <p class="text-lg font-semibold text-highlight-text">
              {{ formatCurrency(user?.balance || 0) }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-500">Total Earned</p>
            <p class="text-lg font-semibold text-green-600">
              {{ formatCurrency(user?.stats?.totalEarned || 0) }}
            </p>
          </div>
        </div>

        <!-- Right: User Menu and Notifications -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button
            @click="toggleNotifications"
            class="relative p-2 rounded-md text-gray-400 hover:text-highlight-text hover:bg-cool-light"
          >
            <font-awesome-icon :icon="['fas', 'bell']" class="h-5 w-5" />
            <span
              v-if="unreadNotifications > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-cool-light"
            >
              <div class="h-8 w-8 bg-primary-blue rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold">
                  {{ getUserInitials }}
                </span>
              </div>
              <span class="hidden sm:block text-sm font-medium text-highlight-text">
                {{ user?.name }}
              </span>
              <font-awesome-icon :icon="['fas', 'chevron-down']" class="h-4 w-4 text-gray-400" />
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md py-1 z-50 border border-silver-gray"
            >
              <router-link
                to="/user/profile"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-cool-light"
                @click="showUserMenu = false"
              >
                <font-awesome-icon :icon="['fas', 'user']" class="mr-3 h-4 w-4" />
                Profile
              </router-link>
              <router-link
                to="/user/kyc"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-cool-light"
                @click="showUserMenu = false"
              >
                <font-awesome-icon :icon="['fas', 'id-card']" class="mr-3 h-4 w-4" />
                KYC Verification
              </router-link>
              <div class="border-t border-gray-100 my-1"></div>
              <button
                @click="handleLogout"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-3 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Panel -->
    <div
      v-if="showNotifications"
      class="absolute right-4 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-silver-gray max-h-96 overflow-y-auto"
    >
      <div class="p-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-highlight-text">Notifications</h3>
          <button
            @click="markAllAsRead"
            class="text-sm text-primary-blue hover:text-dark-navy"
          >
            Mark all as read
          </button>
        </div>
      </div>
      <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
        No notifications
      </div>
      <div v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[ 'p-4 border-b border-gray-100 hover:bg-cool-light cursor-pointer', { 'bg-blue-50': !notification.read } ]"
          @click="markAsRead(notification.id)"
        >
          <p class="text-sm text-gray-800">{{ notification.message }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ formatTime(notification.createdAt) }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { notificationAPI } from '@/services/api'

const authStore = useAuthStore()
const { user, isAuthenticated, isAdmin } = storeToRefs(authStore)
const router = useRouter()

const showUserMenu = ref(false)
const showNotifications = ref(false)
const notifications = ref([])

// Computed
const getUserInitials = computed(() => {
  const name = user.value?.name || ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const unreadNotifications = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const toggleNotifications = async () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
  
  if (showNotifications.value && notifications.value.length === 0) {
    await loadNotifications()
  }
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const handleLogout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/') // ✅ immediately redirect after logout
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: user.value?.currency || 'USD'
  }).format(amount)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadNotifications = async () => {
  try {
    const response = await notificationAPI.getUserNotifications({ unreadOnly: false })
    notifications.value = response.data.notifications || []
  } catch (error) {
    console.error('Failed to load notifications:', error)
  }
}

const markAsRead = async (notificationId) => {
  try {
    await notificationAPI.markAsRead(notificationId)
    await loadNotifications()
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
  }
}

const markAllAsRead = async () => {
  try {
    await notificationAPI.markAllAsRead()
    await loadNotifications()
  } catch (error) {
    console.error('Failed to mark all as read:', error)
  }
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
    showNotifications.value = false
  }
}

// 🔍 Watch auth changes — auto redirect if logged out
watch(isAuthenticated, (val) => {
  if (!val) router.push('/login')
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  loadNotifications()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits(['toggle-sidebar'])
</script>
