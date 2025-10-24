<template>
  <div class="min-h-screen bg-cool-light flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl font-display font-bold text-primary-blue mb-4">404</div>
      <h1 class="text-3xl font-bold text-dark-navy mb-4">Page Not Found</h1>
      <p class="text-highlight-text mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="space-x-4">
        <router-link to="/" class="btn-primary">
          Go Home
        </router-link>
        <button @click="$router.back()" class="btn-secondary">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>