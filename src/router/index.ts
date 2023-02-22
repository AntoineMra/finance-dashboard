import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import BudgetView from "@/views/budget/BudgetView.vue";
import NewBudgetView from "@/views/budget/NewBudgetView.vue";
import ExpenseForm from "@/components/budget/forms/ExpenseForm.vue";
import IncomeForm from "@/components/budget/forms/IncomeForm.vue";
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
    },
    {
      path: "/budget/new",
      name: "budgetFrom",
      component: NewBudgetView,
      children: [
        {
          path: "expense",
          name: "expenseForm",
          component: ExpenseForm,
        },
        {
          path: "income",
          name: "incomeForm",
          component: IncomeForm,
        }
      ]
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

import { useAuthStore } from '@/stores/user'

const authStore = useAuthStore()

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !authStore.isLoggedIn &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router;
