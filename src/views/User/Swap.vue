<template>
  <div class="max-w-6xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-highlight-text">
        Swap Assets
      </h1>
      <p class="text-sm sm:text-base text-gray-600 mt-1">
        Exchange between different cryptocurrencies instantly
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Swap Form -->
      <div
        class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray lg:col-span-2 order-2 lg:order-1"
      >
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="p-2 bg-blue-100 rounded-lg mr-3">
            <font-awesome-icon
              :icon="['fas', 'exchange-alt']"
              class="h-5 w-5 sm:h-6 sm:w-6 text-primary-blue"
            />
          </div>
          <h2 class="text-base sm:text-lg font-semibold text-highlight-text">
            Swap Currencies
          </h2>
        </div>

        <form @submit.prevent="handleSwap" class="space-y-4 sm:space-y-6">
          <!-- From Currency -->
          <div class="space-y-2 sm:space-y-3">
            <label
              class="form-label text-sm font-medium text-gray-700 flex items-center"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-up']"
                class="h-3 w-3 mr-2 text-red-500"
              />
              From
            </label>
            <div
              class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0"
            >
              <select
                v-model="swapData.fromCurrency"
                @change="updateToCurrencyOptions"
                class="form-input flex-1 text-sm sm:text-base py-3 px-4 rounded-lg border-2 border-silver-gray focus:border-primary-blue transition-colors duration-200"
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
                class="form-input flex-1 text-sm sm:text-base py-3 px-4 rounded-lg border-2 border-silver-gray focus:border-primary-blue transition-colors duration-200"
                placeholder="Enter amount"
                @input="calculateToAmount"
              />
            </div>
            <div
              v-if="swapData.fromCurrency"
              class="bg-cool-light rounded-lg p-3 flex items-center justify-between"
            >
              <span class="text-xs sm:text-sm text-gray-600"
                >Available Balance:</span
              >
              <span
                class="text-xs sm:text-sm font-semibold text-highlight-text"
              >
                {{
                  formatCurrency(
                    getWalletBalance(swapData.fromCurrency),
                    swapData.fromCurrency
                  )
                }}
              </span>
            </div>
          </div>

          <!-- Swap Icon -->
          <div class="flex justify-center -my-2 sm:-my-3">
            <button
              type="button"
              @click="swapCurrencies"
              class="p-3 bg-gradient-to-br from-primary-blue to-dark-navy text-white rounded-full hover:scale-110 transition-all duration-200 group"
              title="Swap currencies"
            >
              <font-awesome-icon
                :icon="['fas', 'exchange-alt']"
                class="h-5 w-5 group-hover:rotate-180 transition-transform duration-300"
              />
            </button>
          </div>

          <!-- To Currency -->
          <div class="space-y-2 sm:space-y-3">
            <label
              class="form-label text-sm font-medium text-gray-700 flex items-center"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-down']"
                class="h-3 w-3 mr-2 text-green-500"
              />
              To
            </label>
            <div
              class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0"
            >
              <select
                v-model="swapData.toCurrency"
                @change="calculateToAmount"
                class="form-input flex-1 text-sm sm:text-base py-3 px-4 rounded-lg border-2 border-silver-gray focus:border-primary-blue transition-colors duration-200"
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
                class="form-input flex-1 text-sm sm:text-base py-3 px-4 rounded-lg border-2 border-silver-gray bg-gray-50 cursor-not-allowed"
                placeholder="Calculated amount"
                readonly
              />
            </div>
            <div
              v-if="swapData.toCurrency && swapData.toAmount"
              class="bg-green-50 border-2 border-green-200 rounded-lg p-3 flex items-center justify-between"
            >
              <span class="text-xs sm:text-sm text-green-700 font-medium"
                >You will receive:</span
              >
              <span class="text-xs sm:text-sm font-bold text-green-600">
                {{ formatCurrency(swapData.toAmount, swapData.toCurrency) }}
              </span>
            </div>
          </div>

          <!-- Exchange Rate -->
          <div
            v-if="
              swapData.fromCurrency && swapData.toCurrency && exchangeRate > 0
            "
            class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <font-awesome-icon
                  :icon="['fas', 'chart-line']"
                  class="h-4 w-4 text-primary-blue mr-2"
                />
                <span class="text-xs sm:text-sm text-gray-700 font-medium"
                  >Exchange Rate:</span
                >
              </div>
              <span class="text-sm sm:text-base font-bold text-highlight-text">
                1 {{ swapData.fromCurrency }} = {{ exchangeRate.toFixed(6) }}
                {{ swapData.toCurrency }}
              </span>
            </div>
          </div>

          <!-- Insufficient Balance Warning -->
          <div
            v-if="hasInsufficientBalance"
            class="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-shake"
          >
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'exclamation-triangle']"
                class="h-5 w-5 text-red-600 mr-3 flex-shrink-0"
              />
              <p class="text-sm text-red-800 font-medium">
                Insufficient {{ swapData.fromCurrency }} balance
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading || !isValidSwap"
            class="w-full btn-primary py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="loading-spinner mr-2"></div>
              Processing Swap...
            </span>
            <span v-else class="flex items-center justify-center">
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                class="h-4 w-4 sm:h-5 sm:w-5 mr-2"
              />
              Confirm Swap
            </span>
          </button>
        </form>
      </div>

      <!-- Sidebar: Wallet Balances & History -->
      <div class="space-y-4 sm:space-y-6 order-1 lg:order-2">
        <!-- Wallet Balances -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-green-100 rounded-lg mr-3">
              <font-awesome-icon
                :icon="['fas', 'wallet']"
                class="h-4 w-4 sm:h-5 sm:w-5 text-green-600"
              />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-highlight-text">
              Your Balances
            </h3>
          </div>
          <div
            class="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar pr-2"
          >
            <div
              v-for="currency in availableCurrencies"
              :key="currency"
              class="flex justify-between items-center p-3 sm:p-4 border border-silver-gray rounded-lg hover:bg-cool-light hover:border-primary-blue transition-all duration-200 group"
            >
              <div class="flex items-center min-w-0">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-blue to-dark-navy rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                >
                  <span class="text-white text-xs sm:text-sm font-bold">{{
                    currency.slice(0, 2)
                  }}</span>
                </div>
                <span class="font-medium text-sm sm:text-base truncate">{{
                  currency
                }}</span>
              </div>
              <span
                class="font-semibold text-highlight-text text-xs sm:text-sm text-right ml-2"
              >
                {{ formatCurrency(getWalletBalance(currency), currency) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Swaps -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-silver-gray">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-purple-100 rounded-lg mr-3">
              <font-awesome-icon
                :icon="['fas', 'history']"
                class="h-4 w-4 sm:h-5 sm:w-5 text-purple-600"
              />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-highlight-text">
              Recent Swaps
            </h3>
          </div>
          <div
            v-if="recentSwaps.length === 0"
            class="text-center py-6 sm:py-8 text-gray-500"
          >
            <font-awesome-icon
              :icon="['fas', 'exchange-alt']"
              class="h-8 w-8 sm:h-10 sm:w-10 text-gray-300 mb-2"
            />
            <p class="text-xs sm:text-sm">No recent swaps</p>
          </div>
          <div
            v-else
            class="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar pr-2"
          >
            <div
              v-for="swap in recentSwaps"
              :key="swap._id"
              class="p-3 border border-silver-gray rounded-lg hover:bg-cool-light hover:border-primary-blue transition-all duration-200"
            >
              <div class="flex justify-between items-start gap-2 mb-2">
                <p
                  class="font-medium text-xs sm:text-sm text-highlight-text break-words flex-1"
                >
                  {{ swap.amount }} {{ swap.currency }} →
                  {{ swap.meta?.toAmount }} {{ swap.meta?.toCurrency }}
                </p>
                <span
                  class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                >
                  {{ swap.status }}
                </span>
              </div>
              <div class="flex items-center text-xs text-gray-500">
                <font-awesome-icon
                  :icon="['fas', 'clock']"
                  class="h-3 w-3 mr-1"
                />
                {{ formatTime(swap.createdAt) }}
              </div>
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

const swapData = reactive({
  fromCurrency: "",
  toCurrency: "",
  fromAmount: "",
  toAmount: "",
});

const loading = ref(false);
const recentSwaps = ref([]);
const availableCurrencies = ref([]);
const toCurrencyOptions = ref([]);
const exchangeRate = ref(0);

// 🔹 Get balances dynamically from logged-in user
const getWalletBalance = (currency) => {
  const balances = authStore.user?.balances || {};
  return balances[currency] || 0;
};

// 🔹 Format display values
const formatCurrency = (amount, currency = "USD") => {
  if (isNaN(amount)) amount = 0;
  if (["BTC", "ETH", "BNB"].includes(currency))
    return `${parseFloat(amount).toFixed(6)} ${currency}`;
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

// 🔹 Fetch currencies from backend
const loadAvailableCurrencies = () => {
  try {
    // ✅ Get available currencies from user.balances keys
    const balances = authStore.user?.balances || {};
    availableCurrencies.value = Object.keys(balances);

    // If you want to show all currencies even if 0:
    // availableCurrencies.value = ['BTC', 'ETH', 'USDT', 'BNB'];

    toCurrencyOptions.value = [...availableCurrencies.value];
  } catch (err) {
    console.error("Failed to load currencies:", err);
    toast.error("Failed to load available currencies");
  }
};

// 🔹 Swap currencies helper
const swapCurrencies = () => {
  const temp = swapData.fromCurrency;
  swapData.fromCurrency = swapData.toCurrency;
  swapData.toCurrency = temp;

  const tempAmount = swapData.fromAmount;
  swapData.fromAmount = swapData.toAmount;
  swapData.toAmount = "";

  updateToCurrencyOptions();
  calculateToAmount();
};

// 🔹 Fetch real exchange rate from backend
const fetchExchangeRate = async () => {
  if (!swapData.fromCurrency || !swapData.toCurrency || !swapData.fromAmount) {
    exchangeRate.value = 0;
    swapData.toAmount = "";
    return;
  }

  try {
    const res = await transactionAPI.previewSwap({
      fromCurrency: swapData.fromCurrency,
      toCurrency: swapData.toCurrency,
      fromAmount: swapData.fromAmount,
    });

    if (res.data.success) {
      exchangeRate.value = res.data.rate;
      swapData.toAmount = parseFloat(res.data.toAmount).toFixed(6);
    } else {
      exchangeRate.value = 0;
      swapData.toAmount = "";
    }
  } catch (err) {
    console.error("Preview swap failed:", err);
    exchangeRate.value = 0;
    swapData.toAmount = "";
  }
};

// 🔹 Calculate destination amount using live rate
// const calculateToAmount = async () => {
//   if (!swapData.fromCurrency || !swapData.toCurrency || !swapData.fromAmount) {
//     swapData.toAmount = "";
//     return;
//   }

//   await fetchExchangeRate(); // ✅ always fetch fresh rate

//   const fromAmount = parseFloat(swapData.fromAmount);
//   if (isNaN(fromAmount) || fromAmount <= 0 || exchangeRate.value <= 0) {
//     swapData.toAmount = "";
//     return;
//   }

//   swapData.toAmount = (fromAmount * exchangeRate.value).toFixed(6);
// };

const calculateToAmount = async () => {
  await fetchExchangeRate();
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

// 🔹 Computed: Balance + validation
const hasInsufficientBalance = computed(() => {
  if (!swapData.fromCurrency || !swapData.fromAmount) return false;
  const balance = getWalletBalance(swapData.fromCurrency);
  return parseFloat(swapData.fromAmount) > balance;
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

// 🔹 Swap handler
const handleSwap = async () => {
  try {
    loading.value = true;

    const payload = {
      fromCurrency: swapData.fromCurrency,
      toCurrency: swapData.toCurrency,
      fromAmount: parseFloat(swapData.fromAmount),
      toAmount: parseFloat(swapData.toAmount),
    };

    const res = await transactionAPI.swap(payload);
    toast.success("Swap completed successfully!");

    // Refresh user balances + recent swaps
    await authStore.refreshProfile();
    await loadRecentSwaps();

    // Reset form
    Object.assign(swapData, {
      fromCurrency: "",
      toCurrency: "",
      fromAmount: "",
      toAmount: "",
    });
  } catch (err) {
    console.error("Swap failed:", err);
    toast.error(err.response?.data?.message || "Swap failed");
  } finally {
    loading.value = false;
  }
};

// 🔹 Fetch recent swaps from backend
const loadRecentSwaps = async () => {
  try {
    const res = await transactionAPI.getUserTransactions();
    recentSwaps.value = res.data
      .filter((t) => t.type === "swap")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  } catch (err) {
    console.error("Failed to load recent swaps:", err);
  }
};

// 🔹 Lifecycle
onMounted(async () => {
  await Promise.all([loadAvailableCurrencies(), loadRecentSwaps()]);
});
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6, #1e40af);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #2563eb, #1e3a8a);
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 #f1f5f9;
}

/* Shake animation for error */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Loading spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
