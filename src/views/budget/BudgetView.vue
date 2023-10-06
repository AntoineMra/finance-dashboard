<template>
  <div class="budget py-12 px-10">
    <header class="py-8 pl-8 pb-16">
      <h1 class="text-4xl font-bold">Répertoire de comptes</h1>
    </header>

    <section>
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
          v-for="(budget, index) in completedBudgets"
          :budget="budget"
          :index="index"
          :amountExpense="450"
          :amountIncome="350"
          :key="budget.id"
          @select="selectBudget"
        />
      </div>
      <h2 class="pl-8 text-2xl font-bold mb-5">
        Reprendre mes budgets en cours
      </h2>
      <div class="w-full flex items-stretch justify-start flex-wrap">
        <card-budget
          v-for="(budget, index) in wipBudgets"
          :budget="budget"
          :index="index"
          :amountExpense="450"
          :amountIncome="350"
          :key="budget.id"
          @select="redirectToBudget"
        />
      </div>

      <section v-if="transactions.length">
        <h2 class="pl-12 text-3xl font-bold">
          Liste de toutes les transactions
        </h2>
        <div class="w-full flex items-stretch justify-center flex-wrap">
          <last-table :rows="null" :transactions="transactions" />
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { handleExpiredToken } from "@/api/config";
import CardBudget from "@/components/budget/CardBudget.vue";
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";
import { ref, onBeforeMount } from "vue";
import { getInstance } from "@/api/axios";
import type { Budget, Transaction } from "@/interface/api";
import { useRouter } from "vue-router";

let completedBudgets = ref<Budget[]>([]);
let wipBudgets = ref<Budget[]>([]);
let transactions = ref<Transaction[]>([]);
const router = useRouter();

const getBudgets = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/budgets");

    completedBudgets.value = response.data.filter(
      (budget: Budget) => budget.status === "completed"
    );
    wipBudgets.value = response.data.filter(
      (budget: Budget) => budget.status === "draft"
    );
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const selectBudget = (budgetId: string) => {
  const budget = completedBudgets.value.find(
    (budget: Budget) => budget.id === budgetId
  );

  transactions.value = budget ? budget.transactions : [];
};

const redirectToBudget = (budgetId: string) => {
  router.push({ name: "budgetExtraction", params: { id: budgetId } });
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
