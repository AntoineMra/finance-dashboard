<template>
  <div class="py-12 px-10">
    <h2 class="text-2xl font-bold">Catégories</h2>
    <div class="px-8 pb-4">
      <category-charts
        :labels="labels"
        :datasets="datasets"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import CategoryCharts from "../charts/CategoryCharts.vue";
import type { dataset } from "@/interface/charts";
import type { Category, Budget, Transaction } from "@/interface/api";
import { useCategoryStore } from "@/stores/category";

const categories = ref<Category[] | undefined>();
const labels = ref<string[]>([]);
const data = ref<number[]>([]);
const categoryStore = useCategoryStore();

// TODO Gestion Couleur Category Switch case sur category.type -> ajout category.color = code couleur en hexa

const props = defineProps<{
  budget: Budget;
}>();

const mapDataValues = () => {
  categories.value?.forEach((category: Category) => {
    labels.value.push(category.label);
    data.value.push(getCategoryTotal(category["@id"] ?? ""));
  });
};

const getCategoryTotal = (categoryId: string) => {
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

const datasets: dataset[] = [
  {
    label: "Ensemble des catégories",
    backgroundColor: "#a855f7",
    data: data.value,
  },
];
const options: Record<string, any> = {
  responsive: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

onBeforeMount(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
  mapDataValues();
});
</script>

<style scoped></style>
