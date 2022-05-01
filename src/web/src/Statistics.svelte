<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import type { components } from "./models/ICycleStats";
  
  type IStatistics = components["schemas"]["Statistics"];
  type ISummary = components["schemas"]["Summary"];

  const storeStatistics = writable({} as IStatistics);
  const storeSummary = writable({} as ISummary);

  export let BACKEND_URL;
  export let bearerTokenStatistics;

  onMount(async () => {
    try {
      const summaryResponse = await fetch(`${BACKEND_URL}/summary`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${bearerTokenStatistics}`,
        },
      });
      const summaryData: ISummary = await summaryResponse.json();
      storeSummary.set(summaryData);
      const statisticsResponse = await fetch(`${BACKEND_URL}/statistics`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${bearerTokenStatistics}`,
        },
      });
      const statisticsData: IStatistics = await statisticsResponse.json();
      storeStatistics.set(statisticsData);
    } catch (error) {
      console.log(error);
    }
  });
</script>

{#if $storeSummary.cyclist}
  <h2>
    Hello {$storeSummary.cyclist.firstName}
    {$storeSummary.cyclist.lastName}
  </h2>
  <ul>
    {#each Object.keys($storeSummary.cyclist) as key}
      <li>{key} : {$storeSummary.cyclist[key]}</li>
    {/each}
  </ul>
{/if}

{#if $storeStatistics.distancesPerMonth}
  <ul>
    {#each $storeStatistics.distancesPerMonth as month}
      <li>
        Year: {month.year} Month: {month.month} Distance: {month.distance}
      </li>
    {/each}
  </ul>
{/if}
