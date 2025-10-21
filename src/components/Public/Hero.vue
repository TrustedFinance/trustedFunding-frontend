<template>
  <section class="relative min-h-screen overflow-hidden  ">
    <!-- Swiper Container -->
    <swiper
      :modules="[Navigation, Pagination, Autoplay, EffectFade]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :speed="1500"
      :effect="'fade'"
      :pagination="{
        clickable: true,
        el: '.custom-pagination',
        dynamicBullets: false,
      }"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="h-full w-full relative inset-0"
    >
      <!-- Your slides remain the same -->
      <!-- Slide 1 -->
      <swiper-slide>
        <div class="relative h-screen w-full">
          <img 
            src="@/assets/images/banner/9.jpg" 
            alt="Wealth Growth"
            class="w-full h-full object-cover scale-110 transition-transform duration-[8000ms]"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1a2332]/90 via-[#1a2332]/70 to-[#0066cc]/50"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.2),transparent_50%)]"></div>
        </div>
      </swiper-slide>

      <!-- Slide 2 -->
      <swiper-slide>
        <div class="relative h-screen w-full">
          <img 
            src="@/assets/images/banner/22.jpg" 
            alt="Investment Success"
            class="w-full h-full object-cover scale-110 transition-transform duration-[8000ms]"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1a2332]/90 via-[#1a2332]/70 to-[#0066cc]/50"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.2),transparent_50%)]"></div>
        </div>
      </swiper-slide>

      <!-- Slide 3 -->
      <swiper-slide>
        <div class="relative h-screen w-full">
          <img 
            src="@/assets/images/banner/7.jpg"
            alt="Financial Security"
            class="w-full h-full object-cover scale-110 transition-transform duration-[8000ms]"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1a2332]/90 via-[#1a2332]/70 to-[#0066cc]/50"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.2),transparent_50%)]"></div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Custom Navigation Buttons (Desktop only) -->
    <div class="hidden lg:block">
      <button 
        class="custom-prev absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#0066cc] transition-all duration-300 group border border-white/20 hover:border-[#0066cc]"
        aria-label="Previous slide"
      >
        <font-awesome-icon 
          icon="chevron-left" 
          class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
      <button 
        class="custom-next absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#0066cc] transition-all duration-300 group border border-white/20 hover:border-[#0066cc]"
        aria-label="Next slide"
      >
        <font-awesome-icon 
          icon="chevron-right" 
          class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
    </div>

    <!-- Custom Pagination -->
    <div class="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3"></div>

    <!-- Hero Content -->
    <div class="absolute inset-0 z-20 flex items-center justify-center pt-16 lg:pt-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Animated Badge -->
          <div 
            :class="['inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 mx-auto', currentSlide === 0 ? 'animate-fade-in-up' : '']"
          >
            <div class="w-2 h-2 bg-[#0066cc] rounded-full animate-pulse"></div>
            <span class="text-white/90 text-sm font-medium">Trusted by 10,000+ Investors</span>
          </div>

          <!-- Main Headline -->
          <h1 
            :key="currentSlide"
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-slide-in-left"
          >
            {{ headlines[currentSlide].title }}
            <span class="text-[#0066cc] block mt-2">{{ headlines[currentSlide].highlight }}</span>
          </h1>
          
          <!-- Sub-headline -->
          <p 
            :key="'subtitle-' + currentSlide"
            class="text-lg sm:text-xl lg:text-2xl text-[#e0e0e0]/90 leading-relaxed mb-10 max-w-2xl mx-auto animate-slide-in-left animation-delay-200 px-4"
          >
            {{ headlines[currentSlide].subtitle }}
          </p>

          <!-- Call to Action -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-in-left animation-delay-400 justify-center items-center px-4">
            <button 
              @click="startInvesting"
              class="group relative bg-[#0066cc] text-white px-8 py-4 rounded-xl font-semibold text-base lg:text-lg hover:bg-[#0066cc]/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0066cc]/20 flex items-center justify-center gap-3 overflow-hidden w-full sm:w-auto"
            >
              <span class="relative z-10">Start Investing Today</span>
              <font-awesome-icon 
                icon="arrow-right" 
                class="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
              />
              <div class="absolute inset-0 bg-gradient-to-r from-[#0066cc] to-[#1a2332] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              @click="learnMore"
              class="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-base lg:text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <span>Learn More</span>
              <font-awesome-icon 
                icon="circle-info" 
                class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" 
              />
            </button>
          </div>

          <!-- Stats/Trust Indicators -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-in-left animation-delay-600 px-4 max-w-4xl mx-auto">
            <div class="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <font-awesome-icon icon="shield-alt" class="w-5 h-5 text-[#0066cc] group-hover:scale-110 transition-transform" />
                <span class="text-white/60 text-xs font-medium uppercase tracking-wider">Security</span>
              </div>
              <p class="text-white font-semibold text-lg">Bank-Level Protection</p>
            </div>

            <div class="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <font-awesome-icon icon="headset" class="w-5 h-5 text-[#0066cc] group-hover:scale-110 transition-transform" />
                <span class="text-white/60 text-xs font-medium uppercase tracking-wider">Support</span>
              </div>
              <p class="text-white font-semibold text-lg">24/7 Assistance</p>
            </div>

            <div class="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div class="flex items-center gap-2">
                <font-awesome-icon icon="chart-line" class="w-5 h-5 text-[#0066cc] group-hover:scale-110 transition-transform" />
                <span class="text-white/60 text-xs font-medium uppercase tracking-wider">Performance</span>
              </div>
              <p class="text-white font-semibold text-lg">Proven Track Record</p>
            </div>
          </div>
        </div>
      </div>
    </div>

   
    <!-- Floating Particles Effect -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div 
        v-for="n in 15" 
        :key="n"
        class="particle"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${15 + Math.random() * 10}s`
        }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const router = useRouter();

// Current slide state
const currentSlide = ref(0);
const swiperInstance = ref(null);

// Dynamic headlines for each slide
const headlines = ref([
  {
    title: 'Your  Partner in',
    highlight: 'Wealth Growth',
    subtitle: 'Build lasting wealth with intelligent investment strategies designed for the modern investor.'
  },
  {
    title: 'Secure Your Financial',
    highlight: 'Future Today',
    subtitle: 'Professional portfolio management with transparent, proven results you can count on.'
  },
  {
    title: 'Expert Guidance for',
    highlight: 'Smart Investing',
    subtitle: 'Navigate markets confidently with our team of experienced financial advisors by your side.'
  }
]);

// Methods
const startInvesting = () => {
  router.push('/register');
};

const learnMore = () => {
  router.push('/about');
};

const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.realIndex;
};

onMounted(() => {
  // Ken Burns effect for images
  const slides = document.querySelectorAll('.swiper-slide img');
  slides.forEach((img) => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.15)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1.10)';
    });
  });
});
</script>

<style scoped>
/* Your existing styles remain the same */
:deep(.custom-pagination .swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 6px !important;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

:deep(.custom-pagination .swiper-pagination-bullet-active) {
  background: #0066cc;
  width: 40px;
  border-radius: 8px;
  border-color: #0066cc;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(10px, -10px) scale(1.1);
    opacity: 0.6;
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  opacity: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 102, 204, 0.4);
  border-radius: 50%;
  animation: float linear infinite;
  pointer-events: none;
}

/* Responsive text sizing for better mobile display */
@media (max-width: 640px) {
  .particle {
    display: none;
  }
  
  :deep(.swiper-slide img) {
    transform: scale(1.15) !important;
  }
}
</style>