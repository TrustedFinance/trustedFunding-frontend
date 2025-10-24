<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Leaderboard</h1>
        <p class="text-gray-600">Top performing users by transaction volume</p>
      </div>
      <div class="flex space-x-3">
        <select v-model="filters.type" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="investment">Investments</option>
        </select>
        
        <input
          v-model="filters.limit"
          type="number"
          min="1"
          max="100"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-20"
          placeholder="Limit"
        >
      </div>
    </div>

    <!-- Leaderboard -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Volume
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transactions
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg. Transaction
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(user, index) in leaderboard" 
              :key="user.userId"
              :class="[
                'hover:bg-gray-50',
                index === 0 ? 'bg-yellow-50' : '',
                index === 1 ? 'bg-gray-50' : '',
                index === 2 ? 'bg-orange-50' : ''
              ]"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ user.name || 'Unknown User' }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ user.email }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">
                  ${{ user.totalVolume?.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.transactionCount }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  ${{ user.totalVolume && user.transactionCount ? 
                    (user.totalVolume / user.transactionCount).toLocaleString(undefined, { maximumFractionDigits: 2 }) 
                    : '0' 
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">Loading leaderboard...</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && leaderboard.length === 0" class="text-center py-8">
        <ClipboardDocumentListIcon class="h-12 w-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">No leaderboard data available</p>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-if="leaderboard.length > 0">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Top User Volume</p>
            <p class="text-2xl font-bold text-gray-900">
              ${{ leaderboard[0]?.totalVolume?.toLocaleString() || '0' }}
            </p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-full">
            <TrophyIcon class="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Volume</p>
            <p class="text-2xl font-bold text-gray-900">
              ${{ totalVolume.toLocaleString() }}
            </p>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <ChartBarIcon class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg. per User</p>
            <p class="text-2xl font-bold text-gray-900">
              ${{ averageVolume.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
            </p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <UsersIcon class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { adminAPI } from '@/api'
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const loading = ref(false)
const leaderboard = ref([])

const filters = reactive({
  type: '',
  limit: 20
})

const totalVolume = computed(() => {
  return leaderboard.value.reduce((sum, user) => sum + user.totalVolume, 0)
})

const averageVolume = computed(() => {
  return leaderboard.value.length > 0 ? totalVolume.value / leaderboard.value.length : 0
})

const fetchLeaderboard = async () => {
  try {
    loading.value = true
    const response = await adminAPI.getLeaderboard(filters)
    leaderboard.value = response.data?.leaderboard || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    // Mock data for demonstration
    leaderboard.value = [
      {
        userId: '1',
        name: 'John Doe',
        email: 'john@example.com',
        totalVolume: 150000,
        transactionCount: 45
      },
      {
        userId: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        totalVolume: 120000,
        transactionCount: 38
      },
      {
        userId: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        totalVolume: 98000,
        transactionCount: 32
      }
    ]
  } finally {
    loading.value = false
  }
}

watch(filters, () => {
  fetchLeaderboard()
})

onMounted(() => {
  fetchLeaderboard()
})
</script>