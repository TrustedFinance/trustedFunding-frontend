<template>
  <section
    class="skill-area relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20"
  >
    <!-- Decorative background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0066cc]/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#333366]/10 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-14">
        <h2
          class="text-4xl sm:text-5xl font-bold text-[#1a1a40] mb-4 animate-fade-in"
        >
          What is Bitcoin Mining?
        </h2>
        <p
          class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-200"
        >
          Discover our innovative approach to virtual Bitcoin mining —
          sustainable, accessible, and efficient.
        </p>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <!-- Left: Image -->
        <div
          class="relative group order-2 lg:order-1 animate-fade-in-up"
          data-aos="fade-right"
        >
          <div class="thumb relative">
            <img
              src="@/assets/images/crypto-mining-rig.jpg"
              alt="Bitcoin Virtual Mining Platform - Sustainable Crypto Mining"
              class="w-full h-auto rounded-2xl  transition-all duration-700 group-hover:scale-[1.03]"
              @load="imageLoaded = true"
              @error="handleImageError"
            />

            <!-- Loader -->
            <div
              v-if="!imageLoaded"
              class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse flex flex-col items-center justify-center"
            >
              <div
                class="w-12 h-12 border-4 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mb-3"
              ></div>
              <p class="text-gray-600 text-sm">
                Loading Mining Illustration...
              </p>
            </div>

            <!-- Overlay glow -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#0066cc]/10 to-[#333366]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></div>

            <!-- Floating Badge -->
            <div
              class="absolute -top-4 -right-4 bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-4 py-2 rounded-full  transform rotate-6 opacity-0 group-hover:opacity-100 group-hover:-rotate-3 transition-all duration-500"
            >
              <span class="text-sm font-semibold tracking-wide"
                >Sustainable</span
              >
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div
              v-for="(stat, i) in stats"
              :key="i"
              class="text-center p-3 bg-white rounded-lg  border border-gray-100 transition-all duration-300"
            >
              <div
                class="w-8 h-8 bg-[#333366]/10 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <font-awesome-icon
                  :icon="stat.icon"
                  class="text-[#333366] text-sm"
                />
              </div>
              <p class="text-xs font-semibold text-[#333366]">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Text -->
        <div
          class="space-y-6 order-1 lg:order-2 animate-fade-in-up delay-200"
          data-aos="fade-left"
        >
          <!-- Description -->
          <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>
              <strong class="text-[#333366]">Bitcoin virtual mining</strong> is
              an algorithm-based process that analyzes the performance and
              output of real Bitcoin mining farms, replicating their hash rate
              and experience through a digital simulation.
            </p>
            <p>
              It allows users to experience Bitcoin mining in a
              <strong class="text-[#333366]">simple, energy-free</strong> way —
              no hardware, no overheating, and no complicated setup.
            </p>
          </div>

          <!-- Benefits List -->
          <div class="space-y-3">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="flex flex-col gap-2 p-4 bg-white rounded-xl  border border-gray-100 hover:border-[#0066cc]/30 transition-all duration-300 cursor-pointer"
              :class="{
                'ring-2 ring-[#0066cc]/50 bg-blue-50': activeBenefit === index,
              }"
              @click="activeBenefit = activeBenefit === index ? null : index"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-gradient-to-br from-[#333366] to-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <font-awesome-icon icon="check" class="text-white text-xs" />
                </div>
                <h4 class="font-semibold text-[#333366]">
                  {{ benefit.title }}
                </h4>
              </div>
              <transition name="fade">
                <p
                  v-if="activeBenefit === index"
                  class="text-gray-600 text-sm leading-relaxed pl-9"
                >
                  {{ benefit.description }}
                </p>
              </transition>
            </div>
          </div>

          <!-- Environmental Section -->
          <div
            class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50 "
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
              >
                <font-awesome-icon icon="leaf" class="text-white text-lg" />
              </div>
              <h4 class="text-lg font-bold text-green-800">
                Environmentally Conscious
              </h4>
            </div>
            <p class="text-green-700 leading-relaxed">
              Our virtual mining algorithm consumes zero physical energy. It
              rewards users based on <strong>loyalty tiers</strong>, making your
              mining experience not just sustainable, but also personally
              rewarding.
            </p>
          </div>

          <!-- CTA -->
          <div class="pt-6">
            <button
              @click="startMining"
              class="relative bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 group overflow-hidden  transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span class="relative z-10">Start Virtual Mining</span>
              <font-awesome-icon
                icon="rocket"
                class="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
              ></div>
            </button>
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
const imageLoaded = ref(false);
const activeBenefit = ref(null);

const stats = [
  { icon: "bolt", label: "Zero Energy" },
  { icon: "laptop", label: "No Hardware" },
  { icon: "chart-line", label: "Real Hash Rate" },
];

const benefits = [
  {
    title: "No Equipment Needed",
    description:
      "Experience Bitcoin mining without expensive hardware or technical setup.",
  },
  {
    title: "Sustainable Approach",
    description:
      "Zero energy consumption and no environmental impact compared to traditional mining.",
  },
  {
    title: "Loyalty Rewards",
    description:
      "Higher loyalty status increases your virtual hash rate and mining speed.",
  },
  {
    title: "User-Friendly",
    description:
      "Simple interface designed for both beginners and experienced crypto enthusiasts.",
  },
];

const startMining = () => router.push("/start-mining");

const handleImageError = () => {
  console.error("Failed to load Bitcoin mining image");
  imageLoaded.value = true;
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fadeInUp 1s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
