<script lang="ts">
  import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Table
  } from "sveltestrap";
  import type { components } from "./models/ICycleStats";
  import { measurementUnitState } from "./stores";
  import { THREE_DIGITS } from "./constants";
  import { convertMinutesToDaysAndHours, getDistanceLong, getDistanceShort } from "./utils";
  type IStatistics = components["schemas"]["Statistics"];
  export let data: IStatistics;
</script>

<Card class="shadow">
  <CardHeader>
    <CardTitle>Summary</CardTitle>
  </CardHeader>
  <CardBody>
    <CardText>
      <div class="table-responsive">
      <Table class="table-borderless table-sm text-center">
        <thead>
          <tr>
            <th></th>
            <th>Rides</th>
            <th>Distance</th>
            <th>Elevation Gain</th>
            <th>Time</th>
            <th>Energy</th>
           </tr>
        </thead>
        <tbody>
          {#each data.monthlySummary as d}
          <tr>
            <th scope="row">{d.year}</th>
            <td><small>{d.rides}</small></td>
            <td><small>{getDistanceLong(d.distance, $measurementUnitState, true)}</small></td>
            <td><small>{getDistanceShort(d.elevation, $measurementUnitState, true)}</small></td>
            <td><small>{convertMinutesToDaysAndHours(d.movingTime, true)}</small></td>
            <td><small>{d.energy.toString().replace(THREE_DIGITS, ",")} Wh</small></td>
          </tr>
          {/each}
          <tr style="border-bottom:1px solid black">
            <td colspan=100></td>
          </tr>
          <tr>
            <th scope="row">All-time</th>
            <td><small>{data.totalSummary.rides}</small></td>
            <td><small>{getDistanceLong(data.totalSummary.distance, $measurementUnitState, true)}</small></td>
            <td><small>{getDistanceShort(data.totalSummary.elevation, $measurementUnitState, true)}</small></td>
            <td><small>{convertMinutesToDaysAndHours(data.totalSummary.movingTime, true)}</small></td>
            <td><small>{data.totalSummary.energy.toString().replace(THREE_DIGITS, ",")} Wh</small></td>
          </tr>
        </tbody>
      </Table>    
    </div>
    </CardText>
  </CardBody>
</Card>