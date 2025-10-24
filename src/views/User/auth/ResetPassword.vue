<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Set new password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your new password below
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="space-y-4">
          <div>
            <label for="token" class="block text-sm font-medium text-gray-700">Reset Token</label>
            <input
              id="token"
              v-model="form.token"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter reset token from SMS"
            >
          </div>

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

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              id="newPassword"
              v-model="form.newPassword"
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
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm new password"
            >
          </div>
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
                Password reset successfully! Redirecting to login...
              </h3>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading || !passwordsMatch"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Resetting password...' : 'Reset Password' }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/vue/solid'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref(false)

const form = reactive({
  token: route.query.token || '',
  phone: route.query.phone || '',
  newPassword: '',
  confirmPassword: ''
})

const passwordsMatch = computed(() => 
  form.newPassword && form.confirmPassword && 
  form.newPassword === form.confirmPassword
)

onMounted(() => {
  // Pre-fill form with URL parameters if available
  if (route.query.token) form.token = route.query.token
  if (route.query.phone) form.phone = route.query.phone
})

const handleResetPassword = async () => {
  if (loading.value) return

  if (!passwordsMatch.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await authStore.resetPassword({
      token: form.token,
      newPassword: form.newPassword,
      phone: form.phone
    })

    if (result.success) {
      success.value = true
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Reset password error:', err)
  } finally {
    loading.value = false
  }
}
</script>