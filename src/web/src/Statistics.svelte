<script lang="ts">
  import { onMount } from "svelte";
  import { bearerToken } from "./stores";
  import { Col, Row, Spinner } from "sveltestrap";
  import type { components } from "./models/ICycleStats";
  import { DEMO_MODE, DEMO_DATA_SUMMARY, DEMO_DATA_STATISTICS } from "./demo";
  import CyclistCard from "./CyclistCard.svelte";
  import MonthlySummary from "./charts/MonthlySummary.svelte";
  import SummaryCard from "./SummaryCard.svelte";

  type IStatistics = components["schemas"]["Statistics"];
  type ISummary = components["schemas"]["Summary"];

  export let API_URL: string;

  let storeStatistics: IStatistics;
  let storeSummary: ISummary;

  onMount(async () => {
    if (DEMO_MODE) {
      storeSummary = DEMO_DATA_SUMMARY;
      storeStatistics = DEMO_DATA_STATISTICS;
    } else {
    try {
      const headerAuth = {
        "Content-type": "application/json",
        Authorization: `Bearer ${$bearerToken}`
      };
      fetch(`${API_URL}/summary`, { headers: headerAuth })
        .then((summaryResponse) => summaryResponse.json())
        .then((summaryData) => (storeSummary = summaryData));

      fetch(`${API_URL}/statistics`, { headers: headerAuth })
        .then((statisticsResponse) => statisticsResponse.json())
        .then((statisticsData) => (storeStatistics = statisticsData));
    } catch (error) {
      console.log(error);
    }
  }
});
</script>

<Row>
  <Col class="col-auto mb-3">
    {#if storeSummary && storeSummary.cyclist}
      <CyclistCard data={storeSummary.cyclist} />
    {:else}
      <Spinner />
    {/if}
  </Col>
  <Col class="mb-3">
    {#if storeStatistics}
      <SummaryCard data={storeStatistics} />
    {:else}
      <Spinner />
    {/if}
  </Col>
</Row>


{#if storeStatistics && storeStatistics.monthlySummary}
  <MonthlySummary data={storeStatistics.monthlySummary} />
{:else}
  <Spinner />
{/if}
