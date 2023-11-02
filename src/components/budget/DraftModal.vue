<template>
  <div class="modal">
    <form @submit.prevent="validateDraft" class="mx-auto my-16 max-w-xl">
      <div>
        <label
          for="name"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Nom de la transaction *</label
        >
        <div class="mt-2.5">
          <v-text-field
            v-model="label"
            type="text"
            name="name"
            id="name"
            required
            autocomplete="Transaction"
          />
        </div>
      </div>
      <div>
        <label
          for="amount"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Montant *</label
        >
        <div>
          <v-text-field
            v-model="amount"
            type="number"
            name="amount"
            id="amount"
            required
            autocomplete="100"
          />
        </div>
      </div>
      <div>
        <label
          for="date"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Date</label
        >
        <div>
          <v-text-field
            v-model="date"
            :placeholder="date"
            type="date"
            name="date"
            id="date"
          />
        </div>
      </div>
      <div>
        <label
          for="date"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Catégorie *</label
        >
        <v-select
          v-model="category"
          density="compact"
          :items="categories"
          item-title="label"
          item-value="id"
          required
        >
        </v-select>
      </div>

      <div>
        <label
          for="comment"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Commentaire</label
        >
        <div class="mt-2.5">
          <v-textarea
            v-model="comment"
            type="text"
            name="comment"
            id="comment"
            autocomplete="Commentaire"
          />
        </div>
      </div>
      <div>
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
}>();

const emits = defineEmits(["close"]);

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

  const transaction = {
    label: label.value,
    amount: amount.value,
    date: date.value,
    category: `/api/categories/${category.value}`,
    budget: props.draftObject?.transaction?.budget,
    type: props.draftObject?.transaction?.type,
    comment: comment.value,
    status: "validated",
  };

  const translation = {
    customLabel: label.value,
    category: category.value,
    status: "validated",
  };

  try {
    const responseTransac = await instance.post(`/transactions`, transaction);

    if (props.draftObject?.translation?.id !== undefined) {
      try {
        await instance.put(
          `/bank_translations/${props.draftObject?.translation?.id}`,
          {
            translation,
          }
        );
      } catch (error) {
        console.error("Error while updating translation");
      }
    }

    const transac = responseTransac.data;

    emits("close", transac);
  } catch (error: any) {
    if (error.response.status === 401) {
      handleExpiredToken();
    } else if (error.response.status === 400) {
      throw new Error(error.response.data);
    }
  }
};

const mapExistingValues = () => {
  if (props.draftObject) {
    label.value = props.draftObject?.translation?.bankLabel ?? "";
    amount.value = props.draftObject?.transaction?.amount;
    date.value = props.draftObject?.transaction?.date ?? "";
    category.value = props.draftObject?.transaction?.category ?? "";
    comment.value = props.draftObject?.transaction?.comment ?? "";
  }
};

onBeforeMount(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;

  mapExistingValues();
});
</script>

<style scoped>
.modal {
  background-color: white;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  padding: 2rem;
}
</style>
