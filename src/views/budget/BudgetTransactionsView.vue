<template>
  <main class="home py-12 px-10">
    <section class="glass py-8 pl-8 pb-16">
      <header>
        <h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">
          J'ajoute mes transactions
        </h2>
      </header>

      <div>
        <!-- The form should add ligne to an existing transaction table -->
        <form
          @submit.prevent="createTransaction"
          class="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div>
            <label
              for="name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Nom de la transaction</label
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
          <div>
            <label
              for="amount"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Montant</label
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
          <div>
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
          <div>
            <label
              for="category"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Catégorie</label
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
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Category } from "@/interface/api";
import { useCategoryStore } from "@/stores/category";
import { useRoute } from "vue-router";

const label = ref<string>("");
const amount = ref<number | undefined>();
const date = ref<string | undefined>();
const category = ref<string>("");
const comment = ref<string>("");
const categories = ref<Category[]>([]);
const categoryStore = useCategoryStore();

const route = useRoute();

const createTransaction = async () => {
  const id = route.params.id;

  const transaction: object = {
    label: label.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
    budget: `api/budgets/${id}`,
    comment: comment.value,
  };

  const instance = getInstance();
  instance.post("/transaction", transaction);

  resetFieldsValues();
};

const resetFieldsValues = () => {
  label.value = "";
  amount.value = undefined;
  date.value = undefined;
  category.value = "";
};

onBeforeMount(() => {
  if (categoryStore.categories.length === 0) {
    categoryStore.setCategories();
  }

  categories.value = categoryStore.categories;
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
