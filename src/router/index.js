import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "@/layouts/PublicLayout.vue";
import HomePage from "@/views/Public/HomePage.vue"

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [{ path: "/", name: "Home", component: HomePage }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
