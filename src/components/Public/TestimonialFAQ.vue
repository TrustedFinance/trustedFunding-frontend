<template>
  <section
    class="relative testimonials-faq bg-gray-50 py-20 overflow-hidden"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        <!-- 🌟 Testimonials Section -->
        <div>
          <!-- Header -->
          <div class="mb-10">
            <div
              class="inline-flex items-center gap-2 bg-indigo-100 text-primary-blue px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <font-awesome-icon icon="star" class="text-yellow-500" />
              <span>Client Reviews</span>
            </div>
            <h2
              class="text-xl md:text-2xl xl:text-3xl font-bold text-[#333366]"
            >
              What Our Clients Say
            </h2>
          </div>

          <!-- Carousel -->
          <div class="relative">
            <transition-group
              name="fade"
              tag="div"
              class="relative h-auto space-y-6"
            >
              <div
                v-for="(testimonial, index) in [currentTestimonial]"
                :key="testimonial.name + index"
                class="bg-white rounded-2xl p-8  border border-gray-100"
              >
                <div class="text-gray-700 text-lg leading-relaxed mb-6">
                  <span class="text-xl text-indigo-500 font-serif mr-2">“</span>
                  {{ testimonial.quote }}
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#333366] to-[#0066cc]"
                  >
                    <img
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <div>
                    <div
                      class="text-[#333366] font-semibold text-lg leading-tight"
                    >
                      {{ testimonial.name }}
                    </div>
                    <div class="text-gray-500 text-sm mb-1">
                      {{ testimonial.package }}
                    </div>
                    <div class="flex items-center text-yellow-400">
                      <font-awesome-icon
                        v-for="star in 5"
                        :key="star"
                        icon="star"
                        class="w-3 h-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <!-- Controls -->
            <div class="flex justify-center gap-2 mt-8">
              <button
                v-for="(t, i) in testimonials"
                :key="i"
                @click="currentIndex = i"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="i === currentIndex ? 'bg-[#333366] w-4' : 'bg-gray-300'"
              ></button>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-10">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center bg-white border border-gray-100 rounded-xl p-5 "
            >
              <div class="text-2xl font-bold text-[#333366]">
                {{ stat.value }}
              </div>
              <div class="text-gray-600 text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- 💬 FAQ Section -->
        <div>
          <!-- Header -->
          <div class="mb-10">
            <div
              class="inline-flex items-center gap-2 bg-indigo-100 text-primary-blue px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <font-awesome-icon icon="question-circle" />
              <span>Support</span>
            </div>
            <h2
              class="text-xl md:text-2xl xl:text-3xl font-bold text-[#333366]"
            >
              Frequently Asked Questions
            </h2>
            <p class="text-gray-600 mt-2">
              Quick answers to the most common questions from our users.
            </p>
          </div>

          <!-- Accordion -->
          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="bg-white border border-gray-200 rounded-2xl overflow-hidden transition"
            >
              <button
                class="w-full flex items-center justify-between p-6 text-left font-semibold text-[#333366] hover:bg-gray-50"
                @click="toggleFaq(index)"
              >
                <span>{{ faq.question }}</span>
                <font-awesome-icon
                  :icon="faq.open ? 'chevron-up' : 'chevron-down'"
                  class="text-[#0066cc] transition-transform duration-300"
                />
              </button>

              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in"
                enter-from-class="opacity-0 max-h-0"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.open" class="p-6 pt-0 text-gray-700 leading-relaxed">
                  <p v-if="!Array.isArray(faq.answer)">{{ faq.answer }}</p>
                  <ol v-else class="list-decimal list-inside space-y-1">
                    <li v-for="item in faq.answer" :key="item">{{ item }}</li>
                  </ol>

                  <div
                    v-if="faq.additionalHelp"
                    class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3"
                  >
                    <font-awesome-icon
                      icon="info-circle"
                      class="text-blue-500 mt-1"
                    />
                    <p class="text-blue-800 text-sm">
                      {{ faq.additionalHelp }}
                    </p>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- CTA -->
          <div
            class="mt-10 bg-gradient-to-r from-[#333366] to-[#0066cc] rounded-2xl p-8 text-center text-white"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-2">
              Still have questions?
            </h3>
            <p class="text-white/90 mb-4">
              Our support team is here to help you 24/7.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <button
                @click="contactSupport"
                class="bg-white text-[#333366] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <font-awesome-icon icon="headset" />
                <span>Live Chat</span>
              </button>
              <button
                @click="sendEmail"
                class="border-2 border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <font-awesome-icon icon="envelope" />
                <span>Email Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-50"
    ></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const testimonials = ref([
  {
    quote:
      "Very great work, made a huge amount of money with little or no effort. Special thanks to your automated trading device.",
    name: "Austin Paul",
    package: "Silver Package Trader",
    avatar: new URL("@/assets/images/team/5.jpg", import.meta.url).href,
  },
  {
    quote:
      "Extremely satisfying service. I’ve already cashed out big in just two weeks!",
    name: "Martins Mcmullen",
    package: "Silver Package Trader",
    avatar: new URL("@/assets/images/team/6.jpg", import.meta.url).href,
  },
  {
    quote:
      "This is top-notch. I literally watched my account blossom into what it is today.",
    name: "Marron Bua",
    package: "Basic Package Trader",
    avatar: new URL("@/assets/images/team/7.jpg", import.meta.url).href,
  },
]);

const stats = ref([
  { value: "4.9/5", label: "Average Rating" },
  { value: "2K+", label: "Happy Clients" },
  { value: "98%", label: "Success Rate" },
]);

const currentIndex = ref(0);
const currentTestimonial = computed(
  () => testimonials.value[currentIndex.value]
);

// Autoplay carousel
let interval;
onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % testimonials.value.length;
  }, 5000);
});
onUnmounted(() => clearInterval(interval));

const faqs = ref([
  {
    question: "How secure is trading with you?",
    answer:
      "We use advanced SSL encryption and adhere to global security standards to protect your funds and data.",
    open: true,
  },
  {
    question: "What currencies can I trade with?",
    answer: "You can trade in USD, EUR, or GBP.",
    open: false,
  },
  {
    question: "Do I have to deposit to register?",
    answer:
      "No, registration is free. You only need to deposit once you’re ready to trade.",
    open: false,
  },
  {
    question: "Are payouts taxable?",
    answer:
      "Traders are responsible for tax liabilities in their respective countries.",
    open: false,
  },
  {
    question: "Having trouble registering?",
    answer:
      "Contact us via live chat, email support, or request a callback. We’re here for you!",
    additionalHelp: "Average support response time: under 5 minutes.",
    open: false,
  },
]);

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};

const handleImageError = (event) => {
  const el = event.target;
  el.style.display = "none";
  el.parentElement.innerHTML = `
    <div class='w-full h-full flex items-center justify-center bg-gradient-to-br from-[#333366] to-[#0066cc] text-white text-lg font-bold'>
      ${el.alt.charAt(0)}
    </div>
  `;
};

const contactSupport = () => console.log("Opening live chat...");
const sendEmail = () => (window.location.href = "mailto:support@Trusted Finance.com");
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
