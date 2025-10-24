<template>
  <footer class="bg-dark-navy text-pure-white border-t border-silver-gray/30">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Brand / About -->
        <div>
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 mb-6 group">
            <div class="relative">
              <img
                src="@/assets/images/logo.png"
                alt="Trusted Finance Logo"
                class="w-14 h-14 object-contain transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
              />
              <div
                class="absolute inset-0 bg-primary-blue/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
          </router-link>

          <p class="text-pure-white/80 leading-relaxed mb-6 max-w-md">
            Your trusted partner in wealth growth and investment management. We
            deliver secure and transparent trading services designed to help you
            grow your financial future.
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-3 mb-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-cool-light text-pure-white/80 hover:text-primary-blue hover:bg-primary-blue/10 transition-all duration-300 transform hover:scale-110"
            >
              <font-awesome-icon :icon="['fab', social.icon]" class="w-4 h-4" />
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="space-y-3">
            <div
              v-for="badge in trustBadges"
              :key="badge.text"
              class="flex items-center gap-3 text-pure-white/80 text-sm"
            >
              <font-awesome-icon :icon="badge.icon" :class="badge.class" />
              <span>{{ badge.text }}</span>
            </div>
          </div>
        </div>

        <!-- Services Links -->
        <div>
          <h4 class="text-pure-white text-lg lg:text-xl font-semibold mb-6">
            Services
          </h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li
              v-for="link in serviceLinks"
              :key="link.name"
              class="group flex items-center"
            >
              <router-link
                :to="link.path"
                class="flex items-center gap-2 text-pure-white/80 hover:text-pure-white transition-all duration-300 group-hover:translate-x-1"
              >
                <font-awesome-icon
                  icon="chevron-right"
                  class="w-2 h-2 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact / Newsletter -->
        <div>
          <h4 class="text-pure-white text-lg lg:text-xl font-semibold mb-6">
            Contact Us
          </h4>

          <div class="space-y-6">
            <div
              v-for="item in contactInfo"
              :key="item.label"
              class="flex items-start gap-4 group"
            >
              <div
                class="w-10 h-10 rounded-full bg-cool-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary-blue transition-colors duration-300"
              >
                <font-awesome-icon
                  :icon="item.icon"
                  class="text-primary-blue group-hover:text-white w-4 h-4 transition-colors duration-300"
                />
              </div>
              <div>
                <component
                  :is="item.href ? 'a' : 'p'"
                  :href="item.href"
                  class="text-pure-white/80 hover:text-pure-white transition-colors duration-300"
                  >{{ item.text }}</component
                >
                <p v-if="item.sub" class="text-silver-gray text-sm">
                  {{ item.sub }}
                </p>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="mt-4 p-4 bg-cool-light/30 rounded-xl">
              <h5 class="text-pure-white font-semibold mb-3">Stay Updated</h5>
              <div class="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  v-model="email"
                  class="flex-1 bg-cool-light text-pure-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <button
                  @click="subscribeNewsletter"
                  class="bg-primary-blue hover:bg-primary-blue/80 text-pure-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  <font-awesome-icon icon="paper-plane" class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div
      class="border-t border-silver-gray/20 py-6 bg-dark-navy/80 backdrop-blur-sm"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm"
      >
        <p class="text-pure-white/80  text-center sm:text-left">
          &copy; 2019 - {{ currentYear }} Trusted Finance. All Rights Reserved.
        </p>

        <ul class="flex flex-wrap justify-center sm:justify-end gap-4">
          <li
            v-for="link in legalLinks"
            :key="link.name"
            class="hover:text-primary-blue transition-colors duration-300"
          >
            <router-link :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>

      <div class="mt-4 text-center px-4">
        <p
          class="text-pure-white/80  text-xs leading-relaxed max-w-3xl mx-auto"
        >
          Trading involves substantial risk and may result in the loss of your
          invested capital. Please read our
          <router-link
            to="/risk-warning"
            class="text-pure-white/80 hover:text-primary-blue underline transition-colors duration-300"
          >
            Risk Warning
          </router-link>
          and
          <router-link
            to="/terms"
            class="text-pure-white/80  hover:text-primary-blue underline transition-colors duration-300"
          >
            Terms of Service </router-link
          >.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";

const email = ref("");
const currentYear = computed(() => new Date().getFullYear());

// Social Media
const socialLinks = ref([
  { name: "Facebook", icon: "facebook-f", url: "#" },
  { name: "Twitter", icon: "twitter", url: "#" },
  { name: "LinkedIn", icon: "linkedin-in", url: "#" },
  { name: "Instagram", icon: "instagram", url: "#" },
  { name: "YouTube", icon: "youtube", url: "#" },
]);

// Trust Badges
const trustBadges = ref([
  {
    text: "Secure & Regulated",
    icon: "shield-alt",
    class: "text-green-500 w-4 h-4",
  },
  { text: "24/7 Support", icon: "clock", class: "text-blue-500 w-4 h-4" },
  {
    text: "Verified Platform",
    icon: "check-circle",
    class: "text-emerald-500 w-4 h-4",
  },
]);

// Services
const serviceLinks = ref([
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Account Types", path: "/pricing" },
  { name: "FAQ", path: "/faq" },
  { name: "Trading Conditions", path: "/trading-conditions" },
  { name: "Safety of Funds", path: "/safety-of-funds" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Licenses & Regulation", path: "/license-&-regulation" },
]);

// Contact Info
const contactInfo = ref([
  {
    label: "Address",
    icon: "map-marker-alt",
    text: "4622 Cedar Avenue, Wilmington, NC 28403, United States",
  },
  {
    label: "Email",
    icon: "envelope",
    text: "support@Trusted Finance.com",
    href: "mailto:support@Trusted Finance.com",
    sub: "24/7 Support Available",
  },
  {
    label: "Phone",
    icon: "phone",
    text: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    sub: "Mon–Fri: 9AM–6PM EST",
  },
]);

// Legal Links
const legalLinks = ref([
  { name: "Terms of Use", path: "/terms" },
  { name: "License", path: "/license-&-regulation" },
  { name: "Support", path: "/support" },
  { name: "Risk Warning", path: "/risk-warning" },
]);

// Newsletter Functionality
const subscribeNewsletter = () => {
  if (!email.value) return;
  console.log("Subscribed:", email.value);
  email.value = "";
};
</script>

<style scoped>
.bg-dark-navy {
  background-color: #0a0f1f;
}
.text-highlight-text {
  color: #b0b8c5;
}
.bg-cool-light {
  background-color: #1c2433;
}
.text-pure-white {
  color: #ffffff;
}

/* Smooth Transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus Accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-primary-blue);
  outline-offset: 3px;
  border-radius: 6px;
}

/* Print Optimization */
@media print {
  footer {
    display: none;
  }
}
</style>
