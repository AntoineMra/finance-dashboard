<template>
  <div class="p-8 pb-2 w-full">
    <last-table-header @select="onSelect" @search="onSearch" />
    <last-table :rows="5" :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import LastTableHeader from "./LastTableHeader.vue";
import LastTable from "./LastTable.vue";
import type { Budget, Transaction } from "@/interface/api";
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  budget: Budget | null;
}>();
const transactions = ref<Transaction[] | undefined>();

type Filter = {
  type: "select" | "search";
  value: string;
};

const getTransactions = (filter: Filter | null = null) => {
  if (!props.budget) {
    transactions.value = undefined;
    return;
  }

  switch (filter?.type) {
    case "select":
      transactions.value = props.budget.transactions.filter(
        (transaction: Transaction) => transaction.category === filter.value
      );
      break;
    case "search":
      transactions.value = props.budget.transactions.filter(
        (transaction: Transaction) =>
          transaction.label.toLowerCase().includes(filter.value.toLowerCase())
      );
      break;
    default:
      transactions.value = props.budget.transactions;
      break;
  }
};

const onSelect = (value: string) => {
  const filter: Filter = {
    type: "select",
    value: value,
  };

  if (value !== "all") {
    getTransactions(filter);
  }
};

const onSearch = (value: string) => {
  const filter: Filter = {
    type: "search",
    value: value,
  };

  getTransactions(filter);
};

onBeforeMount(() => {
  getTransactions();
});
</script>

<style scoped></style>
