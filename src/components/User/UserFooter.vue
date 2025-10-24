<template>
  <footer class="bg-[--background] border-t border-[--border] py-4 text-center">
    <p class="text-[--text-secondary] text-sm">
      &copy; {{ currentYear }} Trusted Finance. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
// Get the current year directly. It's not reactive, but sufficient for a copyright display.
const currentYear = new Date().getFullYear();
</script>