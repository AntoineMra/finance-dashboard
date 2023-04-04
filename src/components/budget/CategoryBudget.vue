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
import { onMounted, ref } from "vue";
import CategoryCharts from "../charts/CategoryCharts.vue";
import type { dataset } from "@/interface/charts";
import type { Category } from "@/interface/api";

// Gestion Couleur Category Switch case sur category.type -> ajout category.color = code couleur en hexa

// Gestion d'un emits sur une category pour filtrer les revenus'

/* const props = defineProps({
  budget: { type: Object, required: true },
});

const emit = defineEmits(["category"]); */

let categories = ref<Category[]>([]);
console.log(categories);
const labels = ["Besoin", "Plaisir", "Dépenses courantes"];

const datasets: dataset[] = [
  {
    label: "Ensemble des catégories",
    backgroundColor: "#a855f7",
    data: [500, 500, 500],
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

onMounted(() => {
  /* fetch("http://localhost:7000/api/categories")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      categories.value = res;
      return categories.value.map((category) => {
        switch (category.type) {
          case "Besoin":
            category.color = "#9fc5e8";
            break;
          case "Plaisir":
            category.color = "#ea9999";
            break;
          case "Dépenses courantes":
            category.color = "#f6b26b";
            break;
          default:
            category.color = "#cccccc";
            break;
        }
      });
    })
    .catch(() => {
      console.warn("DB could not be reached");
    }); */
});
</script>

<style scoped></style>
