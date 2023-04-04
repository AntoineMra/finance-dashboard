<template>
  <div>
    <Bar
      :chart-data="props.chartData"
      :chart-options="props.chartOptions"
      :height="300"
      :width="300"
    />
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped></style>
