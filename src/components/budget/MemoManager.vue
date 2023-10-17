<template>
  <div class="flex align-center justify-center">
    <form @submit="createMemo">
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
import type { Memo } from "@/interface/api";
import { onBeforeMount } from "vue";
import { ref } from "vue";

const memos = ref<Memo[]>([]);
const content = ref<string>("");
const date = ref<string>("");

const retrieveMemos = () => {
  const instance = getInstance();

  instance.get("/memos").then((response) => {
    memos.value = response.data["hydra:member"];
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
});
</script>

<style lang="scss" scoped></style>
