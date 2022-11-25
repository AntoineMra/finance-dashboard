import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import BudgetView from "@/views/budget/BudgetView.vue";
import NewBudgetView from "@/views/budget/NewBudgetView.vue";
import GoalsView from "@/views/goals/GoalsView.vue";
import InvestView from "@/views/invest/InvestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/budget",
      name: "budget",
      component: BudgetView,
      children: [
        {
          path: "/new",
          component: NewBudgetView,
        },
      ],
    },
    {
      path: "/invest",
      name: "invest",
      component: InvestView,
    },
    {
      path: "/goals",
      name: "goals",
      component: GoalsView,
    },
  ],
});

export default router;
