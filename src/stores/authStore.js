import { defineStore } from "pinia";
import { authAPI, adminAuthAPI, userAPI } from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    loading: false,
    error: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || "user",
    isLoggedIn: (state) => state.isAuthenticated,
    hasAdminAccess: (state) => state.isAdmin,
  },

  actions: {
    // ------------------- Initialize Auth from LocalStorage -------------------
    initializeAuth() {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
        this.isAdmin = this.user.role === "admin";
      }
    },

    // ------------------- User Registration -------------------
    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await authAPI.register(userData);

        // Backend returns user object but no token in response
        // User needs to login separately after registration
        return {
          success: true,
          message: "Registration successful. Please login.",
          user: data.user,
        };
      } catch (error) {
        this.error = error.response?.data?.message || "Registration failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- User Login -------------------
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await authAPI.login(credentials);

        // Store auth data
        this.token = data.token;
        this.user = data.user;
        this.isAuthenticated = true;
        this.isAdmin = data.user.role === "admin";

        // Persist to localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return { success: true, user: data.user };
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Admin Registration -------------------
    async adminRegister(adminData) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await adminAuthAPI.register(adminData);

        // Admin registration returns user but no token
        return {
          success: true,
          message: "Admin registered successfully",
          user: data.admin,
        };
      } catch (error) {
        this.error =
          error.response?.data?.message || "Admin registration failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Admin Login -------------------
    // In authStore.js - Fix admin login
    async adminLogin(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await adminAuthAPI.login(credentials);

        // ✅ CORRECT: Backend returns { data: { user, token } }
        this.token = data.data.token;
        this.user = data.data.user;
        this.isAuthenticated = true;
        this.isAdmin = true;

        localStorage.setItem("authToken", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        return { success: true, user: data.data.user };
      } catch (error) {
        this.error = error.response?.data?.message || "Admin login failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Logout -------------------
    async logout() {
      this.loading = true;

      try {
        await authAPI.logout();
      } catch (error) {
        console.error("Logout API call failed:", error);
      } finally {
        // Clear state regardless of API success
        this.clearAuth();
        this.loading = false;
      }
    },

    // ------------------- Forgot Password -------------------
    async forgotPassword(phone) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await authAPI.forgotPassword({ phone });

        return {
          success: true,
          message: data.message,
          token: data.token, // Reset token (for dev/SMS)
          expiresIn: data.expiresIn,
        };
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to send reset token";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Reset Password -------------------
    async resetPassword(token, password) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await authAPI.resetPassword({ token, password });

        return {
          success: true,
          message: data.message,
        };
      } catch (error) {
        this.error = error.response?.data?.message || "Password reset failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Fetch Current User Profile -------------------
    async fetchUserProfile() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await userAPI.getProfile();
        console.log("Fetched user profile:", data);
        // ✅ Fix: Extract the actual user object
        this.user = data.user;

        this.isAdmin = data.user?.role === "admin";

        console.log("Fetched user profile:", data.user);

        // ✅ Store the actual user, not the wrapper
        localStorage.setItem("user", JSON.stringify(data.user));

        return { success: true, user: data.user };
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch profile";
        if (error.response?.status === 401) this.clearAuth();
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Update User Profile -------------------
    async updateProfile(userData) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await userAPI.updateProfile(userData);

        // Update local user data
        this.user = data.user;
        localStorage.setItem("user", JSON.stringify(data.user));

        return { success: true, user: data.user };
      } catch (error) {
        this.error = error.response?.data?.message || "Profile update failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Change Password -------------------
    async changePassword(currentPassword, newPassword) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await userAPI.updatePassword({
          currentPassword,
          newPassword,
        });

        return { success: true, message: data.message };
      } catch (error) {
        this.error = error.response?.data?.message || "Password change failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ------------------- Delete Account -------------------
    async deleteAccount() {
      this.loading = true;
      this.error = null;

      try {
        await userAPI.deleteAccount();
        this.clearAuth();

        return { success: true, message: "Account deleted successfully" };
      } catch (error) {
        this.error = error.response?.data?.message || "Account deletion failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // in authStore.js
    async refreshProfile() {
      const res = await userAPI.getProfile();
      this.user = res.data.user || res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    // ------------------- Clear Auth State -------------------
    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.error = null;

      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },

    // ------------------- Set Error -------------------
    setError(message) {
      this.error = message;
    },

    // ------------------- Clear Error -------------------
    clearError() {
      this.error = null;
    },
  },
});
