<script lang="ts">
  import { onMount } from "svelte";
  import { bearerToken } from "./stores";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardBody,
    Col,
    Container,
    Row
  } from "sveltestrap";
  import type { components } from "./models/ICycleStats";
  import MonthlySummary from "./charts/MonthlySummary.svelte";
  import SummaryCard from "./SummaryCard.svelte";

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
    <Col class="col-auto mb-3">
      {#if storeSummary && storeSummary.cyclist}
        <Card class="shadow" style="height: 100%">
          <CardHeader>
            <Row>
            <Col class="col-3 text-center">
              <img src={storeSummary.cyclist.profileUrl} class="img-fluid rounded-circle" alt="mobile screen">
            </Col>
            <Col class="col-9">
            <CardTitle>{storeSummary.cyclist.firstName} {storeSummary.cyclist.lastName}</CardTitle>
            <CardSubtitle>{storeSummary.cyclist.location}</CardSubtitle>
          </Col>
          </Row>
          </CardHeader>
          <CardBody>
            Information on the rider            
          </CardBody>
        </Card>
      {/if}
    </Col>
    <Col class="mb-3">
      {#if storeStatistics}
      <SummaryCard data={storeStatistics} />
      {/if}
    </Col>
  </Row>
</Container>

{#if storeStatistics && storeStatistics.monthlySummary}
  <MonthlySummary data={storeStatistics.monthlySummary} />
{/if}

<style>
</style>
