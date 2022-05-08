<script lang="ts">
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import type { components } from "../models/ICycleStats";

  type IDistancePerMonth = components["schemas"]["DistancePerMonth"];

  export let data: IDistancePerMonth[];

  let canvasReference;

  const config = {
    type: 'bar' as any,
    data: {
    labels: data.map(e => `${e.month} ${e.year}`),
    datasets: [{
      label: 'Distance per Month',
      data: data.map(e => e.distance),
    }]
  },
    options: {}
  };

  onMount(() => { new Chart(canvasReference, config) });
</script>

<canvas bind:this={canvasReference} />
