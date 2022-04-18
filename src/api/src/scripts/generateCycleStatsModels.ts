import openapiTS from "openapi-typescript";
import { promises as fsPromises } from "fs";

/**
 * Load CycleStats OpenAPI file and create corresponding TypeScript models
 */
(async () => {
  try {
    // load OpenApi file and convert to TS model
    const tsModel = await openapiTS("./spec/cyclestats.yaml");
    // write TS model file to disk
    await fsPromises.writeFile("./src/models/ICycleStats.ts", tsModel);
    console.log("Typescript models written to disk");
  } catch (error) {
    console.log("Error: %o", error);
  }
})();
