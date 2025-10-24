<template>
  <div class="faq-page min-h-screen bg-cool-light">
    <!-- Breadcrumb Section -->
    <section
      class="relative text-center text-pure-white py-16 lg:py-24 overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-blue/90 to-dark-navy/90 z-0"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4"
        >
          Frequently Asked Questions
        </h1>
        <nav class="flex justify-center items-center text-sm sm:text-base">
          <router-link
            to="/"
            class="flex items-center text-silver-gray hover:text-pure-white transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
            Home
          </router-link>
          <span class="mx-2 text-silver-gray">/</span>
          <span class="text-pure-white font-medium">FAQ</span>
        </nav>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <transition-group
            name="faq"
            tag="div"
            class="space-y-4"
            enter-active-class="transition ease-out duration-300"
            leave-active-class="transition ease-in duration-200"
          >
            <div
              v-for="(item, index) in faqs"
              :key="item.id"
              class="bg-white rounded-2xl border border-silver-gray overflow-hidden  transition-all duration-300"
            >
              <button
                @click="toggleFAQ(index)"
                class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-cool-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                :class="{ 'bg-cool-light': activeFAQ === index }"
              >
                <h3
                  class="text-lg lg:text-xl font-display font-semibold text-dark-navy pr-4"
                >
                  {{ item.question }}
                </h3>
                <svg
                  class="w-5 h-5 text-primary-blue transition-transform duration-300"
                  :class="{ 'rotate-180': activeFAQ === index }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
              >
                <div
                  v-show="activeFAQ === index"
                  class="px-6 pb-5 text-highlight-text leading-relaxed text-sm lg:text-base"
                >
                  <div v-html="item.answer" class="mt-4"></div>
                </div>
              </transition>
            </div>
          </transition-group>

          <!-- Additional Help Section -->
          <div class="mt-12 text-center">
            <div class="bg-primary-blue/10 rounded-2xl p-6 lg:p-8 ">
              <h3
                class="text-xl lg:text-2xl font-display font-bold text-dark-navy mb-4"
              >
                Still have questions?
              </h3>
              <p class="text-highlight-text mb-6 text-sm lg:text-base">
                Can't find the answer you're looking for? Please contact our
                friendly team.
              </p>
              <a
                href="mailto:support@metamasklog.live"
                class="inline-flex items-center px-5 py-3 bg-primary-blue text-white rounded-lg  hover:bg-dark-navy transition-all duration-300"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeFAQ = ref(null);

const faqs = ref([
  {
    id: 1,
    question: "How secure is trading with you?",
    answer:
      "We use advanced SSL (Secure Sockets Layer) encryption to protect all transactions. Your data and funds are safeguarded with multiple layers of industry-grade security.",
  },
  {
    id: 2,
    question: "What currency can I use for trading?",
    answer:
      "You can open an account in <strong>USD, EUR, or GBP</strong>. Please note that you cannot change your selected currency after registration.",
  },
  {
    id: 3,
    question: "Do I have to deposit money for registration?",
    answer:
      "No deposit is required to register. However, you must deposit funds to begin trading and access live market features.",
  },
  {
    id: 4,
    question: "Are payouts taxable?",
    answer:
      "Tax obligations depend on your country of residence. Please consult with your local tax advisor for more details.",
  },
  {
    id: 5,
    question:
      "I have problems with the registration process. What should I do?",
    answer:
      'Our support team is ready to assist you. Contact us at <a href="mailto:support@metamasklog.live" class="text-primary-blue underline hover:text-dark-navy">support@metamasklog.live</a>.',
  },
  {
    id: 6,
    question: "How can I register?",
    answer: `
      <p>Registering is simple:</p>
      <ol class="list-decimal list-inside space-y-1 mt-2">
        <li>Click on <strong>Sign Up</strong> on the homepage.</li>
        <li>Fill in the required details.</li>
        <li>Submit the form.</li>
        <li>Login to your new account.</li>
        <li>Deposit funds and start trading.</li>
      </ol>
    `,
  },
  {
    id: 7,
    question: "What is the registration fee?",
    answer:
      "There is <strong>no registration fee</strong> — it's completely free to join.",
  },
]);

const toggleFAQ = (index) => {
  activeFAQ.value = activeFAQ.value === index ? null : index;
};
</script>

<style scoped>
/* Optional fade-in animation for FAQ items */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
