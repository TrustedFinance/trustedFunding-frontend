<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Investment Plans</h1>
        <p class="text-gray-600">Create and manage investment plans</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <PlusIcon class="h-4 w-4" />
        <span>Create Plan</span>
      </button>
    </div>

    <!-- Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plan in plans"
        :key="plan._id"
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ plan.name }}</h3>
          <span 
            :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ plan.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
        
        <div class="space-y-3 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Investment Range:</span>
            <span class="font-medium text-gray-900">
              ${{ plan.minAmount }} - ${{ plan.maxAmount }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Multiplier:</span>
            <span class="font-medium text-gray-900">{{ plan.multiplier }}x</span>
          </div>
          <div class="flex justify-between">
            <span>Duration:</span>
            <span class="font-medium text-gray-900">{{ plan.durationDays }} days</span>
          </div>
          <div class="flex justify-between">
            <span>Expected Return:</span>
            <span class="font-medium text-green-600">
              ${{ (plan.minAmount * plan.multiplier).toLocaleString() }}
            </span>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-500">{{ plan.description }}</p>

        <div class="mt-6 flex space-x-2">
          <button
            @click="editPlan(plan)"
            class="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200"
          >
            <PencilIcon class="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            @click="confirmDeletePlan(plan)"
            class="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
          >
            <TrashIcon class="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
      <p class="mt-2 text-gray-500">Loading plans...</p>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && plans.length === 0" class="text-center py-8">
      <CubeIcon class="h-12 w-12 mx-auto text-gray-400" />
      <p class="mt-2 text-gray-500">No investment plans created yet</p>
      <button
        @click="showCreateModal = true"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create First Plan
      </button>
    </div>

    <!-- Create/Edit Plan Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ showEditModal ? 'Edit Plan' : 'Create New Plan' }}
        </h3>
        
        <form @submit.prevent="submitPlan">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
              <input
                v-model="planForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Basic Plan"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Min Amount ($)</label>
                <input
                  v-model.number="planForm.minAmount"
                  type="number"
                  required
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Max Amount ($)</label>
                <input
                  v-model.number="planForm.maxAmount"
                  type="number"
                  required
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Multiplier</label>
                <input
                  v-model.number="planForm.multiplier"
                  type="number"
                  step="0.1"
                  required
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                <input
                  v-model.number="planForm.durationDays"
                  type="number"
                  required
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="planForm.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe this investment plan..."
              ></textarea>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end space-x-3">
            <button 
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {{ submitting ? 'Saving...' : (showEditModal ? 'Update Plan' : 'Create Plan') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex items-center space-x-3 mb-4">
          <div class="p-2 bg-red-100 rounded-full">
            <ExclamationIcon class="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Delete Plan</h3>
            <p class="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>
        
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete the plan <strong>{{ planToDelete?.name }}</strong>? 
          Existing investments using this plan will not be affected.
        </p>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="deletePlan"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
          >
            {{ deleting ? 'Deleting...' : 'Delete Plan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { adminAPI } from '@/services/api'
  

const loading = ref(false)
const submitting = ref(false)
const deleting = ref(false)
const plans = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const planToDelete = ref(null)

const planForm = reactive({
  name: '',
  minAmount: 0,
  maxAmount: 0,
  multiplier: 1,
  durationDays: 30,
  description: ''
})

const fetchPlans = async () => {
  try {
    loading.value = true
    const response = await adminAPI.getAllPlans()
    plans.value = response.data || []
  } catch (error) {
    console.error('Error fetching plans:', error)
  } finally {
    loading.value = false
  }
}

const editPlan = (plan) => {
  Object.assign(planForm, plan)
  showEditModal.value = true
}

const submitPlan = async () => {
  try {
    submitting.value = true
    
    if (showEditModal.value) {
      await adminAPI.editPlan(planForm._id, planForm)
    } else {
      await adminAPI.createPlan(planForm)
    }
    
    closeModal()
    await fetchPlans()
  } catch (error) {
    console.error('Error saving plan:', error)
  } finally {
    submitting.value = false
  }
}

const confirmDeletePlan = (plan) => {
  planToDelete.value = plan
  showDeleteModal.value = true
}

const deletePlan = async () => {
  try {
    deleting.value = true
    await adminAPI.deletePlan(planToDelete.value._id)
    plans.value = plans.value.filter(p => p._id !== planToDelete.value._id)
    showDeleteModal.value = false
    planToDelete.value = null
  } catch (error) {
    console.error('Error deleting plan:', error)
  } finally {
    deleting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  Object.assign(planForm, {
    name: '',
    minAmount: 0,
    maxAmount: 0,
    multiplier: 1,
    durationDays: 30,
    description: ''
  })
}

onMounted(() => {
  fetchPlans()
})
</script>