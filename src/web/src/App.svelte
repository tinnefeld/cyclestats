<script lang="ts">
	import { Authentication, authenticationState } from "./stores";
	import Login from "./Login.svelte";
	import Statistics from "./Statistics.svelte";
	const BACKEND_URL = "http://localhost:8090/api/v1";
</script>

<main>
	<h1>CycleStats</h1>
	<Login BACKEND_URL={BACKEND_URL}/>
	{#if $authenticationState === Authentication.SUCCEEDED}
		<Statistics BACKEND_URL={BACKEND_URL}/>
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
