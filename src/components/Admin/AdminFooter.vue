<template>
  <footer class="bg-white border-t border-gray-200">
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Left Section -->
        <div class="flex items-center space-x-6 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <span>Server Status:</span>
            <span class="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Online</span>
          </div>
        </div>

        <!-- Center Section -->
        <div class="text-sm text-gray-600">
          <span>{{ currentYear }} © Investment Platform. All rights reserved.</span>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <button 
            @click="refreshData"
            :disabled="refreshing"
            class="flex items-center space-x-1 hover:text-blue-600 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon class="h-4 w-4" />
            <span class="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const refreshing = ref(false)

const currentYear = new Date().getFullYear()

// Refresh all data
const refreshData = async () => {
  if (refreshing.value) return
  
  refreshing.value = true
  try {
    // Emit event to parent to refresh main content
    emit('refresh-data')
    
    // Simulate refresh delay
    setTimeout(() => {
      refreshing.value = false
    }, 1000)
  } catch (error) {
    console.error('Error refreshing data:', error)
    refreshing.value = false
  }
}

const emit = defineEmits(['refresh-data'])
</script>