<script setup lang="ts">
import AppNavigation from "./components/layouts/AppNavigation.vue";

const isLogged = () => {
  if (
    !$cookies.get("token")
  ) {
    return false
  }

  return true
}
</script>

<template>
  <main>
    <app-navigation v-if="isLogged()"/>
    <router-view />
  </main>
</template>

<style lang="scss">
#app {
  margin-left: 13rem;
  min-height: 100vh;
}
</style>
