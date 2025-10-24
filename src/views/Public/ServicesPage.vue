<template>
  <div class="services-page">
    <!-- Breadcrumb Section -->
    <section
      class="breadcrumb-section bg-fixed text-center text-pure-white py-16 lg:py-24 relative overflow-hidden"
    >
      <!-- Background Overlay -->
      <div class="absolute inset-0 bg-dark-navy/80 z-0"></div>

      <!-- Background Image (you can replace with your image) -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-blue/90 to-dark-navy/90 z-0"
      ></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 text-pure-white"
            >
              Our Services
            </h1>
            <nav
              class="breadcrumb-nav flex justify-center items-center flex-wrap"
            >
              <ol class="flex items-center space-x-2 text-sm sm:text-base">
                <li class="flex items-center">
                  <router-link
                    to="/"
                    class="flex items-center text-silver-gray hover:text-pure-white transition-colors duration-200"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                      />
                    </svg>
                    Home
                  </router-link>
                </li>
                <li class="flex items-center">
                  <span class="mx-2 text-silver-gray">/</span>
                  <span class="text-pure-white font-medium">Services</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section bg-cool-light py-16 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <!-- Service Item 1 -->
          <div
            class="service-item group bg-pure-white rounded-2xl transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>01</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  Easy Forex Trading
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  Easy access for Beginners & experienced traders. Forex traders
                  are aware of their profits in advance — their main objective
                  is to select the correct direction of the market movement.
                </p>
              </div>
            </div>
          </div>

          <!-- Service Item 2 -->
          <div
            class="service-item group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>02</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  Investment Planning
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  Realtime Analysis & Proper planning. Watch asset's value in
                  real time monitoring platform and decide when to trade in.
                </p>
              </div>
            </div>
          </div>

          <!-- Service Item 3 -->
          <div
            class="service-item group bg-pure-white rounded-2xl transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>03</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  Good Signals
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  We provide Cumulative and consistent High returns with our
                  best trade signals.
                </p>
              </div>
            </div>
          </div>

          <!-- Service Item 4 -->
          <div
            class="service-item group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>04</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  24/7 Support
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  Round-the-clock customer support to assist you with any
                  questions or issues you may have.
                </p>
              </div>
            </div>
          </div>

          <!-- Service Item 5 -->
          <div
            class="service-item group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>05</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  Capital Markets
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  We understand the importance always approaching each work
                  point integrally and believe in comprehensive market
                  solutions.
                </p>
              </div>
            </div>
          </div>

          <!-- Service Item 6 -->
          <div
            class="service-item group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="service-icon w-12 h-12 lg:w-14 lg:h-14 bg-primary-blue rounded-xl flex items-center justify-center text-pure-white text-lg lg:text-xl font-bold group-hover:bg-dark-navy transition-colors duration-300"
                >
                  <span>06</span>
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg lg:text-xl font-display font-bold text-dark-navy mb-2"
                >
                  Bitcoin Mining/Transaction
                </h3>
                <p
                  class="text-sm lg:text-base text-highlight-text leading-relaxed"
                >
                  A transaction is a transfer of value between Bitcoin wallets
                  that gets included in the block chain. Bitcoin wallets keep a
                  secret piece of data called a private key or seed, which is
                  used to sign transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <InvestmentPlanSection />
</template>

<script setup>
import InvestmentPlanSection from "@/components/Public/InvestmentPlanSection.vue";
</script>

<style scoped>
.breadcrumb-section {
  position: relative;
  background: linear-gradient(
    135deg,
    var(--color-primary-blue),
    var(--color-dark-navy)
  );
}

.breadcrumb-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("@/assets/images/banner/4.jpg") center/cover no-repeat;
  z-index: -1;
}

.services-section {
  background-color: var(--color-cool-light);
}

.service-item {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.service-icon {
  position: relative;
  transition: all 0.3s ease;
}

.service-icon::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    135deg,
    var(--color-primary-blue),
    var(--color-dark-navy)
  );
  border-radius: 14px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-item:hover .service-icon::before {
  opacity: 1;
}

/* Mobile-first responsive design */
@media (max-width: 640px) {
  .breadcrumb-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .services-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .service-item {
    padding: 1.5rem;
  }

  .breadcrumb-nav ol {
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Tablet styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .breadcrumb-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .services-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .breadcrumb-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .services-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

/* Ensure equal height on desktop */
@media (min-width: 768px) {
  .service-item {
    height: 100%;
  }
}

/* Breadcrumb link hover effects */
.breadcrumb-nav a:hover {
  transform: translateY(-1px);
}

/* Smooth transitions */
.breadcrumb-section,
.services-section,
.service-item,
.service-icon {
  transition: all 0.3s ease-in-out;
}
</style>
