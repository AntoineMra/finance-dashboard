<template>
  <div class="p-8 pb-2 w-full glass">
    <h2>Modules de paramètrages des catégories</h2>
  </div>

  <section class="flex justify-between">
    <div class="mt-16 max-w-xl sm:mt-20">
      <div class="" v-for"category in categories" :key="category.id">
        <!-- Should be transformed into a tab -->
        {{ category.label }}
      </div>
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
              autocomplete="Budget"
              class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="domain"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Domain</label
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
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Category, Domain } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

const label = ref<string>("");
const domain = ref<Domain>();
const domains = ref<Domain[]>([]);
const categories = ref<Category[]>([]);

const createCategory = async () => {
  const payload: Partial<Category> = {
    label: label.value,
    domain: domain.value,
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
