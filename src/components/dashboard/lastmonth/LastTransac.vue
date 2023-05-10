<template>
  <div class="p-8 pb-2 w-full">
    <LastTableHeader @select="onSelect" @search="onSearch"/>
    <LastTable :rows="5" :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import LastTableHeader from "./LastTableHeader.vue";
import LastTable from "./LastTable.vue";
import type { Budget, Transac } from "@/interface/api";
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  budget: Budget | null;
}>();
const transactions = ref<Transac[] | undefined>();

const getTransactions = (filter = null) => {
  if (filter) {
    //todo implement filter
  }
  transactions.value = props.budget?.transactions;
};

const onSelect = (value: string) => {
  console.log(value);
};

const onSearch = (value: string) => {
  console.log(value);
};

onBeforeMount(() => {
  getTransactions();
});

</script>

<style scoped></style>
