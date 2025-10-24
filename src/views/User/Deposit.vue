<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlight-text">Deposit Funds</h1>
      <p class="text-gray-600 mt-1">
        Add funds to your trading account securely
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Deposit Form -->
      <div
        class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray lg:col-span-2"
      >
        <h2 class="text-lg font-semibold text-highlight-text mb-4">
          Manual Deposit
        </h2>

        <form @submit.prevent="handleDeposit" class="space-y-4">
          <div>
            <label for="amount" class="form-label">Deposit Amount</label>
            <input
              id="amount"
              v-model="depositData.amount"
              type="number"
              step="0.01"
              min="1"
              required
              class="form-input"
              placeholder="Enter amount to deposit"
            />
          </div>

          <div>
            <label for="currency" class="form-label">Currency</label>
            <select
              id="currency"
              v-model="depositData.currency"
              required
              class="form-input"
            >
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="BNB">Binance Coin (BNB)</option>
            </select>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'info-circle']"
                class="h-5 w-5 text-blue-600 mr-2"
              />
              <p class="text-sm text-blue-800">
                Deposits are processed manually by our team. Funds will be
                credited to your account after verification.
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="
              loading || !depositData.amount || depositData.amount <= 0
            "
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <div class="loading-spinner mr-2"></div>
              Processing Deposit...
            </span>
            <span v-else>Deposit Funds</span>
          </button>
        </form>
      </div>

      <!-- Deposit Info & History -->
      <div class="space-y-6">
        <!-- Current Balance -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Account Balance
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Available Balance:</span>
              <span class="font-semibold text-highlight-text">
                {{ formatCurrency(authStore.user?.balance || 0) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Earned:</span>
              <span class="font-semibold text-green-600">
                {{ formatCurrency(authStore.user?.stats?.totalEarned || 0) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Deposits -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Recent Deposits
          </h3>
          <div
            v-if="recentDeposits.length === 0"
            class="text-center py-4 text-gray-500"
          >
            <p class="text-sm">No recent deposits</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="deposit in recentDeposits"
              :key="deposit._id"
              class="flex justify-between items-center p-3 border border-silver-gray rounded-lg"
            >
              <div>
                <p class="font-medium text-sm">
                  {{ formatCurrency(deposit.amount) }}
                </p>
                <p class="text-xs text-gray-500">{{ deposit.currency }}</p>
              </div>
              <div class="text-right">
                <span
                  class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {{ deposit.status }}
                </span>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatTime(deposit.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

 <!-- Admin Deposit Address -->
<div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
  <h2 class="text-lg font-semibold text-highlight-text mb-4">Deposit Address</h2>
  <div v-if="adminAddress" class="bg-cool-light rounded-lg p-4">
    <p class="text-sm text-gray-600 mb-2">Send your deposit to this address:</p>
    <div class="flex items-center justify-between">
      <code class="text-sm font-mono bg-white px-3 py-2 rounded border flex-1 mr-3">
        {{ adminAddress }}
      </code>
      <button @click="copyToClipboard(adminAddress)" class="btn-secondary text-sm">
        Copy
      </button>
    </div>
    <p class="text-xs text-gray-600 mt-3">
      Send only {{ depositData.currency }} to this address. Other assets may be lost.
    </p>
  </div>

  <div v-else class="text-center py-6 text-gray-500">
    <font-awesome-icon :icon="['fas', 'wallet']" class="h-12 w-12 text-gray-300 mb-3" />
    <p>Deposit address will appear after you submit a deposit request.</p>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { transactionAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const authStore = useAuthStore();
const toast = useToast();

const depositData = ref({
  amount: "",
  currency: "USDT",
});
const loading = ref(false);
const recentDeposits = ref([]);
const adminAddress = ref(""); // 👈 NEW: store admin wallet address

// Utility functions
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

// Submit deposit
const handleDeposit = async () => {
  try {
    loading.value = true;
    const response = await transactionAPI.deposit({
      amount: parseFloat(depositData.value.amount),
      currency: depositData.value.currency,
    });

    // ✅ Use adminAddress from backend response
    adminAddress.value = response.data.adminAddress;

    toast.success("Deposit request submitted successfully!");
    depositData.value.amount = "";

    // Refresh user data + recent deposits
    await authStore.refreshProfile();
    await loadRecentDeposits();
  } catch (error) {
    toast.error(error.response?.data?.message || "Deposit failed");
  } finally {
    loading.value = false;
  }
};

const loadRecentDeposits = async () => {
  try {
    const response = await transactionAPI.getUserTransactions();
    recentDeposits.value = response.data
      .filter((t) => t.type === "deposit")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  } catch (error) {
    console.error("Failed to load recent deposits:", error);
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Address copied to clipboard!"))
    .catch(() => toast.error("Failed to copy address"));
};

onMounted(async () => {
  await loadRecentDeposits();
});
</script>
