<template>
  <section
    class="services-area default-padding text-light bottom-less shadow bg-fixed relative overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="row mb-12 lg:mb-16">
        <div class="col-md-8 col-md-offset-2">
          <div class="site-heading text-center space-y-4 lg:space-y-6">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30"
            >
              <font-awesome-icon icon="rocket" class="w-3 h-3" />
              <span>Get Started</span>
            </div>

            <!-- Main Heading -->
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              Ready to get started?
            </h1>

            <!-- Subheading -->
            <h4
              class="text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto"
            >
              It only takes 3 minutes to get your account set up and ready for
              trading
            </h4>

            <!-- Timer Badge -->
            <div
              class="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              <font-awesome-icon icon="clock" class="w-4 h-4" />
              <span>3 Minutes Setup</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Steps Section -->
      <div class="row">
        <div class="services-items">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <!-- Step 1: Create Account -->
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="equal-height group"
            >
              <div
                class="item bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                <!-- Step Number -->
                <div
                  class="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-[#333366] to-[#0066cc] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                >
                  {{ index + 1 }}
                </div>

                <!-- Icon -->
                <div class="icon mb-6 lg:mb-8">
                  <div
                    class="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center border border-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110"
                  >
                    <font-awesome-icon
                      :icon="step.icon"
                      class="text-white text-2xl lg:text-3xl"
                    />
                  </div>
                </div>

                <!-- Content -->
                <div class="info flex-1 flex flex-col">
                  <h4
                    class="text-xl lg:text-2xl font-bold text-white text-center mb-4 lg:mb-6 leading-tight"
                  >
                    {{ step.title }}
                  </h4>

                  <p
                    class="text-white/80 text-center text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 flex-1"
                  >
                    {{ step.description }}
                  </p>

                  <!-- CTA Button -->
                  <button
                    @click="handleStepClick(step)"
                    class="w-full bg-white/20 backdrop-blur-sm text-white py-3 lg:py-4 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/30 hover:border-white/50"
                  >
                    <span>{{ step.ctaText }}</span>
                    <font-awesome-icon
                      icon="arrow-right"
                      class="w-3 h-3 lg:w-4 lg:h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>

                  <!-- Step Indicator -->
                  <div class="flex items-center justify-center mt-4 lg:mt-6">
                    <div class="flex items-center gap-2">
                      <div
                        v-for="dot in 3"
                        :key="dot"
                        class="w-2 h-2 rounded-full transition-all duration-300"
                        :class="
                          dot === index + 1
                            ? 'bg-white scale-125'
                            : 'bg-white/40'
                        "
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Hover Effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="row mt-12 lg:mt-16">
        <div class="col-md-12 text-center">
          <div class="space-y-6 lg:space-y-8">
            <!-- Trust Badges -->
            <div class="flex flex-wrap justify-center gap-4 lg:gap-6">
              <div class="flex items-center gap-2 text-white/80 text-sm">
                <font-awesome-icon icon="shield-alt" class="text-green-400" />
                <span>Secure & Regulated</span>
              </div>
              <div class="flex items-center gap-2 text-white/80 text-sm">
                <font-awesome-icon icon="clock" class="text-blue-400" />
                <span>24/7 Support</span>
              </div>
              <div class="flex items-center gap-2 text-white/80 text-sm">
                <font-awesome-icon
                  icon="check-circle"
                  class="text-emerald-400"
                />
                <span>No Hidden Fees</span>
              </div>
            </div>

            <!-- Main CTA Button -->
            <button
              @click="startNow"
              class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 lg:px-12 py-4 lg:py-6 rounded-2xl font-bold text-lg lg:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto group"
            >
              <span>Start Trading Now - It's Free</span>
              <font-awesome-icon
                icon="rocket"
                class="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300"
              />
            </button>

            <!-- Additional Info -->
            <p class="text-white/70 text-sm lg:text-base">
              No credit card required • Free demo account available • Start with
              as little as $10
            </p>
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

// Background image
import bgImg from "@/assets/images/banner/13.jpg";
const backgroundImage = ref(bgImg);

// Steps data
const steps = ref([
  {
    title: "Create And Verify Account",
    description:
      "Sign up in less than a minute with our simple registration process. Complete verification quickly to unlock full platform access.",
    icon: "user-plus",
    ctaText: "First Step",
    action: "/register",
  },
  {
    title: "Fund Account",
    description:
      "Deposit funds securely using multiple payment methods. Start trading with as little as $10 minimum deposit.",
    icon: "credit-card",
    ctaText: "Second Step",
    action: "/deposit",
  },
  {
    title: "Start Trading",
    description:
      "Access our advanced trading platform and begin your investment journey with real-time market data and tools.",
    icon: "chart-line",
    ctaText: "Final Step",
    action: "/trading",
  },
]);

// Methods
const handleStepClick = (step) => {
  // Navigate to the appropriate page
  router.push(step.action);
};

const startNow = () => {
  router.push("/register");
};
</script>

<style scoped>
.services-area {
  padding: 40px 0;

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.bottom-less {
  padding-bottom: 0;
}

/* Mobile-first responsive design */
@media (max-width: 640px) {
  .services-area {
    background-attachment: scroll; /* Better performance on mobile */
  }

  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .text-3xl {
    font-size: 2rem;
    line-height: 1.2;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .gap-6 {
    gap: 1.5rem;
  }
}

@media (min-width: 641px) and (max-width: 767px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-6 {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-8 {
    padding: 2rem;
  }

  .text-4xl {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .p-8 {
    padding: 2rem;
  }

  .text-5xl {
    font-size: 3rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}

/* Large desktop optimizations */
@media (min-width: 1280px) {
  .text-6xl {
    font-size: 3.75rem;
  }

  .p-8 {
    padding: 2.5rem;
  }

  .gap-8 {
    gap: 2.5rem;
  }
}

/* Extra large screens */
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

  .transform.hover\:scale-\[1\.02\]:hover {
    transform: scale(1);
  }

  /* Increase tap targets for mobile */
  button,
  .item {
    min-height: 44px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-transform,
  .transition-opacity {
    transition: none;
  }

  .group-hover\:scale-110,
  .group-hover\:translate-x-1,
  .hover\:scale-105,
  .hover\:-translate-y-2,
  .hover\:scale-\[1\.02\] {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .border-white\/20 {
    border-color: white;
  }

  .text-white\/80 {
    color: white;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: #1a1a1a;
  }
}

/* Ensure equal height on all screen sizes */
.equal-height {
  display: flex;
}

.equal-height .item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Custom scrollbar for webkit */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, transform, opacity,
    box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
button:focus-visible,
.item:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Loading state for background image */
.services-area {
  background-color: #1a1a1a; /* Fallback color */
}

.services-area::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
  background-size: 400% 400%;
  animation: loadingBackground 2s ease-in-out infinite;
  opacity: 0;
}

@keyframes loadingBackground {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.services-area:not(.bg-loaded)::before {
  opacity: 1;
}
</style>
