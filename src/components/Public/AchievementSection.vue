<template>
  <section
    class="achievement-area bg-fixed shadow text-light default-padding relative overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <!-- Left Column - Content -->
        <div class="col-md-6 info">
          <div class="space-y-6 lg:space-y-8">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30"
            >
              <font-awesome-icon icon="chart-line" class="w-3 h-3" />
              <span>Smart Investing</span>
            </div>

            <!-- Main Heading -->
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              It's time to make your <br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
              >
                money work for you
              </span>
            </h2>

            <!-- Content Paragraphs -->
            <div class="space-y-4 text-white/90 leading-relaxed text-lg">
              <p>
                Most trading platforms have a high-risk area where you can
                either double or even triple your capital and then lose it in
                few minutes.
                <strong class="text-white">Trusted Finance</strong> has several
                advantages that make it possible to get more profit with little
                or no risk.
              </p>
              <p>
                Opportunities arise daily and are numerous, and we provide you
                with the means to connect from one to the other.
              </p>
              <p>
                Whether you're new to the markets or a professional, dedicated
                customer support is an integral part of a successful trading
                experience; if you have questions, comments or concerns, our
                local staff is on-hand to answer all your needs.
              </p>
            </div>

            <!-- Features List -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                  <font-awesome-icon
                    icon="shield-alt"
                    class="text-green-400 text-lg"
                  />
                </div>
                <span class="text-white font-medium">Low Risk Trading</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"
                >
                  <font-awesome-icon
                    icon="bolt"
                    class="text-blue-400 text-lg"
                  />
                </div>
                <span class="text-white font-medium">Daily Opportunities</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center"
                >
                  <font-awesome-icon
                    icon="headset"
                    class="text-purple-400 text-lg"
                  />
                </div>
                <span class="text-white font-medium">Expert Support</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center"
                >
                  <font-awesome-icon
                    icon="user-tie"
                    class="text-orange-400 text-lg"
                  />
                </div>
                <span class="text-white font-medium">Professional Tools</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                @click="startNow"
                class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
              >
                <span>Start Trading Now</span>
                <font-awesome-icon
                  icon="rocket"
                  class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                />
              </button>

              <button
                @click="learnMore"
                class="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
              >
                <span>Learn More</span>
                <font-awesome-icon
                  icon="info-circle"
                  class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Statistics -->
        <div class="col-md-6 achievement-items">
          <div class="grid grid-cols-2 gap-6 lg:gap-8">
            <div
              v-for="(stat, index) in statistics"
              :key="index"
              class="item group"
            >
              <div
                class="fun-fact bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 text-center"
              >
                <!-- Animated Counter -->
                <div
                  class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2"
                >
                  {{ animatedStats[index] }}{{ stat.suffix }}
                </div>

                <!-- Label -->
                <span
                  class="text-white/80 font-medium text-sm lg:text-base tracking-wide"
                >
                  {{ stat.label }}
                </span>

                <!-- Progress Bar -->
                <div
                  class="w-full bg-white/20 rounded-full h-1 mt-4 overflow-hidden"
                >
                  <div
                    class="h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    :style="{
                      width: (animatedStats[index] / stat.target) * 100 + '%',
                    }"
                  ></div>
                </div>

                <!-- Icon -->
                <div
                  class="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center mt-4 group-hover:scale-110 transition-transform duration-300"
                >
                  <font-awesome-icon
                    :icon="stat.icon"
                    class="text-white text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Trust Badge -->
          <div
            class="mt-8 lg:mt-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <font-awesome-icon
                  icon="award"
                  class="text-green-400 text-xl"
                />
              </div>
              <div>
                <h4 class="text-white font-semibold text-lg mb-1">
                  Trusted by Thousands
                </h4>
                <p class="text-white/80 text-sm">
                  Join our community of successful investors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Trust Indicators -->
      <div class="row mt-16 lg:mt-20">
        <div class="col-md-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              class="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div
                class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon icon="lock" class="text-blue-400 text-xl" />
              </div>
              <h4 class="text-white font-semibold mb-2">Secure Platform</h4>
              <p class="text-white/80 text-sm">Bank-level security</p>
            </div>

            <div
              class="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div
                class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="clock"
                  class="text-green-400 text-xl"
                />
              </div>
              <h4 class="text-white font-semibold mb-2">24/7 Markets</h4>
              <p class="text-white/80 text-sm">Trade anytime</p>
            </div>

            <div
              class="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div
                class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="chart-line"
                  class="text-purple-400 text-xl"
                />
              </div>
              <h4 class="text-white font-semibold mb-2">Real-time Data</h4>
              <p class="text-white/80 text-sm">Live market insights</p>
            </div>

            <div
              class="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div
                class="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <font-awesome-icon
                  icon="users"
                  class="text-orange-400 text-xl"
                />
              </div>
              <h4 class="text-white font-semibold mb-2">Expert Community</h4>
              <p class="text-white/80 text-sm">Learn from pros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Background image
const backgroundImage = ref("@/assets/images/banner/2.jpg");

// Statistics data
const statistics = ref([
  {
    value: 1830,
    target: 2000,
    label: "DAILY TRANSACTIONS",
    icon: "exchange-alt",
    suffix: "+",
  },
  {
    value: 489,
    target: 500,
    label: "ACTIVE ACCOUNTS",
    icon: "user-check",
    suffix: "K+",
  },
  {
    value: 88,
    target: 100,
    label: "ACCOUNT MANAGERS",
    icon: "user-tie",
    suffix: "+",
  },
  {
    value: 4348,
    target: 5000,
    label: "SATISFIED CLIENTS",
    icon: "users",
    suffix: "+",
  },
]);

// Animated counters
const animatedStats = ref([0, 0, 0, 0]);
const animationStarted = ref(false);

// Animate counters
const animateCounters = () => {
  statistics.value.forEach((stat, index) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        animatedStats.value[index] = stat.value;
        clearInterval(timer);
      } else {
        animatedStats.value[index] = Math.floor(current);
      }
    }, stepTime);
  });
};

// Intersection Observer
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted.value) {
          animationStarted.value = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.3 }
  );

  const section = document.querySelector(".achievement-area");
  if (section) {
    observer.observe(section);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Methods
const startNow = () => {
  router.push("/register");
};

const learnMore = () => {
  router.push("/about");
};
</script>

<style scoped>
.achievement-area {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.default-padding {
  padding: 40px 0;
}

/* Mobile-first responsive design */
@media (max-width: 639px) {
  .achievement-area {
    background-attachment: scroll; /* Better performance on mobile */
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .text-3xl {
    font-size: 2rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }

  .gap-6 {
    gap: 1.5rem;
  }

  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .text-4xl {
    font-size: 2.25rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .p-8 {
    padding: 2rem;
  }

  .text-5xl {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-8 {
    padding: 2rem;
  }

  .text-6xl {
    font-size: 3.75rem;
  }
}

/* Large desktop optimizations */
@media (min-width: 1280px) {
  .text-6xl {
    font-size: 4rem;
  }

  .gap-16 {
    gap: 4rem;
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

  /* Increase tap targets */
  button {
    min-height: 44px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-transform {
    transition: none;
  }

  .group-hover\:scale-110,
  .hover\:scale-105,
  .hover\:-translate-y-2 {
    transform: none;
  }

  .animateCounters {
    animation: none;
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

/* Custom scrollbar */
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

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity,
    box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Loading state for background image */
.achievement-area::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
  background-size: 400% 400%;
  animation: loadingBackground 2s ease-in-out infinite;
  opacity: 0;
  z-index: 0;
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

.achievement-area:not(.bg-loaded)::before {
  opacity: 1;
}
</style>
