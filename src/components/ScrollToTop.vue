<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 transform scale-50 translate-y-10"
    leave-to-class="opacity-0 transform scale-50 translate-y-10"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top-btn fixed z-50 bg-gradient-to-br from-[#0066cc] to-[#00aaff] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#0066cc]/50 focus:ring-offset-2 focus:ring-offset-gray-900"
      :class="buttonClasses"
      :style="buttonStyle"
      aria-label="Scroll to top"
    >
      <!-- Animated Icon -->
      <div class="relative">
        <font-awesome-icon 
          icon="chevron-up" 
          class="transition-transform duration-300"
          :class="{ 'translate-y-0.5': isScrolling }"
        />
        
        <!-- Ripple Effect -->
        <span 
          v-if="showRipple"
          class="absolute inset-0 rounded-full bg-white/30 animate-ping"
        ></span>
      </div>

      <!-- Progress Circle (Optional) -->
      <svg 
        v-if="showProgress" 
        class="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="301.59"
          :stroke-dashoffset="progressOffset"
          opacity="0.2"
          class="text-white"
        />
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Props for customization
const props = defineProps({
  // Position
  position: {
    type: String,
    default: 'bottom-right', // 'bottom-right', 'bottom-left', 'bottom-center'
    validator: (value) => ['bottom-right', 'bottom-left', 'bottom-center'].includes(value)
  },
  
  // Offset from edges
  offsetX: {
    type: [String, Number],
    default: '1.5rem'
  },
  offsetY: {
    type: [String, Number],
    default: '1.5rem'
  },
  
  // Size
  size: {
    type: String,
    default: 'medium', // 'small', 'medium', 'large'
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  // Show progress circle
  showProgress: {
    type: Boolean,
    default: false
  },
  
  // Scroll threshold to show button (in pixels)
  threshold: {
    type: Number,
    default: 300
  },
  
  // Smooth scroll duration (in milliseconds)
  scrollDuration: {
    type: Number,
    default: 800
  }
});

// Reactive state
const isVisible = ref(false);
const isScrolling = ref(false);
const showRipple = ref(false);
const scrollProgress = ref(0);

// Computed properties
const buttonClasses = computed(() => {
  const classes = [];
  
  // Size classes
  switch (props.size) {
    case 'small':
      classes.push('w-10 h-10');
      break;
    case 'large':
      classes.push('w-14 h-14');
      break;
    default: // medium
      classes.push('w-12 h-12');
  }
  
  // Position classes
  switch (props.position) {
    case 'bottom-left':
      classes.push('bottom-6 left-6');
      break;
    case 'bottom-center':
      classes.push('bottom-6 left-1/2 transform -translate-x-1/2');
      break;
    default: // bottom-right
      classes.push('bottom-6 right-6');
  }
  
  // Hover effects
  classes.push('hover:scale-110 active:scale-95');
  
  return classes.join(' ');
});

const buttonStyle = computed(() => {
  const style = {};
  
  // Custom offsets
  if (props.offsetX && props.position !== 'bottom-center') {
    style[props.position.includes('right') ? 'right' : 'left'] = 
      typeof props.offsetX === 'number' ? `${props.offsetX}px` : props.offsetX;
  }
  
  if (props.offsetY) {
    style.bottom = typeof props.offsetY === 'number' ? `${props.offsetY}px` : props.offsetY;
  }
  
  return style;
});

const progressOffset = computed(() => {
  return 301.59 * (1 - scrollProgress.value);
});

// Methods
const scrollToTop = () => {
  const startPosition = window.pageYOffset;
  const startTime = performance.now();
  
  isScrolling.value = true;
  showRipple.value = true;
  
  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / props.scrollDuration, 1);
    
    // Easing function (easeOutCubic)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    window.scrollTo(0, startPosition * (1 - easedProgress));
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      isScrolling.value = false;
      
      // Hide ripple after animation
      setTimeout(() => {
        showRipple.value = false;
      }, 300);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Calculate scroll progress (0 to 1)
  scrollProgress.value = scrollTop / (documentHeight - windowHeight);
  
  // Show/hide button based on threshold
  isVisible.value = scrollTop > props.threshold;
};

const handleKeydown = (event) => {
  // Add keyboard shortcut (Ctrl + ArrowUp or Cmd + ArrowUp)
  if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowUp') {
    event.preventDefault();
    scrollToTop();
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('keydown', handleKeydown);
  
  // Initial check
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.scroll-to-top-btn {
  /* Ensure button is above most content */
  z-index: 9999;
}

/* Mobile-first responsive adjustments */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    /* Larger tap target on mobile */
    min-width: 44px;
    min-height: 44px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .scroll-to-top-btn {
    transition: none;
  }
  
  .transition-all {
    transition: none;
  }
  
  .hover\:scale-110:hover {
    transform: none;
  }
  
  .active\:scale-95:active {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .scroll-to-top-btn {
    border: 2px solid white;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .scroll-to-top-btn {
    box-shadow: 0 4px 20px rgba(0, 102, 204, 0.4);
  }
  
  .scroll-to-top-btn:hover {
    box-shadow: 0 6px 25px rgba(0, 102, 204, 0.6);
  }
}

/* Print styles */
@media print {
  .scroll-to-top-btn {
    display: none !important;
  }
}

/* Animation for the ripple effect */
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) 1;
}

/* Ensure smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Override smooth scroll when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>