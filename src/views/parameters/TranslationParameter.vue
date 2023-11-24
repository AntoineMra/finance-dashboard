<template>
  <section class="h-screen mt-20 mx-20">
    <div class="p-8 w-full glass">
      <h2 class="text-xl font-bold">Liste des traductions</h2>
      <div class="flex justify-between">
        <div class="flex justify-between content-center w-full mt-16 sm:mt-20">
          <table class="w-3/5 leading-normal">
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
              <tr v-for="translation in bankTranslations" :key="translation.id">
                <td
                  class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ translation.bankLabel }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ translation.customLabel }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ translation.category }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <form @submit.prevent="filterTrans()" class="mt-16 w-1/5 sm:mt-20">
            <div>
              <div>
                <label
                  for="name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Traduction</label
                >
                <div class="mt-2.5">
                  <input
                    v-model="search"
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="Traduction"
                    class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>
            <div class="mt-10">
              <button
                type="submit"
                class="block w-32 rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Filtrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { BankTranslation } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

const bankTranslations = ref<BankTranslation[]>([]);
const search = ref<string>("");

const getBankTranslations = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("/bank_translations");
    bankTranslations.value = response.data.filter(
      (translation: BankTranslation) => translation.status !== "draft"
    );
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const filterTrans = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("/bank_translations");
    bankTranslations.value = response.data.filter(
      (translation: BankTranslation) =>
        translation.status !== "draft" &&
        translation.customLabel
          .toLowerCase()
          .includes(search.value.toLowerCase())
    );
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

onBeforeMount(() => {
  getBankTranslations();
});
</script>

<style lang="scss"></style>
