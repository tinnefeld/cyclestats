<script lang="ts">
  import Chart from "chart.js/auto";
  import type { ChartConfiguration } from "chart.js";
  import { onMount } from "svelte";
  import { MeasurementUnit, measurementUnitState } from "../stores";
  import { DISTANCE_MI_TO_KM, DistanceLong } from "../utils";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardSubtitle,
    Col,
    Container,
    Row,
  } from "sveltestrap";
  import type { components } from "../models/ICycleStats";

  type IMonthlySummary = components["schemas"]["Statistics"]["monthlySummary"];

  const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  export let data: IMonthlySummary;
  const references = [];
  data.forEach((y) => {
    let canvasReference;
    let chartReference;
    references.push({
      canvas: canvasReference,
      chart: chartReference,
    });
  });

  function createChartConfig(year: number): ChartConfiguration {
    const yearIndex = data.findIndex((e) => e.year === year);
    const config = {
      type: "bar" as any,
      data: {
        labels: MONTH_LABELS,
        datasets: [
          {
            label: `Distance in ${DistanceLong[$measurementUnitState]}`,
            backgroundColor: "F76C6C",
            borderColor: "FEFFFF",
            data: createChartData($measurementUnitState, yearIndex),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
      },
    };
    return config;
  }

  function updateChartOnMeasurementUnit() {
    data.forEach((e, i) => {
      if (references[i].chart) {
        references[i].chart.data.datasets[0].label = `Distance in ${DistanceLong[$measurementUnitState]}`;
        references[i].chart.data.datasets[0].data = createChartData($measurementUnitState, i);
        references[i].chart.update();
      }
    });
  }

  function createChartData(unit: MeasurementUnit, yearIndex: number): number[] {
    // result in metric
    let result = MONTH_LABELS.map((e, i) => {
      const monthIndex = data[yearIndex].months.findIndex((m) => m.month === i);
      if (monthIndex >= 0) {
        return data[yearIndex].months[monthIndex].distance;
      } else {
        return 0;
      }
    });
    if (unit === MeasurementUnit.IMPERIAL) {
      result = result.map((x) => Math.round(x * DISTANCE_MI_TO_KM));
    }
    return result;
  }

  onMount(() => {
    data.forEach((e, i) => {
      references[i].chart = new Chart(
        references[i].canvas,
        createChartConfig(e.year)
      );
    });
  });

  $: $measurementUnitState, updateChartOnMeasurementUnit();
</script>

<Container>
  {#each data as d, i}
    <Row class="mb-3">
      <Col>
        <Card class="shadow">
          <CardHeader>
            <CardTitle>{d.year}</CardTitle>
            <CardSubtitle
              >1134 miles | 44.323 feet elev gain | 12 days 55 hours 11 minustes</CardSubtitle>
          </CardHeader>
          <CardBody>
            <canvas bind:this={references[i].canvas} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  {/each}
</Container>
