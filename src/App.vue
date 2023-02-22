<script setup lang="ts">
import AppNavigation from "./components/layouts/AppNavigation.vue";

const isLogged = () => {
  // check if logged
  return true
}
</script>

<template>
  <main v-if="isLogged()">
    <app-navigation />
    <router-view />
  </main>
</template>

<style lang="scss">
#app {
  margin-left: 13rem;
  min-height: 100vh;
}
</style>
