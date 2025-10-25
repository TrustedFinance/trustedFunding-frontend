<template>
  <section
    class="blog-area services-section bg-gradient-to-b from-white to-gray-50/30 default-padding bottom-less md:py-6"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="site-heading text-center mb-16 lg:mb-20">
            <div
              class="inline-flex items-center gap-2 bg-[#333366]/10 text-[#333366] px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <font-awesome-icon icon="star" class="w-3 h-3" />
              <span>What We Offer</span>
            </div>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333366] mb-6"
            >
              Our Services
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              With over 2,000,000 clients since it was founded in 2011, Trusted
              Finance has grown to a well established international Trading and
              investment firm and has become a true industry leader.
            </p>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="row">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8"
        >
          <!-- Service Item -->
          <div
            v-for="(service, index) in services"
            :key="index"
            class="single-item group"
          >
            <div
              class="item bg-white rounded-2xl shadow-lg transition-all duration-500 overflow-hidden h-full flex flex-col relative"
            >
              <!-- Image -->
              <div class="thumb relative overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.title"
                  class="w-full h-48 lg:h-56 object-cover"
                  @load="service.imageLoaded = true"
                  @error="service.imageLoaded = true"
                />

                <!-- Loading State -->
                <div
                  v-if="!service.imageLoaded"
                  class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center"
                >
                  <div class="text-center">
                    <div
                      class="w-8 h-8 border-2 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mx-auto mb-2"
                    ></div>
                    <p class="text-gray-500 text-xs">Loading...</p>
                  </div>
                </div>

                <!-- Overlay Gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <!-- Service Icon -->
                <div
                  class="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <font-awesome-icon
                    :icon="service.icon"
                    class="text-[#333366] text-lg"
                  />
                </div>
              </div>

              <!-- Content -->
              <div class="info p-6 lg:p-8 flex-1 flex flex-col">
                <div class="flex-1">
                  <h4
                    class="text-xl lg:text-2xl font-bold text-[#333366] mb-4 group-hover:text-[#0066cc] transition-colors duration-300 leading-tight"
                  >
                    <a
                      :href="service.link"
                      class="hover:no-underline"
                      @click.prevent="navigateToService(service)"
                    >
                      {{ service.title }}
                    </a>
                  </h4>
                  <p
                    class="text-gray-600 leading-relaxed text-sm lg:text-base mb-6 line-clamp-4"
                  >
                    {{ service.description }}
                  </p>
                </div>

                <!-- Features List -->
                <div class="space-y-2 mb-6">
                  <div
                    v-for="(feature, featureIndex) in service.features"
                    :key="featureIndex"
                    class="flex items-center gap-2 text-xs lg:text-sm text-gray-500"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-[#0066cc] rounded-full flex-shrink-0"
                    ></div>
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <!-- CTA Button -->
                <!-- <button
                  @click="navigateToService(service)"
                  class="w-full bg-gradient-to-r from-[#333366] to-[#0066cc] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto"
                >
                  <span>Learn More</span>
                  <font-awesome-icon
                    icon="arrow-right"
                    class="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </button> -->
              </div>

              <!-- Hover Border Effect -->
              <div
                class="absolute inset-0 border-2 border-transparent group-hover:border-[#0066cc]/20 rounded-2xl transition-all duration-500 pointer-events-none"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="row mt-16 lg:mt-20">
        <div class="col-md-12 text-center">
          <div
            class="bg-gradient-to-r from-[#333366] to-[#0066cc] rounded-2xl p-8 lg:p-12 text-white shadow-2xl"
          >
            <h3 class="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Your Trading Journey?
            </h3>
            <p class="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join over 2 million satisfied clients and experience world-class
              trading services
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="startTrading"
                class="bg-white text-[#333366] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 group"
              >
                <span>Start Trading Now</span>
                <font-awesome-icon icon="rocket" class="w-4 h-4" />
              </button>
              <button
                @click="contactSupport"
                class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 flex items-center gap-3 group"
              >
                <span>Contact Support</span>
                <font-awesome-icon icon="headset" class="w-4 h-4" />
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

// ✅ Static image imports (so bundler resolves correctly)
import leaImg from "@/assets/images/lea.jpg";
import leaderImg from "@/assets/images/leader.jpg";
import tradeImg from "@/assets/images/trade.jpg";
import consultImg from "@/assets/images/consult.jpg";

const router = useRouter();

const services = ref([
  {
    title: "Easy Forex Trading",
    description:
      "Easy access for beginners & experienced traders. Know your potential profit in advance — just predict the market direction and trade confidently.",
    image: leaImg,
    // link: "https://Trusted Finance.com/forex-trading",
    icon: "chart-line",
    features: [
      "Beginner-friendly platform",
      "Advanced trading tools",
      "Real-time market data",
      "Risk management features",
    ],
    imageLoaded: false,
  },
  {
    title: "Proper Planning",
    description:
      "Realtime Analysis & Proper Planning. Monitor assets in real-time and make informed trading decisions with confidence.",
    image: leaderImg,
    // link: "https://Trusted Finance.com/planning",
    icon: "magnifying-glass-chart",
    features: [
      "Real-time analytics",
      "Strategic planning tools",
      "Market insights",
      "Performance tracking",
    ],
    imageLoaded: false,
  },
  {
    title: "Good Signals",
    description:
      "High returns powered by our proven and reliable trade signals built on expert analysis.",
    image: tradeImg,
    // link: "https://Trusted Finance.com/trade-signals",
    icon: "bullhorn",
    features: [
      "Accurate trade signals",
      "High success rate",
      "Multiple timeframes",
      "Risk-adjusted returns",
    ],
    imageLoaded: false,
  },
  {
    title: "24/7 Support",
    description:
      "Our support team is available around the clock through live chat or email — always ready to assist you.",
    image: consultImg,
    // link: "https://Trusted Finance.com/support",
    icon: "headset",
    features: [
      "24/7 live chat",
      "Email support",
      "Phone assistance",
      "Quick response times",
    ],
    imageLoaded: false,
  },
]);

// ✅ Navigation Methods
const navigateToService = (service) => window.open(service.link, "_blank");
const startTrading = () => router.push("/register");
const contactSupport = () => router.push("/contact");
</script>

<style scoped>
.services-section {
  padding-top: 40px;
  padding-bottom: 0px;
}

.bottom-less {
  padding-bottom: 0;
}

/* Line clamp for consistent text layout */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation helpers */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive grid handling */
@media (max-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Smooth transitions globally */
* {
  transition-property: color, background-color, border-color, transform, opacity,
    box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Image consistency */
img {
  aspect-ratio: 16/9;
  object-fit: cover;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #333366, #0066cc);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2a2a55, #0052a3);
}
</style>
