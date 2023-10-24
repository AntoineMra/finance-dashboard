<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <h1 class="text-center font-bold text-4xl mb-8">Paramètrage</h1>
      <div>
        <div class="mx-16 flex justify-center pb-5 mb-10">
          <category-module />
        </div>
        <div class="mx-16 flex justify-center pb-5 mb-10">
          <domain-module />
        </div>
        <div class="mx-16 flex justify-center pb-5 mb-10">
          <translation-module />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CategoryModule from "@/components/parameters/CategoryModule.vue";
import DomainModule from "@/components/parameters/DomainModule.vue";
import TranslationModule from "@/components/parameters/TranslationModule.vue";
</script>

<style lang="scss"></style>
