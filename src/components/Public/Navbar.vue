<template>
  <nav>
    <!-- Top Bar -->
    <div class="bg-[#1a2332] text-[#e0e0e0]">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center py-2 gap-2 sm:gap-4 text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm">
            <font-awesome-icon icon="map-marker-alt" class="w-4 h-4 text-[#0066cc]" />
            <span class="truncate">123 Business Street, City, Country</span>
          </div>
          <div class="flex items-center justify-center sm:justify-end gap-2 text-xs sm:text-sm">
            <font-awesome-icon icon="envelope" class="w-4 h-4 text-[#0066cc]" />
            <span class="truncate">support@trustedfunding.com</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <div :class="['bg-white transition-all duration-300', scrolled ? 'py-3 shadow-sm' : 'py-4']">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div
              class="w-10 h-10 bg-[#0066cc] rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
            >
              <span class="text-white font-bold text-lg">TF</span>
            </div>
            <span class="text-[#1a2332] font-bold text-lg sm:text-xl hidden sm:block">
              TrustedFunding
            </span>
          </router-link>

          <!-- Desktop / Tablet Navigation -->
          <div ref="dropdownRef" class="hidden md:flex items-center gap-1 flex-wrap">
            <div v-for="item in navigationItems" :key="item.name" class="relative">
              <button
                @click="item.children ? toggleDropdown(item.name) : null"
                :is="item.children ? 'button' : 'router-link'"
                :to="item.route"
                class="px-3 lg:px-4 py-2 text-[#333333] font-medium rounded-lg transition-all duration-200 flex items-center gap-1 hover:bg-[#f5f5f5] hover:text-[#0066cc] cursor-pointer"
              >
                {{ item.name }}
                <font-awesome-icon
                  v-if="item.children"
                  icon="chevron-down"
                  :class="['w-4 h-4 transition-transform duration-200', activeDropdown === item.name ? 'rotate-180' : '']"
                />
              </button>

              <!-- Dropdown -->
              <div
                v-if="item.children && activeDropdown === item.name"
                class="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#f5f5f5] overflow-hidden animate-dropdown z-50"
              >
                <router-link
                  v-for="(child, idx) in item.children"
                  :key="child"
                  :to="getRoutePath(child)"
                  @click="activeDropdown = null"
                  :class="[
                    'block px-4 py-3 text-[#333333] transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#0066cc] hover:pl-6',
                    idx !== item.children.length - 1 ? 'border-b border-[#f5f5f5]' : '',
                  ]"
                >
                  {{ child }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- Desktop Buttons -->
          <div class="hidden md:flex items-center gap-3">
            <router-link
              to="/login"
              class="px-4 lg:px-5 py-2 text-[#333333] font-medium rounded-lg transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#0066cc]"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-5 lg:px-6 py-2 bg-[#0066cc] text-white font-medium rounded-lg transition-all duration-200 hover:bg-[#1a2332] hover:shadow-lg transform hover:scale-105"
            >
              Register
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-[#1a2332] hover:bg-[#f5f5f5] transition-all duration-200"
          >
            <font-awesome-icon :icon="isMobileMenuOpen ? 'times' : 'bars'" class="w-6 h-6" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <transition name="fade-slide">
          <div
            v-if="isMobileMenuOpen"
            class="md:hidden mt-4 bg-[#f5f5f5] rounded-2xl p-4 animate-slideDown overflow-y-auto max-h-[80vh]"
          >
            <div class="space-y-1">
              <div v-for="item in navigationItems" :key="item.name">
                <component
                  :is="item.children ? 'button' : 'router-link'"
                  :to="item.route"
                  @click="item.children ? toggleMobileDropdown(item.name) : (isMobileMenuOpen = false)"
                  class="w-full flex items-center justify-between px-4 py-3 text-[#333333] font-medium rounded-lg transition-all duration-200 hover:bg-white hover:text-[#0066cc]"
                >
                  <span>{{ item.name }}</span>
                  <font-awesome-icon
                    v-if="item.children"
                    icon="chevron-down"
                    :class="['w-4 h-4 transition-transform duration-200', activeMobileDropdown === item.name ? 'rotate-180' : '']"
                  />
                </component>

                <transition name="fade-slide">
                  <div
                    v-if="item.children && activeMobileDropdown === item.name"
                    class="ml-3 mt-1 space-y-1 animate-slideDown"
                  >
                    <router-link
                      v-for="child in item.children"
                      :key="child"
                      :to="getRoutePath(child)"
                      @click="closeMobileMenu"
                      class="block px-4 py-2 text-[#333333] rounded-lg transition-all duration-200 hover:bg-white hover:text-[#0066cc] hover:pl-6"
                    >
                      {{ child }}
                    </router-link>
                  </div>
                </transition>
              </div>

              <!-- Auth Buttons -->
              <div class="flex flex-col gap-2 pt-4 mt-4 border-t border-[#e0e0e0]">
                <router-link
                  to="/login"
                  class="w-full py-3 text-[#333333] font-medium rounded-lg border-2 border-[#e0e0e0] bg-white transition-all duration-200 hover:border-[#0066cc] hover:text-[#0066cc] text-center"
                >
                  Login
                </router-link>
                <router-link
                  to="/register"
                  class="w-full py-3 bg-[#0066cc] text-white font-medium rounded-lg transition-all duration-200 hover:bg-[#1a2332] hover:shadow-lg text-center"
                >
                  Register
                </router-link>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeDropdown = ref(null);
const activeMobileDropdown = ref(null);
const isMobileMenuOpen = ref(false);
const scrolled = ref(false);
const dropdownRef = ref(null);

const navigationItems = ref([
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
  { name: "Services", route: "/services" },
  { name: "Price", route: "/price" },
  {
    name: "Legal",
    children: [
      "License and Regulation",
      "Privacy Policy",
      "Safety of Funds",
      "Trading Conditions",
    ],
  },
  { name: "Contact us", route: "/contact" },
  { name: "FAQ", route: "/faq" },
]);

const getRoutePath = (page) => "/" + page.toLowerCase().replace(/\s+/g, "-");

const toggleDropdown = (name) => (activeDropdown.value = activeDropdown.value === name ? null : name);
const toggleMobileDropdown = (name) => (activeMobileDropdown.value = activeMobileDropdown.value === name ? null : name);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  activeMobileDropdown.value = null;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "auto";
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  activeMobileDropdown.value = null;
  document.body.style.overflow = "auto";
};

const handleScroll = () => (scrolled.value = window.scrollY > 10);
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) activeDropdown.value = null;
};
const handleResize = () => {
  if (window.innerWidth >= 768) closeMobileMenu();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("mousedown", handleClickOutside);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-dropdown {
  animation: dropdown 0.25s ease-out;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
