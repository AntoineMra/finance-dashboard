<template>
	<div>
		<h1>Formulaire de revenus</h1>

		<form class="py-12 px-10">
			<input type="text" name="" id="">
    	</form>
	</div>
</template>

<script setup lang="ts">
import type { Transac } from '@/interface/api';
import { ref } from 'vue';

const expense = ref<Transac | object>({}) 

const props = defineProps({
  budget: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

</style>