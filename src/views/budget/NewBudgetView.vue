<template>
  <main class="home py-12 px-10">
    <section class="glass py-8 pl-8 pb-16">
      <header>
        <h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">
          Mon nouveau budget
        </h2>
      </header>

      <div>
        <form @submit.prevent="createBudget()" class="mt-16 max-w-xl sm:mt-20">
          <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Nom du budget</label
              >
              <div class="mt-2.5">
                <input
                  v-model="title"
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
                for="date"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Date</label
              >
              <div class="mt-2.5">
                <input
                  v-model="date"
                  type="date"
                  name="date"
                  id="date"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                />
              </div>
            </div>
          </div>
          <router-view />
          <div class="mt-10">
            <button
              type="submit"
              class="block w-32 rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Suivant
            </button>
          </div>
        </form>
        <div class="mt-10 bg-red-400 rounded-md p-4" v-if="errorMessage !== ''">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Budget } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";
import { useRouter } from "vue-router";

const title = ref<string>("");
const date = ref<Date>();
const router = useRouter();
const errorMessage = ref<string>("");

const createBudget = async () => {
  const payload: Partial<Budget> = {
    title: title.value,
    date: date.value,
    transactions: [],
  };
  const instance = getInstance();

  try {
    const response = await instance.post("/budgets", payload);
    const budget = response.data;
    router.push(`/budget/${budget.id}/extraction`);
  } catch (error: any) {
    errorMessage.value = error.response.data?.detail;
    if (error.response.status === 401) handleExpiredToken();
  }
};
</script>

<style scoped>
.isActive {
  background-color: rgb(233 213 255);
}
.home {
  min-height: 100vh;
  background-image: linear-gradient(
      43deg,
      #4159d011 0%,
      rgba(200, 80, 192, 0.055),
      rgba(255, 205, 112, 0.096) 100%
    ),
    url("@/assets/hero-bg-dashboard.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.glass {
  background: rgba(182, 182, 182, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(182, 182, 182, 0.3);
}
</style>
