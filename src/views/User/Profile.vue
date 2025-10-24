<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlight-text">Profile Settings</h1>
      <p class="text-gray-600 mt-1">
        Manage your account information and preferences
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Form -->
      <div
        class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray lg:col-span-2"
      >
        <h2 class="text-lg font-semibold text-highlight-text mb-4">
          Personal Information
        </h2>

        <form @submit.prevent="updateProfile" class="space-y-4">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="form-label">Full Name</label>
              <input
                id="name"
                v-model="profileData.name"
                type="text"
                required
                class="form-input"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="profileData.email"
                type="email"
                required
                class="form-input"
                placeholder="Your email"
                readonly
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="phone" class="form-label">Phone Number</label>
              <input
                id="phone"
                v-model="profileData.phone"
                type="tel"
                class="form-input"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label for="country" class="form-label">Country</label>
              <input
                id="country"
                v-model="profileData.country"
                type="text"
                class="form-input"
                placeholder="Your country"
              />
            </div>
          </div>

          <div>
            <label for="currency" class="form-label">Preferred Currency</label>
            <select
              id="currency"
              v-model="profileData.currency"
              class="form-input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
              <option value="ZAR">ZAR</option>
              <option value="KES">KES</option>
              <option value="GHS">GHS</option>
            </select>
          </div>

          <!-- Wallet Addresses -->
          <div class="border-t pt-6 mt-6">
            <h3 class="text-lg font-semibold text-highlight-text mb-4">
              Wallet Addresses
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              Set your withdrawal addresses for different cryptocurrencies
            </p>

            <div class="space-y-4">
              <div v-for="currency in availableCurrencies" :key="currency">
                <label :for="`wallet-${currency}`" class="form-label"
                  >{{ currency }} Wallet Address</label
                >
                <input
                  :id="`wallet-${currency}`"
                  v-model="profileData.walletAddresses[currency]"
                  type="text"
                  class="form-input"
                  :placeholder="`Your ${currency} wallet address`"
                />
              </div>
            </div>
          </div>

          <div class="flex space-x-3 pt-4">
            <button type="button" @click="resetForm" class="btn-secondary">
              Reset
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center">
                <div class="loading-spinner mr-2"></div>
                Updating...
              </span>
              <span v-else>Update Profile</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Account Info & Stats -->
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
              <span class="text-gray-600">Member Since:</span>
              <span class="font-medium text-sm">{{
                formatDate(authStore.user?.createdAt)
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Account Status:</span>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                Active
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">KYC Status:</span>
              <span
                :class="[
                  'text-xs px-2 py-1 rounded-full',
                  authStore.user?.kyc
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ authStore.user?.kyc ? "Verified" : "Pending" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Role:</span>
              <span class="font-medium text-sm capitalize">{{
                authStore.user?.role
              }}</span>
            </div>
          </div>
        </div>

        <!-- Trading Stats -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Trading Statistics
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Balance:</span>
              <span class="font-semibold">{{
                formatCurrency(authStore.user?.balance || 0)
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Earned:</span>
              <span class="font-semibold text-green-600">
                {{ formatCurrency(authStore.user?.stats?.totalEarned || 0) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Trades:</span>
              <span class="font-semibold">{{
                authStore.user?.stats?.trades || 0
              }}</span>
            </div>
          </div>
        </div>

        <!-- Security Actions -->
        <div
          class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
        >
          <h3 class="text-lg font-semibold text-highlight-text mb-4">
            Security
          </h3>
          <div class="space-y-3">
            <router-link
              to="/user/kyc"
              class="flex items-center p-3 border border-silver-gray rounded-lg hover:bg-cool-light transition-colors duration-200"
            >
              <font-awesome-icon
                :icon="['fas', 'id-card']"
                class="h-5 w-5 text-primary-blue mr-3"
              />
              <span class="font-medium">KYC Verification</span>
            </router-link>
            <button
              @click="showDeleteModal = true"
              class="flex items-center w-full p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600"
            >
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="h-5 w-5 mr-3"
              />
              <span class="font-medium">Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex items-center mb-4">
          <font-awesome-icon
            :icon="['fas', 'exclamation-triangle']"
            class="h-6 w-6 text-red-600 mr-3"
          />
          <h3 class="text-lg font-semibold text-highlight-text">
            Delete Account
          </h3>
        </div>

        <p class="text-gray-600 mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone. All your data, including investments and transaction history,
          will be permanently deleted.
        </p>

        <div class="flex space-x-3">
          <button @click="showDeleteModal = false" class="flex-1 btn-secondary">
            Cancel
          </button>
          <button
            @click="deleteAccount"
            :disabled="deleting"
            class="flex-1 btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="deleting" class="flex items-center justify-center">
              <div class="loading-spinner mr-2"></div>
              Deleting...
            </span>
            <span v-else>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { userAPI } from "@/services/api";
import { useToast } from "@/composables/toast";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const profileData = reactive({
  name: "",
  email: "",
  phone: "",
  country: "",
  currency: "",
  walletAddresses: {
    BTC: "",
    ETH: "",
    USDT: "",
    BNB: "",
  },
});
const loading = ref(false);
const deleting = ref(false);
const showDeleteModal = ref(false);

const availableCurrencies = ["BTC", "ETH", "USDT", "BNB"];

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: authStore.user?.currency || "USD",
  }).format(amount);
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const resetForm = () => {
  loadUserData();
};

const loadUserData = () => {
  const user = authStore.user;
  if (user) {
    profileData.name = user.name || "";
    profileData.email = user.email || "";
    profileData.phone = user.phone || "";
    profileData.country = user.country || "";
    profileData.currency = user.currency || "USD";

    // Load wallet addresses from backend structure
    profileData.walletAddresses = {
      BTC: user.walletAddresses?.BTC || "",
      ETH: user.walletAddresses?.ETH || "",
      USDT: user.walletAddresses?.USDT || "",
      BNB: user.walletAddresses?.BNB || "",
    };
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;

    // Backend expects: { name, phone, country, currency, walletAddresses }
    const updateData = {
      name: profileData.name,
      phone: profileData.phone,
      country: profileData.country,
      currency: profileData.currency,
      walletAddresses: profileData.walletAddresses,
    };

    await authStore.updateProfile(updateData);
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.error("Profile update failed:", error);
  } finally {
    loading.value = false;
  }
};

const deleteAccount = async () => {
  try {
    deleting.value = true;
    await userAPI.deleteAccount();
    toast.info("Your account has been deleted");
    await authStore.logout();
    router.push("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete account");
  } finally {
    deleting.value = false;
    showDeleteModal.value = false;
  }
};

onMounted(() => {
  loadUserData();
});
</script>
