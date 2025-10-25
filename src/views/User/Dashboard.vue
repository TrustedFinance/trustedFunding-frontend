<template>
  <div class="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
    <!-- Welcome Section -->
    <div
      class="bg-gradient-to-r from-primary-blue to-dark-navy rounded-xl p-4 sm:p-6 text-white overflow-hidden"
    >
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div class="flex-1 min-w-0">
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold truncate">
            Welcome back, {{ authStore.user?.name }}! 👋
          </h1>
          <p class="text-blue-100 mt-1 text-sm sm:text-base">Here's your investment overview</p>
        </div>
        <div class="flex-shrink-0">
          <p class="text-xs sm:text-sm text-blue-200">Account Status</p>
          <div class="flex items-center space-x-2 mt-1">
            <div class="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2  gap-3 sm:gap-4 lg:gap-6">
      <!-- Total Balance -->
      <div class="bg-white rounded-xl p-4 sm:p-6  border border-silver-gray ">
        <div class="flex items-start space-x-3 sm:space-x-4">
          <div class="flex-shrink-0 p-2 sm:p-3 bg-blue-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'wallet']"
              class="h-5 w-5 sm:h-6 sm:w-6 text-primary-blue"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Balance</p>
            <p class="text-lg sm:text-2xl font-bold text-highlight-text truncate">
              {{ formatCurrency(authStore.user?.balance || 0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Earned -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray ">
        <div class="flex items-start space-x-3 sm:space-x-4">
          <div class="flex-shrink-0 p-2 sm:p-3 bg-green-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              class="h-5 w-5 sm:h-6 sm:w-6 text-green-600"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Earned</p>
            <p class="text-lg sm:text-2xl font-bold text-green-600 truncate">
              {{ formatCurrency(authStore.user?.stats?.totalEarned || 0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Active Investments -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray ">
        <div class="flex items-start space-x-3 sm:space-x-4">
          <div class="flex-shrink-0 p-2 sm:p-3 bg-purple-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'gem']"
              class="h-5 w-5 sm:h-6 sm:w-6 text-purple-600"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Active Investments</p>
            <p class="text-lg sm:text-2xl font-bold text-highlight-text">
              {{ activeInvestmentsCount }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Trades -->
      <div class="bg-white rounded-xl p-4 sm:p-6  border border-silver-gray">
        <div class="flex items-start space-x-3 sm:space-x-4">
          <div class="flex-shrink-0 p-2 sm:p-3 bg-orange-100 rounded-lg">
            <font-awesome-icon
              :icon="['fas', 'exchange-alt']"
              class="h-5 w-5 sm:h-6 sm:w-6 text-orange-600"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Trades</p>
            <p class="text-lg sm:text-2xl font-bold text-highlight-text">
              {{ authStore.user?.stats?.trades || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Recent Transactions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Quick Actions Card -->
      <div class="bg-white rounded-xl p-4 sm:p-6  border border-silver-gray lg:col-span-1">
        <h3 class="text-base sm:text-lg font-semibold text-highlight-text mb-4">
          Quick Actions
        </h3>
        <div class="space-y-2 sm:space-y-3">
          <router-link
            to="/user/deposit"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light hover:border-green-600 transition-all duration-200 group"
          >
            <div class="flex-shrink-0">
              <font-awesome-icon
                :icon="['fas', 'plus-circle']"
                class="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span class="ml-3 font-medium text-sm sm:text-base">Deposit Funds</span>
          </router-link>
          <router-link
            to="/user/investments"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light hover:border-primary-blue transition-all duration-200 group"
          >
            <div class="flex-shrink-0">
              <font-awesome-icon
                :icon="['fas', 'chart-line']"
                class="h-5 w-5 text-primary-blue group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span class="ml-3 font-medium text-sm sm:text-base">Start Investing</span>
          </router-link>
          <router-link
            to="/user/withdraw"
            class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light hover:border-orange-600 transition-all duration-200 group"
          >
            <div class="flex-shrink-0">
              <font-awesome-icon
                :icon="['fas', 'minus-circle']"
                class="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span class="ml-3 font-medium text-sm sm:text-base">Withdraw Funds</span>
          </router-link>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div
        class="bg-white rounded-xl p-4 sm:p-6  border border-silver-gray lg:col-span-2"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base sm:text-lg font-semibold text-highlight-text">
            Recent Transactions
          </h3>
          <router-link
            to="/user/transactions"
            class="text-xs sm:text-sm text-primary-blue hover:text-dark-navy font-medium transition-colors duration-200"
          >
            View All →
          </router-link>
        </div>
        <div
          v-if="recentTransactions.length === 0"
          class="text-center py-8 sm:py-12 text-gray-500"
        >
          <font-awesome-icon
            :icon="['fas', 'exchange-alt']"
            class="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mb-3"
          />
          <p class="text-sm sm:text-base">No transactions yet</p>
        </div>
        <div v-else class="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
          <div
            v-for="transaction in recentTransactions"
            :key="transaction._id"
            class="flex items-center justify-between p-3 border border-silver-gray rounded-lg hover:bg-cool-light transition-colors duration-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <div
                :class="[
                  'flex-shrink-0 p-2 rounded-lg',
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
              <div class="min-w-0 flex-1">
                <p class="font-medium text-sm capitalize truncate">
                  {{ transaction.type }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ formatTime(transaction.createdAt) }}
                </p>
              </div>
            </div>
            <div class="text-right flex-shrink-0 ml-2">
              <p
                :class="[
                  'font-semibold text-sm sm:text-base',
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

    <!-- Wallet Balances -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray">
      <h3 class="text-base sm:text-lg font-semibold text-highlight-text mb-4">
        Wallet Balances
      </h3>

      <div
        v-if="Object.keys(walletBalances).length === 0"
        class="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base"
      >
        No wallet balances available
      </div>

      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        <div
          v-for="(amount, symbol) in walletBalances"
          :key="symbol"
          class="border border-silver-gray rounded-lg p-3 sm:p-4 text-center  hover:border-primary-blue transition-all duration-200"
        >
          <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{{ symbol }}</p>
          <p class="text-sm sm:text-base font-semibold text-highlight-text break-all">
            {{ formatCrypto(amount) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Active Investments -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base sm:text-lg font-semibold text-highlight-text">
          Active Investments
        </h3>
        <router-link
          to="/user/investments"
          class="text-xs sm:text-sm text-primary-blue hover:text-dark-navy font-medium transition-colors duration-200"
        >
          View All →
        </router-link>
      </div>
      <div
        v-if="activeInvestments.length === 0"
        class="text-center py-8 sm:py-12 text-gray-500"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-line']"
          class="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mb-3"
        />
        <p class="text-sm sm:text-base mb-4">No active investments</p>
        <router-link
          to="/user/investments"
          class="inline-block mt-3 btn-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg"
        >
          Start Investing
        </router-link>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="investment in activeInvestments"
          :key="investment._id"
          class="border border-silver-gray rounded-lg p-4  hover:border-primary-blue transition-all duration-200"
        >
          <div class="flex justify-between items-start mb-3 gap-2">
            <h4 class="font-semibold text-highlight-text text-sm sm:text-base flex-1 min-w-0 break-words">
              {{ investment.plan?.name }}
            </h4>
            <span
              class="flex-shrink-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap"
              >Active</span
            >
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs sm:text-sm gap-2">
              <span class="text-gray-600 flex-shrink-0">Invested:</span>
              <span class="font-medium text-right truncate">{{
                formatCurrency(investment.amount)
              }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm gap-2">
              <span class="text-gray-600 flex-shrink-0">Payout:</span>
              <span class="font-medium text-green-600 text-right truncate">{{
                formatCurrency(investment.payoutAmount)
              }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm gap-2">
              <span class="text-gray-600 flex-shrink-0">Ends in:</span>
              <span class="font-medium text-right whitespace-nowrap"
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
const walletBalances = computed(() => {
  return authStore.user?.balances || {};
});

const formatCrypto = (amount) => {
  if (amount === null || amount === undefined) return "0.00";
  // Show up to 8 decimals for precision, but trim trailing zeros
  return parseFloat(amount.toFixed(8)).toString();
};

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