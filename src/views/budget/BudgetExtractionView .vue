<template>
  <main class="home py-12 px-10">
    <section class="glass py-8 pl-8 pb-16">
      <header>
        <h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">
          Extraction de relevé
        </h2>
      </header>
      <div>
        <form
          @submit.prevent="postExtraction()"
          class="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block text-sm font-semibold leading-6 text-gray-900"
                >Fichier d'extraction</label
              >
              <div class="mt-2.5">
                <input
                  type="file"
                  name="file"
                  id="file"
                  @change="onFileChange"
                  class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                />
              </div>

              <button
                @click="createMediaObject"
                class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Extraire
              </button>
            </div>
          </div>
          <div class="mt-10">
            <last-table :rows="null" :transactions="[]" />
            <!-- Here show transaction Extracted that are in draft -->
          </div>
          <div class="mt-10">
            <last-table :rows="null" :transactions="[]" />
            <!-- Here show transaction Extracted that are validated -->
          </div>
          <div class="mt-10">
            <router-link :to="`/budget/${budget?.['@id']}/transactions`">
              <button
                :disabled="areTransactionsValidated()"
                class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Suivant
              </button>
            </router-link>
            <router-link :to="`/budget/${budget?.['@id']}/transactions`">
              <button
                class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Passer cette étape
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { getInstance } from "@/api/axios";
import { handleExpiredToken } from "@/api/config";
import type { Budget, MediaObject, BankExtraction } from "@/interface/api";
import { useRoute } from "vue-router";
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";

const fileInput = ref<HTMLInputElement | null>(null);
const extractionFile = ref<MediaObject | null>(null);
const fileError = ref<string>("");
const budget = ref<Budget>();
const route = useRoute();

const postExtraction = async () => {
  if (!extractionFile.value) {
    fileError.value = "Veuillez ajouter un fichier d'extraction";
    return;
  }
  const instance = getInstance();
  const data: Partial<BankExtraction> = {
    mediaObject: extractionFile.value,
    budget: budget.value,
    month: budget.value?.formatedDate,
  };

  try {
    const response = await instance.post("/bank-extractions", data);
    console.log(response);

    //TODO: Parse response
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
  }
};

const onFileChange = (e: any) => {
  fileInput.value = e.target;
};

const createMediaObject = async () => {
  if (fileInput.value?.files?.length) {
    const response = await postMediaObject(fileInput.value?.files[0]);
    if (typeof response === "object") {
      extractionFile.value = response;
    } else {
      fileError.value = response;
    }
  }
};

const postMediaObject = async (fileObject: any) => {
  const formData = new FormData();
  formData.append("file", fileObject, fileObject.name);

  const instance = getInstance();
  const response = await instance.post("/media-objects/");

  if (response.status === 401) handleExpiredToken();

  if (response.status === 422) {
    response.data.violations.forEach((violation: any) => {
      if (violation.propertyPath === "file") {
        return violation.message;
      }
    });
  } else {
    return response.data;
  }
};

const getBudget = async () => {
  const instance = getInstance();
  const id = route.params.id;

  try {
    const response = await instance.get("/budgets/" + id);
    budget.value = response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      handleExpiredToken();
    }
  }
};

const areTransactionsValidated = () => {
  // TODO check if all transactions are validated
  return true;
};

// TODO Add possibility to fetch goal and show if it's reached or not on the top bubble

onBeforeMount(() => {
  getBudget();
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
