<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600">Overview of your platform performance</p>
      </div>
      <button
        @click="refreshData"
        :disabled="loading"
        class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <span>{{ loading ? "Refreshing..." : "Refresh" }}</span>
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="card in statCards"
        :key="card.id"
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">{{ card.label }}</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ card.value.toLocaleString() }}
            </p>
          </div>
          <div :class="['p-3 rounded-full h-12 w-12 flex-shrink-0', card.bg]"></div>
        </div>
        <div class="mt-4">
          <router-link
            :to="card.link"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            {{ card.linkLabel }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pending Actions -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Pending Actions</h3>
        <div class="space-y-4">
          <div
            v-for="action in pendingActions"
            :key="action.id"
            class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  'p-2 rounded-full h-8 w-8 flex-shrink-0',
                  action.bgColor,
                ]"
              ></div>
              <div>
                <p class="font-medium text-gray-900">{{ action.title }}</p>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </div>
            </div>
            <router-link
              :to="action.link"
              class="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Review
            </router-link>
          </div>

          <div
            v-if="pendingActions.length === 0"
            class="text-center py-4 text-gray-500"
          >
            No pending actions
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
          >
            <div
              :class="[
                'p-2 rounded-full h-8 w-8 flex-shrink-0',
                activity.bgColor,
              ]"
            ></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>

          <div
            v-if="recentActivity.length === 0"
            class="text-center py-4 text-gray-500"
          >
            No recent activity
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { adminAPI } from "@/services/api";

const loading = ref(false);

const stats = ref({
  pendingDeposits: 0,
  pendingWithdrawals: 0,
  dueInvestments: 0,
  totalUsers: 0,
});

const pendingActions = ref([]);
const recentActivity = ref([]);

// Derived computed cards
const statCards = computed(() => [
  {
    id: 1,
    label: "Pending Deposits",
    value: stats.value.pendingDeposits,
    bg: "bg-yellow-100",
    link: "/admin/transactions?type=deposit&status=pending",
    linkLabel: "View all →",
  },
  {
    id: 2,
    label: "Pending Withdrawals",
    value: stats.value.pendingWithdrawals,
    bg: "bg-red-100",
    link: "/admin/transactions?type=withdrawal&status=pending",
    linkLabel: "View all →",
  },
  {
    id: 3,
    label: "Due Investments",
    value: stats.value.dueInvestments,
    bg: "bg-purple-100",
    link: "/admin/investments?status=due",
    linkLabel: "View all →",
  },
  {
    id: 4,
    label: "Total Users",
    value: stats.value.totalUsers,
    bg: "bg-green-100",
    link: "/admin/users",
    linkLabel: "Manage users →",
  },
]);

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    loading.value = true;

    // Fetch pending/due data and user count in parallel
    const [{ data: overviewData }, { data: usersData }] = await Promise.all([
      adminAPI.getPendingAndDue(),
      adminAPI.getAllUsers(),
    ]);

    const summary = overviewData?.summary || {};

    stats.value = {
      pendingDeposits: summary.pendingDeposits || 0,
      pendingWithdrawals: summary.pendingWithdrawals || 0,
      dueInvestments: summary.dueInvestments || 0,
      totalUsers: usersData?.length || 0,
    };

    // Build pending actions dynamically
    pendingActions.value = [
      {
        id: 1,
        title: "Pending Deposit Approvals",
        description: `${stats.value.pendingDeposits} deposits waiting for approval`,
        bgColor: "bg-yellow-100",
        link: "/admin/transactions?type=deposit&status=pending",
      },
      {
        id: 2,
        title: "Pending Withdrawal Requests",
        description: `${stats.value.pendingWithdrawals} withdrawals waiting for approval`,
        bgColor: "bg-red-100",
        link: "/admin/transactions?type=withdrawal&status=pending",
      },
      {
        id: 3,
        title: "Due Investments",
        description: `${stats.value.dueInvestments} investments due for payout`,
        bgColor: "bg-purple-100",
        link: "/admin/investments?status=due",
      },
    ];

    // Optional: could populate this from a future endpoint
    recentActivity.value = [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

const refreshData = () => fetchDashboardData();

onMounted(fetchDashboardData);
</script>

<style scoped>
/* optional styles for smoother hover effect */
button {
  transition: background-color 0.2s ease, opacity 0.2s ease;
}
</style>
