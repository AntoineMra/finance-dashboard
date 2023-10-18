<template>
  <div class="w-full -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Catégorie
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Montant
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              {{ category.label }}
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              {{ getCategoryValue(category.id) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Budget, Category, Transaction } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import { useCategoryStore } from "@/stores/category";

const props = defineProps<{
  budget: Budget | undefined;
}>();

const categories = ref<Category[] | undefined>();
const categoryStore = useCategoryStore();

const getCategoryValue = (categoryId: string) => {
  // Check if category isn't a IRI instead of ID
  const transactions = props.budget?.transactions.filter(
    (transaction: Transaction) => transaction.category === categoryId
  );

  if (transactions) {
    const total = transactions.reduce(
      (acc: number, transaction: Transaction) => acc + transaction.amount,
      0
    );

    return total;
  }

  return 0;
};

onBeforeMount(() => {
  if (categoryStore.categories.length === 0) {
    categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
});
</script>

<style scoped></style>
