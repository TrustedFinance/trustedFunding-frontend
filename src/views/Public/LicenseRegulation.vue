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
            <h1 class="text-4xl font-bold mb-4">LICENCES AND REGULATION</h1>

            <nav class="flex justify-center items-center space-x-2 text-sm">
              <router-link
                to="/"
                class="flex items-center hover:text-blue-400 transition-colors"
              >
                <font-awesome-icon icon="home" class="w-4 h-4 mr-1" />
                Home
              </router-link>
              <span class="text-gray-400">/</span>
              <span class="text-blue-400">Licences And Regulation</span>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg  overflow-hidden">
            <!-- Post Thumbnail -->
            <div class="relative">
              <img
                src="@/assets/images/blog/v1.jpg"
                alt="Licences and Regulation"
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
                <div class="flex items-center space-x-2">
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
                <h2 class="text-3xl font-bold text-gray-900 mb-6">
                  Our Licences and Regulations
                </h2>

                <p class="text-gray-700 leading-relaxed mb-6">
                  MetaMask Log Option is a fully licenced and regulated Cyprus
                  Investment Firm (CIF) supervised by the Cyprus Securities and
                  Exchange Commission (CySEC) (License Number 124/10). MetaMask
                  Log Option Limited is authorized to trade internationally,
                  specializing in Forex CFD online trading on currencies,
                  commodities, futures and indices and lots more.
                </p>

                <p class="text-gray-700 leading-relaxed mb-6">
                  CySEC is the supervisory and regulatory authority for
                  Investment Services Firms in Cyprus under Law 144(I)/2007
                  which is a transposition of MiFID Law (Markets in Financial
                  Instruments Directive), a European Union law effective as of
                  November 1, 2007, under ESMA (European Securities and Markets
                  Authorities). ESMA is an independent EU Authority that
                  contributes to safeguarding the stability of the European
                  Union's financial system by enhancing the protection of
                  investors and promoting stable and orderly financial markets.
                </p>

                <p class="text-gray-700 leading-relaxed mb-6">
                  MetaMask Log Option is a reliable and authentic provider of
                  online trading markets. The company applies all EU regulations
                  and governing laws in an officially regulated environment.
                </p>

                <p class="text-gray-700 leading-relaxed mb-8">
                  We are also registered with the supervisory authorities below
                  based on the MiFID Directive:
                </p>

                <!-- Regulatory Authorities -->
                <div class="space-y-8">
                  <!-- IFSC -->
                  <div class="border-l-4 border-blue-600 pl-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                      IFSC
                    </h3>
                    <p class="text-lg font-medium text-gray-800 mb-2">
                      International Financial Services Commission (Belize)
                    </p>
                    <p class="text-gray-700">
                      MetaMask Log Option Limited is licensed by IFSC under
                      license number
                      <span class="font-semibold text-blue-600"
                        >IFSC/60/354/TS/18</span
                      >
                    </p>
                  </div>

                  <!-- FCA -->
                  <div class="border-l-4 border-green-600 pl-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                      FCA
                    </h3>
                    <p class="text-lg font-medium text-gray-800 mb-2">
                      Financial Conduct Authority (United Kingdom)
                    </p>
                    <p class="text-gray-700">
                      MetaMask Log Option UK Ltd is regulated by the Financial
                      Conduct Authority
                      <span class="font-semibold text-green-600"
                        >(Reference number: 705428)</span
                      >
                    </p>
                  </div>

                  <!-- ASIC -->
                  <div class="border-l-4 border-purple-600 pl-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                      ASIC
                    </h3>
                    <p class="text-lg font-medium text-gray-800 mb-2">
                      Australian Securities and Investments Commission
                      (Australia)
                    </p>
                    <p class="text-gray-700">
                      MetaMask Log Option Pty Ltd has been issued an Australian
                      Financial Services License by ASIC
                      <span class="font-semibold text-purple-600"
                        >(number 443670)</span
                      >
                    </p>
                  </div>
                </div>

                <!-- Additional Trust Indicators -->
                <div
                  class="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <h4
                    class="text-xl font-semibold text-gray-900 mb-4 flex items-center"
                  >
                    <font-awesome-icon
                      icon="shield-alt"
                      class="w-6 h-6 text-green-600 mr-3"
                    />
                    Regulatory Compliance & Security
                  </h4>
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700"
                  >
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Fully regulated investment firm
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Client fund segregation
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Regular compliance audits
                    </div>
                    <div class="flex items-center">
                      <font-awesome-icon
                        icon="check-circle"
                        class="w-4 h-4 text-green-500 mr-2"
                      />
                      Transparent trading conditions
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
// For example, if you need to make the component dynamic
</script>

<style scoped>
/* Custom styles can be added here if needed */
/* Most styling is handled by Tailwind CSS classes */

.prose {
  color: inherit;
}

.prose h2 {
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
</style>
