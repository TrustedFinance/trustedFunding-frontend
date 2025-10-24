<template>
  <aside class="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
    <div class="flex items-center justify-between h-16 px-4 border-b border-gray-700">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <i class="fas fa-cog text-white text-sm"></i>
        </div>
        <span class="text-xl font-bold">Admin Panel</span>
      </div>
      <button 
        @click="toggleSidebar"
        class="lg:hidden p-1 rounded-md hover:bg-gray-700"
      >
        <i class="fas fa-bars h-5 w-5 text-gray-300"></i>
      </button>
    </div>

    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white text-sm"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ admin?.name || 'Admin User' }}</p>
          <p class="text-xs text-gray-400 truncate">{{ admin?.email || 'admin@example.com' }}</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto py-4">
      <div class="px-4 space-y-2">
        <div v-for="section in navigationSections" :key="section.name">
          <p v-if="section.heading" class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {{ section.heading }}
          </p>
          <div class="space-y-1">
            <router-link
              v-for="item in section.items"
              :key="item.name"
              :to="item.href"
              :class="[
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                $route.path === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
            >
              <i
                :class="[
                  'mr-3 h-5 w-5 flex-shrink-0 flex items-center justify-center',
                  $route.path === item.href ? 'text-white' : 'text-gray-400 group-hover:text-white',
                  item.icon
                ]"
              ></i>
              {{ item.name }}
              <span 
                v-if="item.badge && pendingData[item.badgeKey]"
                class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                {{ pendingData[item.badgeKey] }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="p-4 border-t border-gray-700">
      <div class="text-xs text-gray-400 space-y-1">
        <div class="flex justify-between">
          <span>Pending Deposits:</span>
          <span class="text-yellow-400">{{ pendingData.pendingDeposits || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span>Pending Withdrawals:</span>
          <span class="text-yellow-400">{{ pendingData.pendingWithdrawals || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span>Due Investments:</span>
          <span class="text-red-400">{{ pendingData.dueInvestments || 0 }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { adminAPI } from '@/services/api'



const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const pendingData = ref({})
const loading = ref(false)

// Admin data from auth store
const admin = computed(() => authStore.user)

// Navigation structure with FontAwesome icons
const navigationSections = computed(() => [
  {
    items: [
      { 
        name: 'Dashboard', 
        href: '/admin/dashboard', 
        icon: 'fas fa-home'
      }
    ]
  },
  {
    heading: 'Management',
    items: [
      { 
        name: 'Users', 
        href: '/admin/users', 
        icon: 'fas fa-users'
      },
      { 
        name: 'Investment Plans', 
        href: '/admin/plans', 
        icon: 'fas fa-chart-line'
      },
      { 
        name: 'Transactions', 
        href: '/admin/transactions', 
        icon: 'fas fa-money-bill-transfer',
        badge: true,
        badgeKey: 'pendingTransactions'
      },
      { 
        name: 'Investments', 
        href: '/admin/investments', 
        icon: 'fas fa-chart-pie'
      }
    ]
  },
  {
    heading: 'Reports',
    items: [
      { 
        name: 'Leaderboard', 
        href: '/admin/leaderboard', 
        icon: 'fas fa-trophy'
      }
    ]
  }
])

// Fetch pending data from existing endpoint
const fetchPendingData = async () => {
  try {
    loading.value = true
    const response = await adminAPI.getPendingAndDue()
    
    if (response.data) {
      pendingData.value = {
        pendingDeposits: response.data.summary?.pendingDeposits || 0,
        pendingWithdrawals: response.data.summary?.pendingWithdrawals || 0,
        dueInvestments: response.data.summary?.dueInvestments || 0,
        pendingTransactions: (response.data.summary?.pendingDeposits || 0) + (response.data.summary?.pendingWithdrawals || 0)
      }
    }
  } catch (error) {
    console.error('Error fetching pending data:', error)
  } finally {
    loading.value = false
  }
}

// Toggle sidebar for mobile
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// Refresh data periodically
onMounted(() => {
  fetchPendingData()
  // Refresh every 30 seconds
  setInterval(fetchPendingData, 30000)
})

const emit = defineEmits(['toggle-sidebar'])
</script>