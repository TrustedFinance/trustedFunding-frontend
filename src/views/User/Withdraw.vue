<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlight-text">Withdraw Funds</h1>
      <p class="text-gray-600 mt-1">Withdraw your earnings to your wallet</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Withdrawal Form -->
      <div
        class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray lg:col-span-2"
      >
        <h2 class="text-lg font-semibold text-highlight-text mb-4">
          Request Withdrawal
        </h2>

        <form @submit.prevent="handleWithdraw" class="space-y-4">
          <div>
            <label for="amount" class="form-label">Withdrawal Amount</label>
            <input
              id="amount"
              v-model="withdrawData.amount"
              type="number"
              step="0.01"
              min="1"
              required
              class="form-input"
              placeholder="Enter amount to withdraw"
            />
            <p class="text-xs text-gray-600 mt-1">
              Available: {{ formatCurrency(authStore.user?.balance || 0) }}
            </p>
          </div>

          <div>
            <label for="currency" class="form-label">Currency</label>
            <select
              id="currency"
              v-model="withdrawData.currency"
              required
              class="form-input"
            >
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="BNB">Binance Coin (BNB)</option>
            </select>
          </div>

          <!-- Wallet Address Display -->
          <div
            v-if="getWalletAddress(withdrawData.currency)"
            class="bg-cool-light rounded-lg p-4"
          >
            <p class="text-sm text-gray-600 mb-2">Withdrawal Address:</p>
            <div class="flex items-center justify-between">
              <code
                class="text-sm font-mono bg-white px-3 py-2 rounded border flex-1 mr-3 truncate"
              >
                {{ getWalletAddress(withdrawData.currency) }}
              </code>
              <router-link
                to="/user/profile"
                class="btn-secondary text-sm whitespace-nowrap"
              >
                Change
              </router-link>
            </div>
          </div>

          <div
            v-else
            class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'exclamation-triangle']"
                class="h-5 w-5 text-yellow-600 mr-2"
              />
              <p class="text-sm text-yellow-800">
                No {{ withdrawData.currency }} wallet address set. Please update
                your profile.
              </p>
            </div>
            <router-link
              to="/user/profile"
              class="inline-block mt-2 btn-primary text-sm"
            >
              Set Wallet Address
            </router-link>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'info-circle']"
                class="h-5 w-5 text-blue-600 mr-2"
              />
              <p class="text-sm text-blue-800">
                Withdrawals require admin approval and are processed within 24
                hours.
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading || !isValidWithdrawal"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="loading-spinner mr-2"></div>
              Processing Withdrawal...
            </span>
            <span v-else>Request Withdrawal</span>
          </button>
        </form>
      </div>

      <!-- Withdrawal Info & History -->
      <div class="space-y-6">
        <!-- Account Summary -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Account Summary
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Available Balance:</span>
              <span class="font-semibold text-highlight-text">
                {{ formatCurrency(authStore.user?.balance || 0) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Pending Withdrawals:</span>
              <span class="font-semibold text-yellow-600">
                {{ formatCurrency(pendingWithdrawalsTotal) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Withdrawn:</span>
              <span class="font-semibold text-green-600">
                {{ formatCurrency(completedWithdrawalsTotal) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Withdrawals -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Recent Withdrawals
          </h3>
          <div
            v-if="recentWithdrawals.length === 0"
            class="text-center py-4 text-gray-500"
          >
            <p class="text-sm">No recent withdrawals</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="withdrawal in recentWithdrawals"
              :key="withdrawal._id"
              class="flex justify-between items-center p-3 border border-silver-gray rounded-lg"
            >
              <div>
                <p class="font-medium text-sm">
                  {{ formatCurrency(withdrawal.amount) }}
                </p>
                <p class="text-xs text-gray-500">{{ withdrawal.currency }}</p>
              </div>
              <div class="text-right">
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    withdrawal.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : withdrawal.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ withdrawal.status }}
                </span>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatTime(withdrawal.createdAt) }}
                </p>
              </div>
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
import { transactionAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const authStore = useAuthStore();
const toast = useToast();

const withdrawData = ref({
  amount: "",
  currency: "USDT",
});
const loading = ref(false);
const recentWithdrawals = ref([]);

// Computed properties
const isValidWithdrawal = computed(() => {
  const amount = parseFloat(withdrawData.value.amount);
  const balance = authStore.user?.balance || 0;
  const hasWalletAddress = Boolean(getWalletAddress(withdrawData.value.currency));

  return amount > 0 && amount <= balance && hasWalletAddress;
});

const pendingWithdrawalsTotal = computed(() => {
  return recentWithdrawals.value
    .filter((w) => w.status === "pending")
    .reduce((total, w) => total + w.amount, 0);
});

const completedWithdrawalsTotal = computed(() => {
  return recentWithdrawals.value
    .filter((w) => w.status === "completed")
    .reduce((total, w) => total + w.amount, 0);
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
  });
};

const getWalletAddress = (currency) => {
  return authStore.user?.walletAddresses?.[currency] || "";
};

const handleWithdraw = async () => {
  try {
    loading.value = true;
    // Backend expects: { amount, currency }
    const response = await transactionAPI.withdraw({
      amount: parseFloat(withdrawData.value.amount),
      currency: withdrawData.value.currency,
    });

    toast.success("Withdrawal request submitted! Pending admin approval.");
    withdrawData.value.amount = "";

    // Refresh recent withdrawals
    await loadRecentWithdrawals();
  } catch (error) {
    toast.error(error.response?.data?.message || "Withdrawal failed");
  } finally {
    loading.value = false;
  }
};

const loadRecentWithdrawals = async () => {
  try {
    const response = await transactionAPI.getUserTransactions();
    recentWithdrawals.value = response.data
      .filter((t) => t.type === "withdrawal")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  } catch (error) {
    console.error("Failed to load recent withdrawals:", error);
  }
};

onMounted(() => {
  loadRecentWithdrawals();
});
</script>
