<template>
  <div class="min-h-screen">
    <!-- Breadcrumb Section -->
    <section class="relative py-20 bg-gray-900 text-white text-center">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style="background-image: url('@/assets/images/banner/4.jpg')"
      ></div>
      <div class="relative container mx-auto px-4">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h1 class="text-4xl font-bold mb-4">SAFETY OF FUNDS</h1>
            <nav class="flex justify-center items-center space-x-2 text-sm">
              <router-link
                to="/"
                class="flex items-center hover:text-blue-400 transition-colors"
              >
                <font-awesome-icon icon="home" class="w-4 h-4 mr-1" />
                Home
              </router-link>
              <span class="text-gray-400">/</span>
              <span class="text-blue-400">Safety of Funds</span>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg  overflow-hidden">
            <!-- Post Thumbnail -->
            <div class="relative">
              <img
                src="@/assets/images/blog/v1.jpg"
                alt="Safety of Funds"
                class="w-full h-64 object-cover"
              />
              <div
                class="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg"
              >
                <font-awesome-icon icon="image" class="w-5 h-5" />
              </div>
            </div>

            <!-- Content -->
            <div class="p-8">
              <!-- Meta Information -->
              <div
                class="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600"
              >
                <div class="flex items-center space-x-4">
                   <router-link
                    to="safety-of-funds"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Safety of Funds
                  </router-link>
                  <router-link
                    to="privacy-policy"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Privacy Policy
                  </router-link>
                </div>
              </div>

              <!-- Main Content -->
              <div class="prose prose-lg max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 mb-8">
                  SAFETY OF FUNDS
                </h2>

                <!-- Security Assurance Banner -->
                <div
                  class="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8"
                >
                  <div class="flex items-center">
                    <font-awesome-icon
                      icon="shield-alt"
                      class="w-8 h-8 text-green-600 mr-4"
                    />
                    <div>
                      <h4 class="text-xl font-semibold text-green-800 mb-2">
                        Your Funds Are Protected
                      </h4>
                      <p class="text-green-700">
                        MetaMask Log Option employs multiple layers of security
                        measures to ensure the safety and protection of your
                        investment funds at all times.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Leader in the Industry -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="trophy"
                      class="w-6 h-6 text-yellow-600 mr-3"
                    />
                    Leader in the Industry
                  </h3>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p class="text-gray-700 leading-relaxed">
                      MetaMask Log Option is the award-winning Global Leader in
                      Online Trading. With over 200 instruments in forex, spot
                      metals and CFDs on US and UK stocks, spot indices and
                      commodities. MetaMask Log Option serves retail and
                      institutional customers from over 180 countries in Europe,
                      Asia, the Middle East, Africa and Latin America.
                    </p>
                  </div>

                  <!-- Global Reach Stats -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div
                      class="text-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="globe"
                        class="w-8 h-8 text-blue-600 mb-2 mx-auto"
                      />
                      <p class="text-2xl font-bold text-gray-900">180+</p>
                      <p class="text-sm text-gray-600">Countries Served</p>
                    </div>
                    <div
                      class="text-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="chart-line"
                        class="w-8 h-8 text-green-600 mb-2 mx-auto"
                      />
                      <p class="text-2xl font-bold text-gray-900">200+</p>
                      <p class="text-sm text-gray-600">Trading Instruments</p>
                    </div>
                    <div
                      class="text-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="award"
                        class="w-8 h-8 text-yellow-600 mb-2 mx-auto"
                      />
                      <p class="text-2xl font-bold text-gray-900">Multi</p>
                      <p class="text-sm text-gray-600">Award Winning</p>
                    </div>
                    <div
                      class="text-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="users"
                        class="w-8 h-8 text-purple-600 mb-2 mx-auto"
                      />
                      <p class="text-2xl font-bold text-gray-900">Global</p>
                      <p class="text-sm text-gray-600">Client Base</p>
                    </div>
                  </div>
                </div>

                <!-- Accounts with Top Tier Banks -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="university"
                      class="w-6 h-6 text-blue-600 mr-3"
                    />
                    Accounts with Top Tier Banks
                  </h3>
                  <div
                    class="bg-indigo-50 border border-indigo-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      MetaMask Log Option provides banking and treasury services
                      through world-class banking institutions to its clients.
                      These banks are completely independent and do not endorse
                      the obligations of MetaMask Log Option to its customers.
                    </p>
                  </div>

                  <!-- Bank Security Features -->
                  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      class="flex items-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="shield-check"
                        class="w-6 h-6 text-green-600 mr-3"
                      />
                      <div>
                        <p class="font-semibold text-gray-900">
                          Top Tier Banking Partners
                        </p>
                        <p class="text-sm text-gray-600">
                          World-class financial institutions
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="balance-scale"
                        class="w-6 h-6 text-blue-600 mr-3"
                      />
                      <div>
                        <p class="font-semibold text-gray-900">
                          Independent Banking
                        </p>
                        <p class="text-sm text-gray-600">
                          Separate from company operations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Segregation of Client Funds -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="lock"
                      class="w-6 h-6 text-green-600 mr-3"
                    />
                    Segregation of Client Funds
                  </h3>
                  <div
                    class="bg-green-50 border border-green-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed mb-4">
                      Client funds security is a key element of the MetaMask Log
                      Option philosophy alongside unmatched trading conditions
                      and customer support. With global recognition for
                      excellence, solid reputation and multi-award winning
                      services, our clients are assured that their funds are
                      held with security, clarity and integrity.
                    </p>
                    <p class="text-gray-700 leading-relaxed">
                      MetaMask Log Option maintains segregated client accounts
                      to ensure that client funds are fully separated from
                      MetaMask Log Option' own funds at all times. Each client
                      account has a unique code to ensure that it is used solely
                      for client funding purposes. All client funds deposited
                      are completely segregated in accordance with strict
                      policies and procedures. Clients can be assured that their
                      funds are safe.
                    </p>
                  </div>

                  <!-- Segregation Benefits -->
                  <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      class="text-center p-6 bg-white border border-green-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="user-shield"
                        class="w-8 h-8 text-green-600 mb-3 mx-auto"
                      />
                      <h4 class="font-semibold text-gray-900 mb-2">
                        Complete Separation
                      </h4>
                      <p class="text-sm text-gray-600">
                        Client funds kept separate from company funds
                      </p>
                    </div>
                    <div
                      class="text-center p-6 bg-white border border-green-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="fingerprint"
                        class="w-8 h-8 text-green-600 mb-3 mx-auto"
                      />
                      <h4 class="font-semibold text-gray-900 mb-2">
                        Unique Account Codes
                      </h4>
                      <p class="text-sm text-gray-600">
                        Individual identification for each client account
                      </p>
                    </div>
                    <div
                      class="text-center p-6 bg-white border border-green-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="file-contract"
                        class="w-8 h-8 text-green-600 mb-3 mx-auto"
                      />
                      <h4 class="font-semibold text-gray-900 mb-2">
                        Strict Compliance
                      </h4>
                      <p class="text-sm text-gray-600">
                        Adherence to regulatory policies and procedures
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Risk Management -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="chart-pie"
                      class="w-6 h-6 text-purple-600 mr-3"
                    />
                    Risk Management
                  </h3>
                  <div
                    class="bg-purple-50 border border-purple-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      MetaMask Log Option through its award-winning trading
                      platforms provides an automated risk-management system to
                      ensure that client account balances will never go
                      negative.
                    </p>
                  </div>

                  <!-- Risk Management Features -->
                  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      class="flex items-start p-6 bg-white border border-purple-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="robot"
                        class="w-8 h-8 text-purple-600 mr-4 mt-1"
                      />
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">
                          Automated Protection
                        </h4>
                        <p class="text-gray-600">
                          Advanced systems monitor and protect your account 24/7
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items-start p-6 bg-white border border-purple-200 rounded-lg"
                    >
                      <font-awesome-icon
                        icon="exclamation-triangle"
                        class="w-8 h-8 text-orange-600 mr-4 mt-1"
                      />
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">
                          Negative Balance Protection
                        </h4>
                        <p class="text-gray-600">
                          Guaranteed protection against negative account
                          balances
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Security Summary -->
                <div
                  class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white"
                >
                  <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <font-awesome-icon
                      icon="star"
                      class="w-6 h-6 text-yellow-300 mr-3"
                    />
                    Comprehensive Fund Protection
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 class="font-semibold mb-3 text-blue-100">
                        Multi-Layer Security
                      </h4>
                      <ul class="space-y-2 text-blue-100">
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          Segregated client accounts
                        </li>
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          Top-tier banking partners
                        </li>
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          Automated risk management
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-3 text-blue-100">
                        Client Assurance
                      </h4>
                      <ul class="space-y-2 text-blue-100">
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          Global regulatory compliance
                        </li>
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          Award-winning services
                        </li>
                        <li class="flex items-center">
                          <font-awesome-icon
                            icon="check"
                            class="w-4 h-4 text-green-300 mr-2"
                          />
                          24/7 fund protection
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* Custom styles for enhanced readability */
.prose {
  color: inherit;
}

.prose h2,
.prose h3,
.prose h4 {
  color: inherit;
  font-weight: 700;
}

.prose p {
  margin-bottom: 1.5rem;
}

.border-l-4 {
  border-left-width: 4px;
}

/* Smooth transitions for hover effects */
a {
  transition: color 0.2s ease-in-out;
}

/* Ensure images are responsive */
img {
  max-width: 100%;
  height: auto;
}

/* Enhanced focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Gradient text for premium feel */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
