import { promises as fsPromises } from "fs";
import express from "express";
import cors from "cors";
import yaml from "yamljs";
import { connector } from "swagger-routes-express";

import * as controller from "./controllers/cycleStatsController.js";

const app = express();
const port = 8090;

const openApiSpec = yaml.load("./spec/cyclestats.yaml");
const connect = connector(controller, openApiSpec);

app.use(cors({
  origin: "http://localhost:8080"
}));

app.get("/activities", async (req, res) => {
  let activities = [{ name: "a1" }, { name: "a2" }, { name: "a3" }];
  try {
    const activitiesFile = await fsPromises.readFile("./test/data/activities.json");
    activities = JSON.parse(activitiesFile.toString());
  } catch (e) {
    console.log(e);
  }
  res.json(activities);
});

connect(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
