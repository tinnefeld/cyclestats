<script lang="ts">
  import Chart from "chart.js/auto";
  import type { CartesianScaleOptions, ChartConfiguration } from "chart.js";
  import { onMount } from "svelte";
  import { measurementUnitState } from "../stores";
  import { MeasurementUnit } from "../constants";
  import {
    getDistanceLong,
    getDistanceShort,
    convertMinutesToDaysAndHours,
    transparentize
  } from "../utils";
  import {
    DistanceLong,
    DistanceShort,
    ChartColors,
    METERS_TO_FEET,
    MILES_TO_KILOMETER,
    MONTH_LABELS
  } from "../constants";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardSubtitle,
    Col,
    Container,
    Row
  } from "sveltestrap";
  import type { components } from "../models/ICycleStats";

  type IMonthlySummary = components["schemas"]["Statistics"]["monthlySummary"];

  enum Parameter {
    DISTANCE,
    ELEVATION
  }

  export let data: IMonthlySummary;
  const references = [];
  data.forEach(() => {
    let canvasReference: HTMLCanvasElement;
    let chartReference: Chart;
    references.push({
      canvas: canvasReference,
      chart: chartReference
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
            label: createLabel($measurementUnitState, Parameter.DISTANCE),
            yAxisID: "y1",
            backgroundColor: transparentize(ChartColors.A, 0.5),
            data: createChartData($measurementUnitState, yearIndex, Parameter.DISTANCE)
          },
          {
            label: createLabel($measurementUnitState, Parameter.ELEVATION),
            yAxisID: "y2",
            backgroundColor: transparentize(ChartColors.C, 0.5),
            data: createChartData($measurementUnitState, yearIndex, Parameter.ELEVATION)
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: createScales()
      }
    };
    return config;
  }

  function updateChartOnMeasurementUnit() {
    data.forEach((e, i) => {
      if (references[i].chart) {
        references[i].chart.options.scales = createScales();
        references[i].chart.data.datasets[0].label = createLabel($measurementUnitState, Parameter.DISTANCE);
        references[i].chart.data.datasets[0].data = createChartData($measurementUnitState, i, Parameter.DISTANCE);
        references[i].chart.data.datasets[1].label = createLabel($measurementUnitState, Parameter.ELEVATION);
        references[i].chart.data.datasets[1].data = createChartData($measurementUnitState, i, Parameter.ELEVATION);
        references[i].chart.update();
      }
    });
  }

  function createLabel(unit: MeasurementUnit, parameter: Parameter) {
    let result = "";
    if (parameter === Parameter.DISTANCE) {
      result = `Distance in ${DistanceLong[unit]}`;
    } else if (parameter === Parameter.ELEVATION) {
      result = `Elevation gain in ${DistanceShort[unit]}`;
    }
    return result;
  }

  function createChartData(unit: MeasurementUnit, yearIndex: number, parameter: Parameter): number[] {
    // result in metric
    let result = MONTH_LABELS.map((e, i) => {
      const monthIndex = data[yearIndex].months.findIndex((m) => m.month === i);
      if (monthIndex >= 0) {
        if (parameter === Parameter.DISTANCE) {
          return data[yearIndex].months[monthIndex].distance;
        } else if (parameter === Parameter.ELEVATION) {
          return data[yearIndex].months[monthIndex].elevation;
        }
      }
      return 0;
    });
    if (unit === MeasurementUnit.IMPERIAL) {
      if (parameter === Parameter.DISTANCE) {
        result = result.map((x) => Math.round(x * MILES_TO_KILOMETER));
      } else if (parameter === Parameter.ELEVATION) {
        result = result.map((x) => Math.round(x * METERS_TO_FEET));
      }
    }
    return result;
  }

  function createScales() {
    return {
      y1: {
        type: "linear" as any,
        position: "left" as CartesianScaleOptions["position"],
        title: {
          display: window.matchMedia("(min-width: 768px)").matches,
          text: DistanceLong[$measurementUnitState]
        }
      },
      y2: {
        type: "linear" as any,
        position: "right" as CartesianScaleOptions["position"],
        title: {
          display: window.matchMedia("(min-width: 768px)").matches,
          text: DistanceShort[$measurementUnitState]
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for y1 axis to show up
        }
      }
    };
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
            <CardSubtitle>{d.rides} rides | {getDistanceLong(d.distance, $measurementUnitState)} |
                          {getDistanceShort(d.elevation, $measurementUnitState)} elevation gain | 
                          {convertMinutesToDaysAndHours(d.movingTime)}     
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            <canvas bind:this={references[i].canvas} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  {/each}
</Container>
