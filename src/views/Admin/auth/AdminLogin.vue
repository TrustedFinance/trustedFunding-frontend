<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
          <LockClosedIcon class="h-6 w-6 text-white" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Sign In
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Access the administration panel
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="login" class="block text-sm font-medium text-gray-300">
              Email or Phone
            </label>
            <input
              id="login"
              v-model="form.login"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter email or phone"
            >
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter password"
            >
          </div>

          <div v-if="showMasterPassword">
            <label for="masterPassword" class="block text-sm font-medium text-gray-300">
              Master Password
            </label>
            <input
              id="masterPassword"
              v-model="form.masterPassword"
              type="password"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter master password"
            >
            <p class="mt-1 text-xs text-gray-400">
              Master password bypass for emergency access
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="useMasterPassword"
              v-model="showMasterPassword"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 bg-gray-800 rounded"
            >
            <label for="useMasterPassword" class="ml-2 block text-sm text-gray-300">
              Use Master Password
            </label>
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
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
            </span>
            {{ loading ? 'Signing in...' : 'Sign in as Admin' }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-sm text-gray-400 hover:text-white">
            User? Sign in here
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
// import { LockClosedIcon, ExclamationIcon } from '@heroicons/vue/solid'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const showMasterPassword = ref(false)

const form = reactive({
  login: '',
  password: '',
  masterPassword: ''
})

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    const credentials = {
      password: form.password,
      masterPassword: showMasterPassword.value ? form.masterPassword : undefined
    }

    // Determine if login is email or phone
    if (form.login.includes('@')) {
      credentials.email = form.login
    } else {
      credentials.phone = form.login
    }

    const result = await authStore.adminLogin(credentials)

    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Admin login error:', err)
  } finally {
    loading.value = false
  }
}
</script>