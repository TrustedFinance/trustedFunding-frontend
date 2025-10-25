<template>
  <nav class="sticky top-0 z-50 bg-pure-white/90 backdrop-blur-sm border-b border-silver-gray/30">
    <!-- Top Bar -->
    <div class="bg-gradient-to-r from-primary-blue/10 to-primary-blue/5 border-b border-silver-gray/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center py-2 gap-2 sm:gap-4">
          <div class="flex items-center gap-3 text-sm text-highlight-text/70">
            <div class="flex items-center gap-2 hover:text-primary-blue transition-colors">
              <font-awesome-icon icon="map-marker-alt" class="w-4 h-4" />
              <span class="truncate max-w-[200px] sm:max-w-none">
                123 Business Street, City, Country
              </span>
            </div>
            <div class="hidden sm:block w-px h-4 bg-silver-gray"></div>
            <a href="mailto:support@trustedfinance.com"
              class="flex items-center gap-2 hover:text-primary-blue transition-colors">
              <font-awesome-icon icon="envelope" class="w-4 h-4" />
              <span class="truncate max-w-[200px] sm:max-w-none">
                support@trustedfinance.com
              </span>
            </a>
          </div>

          <div class="flex items-center gap-4 text-sm">
            <a href="tel:+15551234567"
              class="hidden md:flex items-center gap-2 text-highlight-text/70 hover:text-primary-blue transition-colors">
              <font-awesome-icon icon="phone" class="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </a>
            <div class="flex items-center gap-2">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
                class="w-8 h-8 flex items-center justify-center rounded-lg bg-cool-light text-highlight-text/70 hover:text-primary-blue hover:bg-primary-blue/10 transition-all duration-200">
                <font-awesome-icon :icon="['fab', social.icon]" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <div :class="['transition-all duration-300', scrolled ? 'py-2' : 'py-4']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group" aria-label="Trusted Finance Home"
            @click="handleLogoClick">
            <div class="relative">
              <img src="@/assets/images/logo.png" alt="Trusted Finance Logo"
                class="w-12 h-12 sm:w-14 sm:h-14 object-contain transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2" />
              <div
                class="absolute inset-0 bg-primary-blue/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-1">
            <div v-for="item in navigationItems" :key="item.name" class="relative"
              @mouseenter="item.children ? (activeDropdown = item.name) : null"
              @mouseleave="item.children ? (activeDropdown = null) : null">
              
              <!-- Regular Link -->
              <router-link v-if="!item.children" :to="item.route" @click="handleNavClick" :class="[
                'px-3 lg:px-4 py-2 font-medium rounded-lg flex items-center gap-1 transition-all duration-200 hover:bg-primary-blue/10 hover:text-dark-navy whitespace-nowrap',
                isActiveRoute(item)
                  ? 'text-dark-navy bg-primary-blue/10'
                  : 'text-highlight-text',
              ]">
                {{ item.name }}
              </router-link>

              <!-- Dropdown Parent -->
              <button v-else type="button" :class="[
                'px-3 lg:px-4 py-2 font-medium rounded-lg flex items-center gap-1 transition-all duration-200 hover:bg-primary-blue/10 hover:text-dark-navy whitespace-nowrap',
                isActiveRoute(item)
                  ? 'text-dark-navy bg-primary-blue/10'
                  : 'text-highlight-text',
              ]" :aria-expanded="activeDropdown === item.name">
                {{ item.name }}
                <font-awesome-icon icon="chevron-down" :class="[
                  'w-3 h-3 transition-transform duration-200',
                  activeDropdown === item.name ? 'rotate-180' : '',
                ]" />
              </button>

              <!-- Dropdown Menu -->
              <transition name="dropdown">
                <div v-if="item.children && activeDropdown === item.name"
                  class="absolute top-full left-0 mt-1 w-64 bg-pure-white rounded-xl border border-silver-gray overflow-hidden shadow-lg z-50">
                  <router-link v-for="(child, idx) in item.children" :key="child.name" :to="child.route"
                    @click="handleDropdownClick" :class="[
                      'block px-4 py-3 transition-all duration-200',
                      'hover:bg-primary-blue/10 hover:text-dark-navy hover:pl-5',
                      isActiveRoute(child)
                        ? 'text-dark-navy bg-primary-blue/5'
                        : 'text-highlight-text',
                      idx !== item.children.length - 1
                        ? 'border-b border-silver-gray/50'
                        : '',
                    ]">
                    <div class="flex items-center gap-3">
                      <font-awesome-icon :icon="child.icon" class="w-4 h-4 opacity-60" />
                      <span>{{ child.name }}</span>
                    </div>
                  </router-link>
                </div>
              </transition>
            </div>
          </div>

          <!-- Desktop Auth Buttons -->
          <div class="hidden lg:flex items-center gap-3">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/login" @click="handleNavClick"
                class="px-4 lg:px-5 py-2 font-medium rounded-lg hover:bg-primary-blue/10 hover:text-dark-navy border border-transparent hover:border-primary-blue/20 text-highlight-text transition-all duration-200">
                Login
              </router-link>
              <router-link to="/register" @click="handleNavClick"
                class="px-5 lg:px-6 py-2 bg-dark-navy text-pure-white font-medium rounded-lg hover:bg-primary-blue transform hover:scale-105 transition-all duration-200">
                Get Started
              </router-link>
            </template>

            <template v-else>
              <router-link :to="authStore.isAdmin ? '/admin/dashboard' : '/user/dashboard'" @click="handleNavClick"
                class="px-5 py-2 font-medium rounded-lg bg-primary-blue/10 text-dark-navy hover:bg-primary-blue/20 transition-all duration-200">
                Dashboard
              </router-link>
              <button @click="handleLogout"
                class="px-5 py-2 rounded-lg border border-silver-gray hover:bg-primary-blue/10 text-highlight-text hover:text-dark-navy transition-all duration-200">
                Logout
              </button>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu"
            class="lg:hidden p-3 rounded-xl text-highlight-text hover:bg-primary-blue/10 hover:text-dark-navy transition-all duration-200 relative"
            :aria-expanded="isMobileMenuOpen" aria-label="Toggle navigation menu">
            <font-awesome-icon :icon="isMobileMenuOpen ? 'times' : 'bars'" class="w-5 h-5" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <transition name="mobile-menu">
          <div v-if="isMobileMenuOpen"
            class="lg:hidden mt-4 bg-cool-light backdrop-blur-sm rounded-2xl p-6 border border-silver-gray/50 overflow-y-auto max-h-[80vh]">
            <div class="space-y-2">
              <div v-for="item in navigationItems" :key="item.name">
                <router-link v-if="!item.children" :to="item.route" @click="closeMobileMenu" :class="[
                  'w-full flex items-center justify-between px-4 py-3 font-medium rounded-xl transition-all duration-200',
                  'hover:bg-primary-blue/10 hover:text-dark-navy',
                  isActiveRoute(item)
                    ? 'text-dark-navy bg-primary-blue/10'
                    : 'text-highlight-text',
                ]">
                  <div class="flex items-center gap-3">
                    <font-awesome-icon v-if="item.icon" :icon="item.icon" class="w-4 h-4 opacity-60" />
                    <span>{{ item.name }}</span>
                  </div>
                </router-link>

                <button v-else @click="toggleMobileDropdown(item.name)" :class="[
                  'w-full flex items-center justify-between px-4 py-3 font-medium rounded-xl transition-all duration-200',
                  'hover:bg-primary-blue/10 hover:text-dark-navy',
                  isActiveRoute(item)
                    ? 'text-dark-navy bg-primary-blue/10'
                    : 'text-highlight-text',
                ]" :aria-expanded="activeMobileDropdown === item.name">
                  <div class="flex items-center gap-3">
                    <font-awesome-icon v-if="item.icon" :icon="item.icon" class="w-4 h-4 opacity-60" />
                    <span>{{ item.name }}</span>
                  </div>
                  <font-awesome-icon icon="chevron-down" :class="[
                    'w-4 h-4 transition-transform duration-200',
                    activeMobileDropdown === item.name ? 'rotate-180' : '',
                  ]" />
                </button>

                <transition name="mobile-dropdown">
                  <div v-if="item.children && activeMobileDropdown === item.name"
                    class="ml-8 mt-2 space-y-1 border-l-2 border-primary-blue/20 pl-4">
                    <router-link v-for="child in item.children" :key="child.name" :to="child.route"
                      @click="closeMobileMenu" :class="[
                        'block px-4 py-2 rounded-lg transition-all duration-200',
                        'hover:bg-primary-blue/10 hover:text-dark-navy',
                        isActiveRoute(child)
                          ? 'text-dark-navy bg-primary-blue/5'
                          : 'text-highlight-text',
                      ]">
                      <div class="flex items-center gap-3">
                        <font-awesome-icon :icon="child.icon" class="w-4 h-4 opacity-60" />
                        <span>{{ child.name }}</span>
                      </div>
                    </router-link>
                  </div>
                </transition>
              </div>

              <!-- Mobile Auth Buttons -->
              <div class="flex flex-col gap-3 pt-6 mt-4 border-t border-silver-gray/50">
                <template v-if="!authStore.isAuthenticated">
                  <router-link to="/login" @click="closeMobileMenu"
                    class="w-full py-3 font-medium rounded-lg border-2 border-silver-gray bg-pure-white hover:border-primary-blue hover:text-dark-navy text-center text-highlight-text transition-all duration-200">
                    Login
                  </router-link>
                  <router-link to="/register" @click="closeMobileMenu"
                    class="w-full py-3 bg-dark-navy text-pure-white font-medium rounded-lg hover:bg-primary-blue text-center transition-all duration-200">
                    Get Started
                  </router-link>
                </template>

                <template v-else>
                  <router-link :to="authStore.isAdmin ? '/admin/dashboard' : '/user/dashboard'"
                    @click="closeMobileMenu"
                    class="w-full py-3 bg-primary-blue/10 text-dark-navy font-medium rounded-lg hover:bg-primary-blue/20 text-center transition-all duration-200">
                    Dashboard
                  </router-link>
                  <button @click="handleLogout"
                    class="w-full py-3 border border-silver-gray rounded-lg text-highlight-text hover:bg-primary-blue/10 hover:text-dark-navy transition-all duration-200">
                    Logout
                  </button>
                </template>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const activeDropdown = ref(null);
const activeMobileDropdown = ref(null);
const isMobileMenuOpen = ref(false);
const scrolled = ref(false);

const socialLinks = [
  { name: "Twitter", icon: "twitter", url: "#" },
  { name: "LinkedIn", icon: "linkedin-in", url: "#" },
  { name: "Facebook", icon: "facebook-f", url: "#" },
];

const navigationItems = ref([
  { name: "Home", route: "/", icon: "home" },
  { name: "About Us", route: "/about", icon: "info-circle" },
  { name: "Services", route: "/our-services", icon: "cogs" },
  { name: "Pricing", route: "/pricing", icon: "tags" },
  {
    name: "Legal",
    icon: "balance-scale",
    children: [
      { name: "License & Regulation", route: "/license-&-regulation", icon: "certificate" },
      { name: "Privacy Policy", route: "/privacy-policy", icon: "shield-alt" },
      { name: "Safety of Funds", route: "/safety-of-funds", icon: "lock" },
      { name: "Trading Conditions", route: "/trading-conditions", icon: "chart-line" },
    ],
  },
  { name: "Contact", route: "/contact", icon: "envelope" },
  { name: "FAQ", route: "/faq", icon: "question-circle" },
]);

const isActiveRoute = (item) =>
  route.path === item.route ||
  (item.children && item.children.some((child) => route.path === child.route));

const handleLogoClick = () => {
  activeDropdown.value = null;
  closeMobileMenu();
};

const handleNavClick = () => {
  activeDropdown.value = null;
};

const handleDropdownClick = () => {
  activeDropdown.value = null;
};

const handleLogout = () => {
  authStore.logout();
  closeMobileMenu();
  router.push('/');
};

const toggleMobileDropdown = (name) => {
  activeMobileDropdown.value = activeMobileDropdown.value === name ? null : name;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  activeMobileDropdown.value = null;
  document.body.classList.toggle("menu-open", isMobileMenuOpen.value);
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  activeMobileDropdown.value = null;
  document.body.classList.remove("menu-open");
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    if (isMobileMenuOpen.value) closeMobileMenu();
    else activeDropdown.value = null;
  }
};

const handleResize = () => {
  if (window.innerWidth >= 1024) closeMobileMenu();
};

// Force close dropdowns and mobile menu on route change
watch(() => route.path, () => {
  activeDropdown.value = null;
  activeMobileDropdown.value = null;
  closeMobileMenu();
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
/* Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.mobile-dropdown-enter-active,
.mobile-dropdown-leave-active {
  transition: all 0.25s ease-out;
}

.mobile-dropdown-enter-from,
.mobile-dropdown-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Accessibility focus styles */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary-blue);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Prevent background scroll when mobile menu is open */
body.menu-open {
  overflow: hidden;
  height: 100vh;
}

/* Scrollbar styling for mobile menu */
.max-h-\[80vh\]::-webkit-scrollbar {
  width: 4px;
}

.max-h-\[80vh\]::-webkit-scrollbar-thumb {
  background: var(--color-silver-gray);
  border-radius: 2px;
}
</style>