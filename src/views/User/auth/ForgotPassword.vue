<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Reset your password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your phone number to receive a reset token
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleForgotPassword">
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your registered phone number"
              >
            </div>
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            <p class="font-medium">Reset token generated successfully!</p>
            <p class="text-sm mt-1">Token: <code class="bg-green-100 px-2 py-1 rounded">{{ resetToken }}</code></p>
            <p class="text-sm mt-1">Expires in: {{ expiresIn }}</p>
            <p class="text-sm mt-2">
              <router-link
                to="/reset-password"
                class="font-medium underline hover:text-green-700"
              >
                Click here to reset your password
              </router-link>
            </p>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span v-if="loading">Sending token...</span>
              <span v-else>Send Reset Token</span>
            </button>
          </div>

          <div class="text-center">
            <router-link
              to="/login"
              class="text-blue-600 hover:text-blue-500 text-sm"
            >
              Back to login
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref(false)
const phone = ref('')
const resetToken = ref('')
const expiresIn = ref('')

const handleForgotPassword = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const result = await authStore.forgotPassword(phone.value)
    resetToken.value = result.token
    expiresIn.value = result.expiresIn
    success.value = true
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to send reset token'
  } finally {
    loading.value = false
  }
}
</script>