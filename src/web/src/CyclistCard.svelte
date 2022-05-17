<script lang="ts">
  import { Card, CardHeader, CardTitle, CardSubtitle, CardText, CardBody, Row, Col, Table } from "sveltestrap";
  import { getWeight } from "./utils";
  import { measurementUnitState } from "./stores";
  import type { components } from "./models/ICycleStats";
  type ICyclist = components["schemas"]["Cyclist"];
  export let data: ICyclist;
  const subTitleCityState = data.city ? (data.state ? `${data.city}, ${data.state}` : `${data.city}`) : undefined;
</script>

<Card class="shadow">
  <CardHeader>
    <Row>
    <Col class="col-3 align-self-center text-center">
      <img src={data.profileUrl} class="img-fluid rounded-circle" alt="mobile screen">
    </Col>
    <Col class="col-9">
    <CardTitle>{data.firstName} {data.lastName}</CardTitle>
    {#if subTitleCityState}
      <CardSubtitle>{subTitleCityState}</CardSubtitle>
    {/if}
    {#if data.country}
      <CardSubtitle>{data.country}</CardSubtitle>
    {/if}
  </Col>
  </Row>
  </CardHeader>
  <CardBody>
    <CardText>
      <p><small><strong>Gender</strong> {data.sex} |
                <strong>Weight</strong> {getWeight(data.weight, $measurementUnitState)} | 
                <strong>FTP</strong> {data.ftp} Watts</small></p>
    </CardText>
  </CardBody>
</Card>