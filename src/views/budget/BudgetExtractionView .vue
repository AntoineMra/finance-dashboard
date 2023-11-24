<template>
  <main class="home py-12 px-10">
    <section class="glass py-8 px-8 pb-4">
      <header>
        <h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">
          Extraction de relevé
        </h2>
      </header>
      <div class="w-full">
        <form @submit.prevent="postExtraction()" class="mt-4 mb-8">
          <div
            class="border-gray-300 bg-gray-200 rounded-lg border-2 mx-24 p-16 flex justify-center items-center"
          >
            <div class="pr-8">
              <label
                for="formFile"
                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >Fichier d'extraction</label
              >
              <input
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                @change="onFileChange"
              />
            </div>

            <div class="text-red-500 text-sm ml-4">{{ fileError }}</div>

            <button
              type="submit"
              class="block w-32 self-end rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Extraire
            </button>
          </div>
        </form>
        <div class="mt-10" v-if="pendingTransactions.length !== 0">
          <extraction-table
            :draft-transaction="pendingTransactions"
            @push-transaction="addTransac"
          />
          <!-- Here show transaction Extracted that are in draft -->
        </div>
        <div class="mt-10 flex justify-center items-center" v-else>
          <div
            class="px-5 py-3 border-b-2 w-96 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
          >
            Aucune transaction en brouillon
          </div>
        </div>
        <div class="mt-10" v-if="validatedTransactions.length !== 0">
          <last-table :rows="null" :transactions="validatedTransactions" />
          <!-- Here show transaction Extracted that are validated -->
        </div>
        <div class="mt-10 flex justify-center items-center" v-else>
          <div
            class="px-5 py-3 border-b-2 w-96 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
          >
            Aucune transaction validée
          </div>
        </div>
        <div class="mt-10 mx-8 flex justify-between items-center">
          <router-link :to="`/budget/${route.params.id}/transactions`">
            <button
              class="block w-64 rounded-md px-3.5 py-2.5 text-left text-sm font-semibold text-black"
            >
              Passer cette étape
            </button>
          </router-link>
          <router-link :to="`/budget/${route.params.id}/transactions`">
            <button
              class="block w-32 rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Suivant
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { getInstance } from "@/api/axios";
import { handleExpiredToken } from "@/api/config";
import type {
  Budget,
  MediaObject,
  BankExtraction,
  Transaction,
  DraftObject,
} from "@/interface/api";
import { useRoute } from "vue-router";
import ExtractionTable from "@/components/budget/ExtractionTable.vue";
import LastTable from "@/components/dashboard/lastmonth/LastTable.vue";
import { useDraftsStore } from "@/stores/drafts";

const fileInput = ref<HTMLInputElement | null>(null);
const extractionFile = ref<MediaObject | null>(null);
const fileError = ref<string>("");
const validatedTransactions = ref<Transaction[]>([]);
const pendingTransactions = ref<DraftObject[]>([]);
const budget = ref<Budget>();
const route = useRoute();
const draftsStore = useDraftsStore();

const postExtraction = async () => {
  await createMediaObject();

  if (extractionFile.value?.id === null) {
    fileError.value = "Veuillez ajouter un fichier d'extraction";
    return;
  }
  const instance = getInstance();
  const data: Partial<BankExtraction> = {
    mediaObject: `/api/media_objects/${extractionFile.value?.id}`,
    budget: `/api/budgets/${budget.value?.id}`,
  };

  try {
    const response = await instance.post("/budgets/extraction", data, {
      headers: {
        "Content-Type": "application/ld+json",
      },
    });

    validatedTransactions.value = response.data.validatedTransactions;
    pendingTransactions.value = response.data.draftTransactions;

    //@ts-ignore
    draftsStore.persistDrafts(route.params.id, pendingTransactions.value);
  } catch (error: any) {
    if (error.response.status === 401) handleExpiredToken();
    console.log("error");
  }
};

const addTransac = (transac: any) => {
  validatedTransactions.value.push(transac);
  pendingTransactions.value = pendingTransactions.value.filter(
    (draft) => draft.transaction?.id !== transac.id
  );

  //@ts-ignore
  draftsStore.updatePersistedDrafts(route.params.id, pendingTransactions.value);
};

const onFileChange = (e: any) => {
  fileInput.value = e.target;
};

const createMediaObject = async () => {
  if (fileInput.value?.files?.length) {
    const response = await postMediaObject(fileInput.value?.files[0]);

    if (response.id !== undefined) {
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
  const response = await instance.post("/media_objects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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
    validatedTransactions.value = budget.value?.transactions ?? [];
  } catch (error: any) {
    if (error.response.status === 401) {
      handleExpiredToken();
    }
  }
};

onBeforeMount(() => {
  getBudget();

  //@ts-ignore
  pendingTransactions.value = draftsStore.retrieveDrafts(route.params.id);
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
