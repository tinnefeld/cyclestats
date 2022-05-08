<script lang="ts">
  import { onMount } from "svelte";
  import { bearerToken } from "./stores";
  import { Col, Container, Row } from "sveltestrap";
  import type { components } from "./models/ICycleStats";
  import DistancePerMonth from "./charts/DistancePerMonth.svelte";

  type IStatistics = components["schemas"]["Statistics"];
  type ISummary = components["schemas"]["Summary"];

  export let BACKEND_URL;

  let storeStatistics: IStatistics;
  let storeSummary: ISummary;

  onMount(async () => {
    try {
      const headerAuth = {
        "Content-type": "application/json",
        Authorization: `Bearer ${$bearerToken}`,
      };
      fetch(`${BACKEND_URL}/summary`, { headers: headerAuth })
        .then((summaryResponse) => summaryResponse.json())
        .then((summaryData) => (storeSummary = summaryData));

      fetch(`${BACKEND_URL}/statistics`, { headers: headerAuth })
        .then((statisticsResponse) => statisticsResponse.json())
        .then((statisticsData) => (storeStatistics = statisticsData));
    } catch (error) {
      console.log(error);
    }
  });
</script>

<Container>
  <Row>
    <Col>
      {#if storeSummary && storeSummary.cyclist}
        <h2>
          Hello {storeSummary.cyclist.firstName}
          {storeSummary.cyclist.lastName}
        </h2>
        <ul>
          {#each Object.keys(storeSummary.cyclist) as key}
            <li>{key} : {storeSummary.cyclist[key]}</li>
          {/each}
        </ul>
      {/if}
    </Col>
  </Row>

  <Row>
    <Col>
      {#if storeStatistics && storeStatistics.distancesPerMonth}
        <DistancePerMonth data={storeStatistics.distancesPerMonth}/>
      {/if}
    </Col>
  </Row>
</Container>

<style>
  ul {
    text-align: center;
    list-style: inside;
  }
</style>
