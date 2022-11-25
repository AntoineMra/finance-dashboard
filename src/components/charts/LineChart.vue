<template>
  <div>
    <Line
      :chart-data="props.chartData"
      :chart-options="props.chartOptions"
      :height="300"
      :width="300"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import { Line } from "vue-chartjs";
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
