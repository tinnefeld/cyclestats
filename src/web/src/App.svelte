<script lang="ts">
	import { writable } from 'svelte/store';
  import { onMount } from "svelte";

	import type { components } from "./models/ICycleStats";
	type IStatistics = components["schemas"]["Statistics"];
	type ISummary = components["schemas"]["Summary"];

	const storeStatistics = writable({} as IStatistics);
	const storeSummary = writable({} as ISummary);

	const BACKEND_URL = "http://localhost:8090/api/v1"

  onMount(async () => {
		try {
		  const summaryResponse = await fetch(`${BACKEND_URL}/summary`);
		  const summaryData: ISummary = await summaryResponse.json();
      storeSummary.set(summaryData);
			const statisticsResponse = await fetch(`${BACKEND_URL}/statistics`);
		  const statisticsData: IStatistics = await statisticsResponse.json();
      storeStatistics.set(statisticsData);
		} catch (error) {
			console.log(error);
		}
	})
</script>

<main>
	<h1>CycleStats</h1>
	{#if $storeSummary.cyclist}
	<h2>Hello {$storeSummary.cyclist.firstName} {$storeSummary.cyclist.lastName}</h2>
	<ul>
		{#each Object.keys($storeSummary.cyclist) as key}
			<li>{key} : {$storeSummary.cyclist[key]}</li>
		{/each}
	</ul>
	{/if}

	{#if $storeStatistics.distancesPerMonth}
	<ul>
		{#each $storeStatistics.distancesPerMonth as month}
  		<li>Year: {month.year} Month: {month.month} Distance: {month.distance} </li>
		{/each}
	</ul>
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