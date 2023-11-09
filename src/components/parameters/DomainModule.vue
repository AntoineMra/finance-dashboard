<template>
  <div class="p-8 pb-4 w-full glass">
    <h2 class="text-xl font-bold">Modules de paramètrages des domaines</h2>
    <div class="flex justify-between">
      <div class="mt-16 max-w-xl sm:mt-20 overflow-y-scroll h-96">
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
                Couleur
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="domain in domains" :key="domain.id">
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ domain.label }}
                </p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ domain.color }}
                </p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <button
                  @click="deleteDomain(domain.id)"
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
      <form @submit.prevent="createDomain()" class="mt-16 max-w-xl sm:mt-20">
        <div>
          <div>
            <label
              for="name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Nom du domaine</label
            >
            <div class="mt-2.5">
              <input
                v-model="label"
                type="text"
                name="name"
                id="name"
                autocomplete="Domaine"
                class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
              />
            </div>
          </div>
          <div>
            <label
              for="color"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Couleur</label
            >
            <div class="mt-2.5">
              <input
                v-model="color"
                type="color"
                name="color"
                id="color"
                autocomplete="Couleur"
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
import type { Domain } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

const label = ref<string>("");
const color = ref<string>("#FFFFFF");
const domains = ref<Domain[]>([]);

const createDomain = async () => {
  const payload: Partial<Domain> = {
    label: label.value,
    color: color.value,
  };
  const instance = getInstance();

  try {
    const response = await instance.post("/domains", payload);
    const domain = response.data;
    domains.value.push(domain);
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const deleteDomain = async (id: string) => {
  const instance = getInstance();

  try {
    await instance.delete(`/domains/${id}`);

    domains.value = domains.value.filter((c) => c.id !== id);
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

onBeforeMount(() => {
  getAllDomains();
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
