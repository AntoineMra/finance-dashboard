<template>
  <div class="">
    <bar-chart :chartData="data.chartData" :chartOptions="data.chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BarChart from "./BarChart.vue";

interface chartData {
  chartData: {};
  chartOptions?: object;
}

const props = defineProps({
  labels: { type: Array, required: true },
  datasets: { type: Array, required: true },
  options: { type: Object, required: true },
});

const data = reactive<chartData>({
  chartData: {
    labels: props.labels,
    datasets: props.datasets,
  },
  chartOptions: props.options,
});
</script>

<style scoped></style>
