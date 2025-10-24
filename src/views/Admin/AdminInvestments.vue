<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Investment Management</h1>
        <p class="text-gray-600">Monitor and manage all user investments</p>
      </div>
      <div class="flex space-x-3">
        <select v-model="filters.status" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Investments Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Investment
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payout
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="investment in investments" :key="investment._id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    INV-{{ investment._id.slice(-6).toUpperCase() }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(investment.startAt) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ investment.user?.name }}</div>
                <div class="text-sm text-gray-500">{{ investment.user?.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ investment.plan?.name }}</div>
                <div class="text-sm text-gray-500">{{ investment.durationDays }} days</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  ${{ investment.amount?.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-green-600">
                  ${{ investment.payoutAmount?.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(investment.status)
                  ]"
                >
                  {{ investment.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  Ends: {{ formatDate(investment.endAt) }}
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    :class="[
                      'h-2 rounded-full',
                      getProgressBarClass(investment.status)
                    ]"
                    :style="{ width: calculateProgress(investment) + '%' }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ calculateProgress(investment) }}% complete
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">Loading investments...</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && investments.length === 0" class="text-center py-8">
        <ChartBarIcon class="h-12 w-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">No investments found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { adminAPI } from '@/services/api'


const loading = ref(false)
const investments = ref([])

const filters = reactive({
  status: ''
})

const fetchInvestments = async () => {
  try {
    loading.value = true
    const response = await adminAPI.getAllInvestments()
    investments.value = response.data || []
    
    // Apply filters
    if (filters.status) {
      investments.value = investments.value.filter(inv => inv.status === filters.status)
    }
  } catch (error) {
    console.error('Error fetching investments:', error)
    // Mock data for demonstration
    investments.value = [
      {
        _id: '1',
        user: { name: 'John Doe', email: 'john@example.com' },
        plan: { name: 'Basic Plan' },
        amount: 1000,
        payoutAmount: 1500,
        durationDays: 30,
        status: 'active',
        startAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        endAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        user: { name: 'Jane Smith', email: 'jane@example.com' },
        plan: { name: 'Premium Plan' },
        amount: 5000,
        payoutAmount: 7500,
        durationDays: 60,
        status: 'completed',
        startAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        endAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  } finally {
    loading.value = false
  }
}

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getProgressBarClass = (status) => {
  const classes = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    cancelled: 'bg-red-500',
    pending: 'bg-yellow-500'
  }
  return classes[status] || 'bg-gray-500'
}

const calculateProgress = (investment) => {
  if (investment.status === 'completed') return 100
  if (investment.status === 'cancelled') return 0
  
  const start = new Date(investment.startAt).getTime()
  const end = new Date(investment.endAt).getTime()
  const now = Date.now()
  
  if (now >= end) return 100
  if (now <= start) return 0
  
  const total = end - start
  const elapsed = now - start
  return Math.min(100, Math.round((elapsed / total) * 100))
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

watch(filters, () => {
  fetchInvestments()
})

onMounted(() => {
  fetchInvestments()
})
</script>