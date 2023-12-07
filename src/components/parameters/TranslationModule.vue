<template>
  <div class="p-8 w-full glass">
    <h2 class="text-xl font-bold">Modules de paramètrages des traductions</h2>
    <div class="mt-16 sm:mt-20 overflow-y-scroll h-96 w-full">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Nom Bancaire
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Traduction
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Catégorie
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:cursor-pointer hover:bg-gray-100"
            v-for="translation in bankTranslations"
            :key="translation.id"
            @click="redirectToTranslation(translation['@id'])"
          >
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ translation.bankLabel }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ translation.customLabel }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-b text-center border-x-2 border-gray-200 text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ getCategoryLabel(translation.category) }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { BankTranslation, Category } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category";

const bankTranslations = ref<BankTranslation[]>([]);
const categories = ref<Category[]>([]);
const categoryStore = useCategoryStore();
const router = useRouter();

const getBankTranslations = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("/bank_translations", {
      headers: {
        Accept: "application/ld+json",
      },
    });
    bankTranslations.value = response.data["hydra:member"];
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const redirectToTranslation = (id: string | undefined) => {
  if (id === undefined) {
    return;
  }
  id = formatIriToId(id);

  router.push({ name: "editTranslation", params: { id } });
};

const getCategoryLabel = (categoryId: string) => {
  const category = categories.value.find(
    (category) => category["@id"] === categoryId
  );

  if (category) {
    return category.label;
  }

  return "";
};

const formatIriToId = (iri: string) => {
  const splittedIri = iri.split("/");
  return splittedIri[splittedIri.length - 1];
};

onBeforeMount(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
  getBankTranslations();
});
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
