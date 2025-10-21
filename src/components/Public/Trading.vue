<template>
  <section 
    class="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-[#f8f9fa] to-white"
    ref="sectionRef"
  >
    <!-- Animated Background Decorations -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-[#0066cc]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#1a2332]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-float-slow" style="animation-delay: 2s;"></div>
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="n in 15" 
        :key="n"
        class="absolute w-2 h-2 bg-[#0066cc]/20 rounded-full animate-float"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${10 + Math.random() * 10}s`
        }"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div 
        class="text-center mb-16"
        :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'"
      >
        <div class="inline-flex items-center gap-2 bg-[#0066cc]/10 text-[#0066cc] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#0066cc]/20">
          <font-awesome-icon icon="star" class="w-3 h-3 animate-spin-slow" />
          <span>Why Choose Us</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2332] mb-4">
          Advanced <span class="text-[#0066cc]">Trading</span> & Security
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Professional tools and bank-level security for your <span class="font-semibold text-[#1a2332]">peace of mind</span>
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <!-- Trading Tools Section -->
        <div 
          class="order-2 lg:order-1"
          :class="isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-20px]'"
        >
          <div class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100  group">
            <!-- Header -->
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0066cc] to-[#1a2332] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <font-awesome-icon icon="chart-line" class="text-white text-xl" />
              </div>
              <h3 class="text-2xl lg:text-3xl font-bold text-[#1a2332] mb-3">
                Powerful Trading Tools
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Trade with maximum control and reliability on our professional platform
              </p>
            </div>
            
            <!-- TradingView Widget -->
            <div class="tradingview-widget-container rounded-xl overflow-hidden border border-gray-200   transition-all duration-300">
              <div class="relative">
                <div :id="widgetId" class="tradingview-widget bg-white"></div>
                <!-- Loading State -->
                <div v-if="!widgetLoaded" class="absolute inset-0 bg-white flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-12 h-12 border-4 border-[#0066cc]/20 border-t-[#0066cc] rounded-full animate-spin mx-auto mb-3"></div>
                    <p class="text-gray-500 text-sm">Loading Trading Chart...</p>
                  </div>
                </div>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-t border-gray-200">
                <p class="text-xs text-gray-600 text-center">
                  Live data powered by 
                  <a 
                    href="https://www.tradingview.com/" 
                    rel="noopener" 
                    target="_blank" 
                    class="text-[#0066cc] hover:underline font-semibold ml-1 transition-colors"
                  >
                    TradingView
                  </a>
                </p>
              </div>
            </div>

            <!-- Interactive Features -->
            <div class="mt-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-semibold text-[#1a2332]">Platform Features</span>
                <button 
                  @click="showFeatures = !showFeatures"
                  class="text-[#0066cc] hover:text-[#1a2332] transition-colors text-sm font-medium flex items-center gap-1 cursor-pointer"
                >
                  {{ showFeatures ? 'Show Less' : 'Show More' }}
                  <font-awesome-icon 
                    :icon="showFeatures ? 'chevron-up' : 'chevron-down'" 
                    class="w-3 h-3 transition-transform" 
                  />
                </button>
              </div>
              
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 max-h-0"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="showFeatures" class="grid grid-cols-3 gap-3 overflow-hidden">
                  <div 
                    v-for="(feature, index) in tradingFeatures" 
                    :key="index"
                    class="bg-[#0066cc]/5 rounded-lg p-3 text-center group hover:bg-[#0066cc]/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                    @click="selectFeature(feature)"
                  >
                    <font-awesome-icon :icon="feature.icon" class="text-[#0066cc] text-lg mb-2 group-hover:scale-110 transition-transform" />
                    <p class="text-xs font-semibold text-[#1a2332]">{{ feature.name }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Security Features Section -->
        <div 
          class="order-1 lg:order-2"
          :class="isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[20px]'"
        >
          <div class="space-y-6">
            <!-- Section Title -->
            <div class="mb-8">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0066cc] to-[#1a2332] rounded-xl mb-4  hover:scale-105 transition-transform duration-300 cursor-pointer">
                <font-awesome-icon icon="shield-alt" class="text-white text-xl" />
              </div>
              <h3 class="text-2xl lg:text-3xl font-bold text-[#1a2332] mb-2">
                Bank-Level Security
              </h3>
              <p class="text-gray-600">
                Your safety is our <span class="font-semibold text-[#1a2332]">top priority</span>
              </p>
            </div>

            <!-- Security Feature Cards -->
            <div 
              v-for="(feature, index) in securityFeatures" 
              :key="index"
              class="security-card group bg-white rounded-xl p-6 border border-gray-100 "
              :style="{ animationDelay: `${index * 0.1}s` }"
              @click="selectedFeature = feature"
            >
              <div class="flex gap-4">
                <!-- Icon -->
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#0066cc] to-[#1a2332] rounded-lg flex items-center justify-center  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                    <font-awesome-icon :icon="feature.icon" class="text-white text-lg relative z-10" />
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1">
                  <h5 class="font-bold text-lg text-[#1a2332] mb-2 group-hover:text-[#0066cc] transition-colors duration-300">
                    {{ feature.title }}
                  </h5>
                  <p class="text-gray-600 leading-relaxed text-sm">
                    {{ feature.description }}
                  </p>

                  <!-- Feature Tags -->
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span 
                      v-for="tag in feature.tags" 
                      :key="tag"
                      class="inline-flex items-center gap-1 bg-[#0066cc]/10 text-[#0066cc] px-2 py-1 rounded-md text-xs font-medium group-hover:bg-[#0066cc]/20 transition-colors"
                    >
                      <font-awesome-icon icon="check-circle" class="w-3 h-3" />
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trust Badge -->
            <div class="bg-gradient-to-r from-[#0066cc] to-[#1a2332] rounded-xl p-6 text-white ">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ">
                    <font-awesome-icon icon="award" class="text-white text-2xl" />
                  </div>
                </div>
                <div class="flex-1">
                  <h6 class="font-bold text-lg mb-1">Fully Regulated & Certified</h6>
                  <p class="text-white/90 text-sm leading-relaxed">
                    Compliant with international financial regulations and security standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Stats -->
      <div 
        class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        :class="isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[20px]'"
      >
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="text-center p-6 bg-white rounded-xl border border-gray-200 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
          @mouseenter="animateCounter(stat)"
        >
          <div class="w-12 h-12 bg-[#0066cc]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0066cc]/20 group-hover:scale-110 transition-all duration-300">
            <font-awesome-icon :icon="stat.icon" class="text-[#0066cc] text-xl" />
          </div>
          <p class="text-3xl font-bold text-[#1a2332] mb-1 transition-all duration-500">
            {{ stat.animatedValue }}{{ stat.unit }}
          </p>
          <p class="text-sm text-gray-600 group-hover:text-[#1a2332] transition-colors">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Feature Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="selectedFeature" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click="selectedFeature = null"
      >
        <div 
          class="bg-white rounded-2xl p-6 max-w-md w-full mx-auto  transform transition-all duration-300"
          @click.stop
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-[#0066cc] to-[#1a2332] rounded-lg flex items-center justify-center">
              <font-awesome-icon :icon="selectedFeature.icon" class="text-white text-lg" />
            </div>
            <h4 class="text-xl font-bold text-[#1a2332]">{{ selectedFeature.title }}</h4>
          </div>
          <p class="text-gray-600 mb-4">{{ selectedFeature.description }}</p>
          <button 
            @click="selectedFeature = null"
            class="w-full bg-[#0066cc] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2332] transition-colors duration-300"
          >
            Got it
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state
const widgetId = ref(`tradingview_${Math.random().toString(36).substr(2, 9)}`);
const widgetLoaded = ref(false);
const isVisible = ref(false);
const sectionRef = ref(null);
const showFeatures = ref(false);
const selectedFeature = ref(null);

// Trading features data
const tradingFeatures = ref([
  { name: 'Real-Time', icon: 'clock' },
  { name: 'Analytics', icon: 'chart-bar' },
  { name: 'Mobile', icon: 'mobile-alt' },
  { name: 'Alerts', icon: 'bell' },
  { name: 'Charts', icon: 'chart-line' },
  { name: 'Reports', icon: 'file-alt' }
]);

// Security features data
const securityFeatures = ref([
  {
    icon: 'shield-alt',
    title: 'Regulation & Fund Protection',
    description: 'Your funds are kept in segregated accounts, completely separate from company balance sheets. This ensures maximum protection and compliance with international standards.',
    tags: ['Regulated', 'Segregated Accounts', 'Compliant']
  },
  {
    icon: 'user-shield',
    title: 'Identity Verification',
    description: 'Two-factor authentication and verified identity checks ensure that only you can access and authorize transactions on your account.',
    tags: ['2FA', 'KYC Verified', 'Biometric']
  },
  {
    icon: 'lock',
    title: 'DDoS Protection & SSL',
    description: 'Enterprise-grade DDoS protection and Comodo Positive SSL certification safeguard your data from cyber threats around the clock.',
    tags: ['SSL Certified', 'DDoS Protected', 'Encrypted']
  }
]);

// Stats with animation
const stats = ref([
  { icon: 'users', value: 10000, animatedValue: 0, unit: '+', label: 'Active Traders' },
  { icon: 'globe', value: 150, animatedValue: 0, unit: '+', label: 'Countries' },
  { icon: 'clock', value: 24, animatedValue: 0, unit: '/7', label: 'Support' },
  { icon: 'shield-alt', value: 100, animatedValue: 0, unit: '%', label: 'Secure' }
]);

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        stats.value.forEach((stat, index) => {
          setTimeout(() => {
            animateCounter(stat);
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.1 }
);

// Animate counter
const animateCounter = (stat) => {
  if (stat.animatedValue === stat.value) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = stat.value / steps;
  const stepTime = duration / steps;
  
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= stat.value) {
      stat.animatedValue = stat.value;
      clearInterval(timer);
    } else {
      stat.animatedValue = Math.floor(current);
    }
  }, stepTime);
};

// Feature selection
const selectFeature = (feature) => {
  console.log('Selected feature:', feature.name);
  // You can add specific actions for each feature
};

// TradingView widget configuration
const initTradingViewWidget = () => {
  if (typeof TradingView !== 'undefined') {
    new TradingView.widget({
      width: "100%",
      height: 500,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f8f9fa",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      studies: ["MASimple@tv-basicstudies"],
      container_id: widgetId.value
    });
    widgetLoaded.value = true;
  }
};

// Load TradingView script
const loadTradingViewScript = () => {
  if (document.querySelector('script[src*="tradingview.com/tv.js"]')) {
    initTradingViewWidget();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
  script.type = 'text/javascript';
  script.async = true;
  
  script.onload = () => {
    initTradingViewWidget();
  };

  script.onerror = () => {
    console.error('Failed to load TradingView widget script');
    widgetLoaded.value = false;
  };

  document.head.appendChild(script);
};

onMounted(() => {
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
  loadTradingViewScript();
});

onUnmounted(() => {
  if (sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
  const widgetContainer = document.getElementById(widgetId.value);
  if (widgetContainer) {
    widgetContainer.innerHTML = '';
  }
});
</script>

<style scoped>
/* TradingView widget container */
.tradingview-widget {
  min-height: 500px;
  background: white;
}

/* Enhanced Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-30px) translateX(15px);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.security-card {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .tradingview-widget {
    min-height: 450px;
  }
}

@media (max-width: 768px) {
  .tradingview-widget {
    min-height: 400px;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>