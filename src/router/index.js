import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";


// --- Public Components ---
const HomePage = () => import("@/views/Public/HomePage.vue");
const AboutUs = () => import("@/views/Public/AboutUs.vue");
const Contact = () => import("@/views/Public/Contact.vue");
const FAQ = () => import("@/views/Public/FAQ.vue");
const LicenseRegulation = () => import("@/views/Public/LicenseRegulation.vue");
const Pricing = () => import("@/views/Public/Pricing.vue");
const Privacy = () => import("@/views/Public/Privacy.vue");
const SafetyOfFunds = () => import("@/views/Public/SafetyOfFunds.vue");
const ServicesPage = () => import("@/views/Public/ServicesPage.vue");
const TradingConditions = () => import("@/views/Public/TradingConditions.vue");
const NotFound = () => import("@/views/NotFound.vue");

// --- Auth Components ---
const Login = () => import("@/views/User/auth/UserLogin.vue");
const Register = () => import("@/views/User/auth/UserRegister.vue");
const AdminRegister = () => import("@/views/Admin/auth/AdminRegister.vue");
const AdminLogin = () => import("@/views/Admin/auth/AdminLogin.vue");
const ForgotPassword = () => import("@/views/User/auth/ForgotPassword.vue");
const ResetPassword = () => import("@/views/User/auth/ResetPassword.vue");

// --- User Components ---
const Dashboard = () => import("@/views/User/Dashboard.vue");
const Investments = () => import("@/views/User/Investments.vue");
const Transactions = () => import("@/views/User/Transactions.vue");
const Profile = () => import("@/views/User/UserProfile.vue");
const Kyc = () => import("@/views/User/Kyc.vue");
const Deposit = () => import("@/views/User/Deposit.vue");
const Withdraw = () => import("@/views/User/Withdraw.vue");
const Swap = () => import("@/views/User/Swap.vue");

// --- Admin Components ---
const AdminDashboard = () => import("@/views/Admin/AdminDashboard.vue");
const UserManagement = () => import("@/views/Admin/UserManagement.vue");
const InvestmentPlans = () => import("@/views/Admin/InvestmentPlans.vue");
const AdminTransactions = () => import("@/views/Admin/AdminTransactions.vue");
const AdminInvestments = () => import("@/views/Admin/AdminInvestments.vue");

// --- Routes ---
const routes = [
  {
    path: "/",
    meta: { requiresAuth: false, layout: "PublicLayout" },
    children: [
      { path: "", name: "Home", component: HomePage },
      { path: "about", name: "AboutUs", component: AboutUs },
      { path: "contact", name: "Contact", component: Contact },
      { path: "faq", name: "FAQ", component: FAQ },
      {
        path: "license-&-regulation",
        name: "LicenseRegulation",
        component: LicenseRegulation,
      },
      { path: "pricing", name: "Pricing", component: Pricing },
      { path: "privacy-policy", name: "Privacy", component: Privacy },
      {
        path: "safety-of-funds",
        name: "SafetyOfFunds",
        component: SafetyOfFunds,
      },
      { path: "our-services", name: "ServicesPage", component: ServicesPage },
      {
        path: "trading-conditions",
        name: "TradingConditions",
        component: TradingConditions,
      },
    ],
  },

  // --- Auth Routes ---
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },
  {
    path: "/admin/register",
    name: "AdminRegister",
    component: AdminRegister,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { requiresAuth: false, requiresGuest: true, layout: "NoneLayout" },
  },

  // --- User Routes ---
  {
    path: "/user",
    meta: { requiresAuth: true, requiresUser: true, layout: "UserLayout" },
    children: [
      { path: "", redirect: { name: "Dashboard" } },
      { path: "dashboard", name: "Dashboard", component: Dashboard },
      { path: "investments", name: "Investments", component: Investments },
      { path: "transactions", name: "Transactions", component: Transactions },
      { path: "profile", name: "Profile", component: Profile },
      { path: "kyc", name: "Kyc", component: Kyc },
      { path: "deposit", name: "Deposit", component: Deposit },
      { path: "withdraw", name: "Withdraw", component: Withdraw },
      { path: "swap", name: "Swap", component: Swap },
    ],
  },

  // --- Admin Routes ---
  {
    path: "/admin",
    meta: { requiresAuth: true, requiresAdmin: true, layout: "AdminLayout" },
    children: [
      { path: "", redirect: { name: "AdminDashboard" } },
      { path: "dashboard", name: "AdminDashboard", component: AdminDashboard },
      { path: "users", name: "UserManagement", component: UserManagement },
      { path: "plans", name: "InvestmentPlans", component: InvestmentPlans },
      {
        path: "transactions",
        name: "AdminTransactions",
        component: AdminTransactions,
      },
      {
        path: "investments",
        name: "AdminInvestments",
        component: AdminInvestments,
      },
    ],
  },

  // --- 404 ---
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { requiresAuth: false, layout: "NoneLayout" },
  },
];

// --- Router Instance ---
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: "smooth" };
  },
});

// --- Navigation Guards ---
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();


  // Initialize auth store if not already done
  if (!authStore.isInitialized) {
    authStore.initializeAuth();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Check if route requires guest (redirect if already authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      next("/admin/dashboard");
    } else {
      next("/user/dashboard");
    }
    return;
  }

  // Check admin routes
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next("/user/dashboard");
    return;
  }

  // Check user routes
  if (to.meta.requiresUser && authStore.isAdmin) {
    next("/admin/dashboard");
    return;
  }

  next();
});


export default router;
