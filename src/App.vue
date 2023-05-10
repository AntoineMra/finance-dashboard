<script setup lang="ts">
import AppNavigation from "./components/layouts/AppNavigation.vue";
import { useAuthStore } from "@/stores/user";

const userStore = useAuthStore();
</script>

<template>
  <main :class="userStore.isLoggedIn ? 'margin' : ''">
    <app-navigation v-if="userStore.isLoggedIn" />
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.margin {
  margin-left: 13rem;
  min-height: 100vh;
}
</style>
