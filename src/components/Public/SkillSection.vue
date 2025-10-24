<template>
  <!-- Start Skill Section -->
  <section
    ref="sectionRef"
    class="skill-area relative py-16 sm:py-10  overflow-hidden"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- Hero Image with Motion Effects -->
        <div
          class="relative w-full max-w-5xl group rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ease-out cursor-pointer"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @click="handleImageClick"
        >
          <!-- Main Image -->
          <img
            src="@/assets/images/smallbanner.jpg"
            alt="Trusted Finance - Advanced Trading Platform"
            class="w-full h-auto object-cover rounded-3xl transition-all duration-700 ease-out transform"
            :class="[
              imageLoaded ? 'grayscale-0' : 'grayscale',
              isHovered ? 'scale-[1.03] shadow-2xl' : 'scale-100 shadow-xl'
            ]"
            @load="imageLoaded = true"
            @error="handleImageError"
          />

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-tr from-[#0066cc]/30 via-transparent to-[#1a2332]/30 rounded-3xl transition-opacity duration-500 ease-out pointer-events-none"
            :class="isHovered ? 'opacity-100' : 'opacity-0'"
          ></div>

          <!-- Floating Badge -->
          <div
            class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all duration-500 transform"
            :class="isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'"
          >
            <span class="text-sm font-semibold text-[#1a2332] flex items-center gap-2">
              <font-awesome-icon icon="chart-line" class="text-[#0066cc] w-4 h-4" />
              Live Platform
            </span>
          </div>

          <!-- CTA Button -->
          <div
            class="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500"
            :class="isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          >
            <button
              @click.stop="explorePlatform"
              class="bg-gradient-to-r from-[#0066cc] to-[#00aaff] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 focus:ring-4 focus:ring-[#0066cc]/30 transition-all duration-300 flex items-center gap-2 group"
            >
              Explore Platform
              <font-awesome-icon
                icon="arrow-right"
                class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          <!-- Loading Skeleton -->
          <div
            v-if="!imageLoaded"
            class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl animate-pulse"
          ></div>
        </div>

        <!-- Stats Section -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 w-full max-w-4xl"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-gradient-to-br from-[#0066cc] to-[#1a2332] rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
          >
            <p class="text-3xl sm:text-4xl font-bold text-gray-100 mb-1">
              {{ stat.value }}
            </p>
            <p
              class="text-sm sm:text-base text-gray-300 "
            >
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Skill Section -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// State
const isHovered = ref(false);
const imageLoaded = ref(false);
const sectionRef = ref(null);

// Stats data
const stats = ref([
  { value: "99.9%", label: "Uptime" },
  { value: "50ms", label: "Execution Speed" },
  { value: "256-bit", label: "Encryption" },
]);

// Methods
const handleImageClick = () => {
  console.log("Image clicked - open modal or navigate");
};

const explorePlatform = () => {
  router.push("/platform");
};

const handleImageError = () => {
  console.error("Image failed to load");
  imageLoaded.value = true;
};

// Visibility observer (optional animation trigger)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRef.value.classList.add("animate-fade-in-up");
        }
      });
    },
    { threshold: 0.2 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<style scoped>
.skill-area {
  will-change: transform, opacity;
}

/* Fade-in entrance animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .skill-area {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  img {
    border-radius: 1rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
