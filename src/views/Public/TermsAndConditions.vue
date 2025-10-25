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
            <h1 class="text-4xl font-bold mb-4">Risk Warning</h1>
            <nav class="flex justify-center items-center space-x-2 text-sm">
              <router-link
                to="/"
                class="flex items-center hover:text-blue-400 transition-colors"
              >
                <font-awesome-icon icon="home" class="w-4 h-4 mr-1" />
                Home
              </router-link>
              <span class="text-gray-400">/</span>
              <span class="text-blue-400">Risk Warning</span>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Post Thumbnail -->
            <div class="relative">
              <img
                src="@/assets/images/blog/v1.jpg"
                alt="Risk Warning"
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
                    to="license-&-regulation"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    License & Regulation
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
                  RISK WARNING
                </h2>

                <!-- Main Warning -->
                <div
                  class="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-8"
                >
                  <p class="text-gray-700 leading-relaxed">
                    Trading foreign exchange on margin carries a high level of
                    risk, and may not be suitable for all investors. Before
                    deciding to trade foreign exchange, you should carefully
                    consider your investment objectives, level of experience,
                    and risk appetite. There is a possibility that you may
                    sustain a loss of some or all of your investment and
                    therefore you should not invest money that you cannot afford
                    to lose. You should be aware of all the risks associated
                    with foreign exchange trading, and seek advice from an
                    independent financial advisor if you have any doubts.
                  </p>
                </div>

                <!-- Risks of Investing in CFDs -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="exclamation-triangle"
                      class="w-6 h-6 text-red-600 mr-3"
                    />
                    Risks of Investing in CFDs
                  </h3>
                  <div
                    class="bg-orange-50 border border-orange-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      CFDs, especially when highly leveraged (the higher the
                      leverage of the CFD, the more risky it becomes), carry a
                      very high level of risk. They are not standardized
                      products. Different CFD providers have their own terms,
                      conditions and costs. Therefore, generally, they are not
                      suitable for most retail investors.
                    </p>
                  </div>
                </div>

                <!-- Liquidity Risk -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="tachometer-alt"
                      class="w-6 h-6 text-yellow-600 mr-3"
                    />
                    Liquidity Risk
                  </h3>
                  <div
                    class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      Liquidity risk affects your ability to trade. It is the
                      risk that your CFD or asset cannot be traded at the time
                      you want to trade (to prevent a loss, or to make a
                      profit).
                    </p>
                  </div>
                </div>

                <!-- Execution Risk -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="clock"
                      class="w-6 h-6 text-blue-600 mr-3"
                    />
                    Execution Risk
                  </h3>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p class="text-gray-700 leading-relaxed">
                      Execution risk is associated with the fact that trades may
                      not take place immediately. For example, there might be a
                      time lag between the moment you place your order and the
                      moment it is executed.
                    </p>
                  </div>
                </div>

                <!-- Internet Trading Risks -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="wifi"
                      class="w-6 h-6 text-purple-600 mr-3"
                    />
                    Internet Trading Risks
                  </h3>
                  <div
                    class="bg-purple-50 border border-purple-200 rounded-lg p-6"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      There are risks associated with utilizing an
                      Internet-based deal execution trading system including,
                      but not limited to, the failure of hardware, software, and
                      Internet connection. Since MetaMask Log Option does not
                      control signal power, its reception or routing via
                      Internet, configuration of your equipment or reliability
                      of its connection, we cannot be responsible for
                      communication failures, distortions or delays when trading
                      via the Internet.
                    </p>
                  </div>
                </div>

                <!-- Acknowledgement -->
                <div class="mb-8">
                  <h3
                    class="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="file-alt"
                      class="w-6 h-6 text-green-600 mr-3"
                    />
                    Acknowledgement
                  </h3>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p class="text-gray-700 leading-relaxed mb-6">
                      The client acknowledges and declares that he has read,
                      understood and thus accepts without any reservation the
                      following:
                    </p>

                    <!-- Risk Points -->
                    <div class="space-y-6">
                      <div class="flex items-start">
                        <font-awesome-icon
                          icon="circle"
                          class="w-3 h-3 text-red-500 mt-2 mr-4 flex-shrink-0"
                        />
                        <p class="text-gray-700 leading-relaxed">
                          <strong class="text-gray-900"
                            >Value Fluctuation Risk:</strong
                          >
                          The value of the Financial Instrument (including
                          currency pair, CFDs, or any other derivative product)
                          may decrease and the client may receive less money
                          than originally invested or the value of the Financial
                          Instruments may present high fluctuations.
                        </p>
                      </div>

                      <div class="flex items-start">
                        <font-awesome-icon
                          icon="circle"
                          class="w-3 h-3 text-red-500 mt-2 mr-4 flex-shrink-0"
                        />
                        <p class="text-gray-700 leading-relaxed">
                          <strong class="text-gray-900"
                            >Past Performance Disclaimer:</strong
                          >
                          Information on past performance of a Financial
                          Instrument does not guarantee the present and/or
                          future performance; the use of historic data does not
                          constitute a binding or safe forecast as to the
                          corresponding future return of the Financial
                          Instruments to which such data refers.
                        </p>
                      </div>

                      <div class="flex items-start">
                        <font-awesome-icon
                          icon="circle"
                          class="w-3 h-3 text-red-500 mt-2 mr-4 flex-shrink-0"
                        />
                        <p class="text-gray-700 leading-relaxed">
                          <strong class="text-gray-900"
                            >Liquidity Concerns:</strong
                          >
                          Some Financial Instruments may not become immediately
                          liquid due to various reasons such as reduced demand,
                          and the Company may not be in a position to sell them
                          or easily obtain information on the value of such
                          Financial Instruments or the extent of any related or
                          inherent risk concerning such Financial Instruments.
                        </p>
                      </div>

                      <div class="flex items-start">
                        <font-awesome-icon
                          icon="circle"
                          class="w-3 h-3 text-red-500 mt-2 mr-4 flex-shrink-0"
                        />
                        <p class="text-gray-700 leading-relaxed">
                          <strong class="text-gray-900"
                            >Currency Exchange Risk:</strong
                          >
                          When a Financial Instrument is negotiated in a
                          currency other than the currency of the client's
                          country of residence, any changes in an exchange rate
                          may have a negative effect on the Financial
                          Instruments' value, price and performance.
                        </p>
                      </div>

                      <div class="flex items-start">
                        <font-awesome-icon
                          icon="circle"
                          class="w-3 h-3 text-red-500 mt-2 mr-4 flex-shrink-0"
                        />
                        <p class="text-gray-700 leading-relaxed">
                          <strong class="text-gray-900"
                            >Foreign Market Risks:</strong
                          >
                          A Financial Instrument in foreign markets may entail
                          risks different than the usual risks in the markets at
                          the client's country of residence. The prospect of
                          profit or loss from transactions in foreign markets is
                          also influenced by the exchange rate fluctuations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Important Notice -->
                <div
                  class="bg-red-100 border-2 border-red-300 rounded-lg p-6 mt-8"
                >
                  <div class="flex items-start">
                    <font-awesome-icon
                      icon="exclamation-circle"
                      class="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1"
                    />
                    <div>
                      <h4 class="text-xl font-bold text-red-800 mb-2">
                        Important Notice
                      </h4>
                      <p class="text-red-700 leading-relaxed">
                        Trading involves substantial risk of loss and is not
                        suitable for every investor. The valuation of Financial
                        Instruments may fluctuate, and as a result, clients may
                        lose more than their original investment. Please ensure
                        you fully understand the risks involved and seek
                        independent advice if necessary.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Risk Assessment Checklist -->
                <div
                  class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8"
                >
                  <h4
                    class="text-xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="clipboard-check"
                      class="w-6 h-6 text-blue-600 mr-3"
                    />
                    Risk Assessment Checklist
                  </h4>
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700"
                  >
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Assess your financial situation
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Understand leverage risks
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Consider your experience level
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Seek independent advice
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Only risk capital you can afford to lose
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Read all terms and conditions
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

/* Custom styling for risk points */
.flex.items-start p {
  margin-bottom: 0;
}

/* Enhanced focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
