<template>
  <div class="p-8 pb-6 w-full glass">
    <h2 class="text-xl font-bold">Modules de paramètrages des catégories</h2>
    <div class="flex justify-between">
      <div class="mt-16 max-w-xl sm:mt-20">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Nom
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Domaine
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ category.label }}
                </p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p
                  class="text-gray-900 whitespace-no-wrap p-2 rounded-md"
                  :style="{ backgroundColor: category.domain?.color }"
                >
                  {{ category.domain?.label }}
                </p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <button
                  @click="deleteCategory(category.id)"
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
      <form @submit.prevent="createCategory()" class="mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Nom de la catégorie</label
            >
            <div class="mt-2.5">
              <input
                v-model="label"
                type="text"
                name="name"
                id="name"
                autocomplete="Catégorie"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="domain"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Domaine</label
            >
            <div class="mt-2.5">
              <select
                v-model="domain"
                name="domain"
                id="domain"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
              >
                <option
                  v-for="domain in domains"
                  :key="domain.id"
                  :value="domain.id"
                >
                  {{ domain?.label }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="type"
                class="block pt-6 pb-2 text-sm font-semibold leading-6 text-gray-900"
                >Type</label
              >
              <div class="flex">
                <div class="flex content-center pr-6">
                  <input
                    v-model="type"
                    type="radio"
                    value="expense"
                    name="type"
                    id="type"
                    class="mr-2"
                  />
                  <label for="type" class="text-sm">Dépense</label>
                </div>

                <div class="flex content-center">
                  <input
                    v-model="type"
                    type="radio"
                    value="income"
                    name="type"
                    id="type"
                    class="mr-2"
                  />
                  <label class="text-sm" for="type">Revenu</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-view />
        <div class="mt-10">
          <button
            type="submit"
            class="block w-32 rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Category, Domain } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

const label = ref<string>("");
const domain = ref<string>();
const type = ref<string>("");
const domains = ref<Domain[]>([]);
const categories = ref<Category[]>([]);

const createCategory = async () => {
  const payload: object = {
    label: label.value,
    domain: `api/domains/${domain.value}`,
    type: type.value,
  };
  const instance = getInstance();

  try {
    const response = await instance.post("/categories", payload);
    const category = response.data;
    categories.value.push(category);
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const deleteCategory = async (id: string) => {
  const instance = getInstance();

  try {
    await instance.delete(`/categories/${id}`);

    categories.value = categories.value.filter((c) => c.id !== id);
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const getAllDomains = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/domains");
    domains.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const getAllCategories = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/categories");
    categories.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

onBeforeMount(() => {
  getAllDomains();
  getAllCategories();
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
