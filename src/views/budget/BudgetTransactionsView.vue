<template>
  <main class="home py-12 px-10">
    <section class="glass py-4 pl-8 pb-16">
      <header>
        <h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">
          J'ajoute mes transactions
        </h2>
      </header>

      <div class="flex justify-between content-center w-full px-8 pt-16">
        <div class="w-full">
          <div v-if="validatedTransac.length !== 0">
            <last-table :rows="null" :transactions="validatedTransac" />
            <!-- Here show transaction Extracted that are validated -->
          </div>
          <div class="flex justify-center items-center" v-else>
            <div
              class="px-5 py-3 border-b-2 w-96 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
            >
              Aucune transaction validée
            </div>
          </div>
        </div>

        <div>
          <form
            @submit.prevent="createTransaction"
            class="py-4 px-8 max-w-xl sm:py-20 bg-gray-100 shadow-md rounded-md"
          >
            <div class="w-full pb-4">
              <ul class="flex justify-between content-center w-full">
                <li
                  class="px-4 py-2 rounded-md cursor-pointer"
                  :class="
                    type === 'expense' ? 'bg-purple-300' : 'bg-purple-100'
                  "
                >
                  <input
                    class="d-none"
                    type="radio"
                    id="expense"
                    name="type"
                    value="expense"
                    @change="filterCategories(categoryStore.categories)"
                    v-model="type"
                  />
                  <label class="cursor-pointer" for="expense">Dépense</label>
                </li>
                <li
                  class="px-4 py-2 rounded-md cursor-pointer"
                  :class="type === 'income' ? 'bg-purple-300' : 'bg-purple-100'"
                >
                  <input
                    class="d-none"
                    type="radio"
                    id="income"
                    name="type"
                    value="income"
                    @change="filterCategories(categoryStore.categories)"
                    v-model="type"
                  />
                  <label class="cursor-pointer" for="income">Revenu</label>
                </li>
              </ul>
            </div>
            <div>
              <label
                for="name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Nom de la transaction *</label
              >
              <div class="mt-2.5">
                <input
                  v-model="label"
                  type="text"
                  name="name"
                  id="name"
                  required
                  autocomplete="Transaction"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                />
              </div>
            </div>
            <div class="mt-2">
              <label
                for="amount"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Montant *</label
              >
              <div class="mt-2.5">
                <input
                  v-model="amount"
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  autocomplete="100"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                />
              </div>
            </div>
            <div class="mt-2">
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
            <div class="mt-2">
              <label
                for="category"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Catégorie *</label
              >
              <div class="mt-2.5">
                <select
                  v-model="category"
                  name="domain"
                  id="domain"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category?.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-2">
              <label
                for="comment"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Commentaire</label
              >
              <div class="mt-2.5">
                <input
                  v-model="comment"
                  type="text"
                  name="comment"
                  id="comment"
                  autocomplete="Transaction"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                />
              </div>
            </div>
            <div class="mt-10">
              <button
                type="submit"
                class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Category, Transaction } from "@/interface/api";
import { useCategoryStore } from "@/stores/category";
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";
import { useRoute } from "vue-router";
import { handleExpiredToken } from "@/api/config";

const label = ref<string>("");
const amount = ref<number | undefined>();
const date = ref<string | undefined>();
const category = ref<string>("");
const comment = ref<string>("");
const categories = ref<Category[]>([]);
const type = ref<string>("expense");
const categoryStore = useCategoryStore();

const validatedTransac = ref<Transaction[]>([]);

const route = useRoute();

const createTransaction = async () => {
  const id = route.params.id;

  const transaction: object = {
    label: label.value,
    amount: amount.value ?? 0,
    date: date.value,
    category: `api/categories/${category.value}`,
    budget: `api/budgets/${id}`,
    comment: comment.value,
    type: type.value,
    status: "validated",
  };

  const instance = getInstance();
  try {
    const response = await instance.post("/transactions", transaction);

    if (response.status === 201) {
      validatedTransac.value.push(response.data);
    }
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }

  resetFieldsValues();
};

const getAllTransactions = async () => {
  const instance = getInstance();
  const budgetId = route.params.id;

  try {
    const response = await instance.get(`/budgets/${budgetId}`);

    const budget = response.data;

    validatedTransac.value = budget.transactions;
  } catch (error: any) {
    if (error.status === 401) handleExpiredToken();
  }
};

const filterCategories = (allCategories: Category[]) => {
  const filteredCategories = allCategories.filter(
    (category: Category) => category.type === type.value
  );

  categories.value = filteredCategories;
};

const resetFieldsValues = () => {
  label.value = "";
  amount.value = undefined;
  date.value = undefined;
  category.value = "";
  comment.value = "";
  type.value = "expense";
};

onBeforeMount(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
  await getAllTransactions();
  filterCategories(categoryStore.categories);
});
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
