<template>
  <div class="contact-page">
    <!-- Breadcrumb Section -->
    <section class="breadcrumb-section bg-fixed text-center text-pure-white py-16 lg:py-24 relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary-blue/90 to-dark-navy/90 z-0"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 text-pure-white">
              Contact Us
            </h1>
            <nav class="breadcrumb-nav flex justify-center items-center flex-wrap">
              <ol class="flex items-center space-x-2 text-sm sm:text-base">
                <li class="flex items-center">
                  <router-link 
                    to="/" 
                    class="flex items-center text-silver-gray hover:text-pure-white transition-colors duration-200"
                  >
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    Home
                  </router-link>
                </li>
                <li class="flex items-center">
                  <span class="mx-2 text-silver-gray">/</span>
                  <span class="text-pure-white font-medium">Contact</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Info Section -->
    <section class="contact-info-section py-16 lg:py-24 bg-cool-light relative">
      <!-- Background Map Pattern -->
      <div class="absolute inset-0 opacity-5 bg-map-pattern z-0"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <!-- Office Location -->
          <div class="contact-card group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue">
            <div class="flex flex-col items-center text-center">
              <div class="contact-icon w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-pure-white text-xl mb-4 group-hover:bg-dark-navy transition-colors duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-dark-navy mb-3">
                Office Location
              </h3>
              <p class="text-highlight-text leading-relaxed text-sm lg:text-base">
                4622 Cedar Avenue<br>
                Wilmington, NC 28403<br>
                United States
              </p>
            </div>
          </div>

          <!-- Email Address -->
          <div class="contact-card group bg-pure-white rounded-2xl  transition-all duration-300 p-6 lg:p-8 border border-silver-gray hover:border-primary-blue">
            <div class="flex flex-col items-center text-center">
              <div class="contact-icon w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-pure-white text-xl mb-4 group-hover:bg-dark-navy transition-colors duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-dark-navy mb-3">
                Email Address
              </h3>
              <div class="space-y-1">
                <a 
                  href="mailto:support@metamasklog.live" 
                  class="block text-primary-blue hover:text-dark-navy transition-colors duration-200 text-sm lg:text-base"
                >
                  support@metamasklog.live
                </a>
                <a 
                  href="mailto:support@metamasklog.live" 
                  class="block text-primary-blue hover:text-dark-navy transition-colors duration-200 text-sm lg:text-base"
                >
                  support@metamasklog.live
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Contact Options (Optional) -->
        <div class="mt-12 lg:mt-16 text-center">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl lg:text-3xl font-display font-bold text-dark-navy mb-4">
              Get in Touch
            </h2>
            <p class="text-highlight-text mb-6 text-sm lg:text-base">
              Have questions? We're here to help. Reach out to us through any of the contact methods above.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@metamasklog.live" 
                class="btn-primary inline-flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Send Email
              </a>
              <button 
                @click="copyEmail"
                class="btn-secondary inline-flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                </svg>
                Copy Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/toast';

const toast = useToast();

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('support@metamasklog.live');
    toast.success('Email address copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy email address');
  }
};
</script>

<style scoped>
.breadcrumb-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-dark-navy));
}

.contact-info-section {
  background-color: var(--color-cool-light);
  position: relative;
}

.bg-map-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230a66c2' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.contact-card {
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-icon {
  transition: all 0.3s ease;
}

/* Mobile-first responsive design */
@media (max-width: 640px) {
  .breadcrumb-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .contact-info-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .contact-card {
    padding: 1.5rem;
    min-height: 180px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Tablet styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .breadcrumb-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  
  .contact-info-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .contact-card {
    min-height: 220px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .breadcrumb-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  
  .contact-info-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .contact-card {
    min-height: 240px;
  }
}

/* Ensure proper spacing on mobile */
@media (max-width: 768px) {
  .grid > * + * {
    margin-top: 1.5rem;
  }
}

/* Improve touch targets for mobile */
@media (max-width: 640px) {
  a, button {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}

/* Link hover effects */
a {
  transition: color 0.3s ease;
}



/* Button hover effects */
.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
}

/* Smooth transitions */
.breadcrumb-section,
.contact-info-section,
.contact-card {
  transition: all 0.3s ease-in-out;
}

/* Focus styles for accessibility */
button:focus,
a:focus {
  outline: 2px solid var(--color-primary-blue);
  outline-offset: 2px;
}
</style>