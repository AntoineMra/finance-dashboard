<template>
  <div class="w-full -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Date
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Label
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Montant
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(draft, index) in props.draftTransaction"
            :key="index"
            @click="openModal(draft)"
            class="cursor-pointer hover:bg-gray-100"
          >
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ draft.transaction?.date }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ draft.translation?.bankLabel }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <span class="relative">{{ draft.transaction?.amount }} €</span>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
            >
              <span
                v-if="draft.transaction?.type"
                class="relative inline-block px-3 py-1 font-semibold leading-tight"
                :class="
                  draft.transaction?.type === 'expense'
                    ? 'text-red-900'
                    : 'text-green-900'
                "
              >
                <span
                  aria-hidden
                  class="absolute inset-0 opacity-50 rounded-full"
                  :class="
                    draft.transaction?.type === 'expense'
                      ? 'bg-red-200'
                      : 'bg-green-200'
                  "
                ></span>
                <span class="relative">{{
                  translateType(draft.transaction?.type)
                }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="dialog">
        <draft-modal :draftObject="selectedDraftObject" @close="closeModal" />
      </v-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, DraftObject } from "@/interface/api";
import { onBeforeMount, ref } from "vue";
import DraftModal from "./DraftModal.vue";
import { useCategoryStore } from "@/stores/category";

const props = defineProps<{
  draftTransaction: Partial<DraftObject>[] | undefined;
}>();

const categories = ref<Category[] | undefined>();
const dialog = ref<boolean>(false);
const selectedDraftObject = ref<Partial<DraftObject> | undefined>();
const categoryStore = useCategoryStore();

const openModal = (draft: Partial<DraftObject>) => {
  selectedDraftObject.value = draft;
  dialog.value = true;
};

const closeModal = () => {
  selectedDraftObject.value = undefined;
  dialog.value = false;
};

const translateType = (type: string) => {
  if (type === "expense") {
    return "Dépense";
  }

  return "Revenu";
};

onBeforeMount(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
});
</script>

<style scoped></style>
