// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ------------------- AXIOS INTERCEPTORS -------------------

// ✅ Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired / invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ------------------- API MODULES -------------------

// ✅ Auth API
export const authAPI = {
  register: (userData) => api.post("/api/auth/register", userData),
  login: (credentials) => api.post("/api/auth/login", credentials),
  logout: () => api.post("/api/auth/logout"),
  forgotPassword: (data) => api.post("/api/auth/forgot-password", data),
  resetPassword: (data) => api.post("/api/auth/reset-password", data),
};

// ✅ Admin Auth API
export const adminAuthAPI = {
  register: (adminData) => api.post("/api/admin/register", adminData),
  login: (credentials) => api.post("/api/admin/login", credentials),
  logout: () => api.post("/api/admin/logout"),
};

// ✅ User API
export const userAPI = {
  getProfile: () => api.get("/api/users/me"),
  updateProfile: (userData) => api.patch("/api/users/update", userData),
  updatePassword: (userData) =>
    api.patch("/api/users/change-password", userData),
  uploadKyc: (kycData) => {
    const formData = new FormData();
    Object.entries(kycData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return api.post("/api/users/kyc", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  selectCountryCurrency: (data) =>
    api.post("/api/users/select-country-currency", data),
  deleteAccount: () => api.delete("/api/users/me"),
};

// ✅ Investment API
export const investmentAPI = {
  create: (investmentData) => api.post("/api/investments", investmentData),
  getUserInvestments: () => api.get("/api/investments"),
  getAllPlans: () => api.get("/api/users/plans"),
};

// ✅ Transaction API
export const transactionAPI = {
  getUserTransactions: () => api.get("/api/transactions/me"),
  deposit: (data) => api.post("/api/transactions/deposit", data),
  withdraw: (data) => api.post("/api/transactions/withdraw", data),
  swap: (data) => api.post("/api/transactions/swap", data),
  receive: () => api.get("/api/transactions/receive"),
};

// ✅ Admin API
export const adminAPI = {
  register: (adminData) => api.post("/api/admin/register", adminData),
  login: (credentials) => api.post("/api/admin/login", credentials),

  // User management
  blockUser: (userId) => api.put(`/api/admin/block/${userId}`),
  deleteUser: (userId) => api.delete(`/api/admin/user/${userId}`),
  getAllUsers: (params = {}) => api.get("/api/admin/users", { params }),

  // Investment plans
getAllPlans: () => api.get("/api/admin/plans"), // if you have this route
createPlan: (planData) => api.post("/api/admin/plans/create", planData),
editPlan: (planId, planData) => api.put(`/api/admin/plans/edit/${planId}`, planData),
deletePlan: (planId) => api.delete(`/api/admin/plans/delete/${planId}`),


  // Transactions (Admin-level)
  getAllTransactions: (params = {}) =>
    api.get("/api/admin/transactions", { params }),
  approveWithdrawal: (id) => api.patch(`/api/admin/transactions/withdrawals/${id}/approve`),
  rejectWithdrawal: (id) => api.patch(`/api/admin/transactions/withdrawals/${id}/reject`),
  approveDeposit: (id) => api.patch(`/api/admin/admin/deposit/${id}/approve`),
  rejectDeposit: (id) => api.patch(`/api/admin/admin/deposit/${id}/reject`),

  // Analytics & Overview
  getLeaderboard: (params = {}) =>
    api.get("/api/admin/leaderboard", { params }),
  getPendingAndDue: () => api.get("/api/admin/overview/pending-due"),
  getAllInvestments: () => api.get("/api/admin/investments/get"),
  getInvestmentsDueTomorrow: () =>
    api.get("/api/admin/investments/due-tomorrow"),

  // Notifications
  getAllNotifications: (params = {}) =>
    api.get("/api/admin/notifications", { params }),
};

// ✅ Notifications API (User-level)
export const notificationAPI = {
  getUserNotifications: (params = {}) =>
    api.get("/api/notifications", { params }),
  markAsRead: (notificationId) =>
    api.patch(`/api/notifications/${notificationId}/read`),
  markAllAsRead: () => api.patch("/api/notifications/markAllRead"),
};

export default api;
