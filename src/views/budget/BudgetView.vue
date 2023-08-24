<template>
  <div class="budget py-12 px-10">
    <header class="py-8 pl-8 pb-16">
      <h1 class="text-4xl font-bold">Répertoire de comptes</h1>
    </header>

    <section class="">
      <div class="w-full flex items-stretch justify-start flex-wrap">
        <router-link
          to="budget/new"
          class="basis-1/5 mb-12 hover:border-purple-500 hover:border-solid hover:bg-white hover:text-purple-500 group transition-all w-full rounded-md border-2 border-dashed border-slate-300 text-sm text-slate-900 py-3 mx-4 flex flex-col items-center justify-center"
        >
          <span
            class="block font-semibold text-slate-900 text-xl text-center mb-4"
            >Nouveau budget</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto group-hover:text-purple-500 mb-1 text-slate-400 h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
        <card-budget
          v-for="(budget, index) in budgets"
          :budget="budget"
          :index="index"
          :amountExpense="450"
          :amountIncome="350"
          :key="budget.id"
          @select="selectBudget"
        />
      </div>

      <section v-if="transactions.length">
        <h2 class="text-3xl font-bold">Liste de toutes les transactions</h2>
        <div class="w-full flex items-stretch justify-center flex-wrap">
          <last-table :rows="null" :transactions="transactions" />
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { catchError } from "@/api/config";
import { useAuthStore } from "@/stores/user";
import CardBudget from "@/components/budget/CardBudget.vue";
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";
import { ref, onBeforeMount } from "vue";
import { getInstance } from "@/api/axios";
import type { Budget, Transac } from "@/interface/api";

let budgets = ref<Budget[]>([]);
let transactions = ref<Transac[]>([]);
const authStore = useAuthStore();

const getBudgets = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/budgets");
    budgets.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      authStore.resetToken();
      authStore.setLoggedIn(false);
      catchError(error.response);
    }
  }

  //const response = await instance.get("/budgets?status=completed");
};

const selectBudget = (budgetId: string) => {
  const budget = budgets.value.find((budget: Budget) => budget.id === budgetId);

  transactions.value = budget ? budget.transactions : [];
};

onBeforeMount(() => {
  getBudgets();
});
</script>

<style scoped>
.budget {
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
}
</style>
