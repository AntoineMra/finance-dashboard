<template>
  <div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Date
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Description
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Montant
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Category
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-gray-600 uppercase"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">date</p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">description</p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">amount €</p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <p class="text-gray-900 whitespace-no-wrap">category.label</p>
              </td>
              <td
                class="px-5 py-5 border-b text-center border-x-2 border-gray-200 bg-white text-sm"
              >
                <span
                  class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">type.label</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* const props = defineProps({
  rows: {
    type: Number,
    required: true,
  },
}); */
</script>

<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
