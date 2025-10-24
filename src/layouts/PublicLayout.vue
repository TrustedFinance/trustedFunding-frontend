<template>
  <div>
    <Navbar />
    <main>
    <router-view :key="$route.fullPath" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Public/Navbar.vue';
import Footer from '@/components/Public/Footer.vue';
</script>