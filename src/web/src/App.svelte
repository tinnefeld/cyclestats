<script lang="ts">
	import { Container, Row, Column, Styles as SveltestrapStyles } from "sveltestrap";
	import { Authentication } from "./constants";
	import { authenticationState } from "./stores";
	import { DEMO_MODE } from "./demo";
	import Login from "./Login.svelte";
	import NavBar from "./NavBar.svelte";
	import Statistics from "./Statistics.svelte";
	const BACKEND_URL = "https://cyclestats-api-swhgu.ondigitalocean.app/api/v1";
</script>

<SveltestrapStyles />

<main>
	<NavBar />
	<Container>
		<Row>
			<Column class="text-center">
	      <h1 class="font-weight-bold mb-3">CycleStats</h1>
			</Column>
	</Row>
	{#if !DEMO_MODE}
	<Row>
		<Column class="text-center">
			<Login {BACKEND_URL} />
		</Column>
  </Row>
	{/if}
	{#if DEMO_MODE || ($authenticationState === Authentication.SUCCEEDED)}
		<Statistics {BACKEND_URL} />
	{/if}
  </Container>
</main> 
