<script lang="ts">
	import { Styles as SveltestrapStyles } from "sveltestrap";
	import { Authentication } from "./constants";
	import { authenticationState } from "./stores";
	import { DEMO_MODE } from "./demo";
	import Login from "./Login.svelte";
	import NavBar from "./NavBar.svelte";
	import Statistics from "./Statistics.svelte";
	const BACKEND_URL = "http://localhost:8090/api/v1";
</script>

<SveltestrapStyles />

<main>
	<NavBar />
	<h1 class="text-center font-weight-bold mb-3">CycleStats</h1>
	{#if !DEMO_MODE}
	  <Login {BACKEND_URL} />
	{/if}
	{#if DEMO_MODE || ($authenticationState === Authentication.SUCCEEDED)}
		<Statistics {BACKEND_URL} />
	{/if}
</main> 

<style>
</style>
