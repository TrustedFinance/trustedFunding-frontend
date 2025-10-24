<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Set new password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your reset token and new password
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleResetPassword">
          <div>
            <label for="token" class="block text-sm font-medium text-gray-700"
              >Reset Token</label
            >
            <div class="mt-1">
              <input
                id="token"
                v-model="form.token"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter the reset token you received"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >New Password</label
            >
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div
            v-if="success"
            class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded"
          >
            {{ successMessage }}
          </div>

          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded"
          >
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span v-if="loading">Resetting password...</span>
              <span v-else>Reset Password</span>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const error = ref("");
const success = ref(false);
const successMessage = ref("");

const form = ref({
  token: "",
  password: "",
});

const handleResetPassword = async () => {
  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    await authStore.resetPassword(form.value.token, form.value.password);
    success.value = true;
    successMessage.value =
      "Password reset successful! You can now log in with your new password.";

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    error.value = err.response?.data?.message || "Password reset failed";
  } finally {
    loading.value = false;
  }
};
</script>
