<template>
  <div class="flex align-between justify-center">
    <div>
      <h2 class="text-3xl font-bold">Mémos</h2>
    </div>

    <div class="">
      <h2>Mes mémos</h2>
      <ul>
        <li v-for="memo in memos" :key="memo.id">
          <div class="card">
            <p class="card-content">{{ memo.content }}</p>
          </div>
        </li>
      </ul>
    </div>

    <form @submit="createMemo">
      <h2>J'ajoute un mémo</h2>
      <div>
        <label for="content"> Contenu :</label>
        <textarea
          class="w-full h-96"
          v-model="content"
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <label for=""></label>
      <input type="date" />
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

const retrieveMemos = () => {
  const instance = getInstance();

  instance.get("/memos").then((response) => {
    memos.value = response.data["hydra:member"];
  });
};

const filterMemos = () => {
  // in this filter function I want to retrieve all memos that have the same month as budget.date
  filteredMemos.value = memos.value.filter((memo) => {
    return new Date(props.budget.date).getMonth === memo.date.getMonth;
  });
};

const createMemo = async () => {
  const instance = getInstance();
  const response = await instance.post("/memos", {
    content: content.value,
    date: date.value,
  });

  memos.value.push(response.data);

  content.value = "";
  date.value = "";
};

onBeforeMount(() => {
  retrieveMemos();
  filterMemos();
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
}

.card-content {
  font-size: 1.5rem;
}
</style>
