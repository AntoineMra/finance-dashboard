<template>
  <div class="w-full -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Domaine
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Montant
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="domain in domains" :key="domain.id">
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              {{ domain.label }}
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              {{ getDomainValue(domain.id) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Budget, Category, Domain, Transaction } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import { handleExpiredToken } from "@/api/config";
import { useCategoryStore } from "@/stores/category";

const props = defineProps<{
  budget: Budget | undefined;
}>();

let domains = ref<Domain[]>([]);

const getDomains = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/domains");

    domains.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const categories = ref<Category[] | undefined>();
const categoryStore = useCategoryStore();

const getDomainValue = (domainId: string) => {
  // Check if domain isn't a IRI instead of ID
  const transactions = props.budget?.transactions.filter(
    (transaction: Transaction) => {
      const category = categories.value?.find(
        (category: Category) => category["@id"] === transaction.category
      );

      return category?.domain === domainId;
    }
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

  getDomains();
});
</script>

<style scoped></style>
