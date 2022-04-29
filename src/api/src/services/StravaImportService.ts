import { promises as fsPromises } from "fs";
import { definitions } from "../models/IStrava";

type IStravaSummaryActivity = definitions["SummaryActivity"];
type IStravaDetailedAthlete = definitions["DetailedAthlete"];
type IStravaActivityStats = definitions["ActivityStats"];

const LOCAL_DATA_PATH = "./test/data/";

export class StravaImportService {
  private readonly NODE_ENV = process.env.NODE_ENV;

  public async getActivities(): Promise<IStravaSummaryActivity[]> {
    let result: IStravaSummaryActivity[] = [];
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("activities_basic.json");
    }
    return result;
  }

  public async getAthlete(): Promise<IStravaDetailedAthlete> {
    let result: IStravaDetailedAthlete = {};
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("athlete_basic.json");
    }
    return result;
  }

  public async getAthleteStats(): Promise<IStravaActivityStats> {
    let result: IStravaActivityStats = {};
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("athlete_stats_basic.json");
    }
    return result;
  }

  private async loadLocalData(fileName: string): Promise<any> {
    let result = {};
    try {
      const file = await fsPromises.readFile(`${LOCAL_DATA_PATH}${fileName}`);
      result = JSON.parse(file.toString());
    } catch (e) {
      console.log(e);
    }
    return result;
  }
}
