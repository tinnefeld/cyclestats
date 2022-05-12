<script lang="ts">
  import { Col, Container, Navbar, Row } from "sveltestrap";
  import { MeasurementUnit, measurementUnitState } from "./stores";

  function handleUnitChange(event: Event) {
    if (event.target instanceof Element) {
      if (event.target.id === "btnradioImperial") {
        measurementUnitState.set(MeasurementUnit.IMPERIAL);
      } else if (event.target.id === "btnradioMetric") {
        measurementUnitState.set(MeasurementUnit.METRIC);
      }
    }
  }
</script>

<Navbar>
  <Container>
    <Row class="justify-content-end">
      <Col class="col-auto">
        <div class="btn-group" role="group">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradioImperial"
            autocomplete="off"
            checked
            on:change={handleUnitChange}
          />
          <label class="btn btn-outline-dark btn-sm" for="btnradioImperial"
            >Imperial</label
          >

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradioMetric"
            autocomplete="off"
            on:change={handleUnitChange}
          />
          <label class="btn btn-outline-dark btn-sm" for="btnradioMetric"
            >Metric</label
          >
        </div>
      </Col>
    </Row>
  </Container>
</Navbar>
