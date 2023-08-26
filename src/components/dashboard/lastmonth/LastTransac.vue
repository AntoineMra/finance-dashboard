<template>
  <div class="p-8 pb-2 w-full">
    <last-table-header @select="onSelect" @search="onSearch" />
    <last-table :rows="5" :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import LastTableHeader from "./LastTableHeader.vue";
import LastTable from "./LastTable.vue";
import type { Budget, Category, Transac } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import { handleExpiredToken } from "@/api/config";

const props = defineProps<{
  budget: Budget | null;
}>();
const transactions = ref<Transac[] | undefined>();
const categories = ref<Category[] | undefined>();

const getTransactions = (filter = null) => {
  if (filter) {
    //TODO Implement search Filter and Type filter
  }

  transactions.value = props.budget?.transactions;
};

const getCategories = async () => {
  const instance = getInstance();
  try {
    const response = await instance.get<Category[]>("/categories");

    categories.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      handleExpiredToken();
    }
  }
};

const onSelect = (value: string) => {
  console.log(value);
};

const onSearch = (value: string) => {
  console.log(value);
};

onBeforeMount(() => {
  getTransactions();
  getCategories();
});
</script>

<style scoped></style>
