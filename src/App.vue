<template>
  <main :class="userStore.isLoggedIn ? 'margin' : ''">
    <app-navigation v-if="userStore.isLoggedIn" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppNavigation from "./components/layouts/AppNavigation.vue";
import { useAuthStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { handleExpiredToken } from "./api/config";
import { getInstance } from "./api/axios";

// eslint-disable-next-line no-undef
const userStore = useAuthStore();

const getUser = async () => {
  const instance = getInstance();

  try {
    const response = await instance.get("/whoami");
    userStore.setUser(response.data);
    userStore.setLoggedIn(true);
  } catch (error: any) {
    if (error.response.status === 401) {
      userStore.resetToken();
      userStore.setLoggedIn(false);
      handleExpiredToken();
    }
  }
};

onBeforeMount(() => {
  getUser();
});
</script>

<style lang="scss" scoped>
.margin {
  margin-left: 13rem;
  min-height: 100vh;
}
</style>
