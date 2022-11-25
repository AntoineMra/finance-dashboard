<template>
  <div class="home py-12 px-10">
    <header class="py-8 pl-8 pb-16">
      <h1 class="text-6xl font-bold">Finance Dashboard</h1>
    </header>
    <section class="flex items-start justify-between gap">
      <div class="w-full">
        <last-month />
      </div>
      <div class="w-full max-w-screen-sm ml-4">
        <medium-transac transac-type="Dépenses" />
        <medium-transac transac-type="Revenus" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LastMonth from "@/components/dashboard/lastmonth/LastMonth.vue";
import MediumTransac from "../components/dashboard/medium/MediumTransac.vue";
</script>

<style lang="scss">
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
  background: rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
