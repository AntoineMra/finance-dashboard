Année
<template>
  <section class="glass w-full mb-10">
    <h2 class="pb-4 pt-8 px-8 text-center text-2xl flex-shrink-0">
      Moyenne de mes {{ props.transacType }}
    </h2>
    <h2
      class="py-4 pb-8 px-8 text-center text-3xl font-bold flex-shrink-0 cursor-pointer"
      @click="reset"
    >
      Année {{ medium }} €
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
import { onBeforeMount, ref } from "vue";
import MediumCharts from "../../charts/MediumCharts.vue";
import { getInstance } from "@/api/axios";

const props = defineProps({
  transacType: { type: String, required: true },
});

let budgets = ref<[]>([]);
let medium = ref<string>(0);

const getBudgets = async () => {
  const instance = getInstance();
  const response = await instance.get("/budgets");
  const budgets = response.data;

  budgets.value = budgets.map((budget: any) => {
    if (transacType === "Revenus") {
      return budget.transactionsTotalIncome;
    }
    return budget.transactionsTotalExpense;
  });

  medium.value = getMedian(budgets.value);
};

function reset() {
  medium.value = getMedian(budgets.value);
}

function getMedian(arr: Record<string, number>) {
  arr.sort((a, b) => a - b);

  const length = arr.length;
  const middle = Math.floor(length / 2);

  if (length % 2 === 1) {
    return arr[middle];
  } else {
    return (arr[middle - 1] + arr[middle]) / 2;
  }
}

// Mapping budgets.value into an array based on budget.date
const monthlyBudgets = ref<number[]>([]);
const monthsMapping: Record<string, number> = {};

const mapBudgetsByMonth = () => {
  budgets.value.forEach((budget: any) => {
    const date = new Date(budget.date);
    const month = date.getMonth();
    const total = transacType === "Revenus" ? budget.transactionsTotalIncome : budget.transactionsTotalExpense;

    if (monthsMapping[month] === undefined || date > new Date(monthsMapping[month])) {
      monthsMapping[month] = total;
    }
  });

  // Fill the monthlyBudgets array with mapped values
  labels.map((label, index) => {
    monthlyBudgets.value[index] = monthsMapping[index] || 0;
  });
};


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
    data: budgets.value,
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

onBeforeMount(async () => {
  getBudgets();
});
</script>

<style lang="scss" scoped></style>
