<template>
	<main class="home py-12 px-10">
		<section class="glass py-8 pl-8 pb-16">
			<header>
				<h2 class="py-8 px-8 text-4xl font-bold flex-shrink-0">Mon prochain budget</h2>
				<nav class="flex">
					<router-link to="/budget/new/income" class="text-lg font-bold border-r-purple-500 p-2 mr-2 hover:bg-purple-200">Revenus</router-link>
					<router-link to="/budget/new/expense" class="text-lg font-bold p-2 ml-2 hover:bg-purple-200">Dépenses</router-link>
				</nav>
			</header>
			
			<div>
				<router-view />
			</div>
		</section>
	</main>
	<div>
		<h1>Ici une grande zone avec un panel Dépense ou Revenu (tab). Déployer le formulaire en fonction de la tab séléctionné  En dessous zone avec une liste des complétions effectués</h1>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
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
  background: rgba(182, 182, 182, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid rgba(182, 182, 182, 0.3);
}
</style>