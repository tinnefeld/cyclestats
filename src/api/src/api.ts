import express from "express";
import cors from "cors";
import yaml from "yamljs";
import { connector } from "swagger-routes-express";
import { WEB_BASE } from "./settings.js";

import * as controller from "./controllers/cycleStatsController.js";

const app = express();
const port = 8090;

const openApiSpec = yaml.load("./spec/cyclestats.yaml");
const connect = connector(controller, openApiSpec);

app.use(cors({
  origin: WEB_BASE
}));

connect(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
