<template>
  <section class="about-sections">
    <!-- Section 1: Forex Trading -->
    <div class="about-area reverse bg-gray-50 default-padding">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- TradingView Widget -->
          <div class="col-md-6 order-2 lg:order-1">
            <div class="thumb bg-white rounded-2xl  p-6 lg:p-8">
              <div class="tradingview-widget-container">
                <div :id="forexWidgetId" class="tradingview-widget-container__widget"></div>
                
                <!-- Loading State -->
                <div 
                  v-if="!forexWidgetLoaded"
                  class="flex items-center justify-center py-16 bg-gray-50 rounded-lg"
                >
                  <div class="text-center">
                    <div class="w-12 h-12 border-4 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mx-auto mb-4"></div>
                    <p class="text-gray-600 font-medium">Loading Exchange Rates...</p>
                  </div>
                </div>

                <div class="tradingview-widget-copyright text-center mt-4">
                  <a href="#" rel="noopener" target="_blank" class="text-[#333366] hover:text-[#0066cc] transition-colors font-medium">
                    Exchange Rates by Trusted Finance
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="col-md-6 info order-1 lg:order-2 md:mb-20">
            <div class="space-y-6">
              <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333366] leading-tight">
                We've made it super easy to get you started
              </h3>
              
              <div class="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Trusted Finance is truly one of the best brokers, all you have to do is choose all your 
                  favourite options and we'll lead you to the perfect account type where you can start 
                  succeeding.
                </p>
                <p>
                  You are unlikely to find a more comfortable Forex broker than Trusted Finance.
                  Our company provides Forex customers the best possible conditions for successful Forex
                  trading as well as Binary and Crypto Trades. We have offers for both beginners and experienced traders.
                </p>
              </div>

              <!-- Features List -->
              <div class="f-item link mt-8">
                <ul class="space-y-4">
                  <li 
                    v-for="(feature, index) in tradingFeatures"
                    :key="index"
                    class="flex items-center gap-4 p-4 bg-white rounded-xl  border border-gray-100 transition-all duration-300 group cursor-pointer"
                  >
                    <div class="w-10 h-10 bg-gradient-to-br from-[#333366] to-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <font-awesome-icon icon="check" class="text-white text-sm" />
                    </div>
                    <span class="text-gray-700 font-medium group-hover:text-[#333366] transition-colors">
                      {{ feature }}
                    </span>
                  </li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div class="pt-4">
                <button 
                  @click="startTrading"
                  class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold  transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
                >
                  <span>Start Trading Now</span>
                  <font-awesome-icon 
                    icon="arrow-right" 
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Real Estate Investment -->
    <div class="about-area bg-white default-padding">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Image -->
          <div class="col-md-6 video-info">
            <div class="thumb relative group">
              <img 
                src="@/assets/images/Real-estate.jpg" 
                alt="Real Estate Investment Portfolio - Trusted Finance"
                class="w-full h-auto rounded-2xl  transition-all duration-500  group-hover:scale-[1.02]"
                @load="realEstateImageLoaded = true"
                @error="handleImageError('realEstate')"
              />
              
              <!-- Loading State -->
              <div 
                v-if="!realEstateImageLoaded"
                class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="w-12 h-12 border-4 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mx-auto mb-3"></div>
                  <p class="text-gray-600 text-sm">Loading Real Estate Image...</p>
                </div>
              </div>

              <!-- Overlay Badge -->
              <div class="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span class="text-sm font-semibold text-[#333366]">$7B+ Portfolio</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="col-md-6 info md:mb-20 md:py-6">
            <div class="space-y-6">
              <h4 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333366] leading-tight">
                For long-term Real Estate investors obsessed with performance
              </h4>
              
              <div class="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Our <strong class="text-[#333366]">$7+ billion real estate portfolio</strong> aims to harness the most powerful long-term drivers of the U.S. real estate market.
                </p>
                <p>
                  In today's macroeconomic environment, we believe the Trusted Finance portfolio is as well-positioned as any in the world to deliver stable, market-beating returns.
                </p>
              </div>

              <!-- Investment Stats -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <p class="text-2xl font-bold text-[#333366]">$7B+</p>
                  <p class="text-sm text-gray-600">Portfolio Value</p>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <p class="text-2xl font-bold text-[#333366]">15+</p>
                  <p class="text-sm text-gray-600">Years</p>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <p class="text-2xl font-bold text-[#333366]">98%</p>
                  <p class="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="pt-4">
                <button 
                  @click="exploreRealEstate"
                  class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold  transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
                >
                  <span>Explore Real Estate</span>
                  <font-awesome-icon 
                    icon="building" 
                    class="w-4 h-4 group-hover:scale-110 transition-transform duration-300" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3: Real Estate Experience -->
    <div class="about-area inc-video bg-gray-50 default-padding">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Image -->
          <div class="col-md-6 video-info order-2 lg:order-1">
            <div class="thumb relative group">
              <img 
                src="@/assets/images/Estate-agent.jpg" 
                alt="10+ Years Real Estate Experience - Trusted Finance"
                class="w-full h-auto rounded-2xl  transition-all duration-500  group-hover:scale-[1.02]"
                @load="experienceImageLoaded = true"
                @error="handleImageError('experience')"
              />
              
              <!-- Loading State -->
              <div 
                v-if="!experienceImageLoaded"
                class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="w-12 h-12 border-4 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mx-auto mb-3"></div>
                  <p class="text-gray-600 text-sm">Loading Experience Image...</p>
                </div>
              </div>

              <!-- Experience Badge -->
              <div class="absolute -top-4 -right-4 bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-6 py-3 rounded-full  transform rotate-6">
                <span class="text-sm font-semibold">10+ Years</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="col-md-6 info order-1 lg:order-2 md:py-6">
            <div class="space-y-6">
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333366] leading-tight">
                We have <span class="text-[#0066cc]">10+ Years</span> of experience in Real Estate
              </h2>
              
              <div class="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Our Real Estate team supports clients across Europe and beyond to meet their objectives, whatever the scale of the project or the context.
                </p>
                <p>
                  From initial strategic planning, to disposal of non-performing assets, we devise and implement solutions that create value for our clients.
                </p>
              </div>

              <!-- Experience Highlights -->
              <div class="space-y-4 pt-4">
                <div 
                  v-for="(highlight, index) in experienceHighlights"
                  :key="index"
                  class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div class="w-12 h-12 bg-[#333366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="highlight.icon" class="text-[#333366] text-lg" />
                  </div>
                  <div>
                    <h5 class="font-semibold text-[#333366]">{{ highlight.title }}</h5>
                    <p class="text-gray-600 text-sm">{{ highlight.description }}</p>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="pt-4">
                <button 
                  @click="learnMoreExperience"
                  class="bg-gradient-to-r from-[#333366] to-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold  transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive state
const forexWidgetId = ref(`forex-widget-${Math.random().toString(36).substr(2, 9)}`);
const forexWidgetLoaded = ref(false);
const realEstateImageLoaded = ref(false);
const experienceImageLoaded = ref(false);

// Data
const tradingFeatures = ref([
  "Trade FX/crypto and Binary 'Side By Side'",
  "Zero Margins",
  "Default Leverage of 1:50",
  "Tight Spread"
]);

const experienceHighlights = ref([
  {
    icon: "globe",
    title: "Global Reach",
    description: "Supporting clients across Europe and beyond"
  },
  {
    icon: "chart-line",
    title: "Strategic Planning", 
    description: "From initial planning to asset disposal"
  },
  {
    icon: "award",
    title: "Value Creation",
    description: "Implementing solutions that create client value"
  }
]);

// TradingView Widget Configuration
const initForexWidget = () => {
  if (typeof TradingView !== 'undefined') {
    new TradingView.widget({
      width: "100%",
      height: 300,
      currencies: [
        "EUR", "USD", "JPY", "GBP", "CHF", 
        "AUD", "CAD", "NZD", "CNY"
      ],
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      container_id: forexWidgetId.value
    });
    forexWidgetLoaded.value = true;
  }
};

const loadForexWidgetScript = () => {
  if (document.querySelector('script[src*="tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"]')) {
    initForexWidget();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = JSON.stringify({
    width: "100%",
    height: 300,
    currencies: [
      "EUR", "USD", "JPY", "GBP", "CHF", 
      "AUD", "CAD", "NZD", "CNY"
    ],
    isTransparent: true,
    colorTheme: "light",
    locale: "en"
  });

  script.onload = () => {
    setTimeout(initForexWidget, 100);
  };

  script.onerror = () => {
    console.error('Failed to load Forex widget script');
    forexWidgetLoaded.value = false;
  };

  document.head.appendChild(script);
};

// Methods
const startTrading = () => {
  router.push('/register');
};

const exploreRealEstate = () => {
  router.push('/real-estate');
};

const learnMoreExperience = () => {
  router.push('/about');
};

const handleImageError = (type) => {
  console.error(`Failed to load ${type} image`);
  if (type === 'realEstate') realEstateImageLoaded.value = true;
  if (type === 'experience') experienceImageLoaded.value = true;
};

// Responsive breakpoint observer
const checkBreakpoint = () => {
  // You can add responsive logic here if needed
};

onMounted(() => {
  loadForexWidgetScript();
  window.addEventListener('resize', checkBreakpoint);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkBreakpoint);
  const widgetContainer = document.getElementById(forexWidgetId.value);
  if (widgetContainer) {
    widgetContainer.innerHTML = '';
  }
});
</script>

<style scoped>
.about-sections {
  overflow-x: hidden;
}

.default-padding {
  padding-top: 8px;
  padding-bottom: 0px;
}

/* TradingView widget styling */
.tradingview-widget-container__widget {
  min-height: 300px;
  background: transparent;
}

/* Animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced responsive design */
@media (max-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
  
  .order-1 {
    order: 1;
  }
  
  .order-2 {
    order: 2;
  }
  
  .gap-16 {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}

@media (max-width: 480px) {
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .gap-4 {
    gap: 1rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .group:hover .group-hover\:scale-110 {
    transform: scale(1);
  }
  
  .group:hover .group-hover\:scale-105 {
    transform: scale(1);
  }
  
  /* .hover\:shadow-2xl:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  } */
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }
  
  .animate-spin,
  .animate-pulse {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-gray-50 {
    background-color: white;
  }
  
  .border-gray-100 {
    border-color: #000;
  }
  
  .text-gray-700 {
    color: #000;
  }
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: #1a1a1a;
  }
  
  .dark\:text-white {
    color: white;
  }
}

/* Smooth scrolling for the entire section */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #333366, #0066cc);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2a2a55, #0052a3);
}
</style>