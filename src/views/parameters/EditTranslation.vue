<template>
  <section class="h-screen mt-20 mx-20">
    <div class="p-8 w-full glass">
      <h2 class="text-xl font-bold">Liste des traductions</h2>
      <div class="flex justify-between">
        <form
          @submit.prevent="updateTranslation()"
          class="mt-16 w-1/5 sm:mt-20"
        >
          <div>
            <v-text-field
              v-model="customLabel"
              type="text"
              name="name"
              id="name"
              required
              autocomplete="Transaction"
            />
          </div>
          <div>
            <v-select
              v-model="category"
              :placeholder="category"
              name="category"
              id="category"
              :options="categories"
              :value="category"
              label="Catégories"
            />
          </div>
          <div class="mt-10">
            <button
              type="submit"
              class="block w-32 rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { BankTranslation, Category } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";
import { useRoute, useRouter } from "vue-router";

const translation = ref<BankTranslation | null>(null);
const category = ref<Category | null>(translation.value?.category ?? null);
const customLabel = ref<string>(translation.value?.customLabel ?? "");
const bankLabel = ref<string>(translation.value?.bankLabel ?? "");
const status = ref<string>(translation.value?.status ?? "");
const categories = ref<Category[]>([]);
const route = useRoute();
const router = useRouter();

const getBankTranslation = async () => {
  const id = route.params.id;
  try {
    const instance = getInstance();
    const response = await instance.get(`bank_translations/${id}`);
    translation.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const fetchCategories = async () => {
  try {
    const instance = getInstance();
    const response = await instance.get("categories");
    categories.value = response.data["hydra:member"];
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const updateTranslation = async () => {
  const id = route.params.id;
  const instance = getInstance();

  const payload: Partial<BankTranslation> = {
    customLabel: customLabel.value,
    category: category.value?.["@id"],
  };

  try {
    const response = await instance.put(`/bank_translations/${id}`, payload);
    if (response.status === 200) {
      router.push({ name: "translations" });
    }
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

onBeforeMount(async () => {
  await getBankTranslation();
  await fetchCategories();
});
</script>

<style lang="scss"></style>
