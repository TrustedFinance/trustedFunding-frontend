<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold text-highlight-text">Transaction History</h1>
        <p class="text-gray-600 mt-1">View all your deposit, withdrawal, and swap transactions</p>
      </div>
      <div class="flex space-x-3 mt-4 md:mt-0">
        <select
          v-model="filters.type"
          class="form-input text-sm"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="swap">Swap</option>
          <option value="investment">Investment</option>
        </select>
        <select
          v-model="filters.status"
          class="form-input text-sm"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="bg-white rounded-lg shadow-sm border border-silver-gray">
      <div v-if="transactions.length === 0" class="text-center py-12">
        <font-awesome-icon :icon="['fas', 'exchange-alt']" class="h-16 w-16 text-gray-300 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
        <p class="text-gray-600 mb-4">Start by making your first deposit or investment</p>
        <div class="space-x-3">
          <router-link to="/user/deposit" class="btn-primary">
            Make Deposit
          </router-link>
          <router-link to="/user/investments" class="btn-secondary">
            View Investments
          </router-link>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-silver-gray bg-cool-light">
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Type</th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Amount</th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Currency</th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Reference</th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="transaction in filteredTransactions"
              :key="transaction._id"
              class="hover:bg-gray-50"
            >
              <td class="py-4 px-6">
                <div class="flex items-center">
                  <div
                    :class="[
                      'p-2 rounded-lg mr-3',
                      getTransactionIcon(transaction.type).bg
                    ]"
                  >
                    <font-awesome-icon
                      :icon="getTransactionIcon(transaction.type).icon"
                      :class="getTransactionIcon(transaction.type).text"
                      class="h-4 w-4"
                    />
                  </div>
                  <span class="font-medium capitalize">{{ transaction.type }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <span
                  :class="[
                    'font-semibold',
                    getAmountColor(transaction.type, transaction.amount)
                  ]"
                >
                  {{ getAmountPrefix(transaction.type) }}{{ formatCurrency(Math.abs(transaction.amount)) }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-600">
                {{ transaction.currency || 'USDT' }}
              </td>
              <td class="py-4 px-6">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full font-medium',
                    getStatusClass(transaction.status)
                  ]"
                >
                  {{ transaction.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-600 font-mono">
                {{ transaction.reference }}
              </td>
              <td class="py-4 px-6 text-sm text-gray-600">
                {{ formatDate(transaction.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMoreTransactions" class="text-center">
      <button
        @click="loadMoreTransactions"
        :disabled="loading"
        class="btn-secondary"
      >
        <span v-if="loading" class="flex items-center">
          <div class="loading-spinner mr-2"></div>
          Loading...
        </span>
        <span v-else>Load More Transactions</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { transactionAPI } from '@/services/api'

const authStore = useAuthStore()
const transactions = ref([])
const loading = ref(false)
const hasMoreTransactions = ref(true)
const page = ref(1)

const filters = ref({
  type: '',
  status: ''
})

// Computed properties
const filteredTransactions = computed(() => {
  let filtered = transactions.value

  if (filters.value.type) {
    filtered = filtered.filter(t => t.type === filters.value.type)
  }

  if (filters.value.status) {
    filtered = filtered.filter(t => t.status === filters.value.status)
  }

  return filtered
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: authStore.user?.currency || 'USD'
  }).format(amount)
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTransactionIcon = (type) => {
  const icons = {
    deposit: { icon: ['fas', 'arrow-down'], bg: 'bg-green-100', text: 'text-green-600' },
    withdrawal: { icon: ['fas', 'arrow-up'], bg: 'bg-red-100', text: 'text-red-600' },
    swap: { icon: ['fas', 'sync-alt'], bg: 'bg-blue-100', text: 'text-blue-600' },
    investment: { icon: ['fas', 'chart-line'], bg: 'bg-purple-100', text: 'text-purple-600' },
    receive: { icon: ['fas', 'download'], bg: 'bg-green-100', text: 'text-green-600' },
    payout: { icon: ['fas', 'money-bill-wave'], bg: 'bg-green-100', text: 'text-green-600' }
  }
  return icons[type] || { icon: ['fas', 'exchange-alt'], bg: 'bg-gray-100', text: 'text-gray-600' }
}

const getAmountColor = (type, amount) => {
  if (type === 'deposit' || type === 'receive' || type === 'payout') return 'text-green-600'
  if (type === 'withdrawal' || type === 'investment') return 'text-red-600'
  return 'text-blue-600'
}

const getAmountPrefix = (type) => {
  if (type === 'deposit' || type === 'receive' || type === 'payout') return '+'
  if (type === 'withdrawal' || type === 'investment') return '-'
  return ''
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadTransactions = async (pageNum = 1) => {
  try {
    loading.value = true
    const response = await transactionAPI.getUserTransactions()
    if (pageNum === 1) {
      transactions.value = response.data
    } else {
      transactions.value = [...transactions.value, ...response.data]
    }
    
    // Simple pagination - assume no more if less than 100 transactions
    hasMoreTransactions.value = response.data.length === 100
  } catch (error) {
    console.error('Failed to load transactions:', error)
  } finally {
    loading.value = false
  }
}

const loadMoreTransactions = async () => {
  page.value += 1
  await loadTransactions(page.value)
}

onMounted(() => {
  loadTransactions()
})
</script>