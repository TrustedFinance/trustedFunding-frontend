<template>
  <section 
    ref="sectionRef"
    class="skill-area py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100/30 overflow-hidden relative"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div 
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start"
        data-aos="fade-up"
      >
        <!-- Left Column - Progress Bars -->
        <div class="space-y-6 sm:space-y-8">
          <div class="mb-4 sm:mb-6">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333366] mb-3 sm:mb-4 tracking-tight">
              Why Choose Us
            </h2>
            <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
              We're constantly refining our trading systems to maximize accuracy and sustainability. 
              Delivering <strong class="text-[#0066cc]">excellence and reliability</strong> is not just our promise — it's our principle.
            </p>
          </div>

          <!-- Progress Bars -->
          <div class="space-y-6 sm:space-y-8">
            <div 
              v-for="(skill, index) in skills" 
              :key="index"
              class="progress-box group transition-transform duration-500 hover:scale-[1.01]"
            >
              <div class="flex justify-between items-center mb-2 sm:mb-3">
                <h5 class="font-semibold text-[#333366] text-sm sm:text-base lg:text-lg">{{ skill.name }}</h5>
                <span class="text-[#0066cc] font-bold text-base sm:text-lg">{{ skill.percentage }}%</span>
              </div>
              <div class="w-full bg-gray-200/70 rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div 
                  class="progress-bar h-2.5 sm:h-3 rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: animatedSkills[index] + '%' }"
                ></div>
              </div>
              <p class="text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2">{{ skill.description }}</p>
            </div>
          </div>

          <!-- Stats Summary -->
          <div class="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl  border border-gray-100 transition-all duration-500 ">
            <div class="text-center transform hover:scale-105 transition-transform duration-300">
              <p class="text-xl sm:text-2xl font-bold text-[#333366]">10K+</p>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Active Traders</p>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-300">
              <p class="text-xl sm:text-2xl font-bold text-[#333366]">99.9%</p>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Uptime</p>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-300">
              <p class="text-xl sm:text-2xl font-bold text-[#333366]">24/7</p>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Support</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Tabs -->
        <div class="tab-items">
          <!-- Tab Navigation -->
          <div class="flex flex-col xs:flex-row gap-2 xs:gap-1 bg-white/60 backdrop-blur-sm p-2 rounded-xl sm:rounded-2xl mb-6 sm:mb-8  border border-gray-100">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              class="flex-1 py-3 sm:py-4 px-4 sm:px-6 text-center font-semibold rounded-lg sm:rounded-xl transition-all duration-300"
              :class="[ 
                activeTab === index 
                  ? 'bg-white text-[#333366] xs:scale-105 border border-[#333366]/10' 
                  : 'text-gray-600 hover:text-[#333366] hover:bg-white/40'
              ]"
            >
              <span class="flex items-center justify-center gap-2">
                <font-awesome-icon :icon="tab.icon" class="w-4 h-4" />
                <span class="text-sm sm:text-base">{{ tab.title }}</span>
              </span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="tab-content relative min-h-[300px] sm:min-h-[350px]">
            <transition
              enter-active-class="transition-all duration-500 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="opacity-0 translate-y-6"
              leave-to-class="opacity-0 translate-y-6"
              mode="out-in"
            >
              <div v-if="activeTab === 0" class="space-y-4 sm:space-y-6">
                <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333366] leading-tight">
                  Access Financial Markets — All in One Place
                </h3>
                <div class="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                  <p class="text-base sm:text-lg font-medium text-[#333366]">
                    Trade smarter with a unified platform built for simplicity and success.
                  </p>
                  <p class="text-sm sm:text-base">
                    From Forex and commodities to stocks and indices — manage all assets seamlessly through our advanced, web-based platform designed for performance and ease.
                  </p>
                </div>

                <div class="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div class="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#333366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="globe" class="text-[#333366] text-sm sm:text-base" />
                    </div>
                    <span class="text-sm sm:text-base font-medium text-[#333366]">Global Markets</span>
                  </div>
                  <div class="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#333366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="chart-line" class="text-[#333366] text-sm sm:text-base" />
                    </div>
                    <span class="text-sm sm:text-base font-medium text-[#333366]">Real-time Data</span>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 1" class="space-y-4 sm:space-y-6">
                <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333366] leading-tight">
                  Multi-Option Trading Services
                </h3>
                <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Whether you're new or seasoned, our platform offers everything — Forex, Crypto, Binary, and beyond — all optimized for your comfort and profitability.
                </p>
                <div class="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <span v-for="option in ['Forex','Cryptocurrency','Stocks','Indices']" :key="option" class="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#333366]/10 text-[#333366] rounded-full text-xs sm:text-sm font-medium">{{ option }}</span>
                </div>
              </div>

              <div v-else-if="activeTab === 2" class="space-y-4 sm:space-y-6">
                <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333366] leading-tight">
                  Providing Exceptional Care
                </h3>
                <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We build long-term trust — 70% of our clients have been with us for over a decade.
                </p>

                <div class="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                  <div class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl  border border-gray-100">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="headset" class="text-green-600 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-[#333366] text-sm sm:text-base">24/7 Support</h4>
                      <p class="text-gray-600 text-xs sm:text-sm">Round-the-clock assistance</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl  border border-gray-100">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="shield-alt" class="text-blue-600 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-[#333366] text-sm sm:text-base">Client Protection</h4>
                      <p class="text-gray-600 text-xs sm:text-sm">Security is our top priority</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- CTA -->
          <div class="mt-8 sm:mt-10">
            <button 
              @click="getStarted"
              class="w-full sm:w-auto bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group text-sm sm:text-base"
            >
              <span>Start Trading Today</span>
              <font-awesome-icon 
                icon="arrow-right" 
                class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref(0)
const animatedSkills = ref([0, 0, 0])
const animationStarted = ref(false)
const sectionRef = ref(null)

const skills = ref([
  { name: 'STRATEGY & ANALYSIS', percentage: 88, description: 'Advanced analytical tools and strategic insights' },
  { name: 'WITHDRAWAL EFFICIENCY', percentage: 95, description: 'Fast and reliable withdrawal processing' },
  { name: 'ACHIEVES GOALS', percentage: 70, description: 'Helping traders succeed through data-driven decisions' }
])

const tabs = ref([
  { title: 'Financial Market', icon: 'chart-bar' },
  { title: 'Trading Comfort', icon: 'couch' },
  { title: 'Best Care', icon: 'heart' }
])

const animateSkills = () => {
  skills.value.forEach((skill, index) => {
    let current = 0
    const increment = skill.percentage / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= skill.percentage) {
        animatedSkills.value[index] = skill.percentage
        clearInterval(timer)
      } else {
        animatedSkills.value[index] = Math.floor(current)
      }
    }, 25)
  })
}

let observer
onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted.value) {
          animationStarted.value = true
          animateSkills()
        }
      })
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value)
})

const getStarted = () => router.push('/register')
</script>

<style scoped>
.progress-bar {
  background: linear-gradient(90deg, #333366, #0066cc);
  position: relative;
}
.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2.2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

button {
  transition: all 0.3s ease;
}

/* Subtle fade slide for section */
[data-aos="fade-up"] {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Extra small breakpoint for better mobile responsiveness */
@media (min-width: 480px) {
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .xs\:flex-row {
    flex-direction: row;
  }
  .xs\:gap-1 {
    gap: 0.25rem;
  }
  .xs\:scale-105 {
    transform: scale(1.05);
  }
}

/* Improve touch targets on mobile */
@media (max-width: 640px) {
  button {
    min-height: 44px;
  }
}

/* Better spacing for tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 100%;
  }
}
</style>