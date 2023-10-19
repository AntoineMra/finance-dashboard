<template>
  <div class="w-full -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Date
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Description
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Montant
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Categorie
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in limitedTransactions" :key="transaction.id">
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ formatDate(transaction.date) }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ transaction.label }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ transaction.amount }} €
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{
                  transaction.category
                    ? getCategoryName(transaction.category)
                    : "Non catégorisé"
                }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <span
                class="relative inline-block px-3 py-1 font-semibold leading-tight"
                :class="
                  transaction.type === 'expense'
                    ? 'text-red-900'
                    : 'text-green-900'
                "
              >
                <span
                  aria-hidden
                  class="absolute inset-0 opacity-50 rounded-full"
                  :class="
                    transaction.type === 'expense'
                      ? 'bg-red-200'
                      : 'bg-green-200'
                  "
                ></span>
                <span class="relative">{{
                  translateType(transaction.type)
                }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Transaction } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import { useCategoryStore } from "@/stores/category";

const categories = ref<Category[] | undefined>();
const categoryStore = useCategoryStore();

const props = defineProps<{
  rows: number | null;
  transactions: Transaction[] | undefined;
}>();

let limitedTransactions = ref<Transaction[]>([]);

const limitTransactions = () => {
  limitedTransactions.value = props.transactions ?? [];

  if (props.rows !== null && props.transactions !== undefined) {
    limitedTransactions.value = props.transactions.slice(0, props.rows);
  }
};

const getCategoryName = (id: string) => {
  const category = categories.value?.find((category) => category["@id"] === id);

  return category?.label;
};

const translateType = (type: string) => {
  if (type === "expense") {
    return "Dépense";
  }

  return "Revenu";
};

const formatDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;

  return `${day}/${month}`;
};

onBeforeMount(() => {
  console.log(categoryStore.categories.length);
  
  if (categoryStore.categories.length === 0) {
    categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
  limitTransactions();
});
</script>

<style scoped></style>
