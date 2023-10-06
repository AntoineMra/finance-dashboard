<template>
  <div class="modal" v-if="hidden">
    <form
      @submit.prevent="validateDraft"
      class="mx-auto mt-16 max-w-xl sm:mt-20"
    >
      <div>
        <label
          for="name"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Nom de la transaction</label
        >
        <div class="mt-2.5">
          <input
            v-model="label"
            type="text"
            name="name"
            id="name"
            required
            autocomplete="Transaction"
            class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
          />
        </div>
      </div>
      <div>
        <label
          for="amount"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Montant</label
        >
        <div class="mt-2.5">
          <input
            v-model="amount"
            type="number"
            name="amount"
            id="amount"
            required
            autocomplete="100"
            class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
          />
        </div>
      </div>
      <div>
        <label
          for="date"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Date</label
        >
        <div class="mt-2.5">
          <input
            v-model="date"
            type="date"
            name="date"
            id="date"
            class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
          />
        </div>
      </div>
      <div>
        <label
          for="category"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Catégorie</label
        >
        <div class="mt-2.5">
          <select
            v-model="category"
            name="domain"
            id="domain"
            class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category?.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-10">
        <button
          type="submit"
          class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Ajouter
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getInstance } from "@/api/axios";
import type { Category, DraftObject } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import { handleExpiredToken } from "@/api/config";
import { useCategoryStore } from "../../stores/category";

const props = defineProps<{
  draftObject: Partial<DraftObject> | undefined;
  hidden: boolean;
}>();

const emits = defineEmits<{
  close: () => void;
}>();
const label = ref<string>("");
const amount = ref<number | undefined>();
const date = ref<string>("");
const category = ref<string>("");
const comment = ref<string>("");
const categories = ref<Category[] | undefined>();
const categoryStore = useCategoryStore();

const validateDraft = async (event: Event) => {
  event.preventDefault();
  const instance = getInstance();
  const category = (event.target as HTMLFormElement).category.value;

  const transaction = {
    label: label.value,
    amount: amount.value,
    date: date.value,
    category: category,
    comment: comment.value,
    status: "validated",
  };
  const translation = {
    customLabel: "string",
    category: "string",
    status: "validated",
  };

  console.log(transaction, translation);

  // TODO: Add update the transaction and push a translation

  emits.close();
};

const mapExistingValues = () => {
  if (props.draftObject) {
    label.value = props.draftObject?.transaction?.label ?? "";
    amount.value = props.draftObject?.transaction?.amount;
    date.value = props.draftObject?.transaction?.date ?? "";
    category.value = props.draftObject?.transaction?.category ?? "";
    comment.value = props.draftObject?.transaction?.comment ?? "";
  }
};

onBeforeMount(() => {
  if (categoryStore.categories.length === 0) {
    categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;

  mapExistingValues();
});
</script>

<style scoped></style>
