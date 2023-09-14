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
          @submit.prevent="createTransactions()"
          class="mx-auto mt-16 max-w-xl sm:mt-20"
        >
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
import { ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Transaction, Category } from "@/interface/api";

const label = ref<string>("");
const amount = ref<number | null>(null);
const date = ref<Date | null>(null);
const category = ref<string>('');

const createTransaction = async () => {
  const id = route.params.id;
  
  const transaction: Partial<Transaction> = {
    title: title.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
    budget: `api/budgets/${id}`
  };

  // TODO : Add a Comment property to transactions in case of od or adjustments

  const instance = getInstance();
  instance.post("/transaction", transaction);

  resetFieldsValues()
};

const resetFieldsValues = () => {
  label.value = "";
  amount.value = null;
  date.value = null;
  category.value = '';
}

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
