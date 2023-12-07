<template>
  <div class="budget py-12 px-10">
    <header class="py-8 pl-8 pb-16 flex justify-between mr-20">
      <div>
        <h2
          class="font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-fill-color text-4xl py-8 text-center"
        >
          {{ budget?.title }}
        </h2>
        <router-link
          :to="{ name: 'budgetTransactions', params: { id: budget?.id } }"
          class="flex content-center text-slate-400 hover:text-slate-500 transition-colors"
        >
          <span class="ml-2 text-lg text-slate-400">
            Retour aux transactions
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>

      <div class="glass p-4">
        <p class="text-lg">
          <span class="text-xl font-bold">
            {{ budget?.transactionsDifferential + " €" }}
          </span>
          {{
            budget?.transactionsDifferential &&
            budget?.transactionsDifferential > 0
              ? " économisés ce mois-ci"
              : " dépensés ce mois-ci"
          }}
        </p>
        <p class="text-lg">
          <span class="text-xl font-bold">
            {{ budget?.transactionsPercent + "%" }}
          </span>
          de taux d'épargne
        </p>
      </div>
    </header>

    <section class="glass">
      <div
        class="w-full flex items-stretch justify-between flex-wrap pt-6 px-8 pb-16"
      >
        <div
          class="flex justify-between border-2 border-purple-600 rounded-lg py-6 px-8"
        >
          <h2 class="text-lg font-semibold pr-4">Dépenses</h2>
          <p class="text-xl font-bold">
            {{ budget?.transactionsTotalExpense + " €" }}
          </p>
        </div>
        <div
          class="flex justify-between border-2 border-purple-600 rounded-lg py-6 px-8"
        >
          <h2 class="text-lg font-semibold pr-4">Revenus</h2>
          <p class="text-xl font-bold">
            {{ budget?.transactionsTotalIncome + " €" }}
          </p>
        </div>
      </div>
      <div
        class="w-full flex items-stretch justify-between flex-wrap pl-12 pr-6"
      >
        <div class="w-1/3">
          <category-table :budget="budget" />
        </div>
        <div class="w-1/3">
          <domain-table :budget="budget" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { handleExpiredToken } from "@/api/config";
import { ref, onBeforeMount } from "vue";
import { getInstance } from "@/api/axios";
import type { Budget } from "@/interface/api";
import { useRoute } from "vue-router";
import CategoryTable from "@/components/budget/CategoryTable.vue";
import DomainTable from "@/components/budget/DomainTable.vue";

let budget = ref<Budget>();
const route = useRoute();

const getBudget = async () => {
  const instance = getInstance();
  const id = route.params.id;

  try {
    const response = await instance.get("/budgets/" + id);
    budget.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      handleExpiredToken();
    }
  }
};

// TODO Add possibility to fetch goal and show if it's reached or not on the top bubble

onBeforeMount(() => {
  getBudget();
});
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
