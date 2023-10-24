<template>
  <div class="p-8 pb-2 w-full glass">
    <h2>Modules de paramètrages des traductions</h2>
  </div>
  <div class="flex justify-between">
    <div class="mt-16 max-w-xl sm:mt-20">
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
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Supprimer
            </th>
          </tr>
        </thead>
        <!-- Table is to be done -->
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { BankTranslation } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

const bankTranslations = ref<BankTranslation[]>([]);
const label = ref<string>("");
const category = ref<string>("");

const getBankTranslations = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("/bank_translations");
    bankTranslations.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const updateTranslation = async (id: string) => {
  const instance = getInstance();

  const payload: Partial<BankTranslation> = {
    id: id,
    customLabel: label.value,
    category: category.value,
  };

  try {
    const response = await instance.put(`/bank_translations/${id}`, payload);
    const translation = response.data;
    bankTranslations.value = bankTranslations.value.map((bankTranslation) => {
      if (bankTranslation.id === translation.id) return translation;
      return bankTranslation;
    });
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const deleteTranslation = async (id: string) => {
  const instance = getInstance();

  try {
    const response = await instance.delete(`/bank_translations/${id}`);
    const translation = response.data;
    bankTranslations.value = bankTranslations.value.filter(
      (bankTranslation) => translation.id !== bankTranslation.id
    );
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

onBeforeMount(() => {
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
