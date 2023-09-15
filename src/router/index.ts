import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import BudgetView from "@/views/budget/BudgetView.vue";
import NewBudgetView from "@/views/budget/NewBudgetView.vue";
import GoalsView from "@/views/goals/GoalsView.vue";
import InvestView from "@/views/invest/InvestView.vue";
import BudgetTransactionsView from "@/views/budget/BudgetTransactionsView.vue";
import BudgetExtractionView from "@/views/budget/BudgetExtractionView .vue";
import BudgetRecapView from "@/views/budget/BudgetRecapView.vue";
import ParameterView from "@/views/parameters/ParameterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/budget",
      name: "budget",
      component: BudgetView,
    },
    {
      path: "/budget/new",
      name: "budgetForm",
      component: NewBudgetView,
    },
    {
      path: "/budget/:id/extraction",
      name: "budgetExtraction",
      component: BudgetExtractionView,
    },
    {
      path: "/budget/:id/transactions",
      name: "budgetTransactions",
      component: BudgetTransactionsView,
    },
    {
      path: "/budget/:id/recap",
      name: "budgetRecap",
      component: BudgetRecapView,
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
    {
      path: "/parameters",
      name: "parameters",
      component: ParameterView,
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    //@ts-ignore
    !$cookies.get("token") &&
    // ❗️ Avoid an infinite redirect
    to.name !== "login"
  ) {
    return "/login";
  }

  if (
    // make sure the user is authenticated
    //@ts-ignore
    $cookies.get("token") &&
    // ❗️ Avoid an infinite redirect
    to.name === "login"
  ) {
    return false;
  }
});

export default router;
