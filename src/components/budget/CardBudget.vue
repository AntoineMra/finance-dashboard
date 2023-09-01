<template>
  <div
    @click="
      $emit('select', props.budget.id);
      clearSelect();
      addSelect(props.budget.id);
    "
    class="budget-cards basis-1/5 transition mb-12 cursor-pointer hover:border-purple-500 hover:bg-white group w-full rounded-md border-2 border-solid border-slate-300 text-sm text-slate-900 p-4 mx-4"
  >
    <h2 class="font-semibold text-lg text-slate-900 text-center mb-2">
      {{ props.budget.title }}
    </h2>
    <p class="text-center">{{ props.budget.month }} {{ props.budget.year }}</p>
    <div class="flex pt-4 items-center justify-center">
      <p class="text-xl font-bold text-red-800 mx-2">
        - {{ props.amountExpense }}€
      </p>
      <p class="text-xl font-bold text-green-800 mx-2">
        + {{ props.amountIncome }}€
      </p>
    </div>
    <div class="flex items-center justify-center pt-4 pb-2">
      <p class="text-center font-medium group-hover:text-purple-500 mr-2">
        Voir le détail
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="group-hover:text-purple-500 h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  budget: {
    type: Object,
    required: true,
  },
  amountExpense: {
    type: Number,
    required: true,
  },
  amountIncome: {
    type: Number,
    required: true,
  },
});

//const emit = defineEmits(["select"]);

function clearSelect() {
  document.querySelectorAll(".budget-cards").forEach((card) => {
    card.classList.remove("selected");
  });
}

function addSelect(id: number) {
  document
    .querySelector(`.budget-cards[index='${id - 1}']`)
    ?.classList.add("selected");
}
</script>

<style lang="scss" scoped>
.selected {
  background-color: #a855f7 !important;
  border-color: transparent !important;
  color: #ffffff !important;

  h2,
  p,
  svg {
    color: #ffffff !important;
    fill: #ffffff !important;
  }
}
</style>
