<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your phone number to receive a reset token
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword" v-if="!showResetForm">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your phone number"
          >
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <ExclamationIcon class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>

        <div v-if="success" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Reset token sent successfully! Check your messages.
              </h3>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Sending token...' : 'Send Reset Token' }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </router-link>
        </div>
      </form>

      <!-- Reset Password Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword" v-else>
        <div class="space-y-4">
          <div>
            <label for="token" class="block text-sm font-medium text-gray-700">Reset Token</label>
            <input
              id="token"
              v-model="resetForm.token"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the reset token"
            >
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              id="newPassword"
              v-model="resetForm.newPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter new password"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="resetForm.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm new password"
            >
          </div>
        </div>

        <div v-if="resetError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <ExclamationIcon class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ resetError }}
              </h3>
            </div>
          </div>
        </div>

        <div v-if="resetSuccess" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Password reset successfully! Redirecting to login...
              </h3>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="resetLoading || !passwordsMatch"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ resetLoading ? 'Resetting password...' : 'Reset Password' }}
          </button>
        </div>

        <div class="text-center">
          <button
            type="button"
            @click="showResetForm = false"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to token request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
// import { ExclamationIcon, CheckCircleIcon } from '@heroicons/vue/solid'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const resetLoading = ref(false)
const error = ref('')
const resetError = ref('')
const success = ref(false)
const resetSuccess = ref(false)
const showResetForm = ref(false)

const form = reactive({
  phone: ''
})

const resetForm = reactive({
  token: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordsMatch = computed(() => 
  resetForm.newPassword && resetForm.confirmPassword && 
  resetForm.newPassword === resetForm.confirmPassword
)

const handleForgotPassword = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''
  success.value = false

  try {
    const result = await authStore.forgotPassword(form.phone)

    if (result.success) {
      success.value = true
      showResetForm.value = true
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Forgot password error:', err)
  } finally {
    loading.value = false
  }
}

const handleResetPassword = async () => {
  if (resetLoading.value) return

  if (!passwordsMatch.value) {
    resetError.value = 'Passwords do not match'
    return
  }

  resetLoading.value = true
  resetError.value = ''

  try {
    const result = await authStore.resetPassword({
      token: resetForm.token,
      newPassword: resetForm.newPassword,
      phone: form.phone
    })

    if (result.success) {
      resetSuccess.value = true
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      resetError.value = result.error
    }
  } catch (err) {
    resetError.value = 'An unexpected error occurred'
    console.error('Reset password error:', err)
  } finally {
    resetLoading.value = false
  }
}
</script>