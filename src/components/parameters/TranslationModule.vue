<template>
  <div class="p-8 pb-2 w-full glass">
    <h2>Modules de paramètrages des traductions</h2>
  </div>
  <div class="flex justify-between">
      <div class="mt-16 max-w-xl sm:mt-20">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Nom Bancaire
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Traduction 
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Supprimer
              </th>
            </tr>
          </thead>
          <!-- Table is to be done -->
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getInstance } from "@/api/axios";
import type { Domain } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";


</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
