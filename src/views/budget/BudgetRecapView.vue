<template>
  <div class="budget py-12 px-10">
    <header class="py-8 pl-8 pb-16 flex justify-between mr-20">
      <h1 class="text-4xl font-bold">{{ budget?.title }}</h1>
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
      </div>
    </header>

    <section class="glass">
      <div class="w-full flex items-stretch justify-center flex-wrap pb-8">
        <last-table :rows="null" :transactions="budget?.transactions" />
      </div>

      <div class="w-full flex items-stretch justify-center flex-wrap">
        <div class="mb-4">
          <category-table :budget="budget" />
        </div>
        <div class="mb-4">
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
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";
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

