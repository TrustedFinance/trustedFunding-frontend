<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
          <UserAddIcon class="h-6 w-6 text-white" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Registration
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Create a new administrator account
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter admin name"
            >
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter admin email"
            >
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300">Phone Number</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter phone number"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Create password"
            >
          </div>

          <div>
            <label for="masterPassword" class="block text-sm font-medium text-gray-300">
              Master Password
            </label>
            <input
              id="masterPassword"
              v-model="form.masterPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter master password"
            >
            <p class="mt-1 text-xs text-gray-400">
              Required for admin registration
            </p>
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-red-900/50 p-4 border border-red-700">
          <div class="flex">
            <div class="flex-shrink-0">
              <ExclamationIcon class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-200">
                {{ error }}
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
            {{ loading ? 'Creating admin account...' : 'Create Admin Account' }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/admin/login" class="text-sm text-gray-400 hover:text-white">
            Already have an admin account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
// import { UserAddIcon, ExclamationIcon } from '@heroicons/vue/solid'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  masterPassword: ''
})

const handleRegister = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    const result = await authStore.adminRegister(form)

    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Admin registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>