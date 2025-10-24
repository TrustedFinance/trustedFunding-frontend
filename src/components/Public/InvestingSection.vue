<template>
  <section
    class="contact-area default-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden py-8"
    aria-labelledby="contact-heading"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- ⚠️ Risk Warning -->
      <div class="my-12">
        <div
          class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 text-center"
          role="alert"
          aria-live="assertive"
        >
          <p
            class="text-orange-800 font-semibold text-lg leading-relaxed md:flex items-center justify-center"
          >
            <font-awesome-icon
              icon="exclamation-triangle"
              class="w-5 h-5 mr-2"
            />
            Forex/CFD trading involves substantial risk and may result in the
            loss of your invested or greater than your invested capital.
          </p>
        </div>
      </div>

      <!-- 🌍 Main Content -->
      <div
        class="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 bg-white/70 backdrop-blur-sm rounded-3xl p-8"
      >
        <!-- 🧭 Left: Information -->
        <div class="space-y-8">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-[#333366]/10 text-[#333366] px-4 py-2 rounded-full text-sm font-semibold"
          >
            <font-awesome-icon icon="user-plus" class="w-3 h-3" />
            <span>New Investors</span>
          </div>

          <!-- Heading -->
          <h2
            id="contact-heading"
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
          >
            New to <span class="text-[#333366]">investing?</span>
          </h2>

          <!-- Description -->
          <div class="text-gray-600 leading-relaxed space-y-4 text-lg">
            <p>
              <strong class="text-[#333366]">Trusted Finance</strong> is an
              independent trading and investment company specializing in
              <strong>FOREX, CRYPTO, STOCKS, and REAL ESTATE</strong>.
            </p>
            <p>
              Our team of expert traders ensures consistent profitability and
              reliable fund management for clients worldwide.
            </p>
          </div>

          <!-- Features -->
          <ul
            class="grid grid-cols-2 gap-4 pt-4 text-sm font-medium text-gray-700"
          >
            <li class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-green-500/20 text-green-600"
              >
                <font-awesome-icon icon="chart-line" />
              </span>

              Forex Trading
            </li>
            <li class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-blue-500/20 text-blue-600"
              >
                <font-awesome-icon icon="bitcoin" />
              </span>
              Crypto Assets
            </li>
            <li class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-purple-500/20 text-purple-600"
              >
                <font-awesome-icon icon="building" />
              </span>
              Stocks
            </li>
            <li class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-orange-500/20 text-orange-600"
              >
                <font-awesome-icon icon="home" />
              </span>
              Real Estate
            </li>
          </ul>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div class="text-center">
              <p class="text-3xl font-bold text-[#333366]">10+</p>
              <p class="text-xs text-gray-600">Years Experience</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-[#333366]">2M+</p>
              <p class="text-xs text-gray-600">Clients</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-[#333366]">24/7</p>
              <p class="text-xs text-gray-600">Support</p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              @click="signUp"
              class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-[#0066cc] focus:outline-none"
            >
              <span>Start Investing Today</span>
              <font-awesome-icon
                icon="arrow-right"
                class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              @click="learnMore"
              class="bg-white text-[#333366] border-2 border-gray-300 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:border-[#333366] hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-[#333366] focus:outline-none"
            >
              <span>Learn More</span>
              <font-awesome-icon
                icon="info-circle"
                class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        <!-- 💻 Right: Platform Image -->
        <div class="relative">
          <div class="bg-white rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            <img
              src="@/assets/images/MT5-platform.png"
              alt="MetaTrader 5 Trading Platform preview"
              class="w-full h-auto rounded-xl transition-transform duration-500 hover:scale-[1.02]"
              @load="imageLoaded = true"
              @error="handleImageError"
            />

            <!-- Loading Spinner -->
            <transition name="fade">
              <div
                v-if="!imageLoaded"
                class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="loader mb-3 mx-auto"></div>
                  <p class="text-gray-600 text-sm">
                    Loading Platform Preview...
                  </p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Floating Decorations -->
          <div
            class="absolute -bottom-6 -left-6 w-20 h-20 bg-[#0066cc]/10 rounded-full hidden lg:block"
          ></div>
          <div
            class="absolute -top-6 -right-6 w-16 h-16 bg-[#333366]/10 rounded-full hidden lg:block"
          ></div>

          <!-- Mini Features -->
          <div class="grid grid-cols-1 gap-4 mt-8">
            <div class="feature-card">
              <font-awesome-icon
                icon="bolt"
                class="text-green-500 text-xl mb-2"
              />
              <p class="text-sm font-semibold text-gray-700">Fast Execution</p>
            </div>
            <!-- <div
              class="text-center p-4 bg-white rounded-xl border border-gray-100 transition"
            >
              <font-awesome-icon
                icon="mobile-alt"
                class="text-blue-500 text-xl mb-2"
              />
              <p class="text-sm font-semibold text-gray-700">Mobile App</p>
            </div> -->
          </div>
        </div>
      </div>

      <!-- ✅ Trust Indicators -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(trust, i) in trustIndicators"
          :key="i"
          class="text-center p-6 bg-white rounded-2xl border border-gray-100 hover:scale-[1.02] transition-all duration-300"
        >
          <div
            :class="trust.bg"
            class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <font-awesome-icon
              :icon="trust.icon"
              :class="trust.color"
              class="text-xl"
            />
          </div>
          <h4 class="font-bold text-gray-800 mb-2">{{ trust.title }}</h4>
          <p class="text-gray-600 text-sm">{{ trust.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const imageLoaded = ref(false);

const signUp = () => router.push("/register");
const learnMore = () => router.push("/about");
const handleImageError = () => (imageLoaded.value = true);

const trustIndicators = [
  {
    title: "Secure & Regulated",
    desc: "Your funds are protected",
    icon: "shield-alt",
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
  {
    title: "24/5 Markets",
    desc: "Trade around the clock",
    icon: "clock",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    title: "Advanced Tools",
    desc: "Professional analytics",
    icon: "chart-line",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    title: "Expert Support",
    desc: "Always here to help",
    icon: "headset",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
];
</script>
<style scoped>
.default-padding {
  padding: 40px 0;
}
</style>
