<template>
  <section class="skill-area default-padding bg-gray-50/50 pt-20 md:my-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl lg:text-4xl font-bold text-[#333366] mb-4">
          Keep Track Of Your Favourite Cryptocurrencies
        </h2>
        <p class="text-md text-gray-600 max-w-2xl mx-auto">
          Real-time cryptocurrency prices, market trends, and analysis all in
          one place
        </p>
      </div>

      <!-- Widget Container -->
      <div
        ref="tradingViewContainer"
        class="tradingview-widget-container bg-white rounded-2xl  border border-gray-200 overflow-hidden relative"
      >
        <!-- Loading State -->
        <div
          v-if="!widgetLoaded"
          class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/70 backdrop-blur-sm z-10"
        >
          <div
            class="w-12 h-12 border-4 border-[#333366]/20 border-t-[#333366] rounded-full animate-spin mb-4"
          ></div>
          <p class="text-gray-600 font-medium">
            Loading Cryptocurrency Data...
          </p>
          <p class="text-gray-500 text-sm mt-1">Powered by TradingView</p>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div
          v-for="card in infoCards"
          :key="card.title"
          class="bg-white p-6 rounded-xl  border border-gray-100  transition-all duration-300 group"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#333366] to-[#0066cc] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          >
            <font-awesome-icon :icon="card.icon" class="text-white text-xl" />
          </div>
          <h3 class="text-lg font-bold text-[#333366] mb-2">
            {{ card.title }}
          </h3>
          <p class="text-gray-600 text-sm">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const widgetLoaded = ref(false);
const tradingViewContainer = ref(null);

const infoCards = [
  {
    icon: "chart-line",
    title: "Real-Time Data",
    desc: "Live price updates and market movements for all major cryptocurrencies",
  },
  {
    icon: "search",
    title: "Advanced Screening",
    desc: "Filter and sort cryptocurrencies by market cap, volume, and performance",
  },
  {
    icon: "bell",
    title: "Market Alerts",
    desc: "Set custom alerts for price movements and market conditions",
  },
];

// TradingView config (must be JSON string!)
const tradingViewConfig = {
  width: "100%",
  height: 500,
  defaultColumn: "overview",
  screener_type: "crypto_mkt",
  displayCurrency: "USD",
  colorTheme: "light",
  locale: "en",
  isTransparent: false,
};

// Script loader
const loadTradingViewWidget = () => {
  if (!tradingViewContainer.value) return;

  // Prevent double insertion
  tradingViewContainer.value.innerHTML = "";

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
  script.async = true;
  script.type = "text/javascript";
  script.innerHTML = JSON.stringify(tradingViewConfig);

  tradingViewContainer.value.appendChild(script);

  // Wait for render
  setTimeout(() => {
    widgetLoaded.value = true;
  }, 2000);
};

onMounted(() => {
  loadTradingViewWidget();
});

onUnmounted(() => {
  if (tradingViewContainer.value) {
    tradingViewContainer.value.innerHTML = "";
  }
});
</script>

<style scoped>
.skill-area {
  padding-top: 30px;
  padding-bottom: 0;
}

.tradingview-widget-container {
  min-height: 480px;
  position: relative;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .tradingview-widget-container {
    min-height: 560px;
  }
}
</style>
