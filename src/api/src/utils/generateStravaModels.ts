import fetch from "node-fetch";
import openapiTS from "openapi-typescript";
import { promises as fsPromises } from "fs";

const STRAVA_SWAGGER_URL_PATH = "https://developers.strava.com/swagger/";
const STRAVA_SWAGGER_FILES = ["activity.json", "activity_type.json", "athlete.json", "club.json", "gear.json",
  "lap.json", "latlng.json", "map.json", "photo.json", "segment.json", "segment_effort.json", "split.json"];

/**
 * Fetch Swagger JSON files from Strava and create corresponding TypeScript models
 */
(async () => {
  const swagger = {
    swagger: "2.0",
    definitions: {}
  };
  try {
    for (const file of STRAVA_SWAGGER_FILES) {
      // get remote swagger
      const urlResponse = await fetch(STRAVA_SWAGGER_URL_PATH + file);
      const urlData: any = await urlResponse.json();
      // merge definitions into local swagger
      swagger.definitions = { ...swagger.definitions, ...urlData };
    }

    // convert to TS model
    let tsModel = await openapiTS(swagger);
    // replace external["https://...*"] with definitions
    const regex = /external\[[^\]]*\]/gm;
    tsModel = tsModel.replace(regex, "definitions");

    // write TS model file to disk
    await fsPromises.writeFile("./src/models/IStrava.ts", tsModel);
    console.log("Typescript models written to disk");
  } catch (error) {
    console.log("Error: %o", error);
  }
})();
