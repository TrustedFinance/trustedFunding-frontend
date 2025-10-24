<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlight-text">Swap Assets</h1>
      <p class="text-gray-600 mt-1">
        Exchange between different cryptocurrencies
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Swap Form -->
      <div
        class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray lg:col-span-2"
      >
        <h2 class="text-lg font-semibold text-highlight-text mb-4">
          Swap Currencies
        </h2>

        <form @submit.prevent="handleSwap" class="space-y-4">
          <!-- From Currency -->
          <div class="space-y-3">
            <label class="form-label">From</label>
            <div class="flex space-x-3">
              <select
                v-model="swapData.fromCurrency"
                @change="updateToCurrencyOptions"
                class="form-input flex-1"
              >
                <option value="">Select Currency</option>
                <option
                  v-for="currency in availableCurrencies"
                  :key="currency"
                  :value="currency"
                  :disabled="currency === swapData.toCurrency"
                >
                  {{ currency }}
                </option>
              </select>
              <input
                v-model="swapData.fromAmount"
                type="number"
                step="0.000001"
                min="0"
                required
                class="form-input flex-1"
                placeholder="Amount"
                @input="calculateToAmount"
              />
            </div>
            <p class="text-xs text-gray-600" v-if="swapData.fromCurrency">
              Available:
              {{
                formatCurrency(
                  getWalletBalance(swapData.fromCurrency),
                  swapData.fromCurrency
                )
              }}
            </p>
          </div>

          <!-- Swap Icon -->
          <div class="flex justify-center">
            <button
              type="button"
              @click="swapCurrencies"
              class="p-2 bg-cool-light rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <font-awesome-icon
                :icon="['fas', 'exchange-alt']"
                class="h-5 w-5 text-gray-600"
              />
            </button>
          </div>

          <!-- To Currency -->
          <div class="space-y-3">
            <label class="form-label">To</label>
            <div class="flex space-x-3">
              <select
                v-model="swapData.toCurrency"
                @change="calculateToAmount"
                class="form-input flex-1"
              >
                <option value="">Select Currency</option>
                <option
                  v-for="currency in toCurrencyOptions"
                  :key="currency"
                  :value="currency"
                  :disabled="currency === swapData.fromCurrency"
                >
                  {{ currency }}
                </option>
              </select>
              <input
                v-model="swapData.toAmount"
                type="number"
                step="0.000001"
                min="0"
                required
                class="form-input flex-1"
                placeholder="Amount"
                readonly
              />
            </div>
            <p
              class="text-xs text-gray-600"
              v-if="swapData.toCurrency && swapData.toAmount"
            >
              You will receive:
              {{ formatCurrency(swapData.toAmount, swapData.toCurrency) }}
            </p>
          </div>

          <!-- Exchange Rate -->
          <div
            v-if="
              swapData.fromCurrency && swapData.toCurrency && exchangeRate > 0
            "
            class="bg-cool-light rounded-lg p-4"
          >
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-600">Exchange Rate:</span>
              <span class="font-medium">
                1 {{ swapData.fromCurrency }} = {{ exchangeRate.toFixed(6) }}
                {{ swapData.toCurrency }}
              </span>
            </div>
          </div>

          <!-- Insufficient Balance Warning -->
          <div
            v-if="hasInsufficientBalance"
            class="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'exclamation-triangle']"
                class="h-5 w-5 text-red-600 mr-2"
              />
              <p class="text-sm text-red-800">
                Insufficient {{ swapData.fromCurrency }} balance
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading || !isValidSwap"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="loading-spinner mr-2"></div>
              Processing Swap...
            </span>
            <span v-else>Confirm Swap</span>
          </button>
        </form>
      </div>

      <!-- Wallet Balances & History -->
      <div class="space-y-6">
        <!-- Wallet Balances -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Your Balances
          </h3>
          <div class="space-y-3">
            <div
              v-for="currency in availableCurrencies"
              :key="currency"
              class="flex justify-between items-center p-3 border border-silver-gray rounded-lg"
            >
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center mr-3"
                >
                  <span class="text-white text-xs font-bold">{{
                    currency.slice(0, 2)
                  }}</span>
                </div>
                <span class="font-medium">{{ currency }}</span>
              </div>
              <span class="font-semibold text-highlight-text">
                {{ formatCurrency(getWalletBalance(currency), currency) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Swaps -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Recent Swaps
          </h3>
          <div
            v-if="recentSwaps.length === 0"
            class="text-center py-4 text-gray-500"
          >
            <p class="text-sm">No recent swaps</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="swap in recentSwaps"
              :key="swap._id"
              class="flex justify-between items-center p-3 border border-silver-gray rounded-lg"
            >
              <div>
                <p class="font-medium text-sm">
                  {{ swap.amount }} {{ swap.currency }} →
                  {{ swap.meta?.toAmount }} {{ swap.meta?.toCurrency }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatTime(swap.createdAt) }}
                </p>
              </div>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {{ swap.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { transactionAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const authStore = useAuthStore();
const toast = useToast();

// Use reactive for the form data to avoid ref nesting issues
const swapData = reactive({
  fromCurrency: "",
  toCurrency: "",
  fromAmount: "",
  toAmount: "",
});

const loading = ref(false);
const recentSwaps = ref([]);

// Available currencies based on backend wallet structure
const availableCurrencies = ref(["USDT", "BTC", "ETH", "BNB"]);
const toCurrencyOptions = ref([]);

// Exchange rates (simplified - in real app, fetch from API)
const exchangeRates = ref({
  USDT_BTC: 0.000025,
  USDT_ETH: 0.0004,
  USDT_BNB: 0.003,
  BTC_USDT: 40000,
  BTC_ETH: 16,
  BTC_BNB: 120,
  ETH_USDT: 2500,
  ETH_BTC: 0.0625,
  ETH_BNB: 7.5,
  BNB_USDT: 333,
  BNB_BTC: 0.0083,
  BNB_ETH: 0.133,
});

// Computed properties - FIXED: Added proper null checks
const exchangeRate = computed(() => {
  if (!swapData.fromCurrency || !swapData.toCurrency) return 0;
  const rateKey = `${swapData.fromCurrency}_${swapData.toCurrency}`;
  return exchangeRates.value[rateKey] || 0;
});

const hasInsufficientBalance = computed(() => {
  if (!swapData.fromCurrency || !swapData.fromAmount) return false;
  const balance = getWalletBalance(swapData.fromCurrency);
  const fromAmount = parseFloat(swapData.fromAmount);
  return isNaN(fromAmount) ? false : fromAmount > balance;
});

const isValidSwap = computed(() => {
  const fromAmount = parseFloat(swapData.fromAmount);
  const toAmount = parseFloat(swapData.toAmount);

  return (
    swapData.fromCurrency &&
    swapData.toCurrency &&
    !isNaN(fromAmount) &&
    fromAmount > 0 &&
    !isNaN(toAmount) &&
    toAmount > 0 &&
    !hasInsufficientBalance.value
  );
});

// Methods
const formatCurrency = (amount, currency = "USD") => {
  if (isNaN(amount)) amount = 0;

  if (currency === "BTC" || currency === "ETH" || currency === "BNB") {
    return `${parseFloat(amount).toFixed(6)} ${currency}`;
  }

  // For USDT, format as currency
  if (currency === "USDT") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return `${parseFloat(amount).toFixed(2)} ${currency}`;
};

const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getWalletBalance = (currency) => {
  // Backend uses user.wallets Map structure - handle both Map and object
  const user = authStore.user;
  if (!user) return 0;

  // Check if wallets is a Map or plain object
  if (user.wallets instanceof Map) {
    return user.wallets.get(currency) || 0;
  } else if (typeof user.wallets === "object") {
    return user.wallets[currency] || 0;
  }

  return 0;
};

const calculateToAmount = () => {
  if (!swapData.fromCurrency || !swapData.toCurrency || !swapData.fromAmount) {
    swapData.toAmount = "";
    return;
  }

  const fromAmount = parseFloat(swapData.fromAmount);
  if (isNaN(fromAmount) || fromAmount <= 0) {
    swapData.toAmount = "";
    return;
  }

  const rateKey = `${swapData.fromCurrency}_${swapData.toCurrency}`;
  const rate = exchangeRates.value[rateKey] || 0;
  swapData.toAmount = (fromAmount * rate).toFixed(6);
};

const updateToCurrencyOptions = () => {
  toCurrencyOptions.value = availableCurrencies.value.filter(
    (c) => c !== swapData.fromCurrency
  );
  if (swapData.toCurrency === swapData.fromCurrency) {
    swapData.toCurrency = "";
    swapData.toAmount = "";
  }
  calculateToAmount();
};

const swapCurrencies = () => {
  const tempFrom = swapData.fromCurrency;
  const tempFromAmount = swapData.fromAmount;

  swapData.fromCurrency = swapData.toCurrency;
  swapData.toCurrency = tempFrom;
  swapData.fromAmount = swapData.toAmount;
  swapData.toAmount = tempFromAmount;
};

const handleSwap = async () => {
  try {
    loading.value = true;

    const fromAmount = parseFloat(swapData.fromAmount);
    const toAmount = parseFloat(swapData.toAmount);

    if (
      isNaN(fromAmount) ||
      isNaN(toAmount) ||
      fromAmount <= 0 ||
      toAmount <= 0
    ) {
      toast.error("Invalid swap amounts");
      return;
    }

    // Backend expects: { fromCurrency, toCurrency, fromAmount, toAmount }
    const response = await transactionAPI.swap({
      fromCurrency: swapData.fromCurrency,
      toCurrency: swapData.toCurrency,
      fromAmount: fromAmount,
      toAmount: toAmount,
    });

    toast.success("Swap completed successfully!");

    // Reset form
    Object.assign(swapData, {
      fromCurrency: "",
      toCurrency: "",
      fromAmount: "",
      toAmount: "",
    });
    toCurrencyOptions.value = [...availableCurrencies.value];

    // Refresh data
    await authStore.refreshProfile();
    await loadRecentSwaps();
  } catch (error) {
    console.error("Swap error:", error);
    toast.error(error.response?.data?.message || "Swap failed");
  } finally {
    loading.value = false;
  }
};

const loadRecentSwaps = async () => {
  try {
    const response = await transactionAPI.getUserTransactions();
    if (response.data) {
      recentSwaps.value = response.data
        .filter((t) => t.type === "swap")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    }
  } catch (error) {
    console.error("Failed to load recent swaps:", error);
  }
};

// Initialize toCurrencyOptions
onMounted(() => {
  toCurrencyOptions.value = [...availableCurrencies.value];
  loadRecentSwaps();
});
</script>
