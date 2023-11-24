<template>
  <div class="p-8 w-full glass">
    <h2 class="text-xl font-bold">Modules de paramètrages des traductions</h2>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:cursor-pointer hover:bg-gray-100"
              v-for="translation in bankTranslations"
              :key="translation.id"
              @click="redirectToTranslation(translation.id)"
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
                  {{ translation.category }}
                </p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 text-sm"
              >
                <button
                  @click="deleteTranslation(translation.id)"
                  class="text-center text-xs text-red-500 cursor-pointer hover:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.147a.5.5 0 10-.708.708L9.293 10l-4.147 4.146a.5.5 0 10.708.708L10 10.707l4.146 4.147a.5.5 0 00.708-.708L10.707 10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
import { useRouter } from "vue-router";

const bankTranslations = ref<BankTranslation[]>([]);
const router = useRouter();

const getBankTranslations = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("/bank_translations");
    bankTranslations.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const redirectToTranslation = (id: string) => {
  router.push({ name: "editTranslation", params: { id } });
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
