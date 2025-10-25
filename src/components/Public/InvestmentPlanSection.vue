<template>
  <section
    id="pricing"
    class="pricing-area bg-gray-50 default-padding bottom-less"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="row mb-8 lg:mb-12">
        <div class="col-md-8 col-md-offset-2">
          <div class="site-heading text-center space-y-4">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-[#333366]/10 text-[#333366] px-4 py-2 rounded-full text-sm font-semibold"
            >
              <font-awesome-icon icon="tags" class="w-3 h-3" />
              <span>Investment Plans</span>
            </div>

            <!-- Main Heading -->
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333366]"
            >
              Our Pricing
            </h2>

            <!-- Subtitle -->
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect plan to start your investment journey with
              competitive returns
            </p>
          </div>
        </div>
      </div>

      <!-- Investment Plans Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="plan in investmentPlans"
          :key="plan._id"
          class="bg-white rounded-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-2 border border-gray-200"
        >
          <!-- Header -->
          <div class="p-6 lg:p-8 flex-1 flex flex-col">
            <!-- Title -->
            <div class="text-center mb-6">
              <div
                class="w-16 h-16 mx-auto bg-gradient-to-br from-[#333366] to-[#0066cc] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
              >
                <font-awesome-icon icon="chart-line" class="text-white text-xl" />
              </div>
              <h4 class="text-xl lg:text-2xl font-bold text-[#333366]">
                {{ plan.name }}
              </h4>
            </div>

            <!-- ROI & Duration -->
            <div
              class="text-center mb-6 p-4 bg-gradient-to-r from-[#333366] to-[#0066cc] rounded-xl"
            >
              <div class="text-white font-bold text-2xl lg:text-3xl">
                {{ (plan.multiplier * 100 - 100).toFixed(0) }}% ROI
              </div>
              <p class="text-white/80 text-sm mt-1">
                Duration: {{ plan.durationDays }} days
              </p>
            </div>

            <!-- Plan Details -->
            <ul class="space-y-4 mb-8 flex-1">
              <li class="flex justify-between text-sm lg:text-base">
                <span class="text-gray-700">Min Investment:</span>
                <span class="font-medium text-gray-900">{{
                  formatCurrency(plan.minAmount)
                }}</span>
              </li>
              <li class="flex justify-between text-sm lg:text-base">
                <span class="text-gray-700">Max Investment:</span>
                <span class="font-medium text-gray-900">{{
                  formatCurrency(plan.maxAmount)
                }}</span>
              </li>
              <li class="flex justify-between text-sm lg:text-base">
                <span class="text-gray-700">Multiplier:</span>
                <span class="font-medium text-gray-900">
                  x{{ plan.multiplier }}
                </span>
              </li>
            </ul>

            <!-- Description -->
            <p class="text-gray-600 text-sm text-center mt-auto">
              {{ plan.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="row mt-12 lg:mt-16">
        <div class="col-md-12">
          <!-- Trust Features -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div class="text-center p-4">
              <div
                class="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="shield-alt"
                  class="text-green-600 text-xl"
                />
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">Secure & Safe</h4>
              <p class="text-gray-600 text-sm">Bank-level security</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon icon="clock" class="text-blue-600 text-xl" />
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">24/7 Support</h4>
              <p class="text-gray-600 text-sm">Always here to help</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="chart-line"
                  class="text-purple-600 text-xl"
                />
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">Proven Returns</h4>
              <p class="text-gray-600 text-sm">Competitive profits</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="user-check"
                  class="text-orange-600 text-xl"
                />
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">Easy Setup</h4>
              <p class="text-gray-600 text-sm">3-minute registration</p>
            </div>
          </div>

          <!-- FAQ CTA -->
          <div
            class="bg-white rounded-2xl p-6 lg:p-8 text-center border border-gray-200"
          >
            <h3 class="text-xl lg:text-2xl font-bold text-[#333366] mb-4">
              Have questions about our plans?
            </h3>
            <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you choose the right
              plan for your investment goals.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="contactSupport"
                class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-6 lg:px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <font-awesome-icon icon="headset" class="w-4 h-4" />
                <span>Contact Support</span>
              </button>
              <button
                @click="viewFAQ"
                class="bg-white text-[#333366] border-2 border-gray-300 px-6 lg:px-8 py-3 rounded-xl font-semibold hover:border-[#333366] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <font-awesome-icon icon="question-circle" class="w-4 h-4" />
                <span>View FAQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { investmentAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const investmentPlans = ref([]);

// Fetch plans
const loadInvestmentPlans = async () => {
  try {
    const response = await investmentAPI.getAllPublicPlans();
    investmentPlans.value = response.data;
  } catch (error) {
    console.error("Failed to load investment plans:", error);
    toast.error("Failed to load investment plans");
  }
};

// Currency formatter
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: authStore.user?.currency || "USD",
  }).format(amount);
};

const contactSupport = () => {
  router.push("/contact");
};

const viewFAQ = () => {
  router.push("/faq");
};

onMounted(loadInvestmentPlans);
</script>

