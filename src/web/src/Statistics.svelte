<script lang="ts">
  import { onMount } from "svelte";
  import { bearerToken } from "./stores";
  import { Card, CardHeader, CardTitle, CardBody, CardText, Col, Container, Row } from "sveltestrap";
  import type { components } from "./models/ICycleStats";
  import MonthlySummary from "./charts/MonthlySummary.svelte";

  type IStatistics = components["schemas"]["Statistics"];
  type ISummary = components["schemas"]["Summary"];

  export let BACKEND_URL: string;

  let storeStatistics: IStatistics;
  let storeSummary: ISummary;

  onMount(async () => {
    try {
      const headerAuth = {
        "Content-type": "application/json",
        Authorization: `Bearer ${$bearerToken}`
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
    <Col md="3">
      <div class="jumbotron">
      {#if storeSummary && storeSummary.cyclist}
        <h2>
          Hello {storeSummary.cyclist.firstName}
          {storeSummary.cyclist.lastName}
        </h2>
        <ul>
          {#each Object.keys(storeSummary.cyclist) as key}
            {#if key !== "profileUrl"}
            <li>{key} : {storeSummary.cyclist[key]}</li>
            {/if}
          {/each}
        </ul>
      {/if}
    </div>
    </Col>
    <Col>

      <Card class="shadow">
        <CardHeader>
          <CardTitle>Card title</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </CardText>
        </CardBody>
      </Card>
      
    </Col>
  </Row>
</Container>

{#if storeStatistics && storeStatistics.monthlySummary}
  <MonthlySummary data={storeStatistics.monthlySummary}/>
{/if}


<style>
  .jumbotron {
  height: 200px;
  padding: 1rem 1rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  }
  :global(.cardCyleStats) {
  border-radius: 0.5rem !important;
  }
</style>
