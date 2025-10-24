<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <!-- Left Section -->
      <div class="flex items-center">
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>
        
        <!-- Page Title -->
        <div class="ml-4 lg:ml-0">
          <h1 class="text-xl font-semibold text-gray-900">{{ pageTitle }}</h1>
          <p class="text-sm text-gray-500">{{ pageDescription }}</p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <div class="relative">
          <button 
            @click="toggleNotifications"
            class="p-2 text-gray-400 hover:text-gray-500 relative"
          >
            <BellIcon class="h-6 w-6" />
            <span 
              v-if="unreadNotifications > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <div 
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div class="p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Notifications</h3>
                <button 
                  @click="markAllAsRead"
                  class="text-sm text-blue-600 hover:text-blue-500"
                >
                  Mark all as read
                </button>
              </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div 
                v-for="notification in notifications"
                :key="notification._id"
                :class="[
                  'p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
                  !notification.read ? 'bg-blue-50' : ''
                ]"
                @click="handleNotificationClick(notification)"
              >
                <div class="flex items-start space-x-3">
                  <div 
                    :class="[
                      'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                      getNotificationColor(notification.type)
                    ]"
                  ></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ getNotificationTitle(notification.type) }}
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      {{ formatTime(notification.createdAt) }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                No notifications
              </div>
            </div>
            <div class="p-4 border-t border-gray-200">
              <router-link 
                to="/admin/notifications"
                class="block text-center text-sm text-blue-600 hover:text-blue-500"
              >
                View all notifications
              </router-link>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="relative">
          <button 
            @click="toggleUserMenu"
            class="flex items-center space-x-3 text-sm focus:outline-none"
          >
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <UserIcon class="h-5 w-5 text-white" />
            </div>
            <div class="hidden md:block text-left">
              <p class="font-medium text-gray-900">{{ admin?.name || 'Admin' }}</p>
              <p class="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDownIcon class="h-4 w-4 text-gray-400" />
          </button>

          <!-- User Dropdown -->
          <div 
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div class="p-4 border-b border-gray-200">
              <p class="text-sm font-medium text-gray-900">{{ admin?.name }}</p>
              <p class="text-sm text-gray-500 truncate">{{ admin?.email }}</p>
            </div>
            <div class="p-2">
              <button 
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Bar -->
    <div class="bg-gray-50 border-t border-gray-200" v-if="pendingData.pendingDeposits || pendingData.pendingWithdrawals">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-2">
          <div class="flex space-x-6 text-sm">
            <div class="flex items-center space-x-2" v-if="pendingData.pendingDeposits">
              <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span class="text-gray-600">Pending Deposits:</span>
              <span class="font-medium">{{ pendingData.pendingDeposits }}</span>
            </div>
            <div class="flex items-center space-x-2" v-if="pendingData.pendingWithdrawals">
              <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span class="text-gray-600">Pending Withdrawals:</span>
              <span class="font-medium">{{ pendingData.pendingWithdrawals }}</span>
            </div>
            <div class="flex items-center space-x-2" v-if="pendingData.dueInvestments">
              <span class="w-2 h-2 bg-red-400 rounded-full"></span>
              <span class="text-gray-600">Due Investments:</span>
              <span class="font-medium">{{ pendingData.dueInvestments }}</span>
            </div>
          </div>
          <div class="text-xs text-gray-500">
            Last updated: {{ lastUpdated }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { notificationAPI, adminAPI } from '@/services/api'
import {
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showNotifications = ref(false)
const showUserMenu = ref(false)
const notifications = ref([])
const pendingData = ref({})
const lastUpdated = ref('')

const admin = computed(() => authStore.user)

// Page title based on current route
const pageTitle = computed(() => {
  const routeNames = {
    '/admin/dashboard': 'Dashboard',
    '/admin/users': 'User Management',
    '/admin/plans': 'Investment Plans',
    '/admin/transactions': 'Transaction Management',
    '/admin/investments': 'Investment Management',
    '/admin/leaderboard': 'Leaderboard'
  }
  return routeNames[route.path] || 'Admin Panel'
})

const pageDescription = computed(() => {
  const descriptions = {
    '/admin/dashboard': 'Overview of system statistics and performance',
    '/admin/users': 'Manage user accounts and permissions',
    '/admin/plans': 'Create and manage investment plans',
    '/admin/transactions': 'Approve and monitor transactions',
    '/admin/investments': 'Track and manage user investments',
    '/admin/leaderboard': 'View top performing users'
  }
  return descriptions[route.path] || 'Administration panel'
})

const unreadNotifications = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Fetch notifications from existing endpoint
const fetchNotifications = async () => {
  try {
    const response = await notificationAPI.getUserNotifications({
      unreadOnly: false,
      limit: 5
    })
    notifications.value = response.data.notifications || []
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

// Fetch pending data from existing endpoint
const fetchPendingData = async () => {
  try {
    const response = await adminAPI.getPendingAndDue()
    if (response.data) {
      pendingData.value = {
        pendingDeposits: response.data.summary?.pendingDeposits || 0,
        pendingWithdrawals: response.data.summary?.pendingWithdrawals || 0,
        dueInvestments: response.data.summary?.dueInvestments || 0
      }
      lastUpdated.value = new Date().toLocaleTimeString()
    }
  } catch (error) {
    console.error('Error fetching pending data:', error)
  }
}

// Toggle functions
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
  if (showNotifications.value) {
    fetchNotifications()
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// Notification handlers
const markAllAsRead = async () => {
  try {
    await notificationAPI.markAllAsRead()
    await fetchNotifications()
  } catch (error) {
    console.error('Error marking notifications as read:', error)
  }
}

const handleNotificationClick = async (notification) => {
  if (!notification.read) {
    try {
      await notificationAPI.markAsRead(notification._id)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }
  
  // Handle notification action based on type
  switch (notification.type) {
    case 'deposit':
      router.push('/admin/transactions?filter=pending&type=deposit')
      break
    case 'withdrawal':
      router.push('/admin/transactions?filter=pending&type=withdrawal')
      break
    case 'investment':
      router.push('/admin/investments')
      break
  }
  
  showNotifications.value = false
}

// Utility functions
const getNotificationColor = (type) => {
  const colors = {
    deposit: 'bg-green-400',
    withdrawal: 'bg-blue-400',
    investment: 'bg-purple-400',
    system: 'bg-gray-400',
    alert: 'bg-red-400'
  }
  return colors[type] || 'bg-gray-400'
}

const getNotificationTitle = (type) => {
  const titles = {
    deposit: 'New Deposit Request',
    withdrawal: 'New Withdrawal Request',
    investment: 'Investment Update',
    system: 'System Notification'
  }
  return titles[type] || 'Notification'
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/admin/login')
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

// Refresh data periodically
let dataInterval

onMounted(() => {
  fetchPendingData()
  fetchNotifications()
  
  document.addEventListener('click', handleClickOutside)
  
  dataInterval = setInterval(fetchPendingData, 30000) // Refresh every 30 seconds
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  clearInterval(dataInterval)
})

const emit = defineEmits(['toggle-sidebar'])
</script>