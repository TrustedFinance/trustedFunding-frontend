<template>
  <div class="about-page">
    <!-- Breadcrumb Section -->
    <section
      class="breadcrumb-section bg-fixed text-center text-pure-white py-16 lg:py-24 relative overflow-hidden"
    >
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-blue/90 to-dark-navy/90 z-0"
      ></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 text-pure-white"
            >
              About Us
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
                  <span class="text-pure-white font-medium">About</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section py-16 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <!-- Image Section -->
          <div class="w-full lg:w-1/2">
            <div class="relative rounded-2xl overflow-hidden ">
              <img
                src="@/assets/images/about/4.jpg"
                alt="About Us"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>

          <!-- Content Section -->
          <div class="w-full lg:w-1/2">
            <div class="space-y-6">
              <div>
                <h4 class="text-primary-blue text-lg font-semibold mb-2">
                  About Us
                </h4>
                <h2
                  class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-dark-navy mb-4"
                >
                  We have <span class="text-primary-blue">10+ Years</span> of
                  experience in standard professional services
                </h2>
                <p
                  class="text-highlight-text leading-relaxed text-sm sm:text-base"
                >
                  We do so by providing an intuitive trading platform designed
                  with the latest technological advancements that's geared
                  towards new traders as well as professionals. We place great
                  emphasis on education, providing a well-rounded library of
                  V.O.D. seminars, webinars, good signals, analysis and more.
                  Our customer service and support is always available to meet
                  your needs, and our account managers know that your success is
                  our success.
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center text-pure-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <span class="font-semibold text-dark-navy block"
                      >Opening Hours</span
                    >
                    <span class="text-highlight-text"
                      >Mon - Fri 9:00 - 21:00</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section bg-cool-light py-16 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <!-- Left Content -->
          <div class="w-full lg:w-1/2">
            <div class="space-y-6">
              <h2
                class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-dark-navy mb-4"
              >
                How do we help you become a star trader?
              </h2>
              <div
                class="space-y-4 text-highlight-text leading-relaxed text-sm sm:text-base"
              >
                <p>
                  Most trading platforms have a high-risk area where you can
                  either double or even triple your capital and then lose it in
                  few minutes. Trusted FinanceOption have several advantages that
                  make it possible to get more profit with little or no risk.
                </p>
                <p>
                  Opportunities arise daily and are numerous, and we provide you
                  with the means to connect from one to the other
                </p>
                <p>
                  Whether you're new to the markets or a professional, dedicated
                  customer support is an integral part of a successful trading
                  experience; if you have questions, comments or concerns, our
                  local staff is on-hand to answer all your needs.
                </p>
                <p>
                  <a
                    href="https://olympglobaloptions.com/errorpage.php"
                    class="text-primary-blue hover:text-dark-navy underline"
                    >Contact us</a
                  >
                  by
                  <a
                    href="mailto:support@metamasklog.live"
                    class="text-primary-blue hover:text-dark-navy underline"
                    >Email</a
                  >!
                </p>
                <p>
                  Trusted FinanceOption is always interested in meeting talented
                  applicants. If you're interested in joining our team,
                  <a
                    href="mailto:support@metamasklog.live"
                    class="text-primary-blue hover:text-dark-navy underline"
                    >email</a
                  >
                  us!
                </p>
              </div>
            </div>
          </div>

          <!-- Right Content - Skills -->
          <div class="w-full lg:w-1/2">
            <div class="space-y-6">
              <h2
                class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-dark-navy mb-4"
              >
                Our Commitment
              </h2>

              <div class="space-y-6">
                <!-- Skill Item 1 -->
                <div class="skill-item">
                  <div class="flex justify-between items-center mb-2">
                    <span
                      class="font-semibold text-dark-navy text-sm sm:text-base"
                      >Connecting Opportunities</span
                    >
                    <span
                      class="text-primary-blue font-bold text-sm sm:text-base"
                      >99%</span
                    >
                  </div>
                  <div class="w-full bg-silver-gray rounded-full h-2 sm:h-3">
                    <div
                      class="progress-bar bg-primary-blue h-2 sm:h-3 rounded-full"
                      data-width="99%"
                      style="width: 0%"
                    ></div>
                  </div>
                </div>

                <!-- Skill Item 2 -->
                <div class="skill-item">
                  <div class="flex justify-between items-center mb-2">
                    <span
                      class="font-semibold text-dark-navy text-sm sm:text-base"
                      >Maintaining Control</span
                    >
                    <span
                      class="text-primary-blue font-bold text-sm sm:text-base"
                      >92%</span
                    >
                  </div>
                  <div class="w-full bg-silver-gray rounded-full h-2 sm:h-3">
                    <div
                      class="progress-bar bg-primary-blue h-2 sm:h-3 rounded-full"
                      data-width="92%"
                      style="width: 0%"
                    ></div>
                  </div>
                </div>

                <!-- Skill Item 3 -->
                <div class="skill-item">
                  <div class="flex justify-between items-center mb-2">
                    <span
                      class="font-semibold text-dark-navy text-sm sm:text-base"
                      >Personal, Professional Support</span
                    >
                    <span
                      class="text-primary-blue font-bold text-sm sm:text-base"
                      >94%</span
                    >
                  </div>
                  <div class="w-full bg-silver-gray rounded-full h-2 sm:h-3">
                    <div
                      class="progress-bar bg-primary-blue h-2 sm:h-3 rounded-full"
                      data-width="94%"
                      style="width: 0%"
                    ></div>
                  </div>
                </div>

                <!-- Skill Item 4 -->
                <div class="skill-item">
                  <div class="flex justify-between items-center mb-2">
                    <span
                      class="font-semibold text-dark-navy text-sm sm:text-base"
                      >Freedom of Choice</span
                    >
                    <span
                      class="text-primary-blue font-bold text-sm sm:text-base"
                      >98%</span
                    >
                  </div>
                  <div class="w-full bg-silver-gray rounded-full h-2 sm:h-3">
                    <div
                      class="progress-bar bg-primary-blue h-2 sm:h-3 rounded-full"
                      data-width="98%"
                      style="width: 0%"
                    ></div>
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
import { onMounted } from "vue";

// Animate progress bars when section comes into view
onMounted(() => {
  const progressBars = document.querySelectorAll(".progress-bar");

  const animateBars = () => {
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(entry.target);
      }
    });
  });

  const skillsSection = document.querySelector(".skills-section");
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});
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

.about-section {
  background-color: var(--color-pure-white);
}

.skills-section {
  background-color: var(--color-cool-light);
}

.skill-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease-out;
}

/* Progress bar animation */
.progress-bar {
  transition: width 1.8s ease-in-out;
}

/* Other existing styles remain unchanged */
@media (max-width: 640px) {
  .breadcrumb-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .about-section,
  .skills-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .skill-item {
    margin-bottom: 1.5rem;
  }
}
</style>
