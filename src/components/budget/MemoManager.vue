<template>
  <div class="w-full">
    <div>
      <h2 class="text-3xl font-bold">Mémos</h2>
    </div>

    <div v-if="memos.length !== 0">
      <ul>
        <li class="" v-for="memo in memos" :key="memo.id">
          <div>
            <p>{{ memo.content }}</p>
          </div>
        </li>
      </ul>
    </div>

    <form class="pt-8" @submit.prevent="createMemo">
      <h3 class="text-lg">J'ajoute un mémo</h3>
      <div class="pt-4">
        <label class="py-2 mb-4" for="content"> Contenu :</label>
        <textarea
          class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
          v-model="content"
          name="content"
          id="content"
          cols="20"
          rows="1"
        ></textarea>
      </div>

      <div class="pt-4 mb-10">
        <label class="py-2 mb-4" for="date">Date :</label>
        <input
          type="date"
          v-model="date"
          name="date"
          id="date"
          class="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600"
        />
      </div>

      <button
        type="submit"
        class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      >
        <span>Valider</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getInstance } from "@/api/axios";
import type { Budget, Memo } from "@/interface/api";
import { onBeforeMount, type PropType } from "vue";
import { ref } from "vue";

const memos = ref<Memo[]>([]);
const filteredMemos = ref<Memo[]>([]);
const content = ref<string>("");
const date = ref<string>("");

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const retrieveMemos = async () => {
  const instance = getInstance();

  const response = await instance.get("/memos", {
    headers: {
      Accept: "application/ld+json",
    },
  });

  memos.value = response.data["hydra:member"];
};

const filterMemos = () => {
  // in this filter function I want to retrieve all memos that have the same month as budget.date
  filteredMemos.value = memos.value.filter((memo) => {
    return new Date(props.budget.date).getMonth === memo.date.getMonth;
  });
};

const createMemo = async (e: Event) => {
  e.preventDefault();
  const instance = getInstance();
  const response = await instance.post("/memos", {
    content: content.value,
    date: date.value,
  });

  memos.value.push(response.data);

  content.value = "";
  date.value = "";
};

onBeforeMount(async () => {
  await retrieveMemos();
  filterMemos();
});
</script>

<style lang="scss" scoped></style>
