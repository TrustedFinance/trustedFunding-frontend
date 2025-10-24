// stores/authStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authAPI, adminAuthAPI } from "@/services/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("authToken"));
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  // Initialize from localStorage
  const initAuth = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  };

  // ===== User Authentication =====
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token: authToken, user: userData } = response.data;

      token.value = authToken;
      user.value = userData;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      // ✅ Fixed destructuring
      const { token: authToken, user: newUser } = response.data;

      token.value = authToken;
      user.value = newUser;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // ===== Admin Authentication =====
  const adminLogin = async (credentials) => {
    try {
      const response = await adminAuthAPI.login(credentials);
      const { token: authToken, admin: adminData } = response.data;

      token.value = authToken;
      user.value = adminData;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(adminData));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Admin login failed",
      };
    }
  };

  const adminRegister = async (adminData) => {
    try {
      const response = await adminAuthAPI.register(adminData);
      const { token: authToken, user: adminUser } = response.data;

      token.value = authToken;
      user.value = adminUser;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(adminUser));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Admin registration failed",
      };
    }
  };

  // ===== Password Recovery =====
  const forgotPassword = async (phone) => {
    try {
      const response = await authAPI.forgotPassword({ phone });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Password reset failed",
      };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await authAPI.resetPassword(resetData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Password reset failed",
      };
    }
  };

  // ===== Logout =====
  const logout = async () => {
    try {
      if (isAdmin.value) {
        await adminAuthAPI.logout();
      } else {
        await authAPI.logout();
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  };

  // ===== Update user data =====
  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData };
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  // Initialize on store creation
  initAuth();

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isAdmin,
    login,
    register,
    adminLogin,
    adminRegister,
    forgotPassword,
    resetPassword,
    logout,
    updateUser,
  };
});
