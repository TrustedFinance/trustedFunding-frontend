<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-highlight-text">Investment Plans</h1>
        <p class="text-gray-600 mt-1">
          Choose from our carefully curated investment plans
        </p>
      </div>
      <div class="mt-4 md:mt-0">
        <p class="text-sm text-gray-600">Available Balance</p>
        <p class="text-xl font-semibold text-highlight-text">
          {{ formatCurrency(authStore.user?.balance || 0) }}
        </p>
      </div>
    </div>

    <!-- Investment Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="plan in investmentPlans"
        :key="plan._id"
        class="bg-white rounded-lg shadow-sm border border-silver-gray overflow-hidden"
      >
        <div class="p-6">
          <!-- Plan Header -->
          <div class="text-center mb-4">
            <h3 class="text-lg font-bold text-highlight-text">
              {{ plan.name }}
            </h3>
            <p class="text-2xl font-bold text-primary-blue mt-2">
              {{ (plan.multiplier * 100 - 100).toFixed(0) }}% ROI
            </p>
            <p class="text-sm text-gray-600 mt-1">
              {{ plan.durationDays }} days
            </p>
          </div>

          <!-- Plan Details -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Min Investment:</span>
              <span class="font-medium">{{
                formatCurrency(plan.minAmount)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Max Investment:</span>
              <span class="font-medium">{{
                formatCurrency(plan.maxAmount)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Multiplier:</span>
              <span class="font-medium">x{{ plan.multiplier }}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-sm text-gray-600 mb-6 text-center">
            {{ plan.description }}
          </p>

          <!-- Invest Button -->
          <button
            @click="openInvestModal(plan)"
            :disabled="authStore.user?.balance < plan.minAmount"
            :class="[
              'w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200',
              authStore.user?.balance >= plan.minAmount
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            {{
              authStore.user?.balance >= plan.minAmount
                ? "Invest Now"
                : "Insufficient Balance"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Active Investments Section -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
      <h2 class="text-xl font-semibold text-highlight-text mb-6">
        Your Active Investments
      </h2>

      <div
        v-if="userInvestments.length === 0"
        class="text-center py-8 text-gray-500"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-line']"
          class="h-12 w-12 text-gray-300 mb-3"
        />
        <p>No active investments</p>
        <p class="text-sm mt-1">Choose a plan above to start investing</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-silver-gray">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Plan
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Amount
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Payout
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Start Date
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                End Date
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="investment in userInvestments"
              :key="investment._id"
              class="border-b border-silver-gray hover:bg-cool-light"
            >
              <td class="py-3 px-4">
                <div class="font-medium text-highlight-text">
                  {{ investment.plan?.name }}
                </div>
              </td>
              <td class="py-3 px-4">{{ formatCurrency(investment.amount) }}</td>
              <td class="py-3 px-4 text-green-600 font-medium">
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
                    'px-2 py-1 text-xs rounded-full',
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
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-highlight-text">
            Invest in {{ selectedPlan?.name }}
          </h3>
          <button
            @click="closeInvestModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-cool-light rounded-lg p-4">
            <p class="text-sm text-gray-600">Plan Details</p>
            <p class="font-medium">
              ROI: {{ (selectedPlan?.multiplier * 100 - 100).toFixed(0) }}%
            </p>
            <p class="text-sm">
              Duration: {{ selectedPlan?.durationDays }} days
            </p>
          </div>

          <div>
            <label for="investmentAmount" class="form-label"
              >Investment Amount</label
            >
            <input
              id="investmentAmount"
              v-model="investmentAmount"
              type="number"
              :min="selectedPlan?.minAmount"
              :max="selectedPlan?.maxAmount"
              class="form-input"
              placeholder="Enter amount"
            />
            <p class="text-xs text-gray-600 mt-1">
              Range: {{ formatCurrency(selectedPlan?.minAmount) }} -
              {{ formatCurrency(selectedPlan?.maxAmount) }}
            </p>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p class="text-sm text-yellow-800">
              Expected Payout: {{ formatCurrency(expectedPayout) }}
            </p>
          </div>

          <div class="flex space-x-3">
            <button @click="closeInvestModal" class="flex-1 btn-secondary">
              Cancel
            </button>
            <button
              @click="createInvestment"
              :disabled="!isValidInvestment"
              class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Investment
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