<template>
	<section class="glass">
		<div class="flex justify-between">
			<h2 class="py-8 px-8 text-3xl flex-shrink-0">Mon dernier mois</h2>
			<LastRecap />
		</div>
		<LastTransac />
		<div class="py-2 px-8 flex items-center justify-end">
			<router-link to="/budget/new" custom v-slot="{ navigate }">
				<button @click="navigate" @keypress.enter="navigate" type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Créer son prochain budget</button>
			</router-link>
		</div>
	</section>
</template>

<script setup lang="ts">
import LastRecap from './LastRecap.vue';
import LastTransac from './LastTransac.vue';

</script>

<style lang="scss" scoped>
</style>