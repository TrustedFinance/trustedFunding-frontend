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

      <!-- Pricing Cards -->
      <div class="row">
        <div class="pricing pricing-simple">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            <!-- Basic Plan -->
            <div
              v-for="(plan, index) in pricingPlans"
              :key="index"
              class="pricing-item group"
            >
              <div
                class="bg-white rounded-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-2 border border-gray-200"
              >
                <!-- Popular Badge -->
                <div
                  v-if="plan.popular"
                  class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white py-2 text-center text-sm font-semibold"
                >
                  Most Popular
                </div>

                <!-- Header -->
                <div class="p-6 lg:p-8 flex-1 flex flex-col">
                  <!-- Icon & Title -->
                  <div class="text-center mb-6">
                    <div
                      class="w-16 h-16 mx-auto bg-gradient-to-br from-[#333366] to-[#0066cc] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                    >
                      <font-awesome-icon
                        :icon="plan.icon"
                        class="text-white text-xl"
                      />
                    </div>
                    <h4 class="text-xl lg:text-2xl font-bold text-[#333366]">
                      {{ plan.title }}
                    </h4>
                  </div>

                  <!-- Price -->
                  <div
                    class="text-center mb-6 p-4 bg-gradient-to-r from-[#333366] to-[#0066cc] rounded-xl"
                  >
                    <div class="text-white font-bold text-2xl lg:text-3xl">
                      {{ plan.price }}
                    </div>
                    <p class="text-white/80 text-sm mt-1">
                      {{ plan.priceSubtitle }}
                    </p>
                  </div>

                  <!-- Features -->
                  <ul class="space-y-4 mb-8 flex-1">
                    <li
                      v-for="(feature, featureIndex) in plan.features"
                      :key="featureIndex"
                      class="flex items-center justify-between text-sm lg:text-base"
                    >
                      <span class="text-gray-700 flex-1">{{
                        feature.text
                      }}</span>
                      <font-awesome-icon
                        :icon="
                          feature.included ? 'check-circle' : 'times-circle'
                        "
                        :class="[
                          'w-4 h-4 flex-shrink-0 ml-2',
                          feature.included ? 'text-green-500' : 'text-red-400',
                        ]"
                      />
                    </li>
                  </ul>

                  <!-- Profit Highlight -->
                  <div
                    class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border border-green-200"
                  >
                    <p
                      class="text-green-800 font-semibold text-center text-sm lg:text-base"
                    >
                      <font-awesome-icon
                        icon="chart-line"
                        class="w-3 h-3 mr-1"
                      />
                      Profit: {{ plan.profit }}
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <button
                    @click="selectPlan(plan)"
                    class="w-full bg-gradient-to-r from-[#333366] to-[#0066cc] text-white py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Get Started</span>
                    <font-awesome-icon
                      icon="arrow-right"
                      class="w-3 h-3 lg:w-4 lg:h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>

                  <!-- Additional Info -->
                  <p class="text-gray-500 text-xs text-center mt-3">
                    {{ plan.note }}
                  </p>
                </div>
              </div>
            </div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Pricing plans data
const pricingPlans = ref([
  {
    title: "Basic Plan",
    icon: "star",
    price: "$300 - $699",
    priceSubtitle: "USD, EUR, GBP",
    popular: false,
    features: [
      { text: "Commission", included: false },
      { text: "Limited instruments", included: true },
      { text: "Access to all trading assets", included: true },
      { text: "24/7 live Support", included: true },
    ],
    profit: "$4,200 - $9,786",
    note: "Perfect for beginners",
    action: "/register/basic",
  },
  {
    title: "Silver Plan",
    icon: "award",
    price: "$700 - $1,999",
    priceSubtitle: "USD, EUR, GBP",
    popular: true,
    features: [
      { text: "Commission", included: false },
      { text: "Full access to all instruments", included: true },
      { text: "24/7 live Support", included: true },
      { text: "Full access education centre", included: true },
    ],
    profit: "$9,800 - $27,986",
    note: "Most popular choice",
    action: "/register/silver",
  },
  {
    title: "Gold Plan",
    icon: "crown",
    price: "$2,000 - $3,490",
    priceSubtitle: "USD, EUR, GBP",
    popular: false,
    features: [
      { text: "Commission", included: false },
      { text: "Full access to all instruments", included: true },
      { text: "24/7 live Support", included: true },
      { text: "Full access education centre", included: true },
    ],
    profit: "$28,000 - $48,860",
    note: "Advanced trading features",
    action: "/register/gold",
  },
  {
    title: "Platinum Plan",
    icon: "gem",
    price: "$3,500+",
    priceSubtitle: "USD, EUR, GBP",
    popular: false,
    features: [
      { text: "Commission", included: false },
      { text: "Full access to all instruments", included: true },
      { text: "24/7 live Support", included: true },
      { text: "Full access education centre", included: true },
    ],
    profit: "$49,000+",
    note: "Premium investment solution",
    action: "/register/platinum",
  },
]);

// Methods
const selectPlan = (plan) => {
  router.push(plan.action);
};

const contactSupport = () => {
  router.push("/contact");
};

const viewFAQ = () => {
  router.push("/faq");
};
</script>

<style scoped>
.pricing-area {
  padding: 40px 0;
}

.bottom-less {
  padding-bottom: 0;
}

/* Mobile-first responsive design */
@media (max-width: 639px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }

  .gap-6 {
    gap: 1.5rem;
  }

  .space-y-4 > * + * {
    margin-top: 1rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-6 {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-8 {
    padding: 2rem;
  }

  .text-3xl {
    font-size: 1.875rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}

@media (min-width: 1280px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .p-8 {
    padding: 2rem;
  }

  .text-4xl {
    font-size: 2.25rem;
  }

  .gap-8 {
    gap: 2rem;
  }
}

/* Large desktop optimizations */
@media (min-width: 1536px) {
  .container {
    max-width: 1280px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .group:hover .group-hover\:scale-110 {
    transform: scale(1);
  }

  .transform.hover\:-translate-y-2:hover {
    transform: translateY(0);
  }

  /* Increase tap targets for mobile */
  button {
    min-height: 44px;
  }

  .pricing-item {
    min-height: auto;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-transform {
    transition: none;
  }

  .group-hover\:scale-110,
  .group-hover\/btn\:translate-x-1,
  .hover\:-translate-y-2 {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-gradient-to-r {
    background: #333366 !important;
  }

  .border-gray-200 {
    border-color: #000 !important;
  }

  .text-gray-600 {
    color: #000 !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: #1a1a1a;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #333366, #0066cc);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2a2a55, #0052a3);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
button:focus-visible,
.pricing-item:focus-visible {
  outline: 2px solid #333366;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Ensure equal height on pricing cards */
.pricing-item {
  display: flex;
}

.pricing-item > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Print styles */
@media print {
  .pricing-area {
    background: white !important;
  }

  .transform {
    transform: none !important;
  }
}
</style>
