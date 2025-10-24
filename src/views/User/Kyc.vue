<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlight-text">KYC Verification</h1>
      <p class="text-gray-600 mt-1">
        Verify your identity to unlock full account features
      </p>
    </div>

    <!-- KYC Status -->
    <div class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-highlight-text">
            Verification Status
          </h2>
          <p class="text-gray-600 mt-1" v-if="kycStatus === 'pending'">
            Your KYC submission is under review
          </p>
          <p class="text-gray-600 mt-1" v-else-if="kycStatus === 'approved'">
            Your identity has been verified successfully
          </p>
          <p class="text-gray-600 mt-1" v-else-if="kycStatus === 'rejected'">
            Your KYC submission was rejected. Please review the notes and
            resubmit.
          </p>
          <p class="text-gray-600 mt-1" v-else>
            Complete the form below to verify your identity
          </p>
        </div>
        <div>
          <span
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              kycStatus === 'approved'
                ? 'bg-green-100 text-green-800'
                : kycStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : kycStatus === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{
              kycStatus
                ? kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)
                : "Not Submitted"
            }}
          </span>
        </div>
      </div>

      <!-- Admin Notes (if rejected) -->
      <div
        v-if="kycStatus === 'rejected' && kycData.adminNote"
        class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <h4 class="font-medium text-red-800 mb-2">Admin Note:</h4>
        <p class="text-red-700 text-sm">{{ kycData.adminNote }}</p>
      </div>
    </div>

    <!-- KYC Form -->
    <div
      v-if="!kycStatus || kycStatus === 'rejected'"
      class="bg-white rounded-lg p-6 shadow-sm border border-silver-gray"
    >
      <h2 class="text-lg font-semibold text-highlight-text mb-4">
        Identity Verification
      </h2>

      <form @submit.prevent="submitKyc" class="space-y-6">
        <!-- Personal Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="idType" class="form-label">ID Type</label>
            <select
              id="idType"
              v-model="kycForm.idType"
              required
              class="form-input"
            >
              <option value="">Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="drivers_license">Driver's License</option>
              <option value="national_id">National ID</option>
            </select>
          </div>
          <div>
            <label for="idNumber" class="form-label">ID Number</label>
            <input
              id="idNumber"
              v-model="kycForm.idNumber"
              type="text"
              required
              class="form-input"
              placeholder="Enter your ID number"
            />
          </div>
        </div>

        <div>
          <label for="address" class="form-label">Residential Address</label>
          <textarea
            id="address"
            v-model="kycForm.address"
            rows="3"
            required
            class="form-input"
            placeholder="Enter your complete residential address"
          ></textarea>
        </div>

        <!-- File Uploads -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Selfie Upload -->
          <div>
            <label class="form-label">Selfie Photo</label>
            <div
              @click="triggerSelfieUpload"
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-blue transition-colors duration-200"
              :class="{ 'border-primary-blue bg-blue-50': kycForm.selfie }"
            >
              <input
                ref="selfieInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleSelfieUpload"
              />
              <font-awesome-icon
                :icon="['fas', kycForm.selfie ? 'check-circle' : 'camera']"
                :class="kycForm.selfie ? 'text-green-600' : 'text-gray-400'"
                class="h-12 w-12 mx-auto mb-3"
              />
              <p class="text-sm text-gray-600">
                {{
                  kycForm.selfie
                    ? "Selfie uploaded"
                    : "Upload a clear selfie photo"
                }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Your face should be clearly visible
              </p>
            </div>
          </div>

          <!-- ID Document Upload -->
          <div>
            <label class="form-label">ID Document</label>
            <div
              @click="triggerIdUpload"
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-blue transition-colors duration-200"
              :class="{ 'border-primary-blue bg-blue-50': kycForm.idImage }"
            >
              <input
                ref="idInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleIdUpload"
              />
              <font-awesome-icon
                :icon="['fas', kycForm.idImage ? 'check-circle' : 'id-card']"
                :class="kycForm.idImage ? 'text-green-600' : 'text-gray-400'"
                class="h-12 w-12 mx-auto mb-3"
              />
              <p class="text-sm text-gray-600">
                {{
                  kycForm.idImage
                    ? "ID document uploaded"
                    : "Upload your ID document"
                }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Clear photo of your selected ID type
              </p>
            </div>
          </div>
        </div>

        <!-- Preview Images -->
        <div
          v-if="kycForm.selfie || kycForm.idImage"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div v-if="kycForm.selfie" class="text-center">
            <p class="text-sm text-gray-600 mb-2">Selfie Preview</p>
            <img
              :src="kycForm.selfiePreview"
              class="max-h-48 mx-auto rounded-lg border"
            />
            <button
              type="button"
              @click="removeSelfie"
              class="text-red-600 text-sm mt-2 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div v-if="kycForm.idImage" class="text-center">
            <p class="text-sm text-gray-600 mb-2">ID Document Preview</p>
            <img
              :src="kycForm.idImagePreview"
              class="max-h-48 mx-auto rounded-lg border"
            />
            <button
              type="button"
              @click="removeIdImage"
              class="text-red-600 text-sm mt-2 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>

        <!-- Terms and Submit -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start">
            <font-awesome-icon
              :icon="['fas', 'info-circle']"
              class="h-5 w-5 text-blue-600 mr-3 mt-0.5"
            />
            <div>
              <p class="text-sm text-blue-800">
                Your documents will be securely stored and used solely for
                identity verification purposes. The verification process may
                take up to 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <div class="loading-spinner mr-2"></div>
            Submitting...
          </span>
          <span v-else>Submit for Verification</span>
        </button>
      </form>
    </div>

    <!-- Already Verified Message -->
    <div
      v-if="kycStatus === 'approved'"
      class="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
    >
      <font-awesome-icon
        :icon="['fas', 'check-circle']"
        class="h-16 w-16 text-green-600 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold text-green-800 mb-2">
        Identity Verified!
      </h3>
      <p class="text-green-700">
        Your identity has been successfully verified. You now have full access
        to all platform features.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { userAPI } from "@/services/api";
import { useToast } from "@/composables/toast";

const authStore = useAuthStore();
const toast = useToast();

const kycForm = reactive({
  idType: "",
  idNumber: "",
  address: "",
  selfie: null,
  idImage: null,
  selfiePreview: "",
  idImagePreview: "",
});
const loading = ref(false);
const kycData = ref(null);
const selfieInput = ref(null);
const idInput = ref(null);

// Computed properties
const kycStatus = computed(() => {
  return kycData.value?.status || authStore.user?.kyc?.status;
});

const isFormValid = computed(() => {
  return (
    kycForm.idType &&
    kycForm.idNumber &&
    kycForm.address &&
    kycForm.selfie &&
    kycForm.idImage
  );
});

// Methods
const triggerSelfieUpload = () => {
  selfieInput.value?.click();
};

const triggerIdUpload = () => {
  idInput.value?.click();
};

const handleSelfieUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Selfie image must be less than 5MB");
      return;
    }
    kycForm.selfie = file;
    kycForm.selfiePreview = URL.createObjectURL(file);
  }
};

const handleIdUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("ID image must be less than 5MB");
      return;
    }
    kycForm.idImage = file;
    kycForm.idImagePreview = URL.createObjectURL(file);
  }
};

const removeSelfie = () => {
  kycForm.selfie = null;
  kycForm.selfiePreview = "";
  if (selfieInput.value) {
    selfieInput.value.value = "";
  }
};

const removeIdImage = () => {
  kycForm.idImage = null;
  kycForm.idImagePreview = "";
  if (idInput.value) {
    idInput.value.value = "";
  }
};

const submitKyc = async () => {
  try {
    loading.value = true;

    // Backend expects FormData with: idType, idNumber, address, selfie, idImage
    const formData = new FormData();
    formData.append("idType", kycForm.idType);
    formData.append("idNumber", kycForm.idNumber);
    formData.append("address", kycForm.address);
    formData.append("selfie", kycForm.selfie);
    formData.append("idImage", kycForm.idImage);

    await userAPI.uploadKyc(formData);
    toast.success("KYC submitted successfully! Under review.");

    // Reset form
    Object.assign(kycForm, {
      idType: "",
      idNumber: "",
      address: "",
      selfie: null,
      idImage: null,
      selfiePreview: "",
      idImagePreview: "",
    });

    // Refresh user data
    await authStore.refreshProfile();
    await loadKycData();
  } catch (error) {
    toast.error(error.response?.data?.message || "KYC submission failed");
  } finally {
    loading.value = false;
  }
};

const loadKycData = async () => {
  try {
    // KYC data is included in user profile
    const user = authStore.user;
    if (user?.kyc) {
      kycData.value = user.kyc;
    }
  } catch (error) {
    console.error("Failed to load KYC data:", error);
  }
};

onMounted(() => {
  loadKycData();
});
</script>
