<script lang="ts">
	import { Styles as SveltestrapStyles } from "sveltestrap";
	import { Authentication, authenticationState } from "./stores";
	import Login from "./Login.svelte";
	import NavBar from "./NavBar.svelte";
	import Statistics from "./Statistics.svelte";
	const BACKEND_URL = "http://localhost:8090/api/v1";
</script>

<SveltestrapStyles />

<main>
	<NavBar />
	<h1 class="text-center font-weight-bold mb-3">CycleStats</h1>	
	<Login {BACKEND_URL} />
	{#if $authenticationState === Authentication.SUCCEEDED}
		<Statistics {BACKEND_URL} />
	{/if}
</main> 

<style>
</style>
