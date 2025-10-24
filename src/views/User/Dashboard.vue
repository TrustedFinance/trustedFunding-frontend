<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div
      class="bg-gradient-to-r from-primary-blue to-dark-navy rounded-lg p-6 text-white"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h1 class="text-2xl font-bold">
            Welcome back, {{ authStore.user?.name }}! 👋
          </h1>
          <p class="text-blue-100 mt-1">Here's your investment overview</p>
        </div>
        <div class="mt-4 md:mt-0 text-right">
          <p class="text-sm text-blue-200">Account Status</p>
          <div class="flex items-center space-x-2 mt-1">
            <div class="h-2 w-2 bg-green-400 rounded-full"></div>
            <span class="text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Balance -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'wallet']"
              class="h-6 w-6 text-primary-blue"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Balance</p>
            <p class="text-2xl font-bold text-highlight-text">
              {{ formatCurrency(authStore.user?.balance || 0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Earned -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              class="h-6 w-6 text-green-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Earned</p>
            <p class="text-2xl font-bold text-green-600">
              {{ formatCurrency(authStore.user?.stats?.totalEarned || 0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Active Investments -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'gem']"
              class="h-6 w-6 text-purple-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Investments</p>
            <p class="text-2xl font-bold text-highlight-text">
              {{ activeInvestmentsCount }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Trades -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'exchange-alt']"
              class="h-6 w-6 text-orange-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Trades</p>
            <p class="text-2xl font-bold text-highlight-text">
              {{ authStore.user?.stats?.trades || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions Card -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
        <h3 class="text-lg font-semibold text-highlight-text mb-4">
          Quick Actions
        </h3>
        <div class="space-y-3">
          <router-link
            to="/user/deposit"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light transition-colors duration-200"
          >
            <font-awesome-icon
              :icon="['fas', 'plus-circle']"
              class="h-5 w-5 text-green-600 mr-3"
            />
            <span class="font-medium">Deposit Funds</span>
          </router-link>
          <router-link
            to="/user/investments"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light transition-colors duration-200"
          >
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              class="h-5 w-5 text-primary-blue mr-3"
            />
            <span class="font-medium">Start Investing</span>
          </router-link>
          <router-link
            to="/user/withdraw"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light transition-colors duration-200"
          >
            <font-awesome-icon
              :icon="['fas', 'minus-circle']"
              class="h-5 w-5 text-orange-600 mr-3"
            />
            <span class="font-medium">Withdraw Funds</span>
          </router-link>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div
        class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray lg:col-span-2"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-highlight-text">
            Recent Transactions
          </h3>
          <router-link
            to="/user/transactions"
            class="text-sm text-primary-blue hover:text-dark-navy"
          >
            View All
          </router-link>
        </div>
        <div
          v-if="recentTransactions.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <font-awesome-icon
            :icon="['fas', 'exchange-alt']"
            class="h-12 w-12 text-gray-300 mb-3"
          />
          <p>No transactions yet</p>
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="transaction in recentTransactions"
            :key="transaction._id"
            class="flex items-center justify-between p-3 border border-silver-gray rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  'p-2 rounded-lg',
                  transaction.type === 'deposit'
                    ? 'bg-green-100 text-green-600'
                    : transaction.type === 'withdrawal'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600',
                ]"
              >
                <font-awesome-icon
                  :icon="[
                    'fas',
                    transaction.type === 'deposit'
                      ? 'arrow-down'
                      : transaction.type === 'withdrawal'
                      ? 'arrow-up'
                      : 'sync-alt',
                  ]"
                  class="h-4 w-4"
                />
              </div>
              <div>
                <p class="font-medium text-sm capitalize">
                  {{ transaction.type }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatTime(transaction.createdAt) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p
                :class="[
                  'font-semibold',
                  transaction.type === 'deposit'
                    ? 'text-green-600'
                    : transaction.type === 'withdrawal'
                    ? 'text-red-600'
                    : 'text-blue-600',
                ]"
              >
                {{ getAmountPrefix(transaction.type)
                }}{{ formatCurrency(Math.abs(transaction.amount)) }}
              </p>
              <p class="text-xs text-gray-500">
                {{ transaction.currency || "USDT" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Investments -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-highlight-text">
          Active Investments
        </h3>
        <router-link
          to="/user/investments"
          class="text-sm text-primary-blue hover:text-dark-navy"
        >
          View All
        </router-link>
      </div>
      <div
        v-if="activeInvestments.length === 0"
        class="text-center py-8 text-gray-500"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-line']"
          class="h-12 w-12 text-gray-300 mb-3"
        />
        <p>No active investments</p>
        <router-link
          to="/user/investments"
          class="inline-block mt-3 btn-primary"
        >
          Start Investing
        </router-link>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="investment in activeInvestments"
          :key="investment._id"
          class="border border-silver-gray rounded-lg p-4"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-semibold text-highlight-text">
              {{ investment.plan?.name }}
            </h4>
            <span
              class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >Active</span
            >
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Invested:</span>
              <span class="font-medium">{{
                formatCurrency(investment.amount)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Payout:</span>
              <span class="font-medium text-green-600">{{
                formatCurrency(investment.payoutAmount)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Ends in:</span>
              <span class="font-medium"
                >{{ getDaysRemaining(investment.endAt) }} days</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { investmentAPI, transactionAPI } from "@/services/api";

const authStore = useAuthStore();
const investments = ref([]);
const transactions = ref([]);

// Computed properties
const activeInvestments = computed(() => {
  return investments.value.filter((inv) => inv.status === "active");
});

const activeInvestmentsCount = computed(() => activeInvestments.value.length);

const recentTransactions = computed(() => {
  return transactions.value.slice(0, 5); // Show last 5 transactions
});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: authStore.user?.currency || "USD",
  }).format(amount);
};

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDaysRemaining = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const getAmountPrefix = (type) => {
  if (type === "deposit" || type === "receive" || type === "payout") return "+";
  if (type === "withdrawal" || type === "investment") return "-";
  return "";
};

// Load data
const loadInvestments = async () => {
  try {
    const response = await investmentAPI.getUserInvestments();
    investments.value = response.data;
  } catch (error) {
    console.error("Failed to load investments:", error);
  }
};

const loadTransactions = async () => {
  try {
    const response = await transactionAPI.getUserTransactions();
    transactions.value = response.data;
  } catch (error) {
    console.error("Failed to load transactions:", error);
  }
};

onMounted(async () => {
  await Promise.all([loadInvestments(), loadTransactions()]);
});
</script>
