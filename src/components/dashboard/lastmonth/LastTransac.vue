<template>
	<div class="p-8 pb-2 w-full">
		<LastTableHeader/>
		<LastTable :rows=5  />
	</div>
</template>

<script setup lang="ts">
import LastTableHeader from './LastTableHeader.vue';
import LastTable from './LastTable.vue';


// Remonté du type selectionné par lasttableheader (filter) -- same avec search
// 

</script>

<style scoped>

</style>