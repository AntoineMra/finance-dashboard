Année
<template>
  <section class="glass w-full mb-10">
    <h2 class="pb-4 pt-8 px-8 text-center text-2xl flex-shrink-0">
      Moyenne de mes derniers {{ props.transacType }}
    </h2>
    <h2
      class="py-4 pb-8 px-8 text-center text-3xl font-bold flex-shrink-0 cursor-pointer"
      @click="reset"
    >
      {{ medium }} €
    </h2>
    <div class="px-8 pb-4">
      <select class="p-2 mb-4 rounded-lg outline-none" name="" id="">
        <option value="Catégories" selected>Année</option>
      </select>
      <MediumCharts :labels="labels" :datasets="datasets" :options="options" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { dataset } from "@/interface/charts";
import { defineProps, ref } from "vue";
import MediumCharts from "../../charts/MediumCharts.vue";

const props = defineProps({
  transacType: { type: String, required: true },
});

let medium = ref<string>("Année " + 500);

function reset() {
  medium.value = "Année " + 500;
}

//Remplacer les data par un appel API

const labels: string[] = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const datasets: dataset[] = [
  {
    label: "Moyenne des " + props.transacType,
    backgroundColor: "#a855f7",
    data: [512, 788, 621],
  },
];
const options: Record<string, any> = {
  responsive: true,
  tension: 0.4,
  pointHoverBackgroundColor: "#ffffff",
  pointHoverBorderColor: "#a855f7",
  pointHoverBorderWidth: 3,
  elements: {
    line: {
      borderColor: "#a855f7",
      borderJoinStyle: "round",
    },
    point: {
      radius: 5,
      hoverRadius: 7,
      backgroundColor: "#ffffff",
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          medium.value = context.label + " " + context.parsed.y;
          return label;
        },
      },
    },
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  scales: {
    y: {
      max: 1200,
      min: 400,
      ticks: {
        stepSize: 100,
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
