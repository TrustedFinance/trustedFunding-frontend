<template>
  <div class="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-silver-gray"
    >
      <div class="flex-1 min-w-0">
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-highlight-text">Investment Plans</h1>
        <p class="text-sm sm:text-base text-gray-600 mt-1">
          Choose from our carefully curated investment plans
        </p>
      </div>
      <div class="flex-shrink-0 text-left sm:text-right">
        <p class="text-xs sm:text-sm text-gray-600">Available Balance</p>
        <p class="text-lg sm:text-xl font-semibold text-highlight-text mt-1">
          {{ formatCurrency(authStore.user?.balance || 0) }}
        </p>
      </div>
    </div>

    <!-- Investment Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6">
      <div
        v-for="plan in investmentPlans"
        :key="plan._id"
        class="bg-white rounded-xl shadow-sm border border-silver-gray overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-blue flex flex-col"
      >
        <div class="p-4 sm:p-6 flex flex-col flex-1">
          <!-- Plan Header -->
          <div class="text-center mb-4 sm:mb-6">
            <h3 class="text-base sm:text-lg font-bold text-highlight-text">
              {{ plan.name }}
            </h3>
            <div class="mt-3 mb-2">
              <p class="text-2xl sm:text-3xl font-bold text-primary-blue">
                {{ (plan.multiplier * 100 - 100).toFixed(0) }}%
              </p>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Return on Investment</p>
            </div>
            <div class="inline-flex items-center justify-center px-3 py-1 bg-blue-100 rounded-full mt-2">
              <font-awesome-icon :icon="['fas', 'clock']" class="h-3 w-3 text-primary-blue mr-1" />
              <span class="text-xs sm:text-sm font-medium text-primary-blue">
                {{ plan.durationDays }} days
              </span>
            </div>
          </div>

          <!-- Plan Details -->
          <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6 bg-cool-light rounded-lg p-3 sm:p-4">
            <div class="flex flex-col  text-xs sm:text-sm">
              <span class="text-gray-600 flex items-center">
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="h-3 w-3 mr-1 text-green-600" />
                Min Investment:
              </span>
              <span class="font-semibold text-highlight-text">{{
                formatCurrency(plan.minAmount)
              }}</span>
            </div>
            <div class="flex flex-col text-xs sm:text-sm">
              <span class="text-gray-600 flex items-center">
                <font-awesome-icon :icon="['fas', 'arrow-up']" class="h-3 w-3 mr-1 text-red-600" />
                Max Investment:
              </span>
              <span class="font-semibold text-highlight-text">{{
                formatCurrency(plan.maxAmount)
              }}</span>
            </div>
            <div class="flex justify-between items-center text-xs sm:text-sm">
              <span class="text-gray-600 flex items-center">
                <font-awesome-icon :icon="['fas', 'chart-line']" class="h-3 w-3 mr-1 text-purple-600" />
                Multiplier:
              </span>
              <span class="font-semibold text-highlight-text">x{{ plan.multiplier }}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6  leading-relaxed flex-1">
            {{ plan.description }}
          </p>

          <!-- Invest Button -->
          <button
            @click="openInvestModal(plan)"
            :disabled="authStore.user?.balance < plan.minAmount"
            :class="[
              'w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base',
              authStore.user?.balance >= plan.minAmount
                ? 'btn-primary hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            <span v-if="authStore.user?.balance >= plan.minAmount" class="flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'rocket']" class="h-4 w-4 mr-2" />
              Invest Now
            </span>
            <span v-else class="flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'lock']" class="h-4 w-4 mr-2" />
              Insufficient Balance
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Investments Section -->
    <div class="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-silver-gray">
      <h2 class="text-lg sm:text-xl font-semibold text-highlight-text mb-4 sm:mb-6">
        Your Active Investments
      </h2>

      <div
        v-if="userInvestments.length === 0"
        class="text-center py-8 sm:py-12 text-gray-500"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-line']"
          class="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mb-3"
        />
        <p class="text-sm sm:text-base">No active investments</p>
        <p class="text-xs sm:text-sm mt-1">Choose a plan above to start investing</p>
      </div>

      <!-- Mobile Card View -->
      <div v-else class="block lg:hidden space-y-3 sm:space-y-4">
        <div
          v-for="investment in userInvestments"
          :key="investment._id"
          class="border border-silver-gray rounded-lg p-4 hover:shadow-md hover:border-primary-blue transition-all duration-200"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-semibold text-highlight-text text-sm sm:text-base">
              {{ investment.plan?.name }}
            </h4>
            <span
              :class="[
                'px-2 py-1 text-xs rounded-full whitespace-nowrap',
                investment.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : investment.status === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ investment.status }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-600">Amount:</span>
              <span class="font-medium">{{ formatCurrency(investment.amount) }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-600">Payout:</span>
              <span class="font-medium text-green-600">{{ formatCurrency(investment.payoutAmount) }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-600">Start Date:</span>
              <span class="font-medium">{{ formatDate(investment.startAt) }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-600">End Date:</span>
              <span class="font-medium">{{ formatDate(investment.endAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div v-if="userInvestments.length > 0" class="hidden lg:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-silver-gray">
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Plan
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Payout
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Start Date
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                End Date
              </th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="investment in userInvestments"
              :key="investment._id"
              class="border-b border-silver-gray hover:bg-cool-light transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <div class="font-medium text-highlight-text">
                  {{ investment.plan?.name }}
                </div>
              </td>
              <td class="py-3 px-4 font-medium">{{ formatCurrency(investment.amount) }}</td>
              <td class="py-3 px-4 text-green-600 font-semibold">
                {{ formatCurrency(investment.payoutAmount) }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-600">
                {{ formatDate(investment.startAt) }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-600">
                {{ formatDate(investment.endAt) }}
              </td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-medium rounded-full',
                    investment.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : investment.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800',
                  ]"
                >
                  {{ investment.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Invest Modal -->
    <div
      v-if="showInvestModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeInvestModal"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-2xl animate-fadeIn">
        <div class="flex justify-between items-center mb-4 sm:mb-6">
          <h3 class="text-base sm:text-lg font-semibold text-highlight-text">
            Invest in {{ selectedPlan?.name }}
          </h3>
          <button
            @click="closeInvestModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-gradient-to-br from-primary-blue to-dark-navy rounded-lg p-4 text-white">
            <p class="text-xs sm:text-sm opacity-90 mb-2">Plan Details</p>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm">ROI:</span>
              <span class="text-xl sm:text-2xl font-bold">
                {{ (selectedPlan?.multiplier * 100 - 100).toFixed(0) }}%
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">Duration:</span>
              <span class="font-semibold">{{ selectedPlan?.durationDays }} days</span>
            </div>
          </div>

          <div>
            <label for="investmentAmount" class="form-label text-sm font-medium text-gray-700"
              >Investment Amount</label
            >
            <input
              id="investmentAmount"
              v-model="investmentAmount"
              type="number"
              :min="selectedPlan?.minAmount"
              :max="selectedPlan?.maxAmount"
              class="form-input mt-1 text-base"
              placeholder="Enter amount"
            />
            <p class="text-xs text-gray-600 mt-2">
              Range: {{ formatCurrency(selectedPlan?.minAmount) }} -
              {{ formatCurrency(selectedPlan?.maxAmount) }}
            </p>
          </div>

          <div class="bg-green-50 border-2 border-green-200 rounded-lg p-3 sm:p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-green-800">Expected Payout:</span>
              <span class="text-base sm:text-lg font-bold text-green-600">
                {{ formatCurrency(expectedPayout) }}
              </span>
            </div>
            <p class="text-xs text-green-700 mt-1">
              Profit: {{ formatCurrency(expectedPayout - parseFloat(investmentAmount || 0)) }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              @click="closeInvestModal" 
              class="flex-1 btn-secondary py-2.5 sm:py-3 text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              @click="createInvestment"
              :disabled="!isValidInvestment"
              class="flex-1 btn-primary py-2.5 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 hover:scale-105 transition-transform duration-200"
            >
              <span class="flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'check-circle']" class="h-4 w-4 mr-2" />
                Confirm Investment
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { investmentAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const authStore = useAuthStore();
const toast = useToast();

const investmentPlans = ref([]);
const userInvestments = ref([]);
const showInvestModal = ref(false);
const selectedPlan = ref(null);
const investmentAmount = ref("");

// Computed properties
const isValidInvestment = computed(() => {
  if (!selectedPlan.value || !investmentAmount.value) return false;

  const amount = parseFloat(investmentAmount.value);
  return (
    amount >= selectedPlan.value.minAmount &&
    amount <= selectedPlan.value.maxAmount &&
    amount <= (authStore.user?.balance || 0)
  );
});

const expectedPayout = computed(() => {
  if (!selectedPlan.value || !investmentAmount.value) return 0;
  return parseFloat(investmentAmount.value) * selectedPlan.value.multiplier;
});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: authStore.user?.currency || "USD",
  }).format(amount);
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US");
};

const openInvestModal = (plan) => {
  selectedPlan.value = plan;
  investmentAmount.value = plan.minAmount;
  showInvestModal.value = true;
};

const closeInvestModal = () => {
  showInvestModal.value = false;
  selectedPlan.value = null;
  investmentAmount.value = "";
};

const createInvestment = async () => {
  try {
    // Backend expects: { planId, amount }
    await investmentAPI.create({
      planId: selectedPlan.value._id,
      amount: parseFloat(investmentAmount.value),
    });

    toast.success("Investment created successfully!");
    closeInvestModal();
    await loadUserInvestments();
    await authStore.refreshProfile(); // Update balance
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create investment");
  }
};

const loadInvestmentPlans = async () => {
  try {
    const response = await investmentAPI.getAllPlans();
    investmentPlans.value = response.data;
  } catch (error) {
    console.error("Failed to load investment plans:", error);
    toast.error("Failed to load investment plans");
  }
};

const loadUserInvestments = async () => {
  try {
    const response = await investmentAPI.getUserInvestments();
    userInvestments.value = response.data;
  } catch (error) {
    console.error("Failed to load user investments:", error);
  }
};

onMounted(async () => {
  await Promise.all([loadInvestmentPlans(), loadUserInvestments()]);
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>