<template>
  <section class="glass" v-if="lastBudget">
    <div class="flex justify-between">
      <h2 class="py-8 px-8 text-3xl flex-shrink-0">Mon dernier mois</h2>
      <last-recap :budget="lastBudget" />
    </div>
    <last-transac :budget="lastBudget" />
    <div class="py-2 px-8 flex items-center justify-end">
      <router-link
        :to="`/budget/${lastBudget.id}/recap`"
        custom
        v-slot="{ navigate }"
      >
        <button
          @click="navigate"
          type="button"
          class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Découvrir le détail
        </button>
      </router-link>
    </div>
  </section>
  <section class="glass flex flex-col p-8" v-else>
    <h1 class="text-4xl font-bold pb-16 px-16 text-center">
      Vous pouvez renseigner votre premier budget !
    </h1>
    <router-link to="/budget/new" custom v-slot="{ navigate }">
      <button
        @click="navigate"
        type="button"
        class="text-white self-center w-40 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Nouveau Budget
      </button>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import LastRecap from "./LastRecap.vue";
import LastTransac from "./LastTransac.vue";
import type { Budget } from "@/interface/api";
import { getInstance } from "@/api/axios";
import { handleExpiredToken } from "@/api/config";

const lastBudget = ref<Budget | null>(null);

const getLastBudget = async () => {
  const instance = getInstance();
  try {
    const response = await instance.get<Budget[]>(
      "/budgets?order%5BcreatedAt%5D=desc"
    );

    response.data[0] && (lastBudget.value = response.data[0]);
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

onBeforeMount(() => {
  getLastBudget();
});
</script>

<style lang="scss" scoped></style>
