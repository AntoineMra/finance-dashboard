<template>
  <div class="flex items-center justify-between pb-4">
    <div class="items-center">
      <select
        class="p-2 rounded-lg outline-none"
        v-model="selectedType"
        @change="emit('select', selectedType)"
      >
        <option
          v-for="option in options"
          v-bind:value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex bg-gray-50 items-center p-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          class="bg-gray-50 outline-none ml-1 block"
          v-model="search"
          @input="emit('search', search)"
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedType = ref<string>("all");
const options = ref<Record<string, string>[]>([
  { text: "Type", value: "all" },
  { text: "Dépense", value: "expense" },
  { text: "Revenu", value: "income" },
]);
const search = ref<string>("");

const emit = defineEmits<{
  (e: "select", value: string): void;
  (e: "search", value: string): void;
}>();
</script>

<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
