<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Transaction Management</h1>
        <p class="text-gray-600">Approve and monitor all transactions</p>
      </div>

      <!-- Search -->
      <div class="flex space-x-3">
        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search transactions..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <MagnifyingGlassIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          />
        </div>

        <button
          @click="fetchTransactions"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Refreshing..." : "Refresh" }}
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="flex flex-wrap gap-4 items-center">
        <select
          v-model="filters.type"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="investment">Investments</option>
        </select>

        <select
          v-model="filters.status"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

        <select
          v-model="filters.currency"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Currencies</option>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>

        <button
          v-if="filters.type || filters.status || filters.currency || filters.search"
          @click="clearFilters"
          class="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900 capitalize">
                    {{ transaction.type }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ transaction.reference }}
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ transaction.user }}</div>
                <div class="text-sm text-gray-500">{{ transaction.email }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ transaction.amount }} {{ transaction.currency }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(transaction.status)
                  ]"
                >
                  {{ transaction.status }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(transaction.createdAt) }}
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div
                  class="flex space-x-2"
                  v-if="transaction.status === 'pending' && transaction.type !== 'investment'"
                >
                  <button
                    v-if="transaction.type === 'withdrawal'"
                    @click="approveWithdrawal(transaction.id)"
                    class="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    v-if="transaction.type === 'deposit'"
                    @click="approveDeposit(transaction.id)"
                    class="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    @click="rejectTransaction(transaction)"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                  >
                    Reject
                  </button>
                </div>
                <span v-else class="text-gray-400">No actions</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">Loading transactions...</p>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && transactions.length === 0"
        class="text-center py-8"
      >
        <CurrencyDollarIcon class="h-12 w-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">No transactions found</p>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination.total > 0"
        class="px-6 py-4 border-t border-gray-200"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ pagination.from }} to {{ pagination.to }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page === pagination.pages"
              class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { adminAPI } from "@/services/api";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const transactions = ref([]);

const filters = reactive({
  type: route.query.type || "",
  status: route.query.status || "",
  currency: "",
  search: "",
});

const pagination = reactive({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0,
  from: 0,
  to: 0,
});

const fetchTransactions = async () => {
  try {
    loading.value = true;

    const response = await adminAPI.getAllTransactions({
      page: pagination.page,
      limit: pagination.limit,
      type: filters.type || undefined,
      status: filters.status || undefined,
      currency: filters.currency || undefined,
      search: filters.search || undefined,
    });

    if (response.data) {
      const { results, total, pages } = response.data;
      transactions.value = results || [];
      pagination.total = total || 0;
      pagination.pages = pages || 0;
      pagination.from = (pagination.page - 1) * pagination.limit + 1;
      pagination.to = Math.min(pagination.page * pagination.limit, pagination.total);
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    loading.value = false;
  }
};

const approveWithdrawal = async (id) => {
  try {
    await adminAPI.approveWithdrawal(id);
    fetchTransactions();
  } catch (error) {
    console.error("Error approving withdrawal:", error);
  }
};

const approveDeposit = async (id) => {
  try {
    await adminAPI.approveDeposit(id);
    fetchTransactions();
  } catch (error) {
    console.error("Error approving deposit:", error);
  }
};

const rejectTransaction = async (t) => {
  try {
    if (t.type === "withdrawal") await adminAPI.rejectWithdrawal(t.id);
    if (t.type === "deposit") await adminAPI.rejectDeposit(t.id);
    fetchTransactions();
  } catch (error) {
    console.error("Error rejecting transaction:", error);
  }
};

const getStatusClass = (status) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
};

const formatDate = (d) => new Date(d).toLocaleDateString();

const nextPage = () => {
  if (pagination.page < pagination.pages) {
    pagination.page++;
    fetchTransactions();
  }
};

const previousPage = () => {
  if (pagination.page > 1) {
    pagination.page--;
    fetchTransactions();
  }
};

const clearFilters = () => {
  filters.type = "";
  filters.status = "";
  filters.currency = "";
  filters.search = "";
  router.replace({ query: {} });
  fetchTransactions();
};

// Sync filters with URL
watch(filters, () => {
  pagination.page = 1;
  router.replace({ query: { ...filters } });
  fetchTransactions();
});

onMounted(() => {
  fetchTransactions();
});
</script>
