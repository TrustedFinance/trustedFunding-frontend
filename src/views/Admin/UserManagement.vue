<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
        <p class="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <MagnifyingGlassIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        />
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in filteredUsers"
              :key="user._id"
              class="hover:bg-gray-50"
            >
              <!-- User Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <UserIcon class="h-6 w-6 text-white" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name || "Unknown User" }}
                    </div>
                    <div class="text-sm text-gray-500">ID: {{ user._id }}</div>
                  </div>
                </div>
              </td>

              <!-- Contact -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
                <div class="text-sm text-gray-500">{{ user.phone }}</div>
              </td>

              <!-- Balance -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  ${{ user.balance?.toLocaleString() || "0.00" }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    user.isBlocked
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800',
                  ]"
                >
                  {{ user.isBlocked ? "Blocked" : "Active" }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="toggleBlockUser(user)"
                    :disabled="toggling"
                    :class="[
                      'px-3 py-1 rounded text-xs font-medium',
                      user.isBlocked
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200',
                    ]"
                  >
                    {{ user.isBlocked ? "Unblock" : "Block" }}
                  </button>

                  <button
                    @click="confirmDeleteUser(user)"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-8">
        <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">Loading users...</p>
      </div>

      <!-- Empty -->
      <div v-if="!loading && users.length === 0" class="text-center py-8">
        <UsersIcon class="h-12 w-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-500">No users found</p>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex items-center space-x-3 mb-4">
          <div class="p-2 bg-red-100 rounded-full">
            <ExclamationIcon class="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Delete User</h3>
            <p class="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>

        <p class="text-gray-600 mb-6">
          Are you sure you want to delete user
          <strong>{{ userToDelete?.name }}</strong>? All their data including
          investments and transactions will be permanently removed.
        </p>

        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
          >
            {{ deleting ? "Deleting..." : "Delete User" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { adminAPI } from "@/services/api";

const loading = ref(false);
const deleting = ref(false);
const toggling = ref(false);
const users = ref([]);
const searchQuery = ref("");
const showDeleteModal = ref(false);
const userToDelete = ref(null);

// Computed: filter by search
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const q = searchQuery.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q)
  );
});

// Fetch all users
const fetchUsers = async () => {
  try {
    loading.value = true;
    const { data } = await adminAPI.getAllUsers();
    users.value = data || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    users.value = [];
  } finally {
    loading.value = false;
  }
};

// Block/unblock user
const toggleBlockUser = async (user) => {
  try {
    toggling.value = true;
    if (user.isBlocked) {
      await adminAPI.unblockUser(user._id);
      user.isBlocked = false;
    } else {
      await adminAPI.blockUser(user._id);
      user.isBlocked = true;
    }
  } catch (err) {
    console.error("Error toggling user:", err);
  } finally {
    toggling.value = false;
  }
};

// Confirm delete
const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

// Delete user
const deleteUser = async () => {
  try {
    deleting.value = true;
    await adminAPI.deleteUser(userToDelete.value._id);
    users.value = users.value.filter((u) => u._id !== userToDelete.value._id);
    showDeleteModal.value = false;
  } catch (err) {
    console.error("Error deleting user:", err);
  } finally {
    deleting.value = false;
  }
};

// On mount
onMounted(fetchUsers);
</script>
