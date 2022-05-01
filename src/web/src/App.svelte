<script lang="ts">
	import Login from "./Login.svelte";
	import Statistics from "./Statistics.svelte";
	const BACKEND_URL = "http://localhost:8090/api/v1";
	let bearerTokenApp;
</script>

<main>
	<h1>CycleStats</h1>
	<Login bind:bearerTokenLogin={bearerTokenApp} BACKEND_URL={BACKEND_URL}/>
	{#if bearerTokenApp}
		<Statistics bearerTokenStatistics={bearerTokenApp} BACKEND_URL={BACKEND_URL}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	ul {
		text-align: center;
		list-style: inside;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
