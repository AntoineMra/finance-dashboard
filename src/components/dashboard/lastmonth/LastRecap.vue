<template>
  <ul class="flex flex-wrap items-center justify-between w-full px-8 max-w-xl">
    <li class="flex items-center justify-center text-2xl">
      {{ budget?.transactionsTotalExpense }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-2 stroke-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </li>
    <li class="flex items-center justify-center text-2xl">
      {{ budget?.transactionsTotalIncome }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-2 stroke-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </li>
    <li class="flex items-center justify-center text-2xl">
      {{ budget?.transactionsDifferential }}
      <!-- @vue-ignore -->
      <svg
        v-if="budget.transactionsDifferential >= 0"
        fill="none"
        :class="'stroke-green-700 ml-2 w-5 h-5'"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        ></path>
      </svg>
      <svg
        v-else
        fill="none"
        :class="'stroke-red-600 ml-2 w-5 h-5'"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
        ></path>
      </svg>
    </li>
    <li class="flex items-center justify-center text-2xl">
      {{ budget?.transactionsDifferential + "%" }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-2 stroke-green-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
        />
      </svg>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Budget } from "@/interface/api";

const props = defineProps<{
  budget: Budget | null;
}>();
</script>

<style scoped></style>
