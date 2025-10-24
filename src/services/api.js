import axios from "axios";
import { useLoaderStore } from "@/stores/loaderStore";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ------------------- SMART LOADER SYSTEM -------------------

let activeRequests = 0;
let loaderTimeout;

const endpointMessages = {
  "/api/auth/login": "Logging you in...",
  "/api/auth/register": "Creating your account...",
  "/api/auth/logout": "Logging you out...",
  "/api/users/me": "Fetching your profile...",
  "/api/users/update": "Updating your profile...",
  "/api/users/kyc": "Uploading KYC documents...",
  "/api/users/select-country-currency": "Saving your preferences...",
  "/api/investments": "Loading your investments...",
  "/api/transactions/me": "Retrieving transactions...",
  "/api/transactions/deposit": "Processing your deposit...",
  "/api/transactions/withdraw": "Submitting your withdrawal request...",
  "/api/transactions/swap": "Swapping your assets...",
  "/api/admin/plans": "Fetching investment plans...",
  "/api/admin/plans/create": "Creating new investment plan...",
  "/api/admin/plans/edit": "Updating investment plan...",
  "/api/admin/plans/delete": "Deleting investment plan...",
  "/api/admin/transactions": "Loading all transactions...",
  "/api/admin/investments/get": "Fetching all investments...",
  "/api/notifications": "Fetching notifications...",
};

// Helper: Match endpoint with readable message
const getMessageForEndpoint = (url = "") => {
  for (const [key, msg] of Object.entries(endpointMessages)) {
    if (url.includes(key)) return msg;
  }
  return "Loading data...";
};

// Loader controls
const startLoader = (url) => {
  const loader = useLoaderStore();
  activeRequests++;

  if (activeRequests === 1) {
    clearTimeout(loaderTimeout);
    const message = getMessageForEndpoint(url);
    loaderTimeout = setTimeout(() => {
      loader.start(message);
    }, 100);
  }
};

const stopLoader = () => {
  const loader = useLoaderStore();
  activeRequests = Math.max(0, activeRequests - 1);

  if (activeRequests === 0) {
    clearTimeout(loaderTimeout);
    loaderTimeout = setTimeout(() => {
      loader.stop();
    }, 150);
  }
};

// ------------------- AXIOS INTERCEPTORS -------------------

// ✅ Add token + start loader
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    startLoader(config.url);
    return config;
  },
  (error) => {
    stopLoader();
    return Promise.reject(error);
  }
);

// ✅ Stop loader + handle auth errors
api.interceptors.response.use(
  (response) => {
    stopLoader();
    return response;
  },
  (error) => {
    stopLoader();

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

// ✅ Admin Auth API (clean separation)
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

// ✅ Admin API (management endpoints)
export const adminAPI = {
  register: (adminData) => api.post("/api/admin/register", adminData),
  login: (credentials) => api.post("/api/admin/login", credentials),

  // ✅ User management
  blockUser: (userId) => api.patch(`/api/admin/users/${userId}/block`),
  deleteUser: (userId) => api.delete(`/api/admin/users/${userId}`),
  getAllUsers: (params = {}) => api.get("/api/admin/users", { params }),

  // ✅ Investment plans
  getAllPlans: () => api.get("/api/admin/plans"),
  createPlan: (planData) => api.post("/api/admin/plans", planData),
  editPlan: (planId, planData) => api.patch(`/api/admin/plans/${planId}`, planData),
  deletePlan: (planId) => api.delete(`/api/admin/plans/${planId}`),

  // ✅ Transactions
  getAllTransactions: (params = {}) => api.get("/api/admin/transactions", { params }),
  approveWithdrawal: (id) => api.patch(`/api/admin/transactions/${id}/withdrawal/approve`),
  rejectWithdrawal: (id) => api.patch(`/api/admin/transactions/${id}/withdrawal/reject`),
  approveDeposit: (id) => api.patch(`/api/admin/transactions/${id}/deposit/approve`),
  rejectDeposit: (id) => api.patch(`/api/admin/transactions/${id}/deposit/reject`),

  // ✅ Overview & analytics
  getLeaderboard: (params = {}) => api.get("/api/admin/leaderboard", { params }),
  getPendingAndDue: () => api.get("/api/admin/pending-due"),
  getAllInvestments:() => api.get("/api/admin/investments/get"),
  getInvestmentsDueTomorrow: () => api.get("/api/admin/investments/due-tomorrow"),

  // ✅ Admin-level notifications
  getAllNotifications: (params = {}) => api.get("/api/admin/notifications", { params }),
};

// ✅ Notifications API
export const notificationAPI = {
  getUserNotifications: (params = {}) =>
    api.get("/api/notifications", { params }),
  markAsRead: (notificationId) =>
    api.patch(`/api/notifications/${notificationId}/read`),
  markAllAsRead: () => api.patch("/api/notifications/markAllRead"),
};

export default api;
