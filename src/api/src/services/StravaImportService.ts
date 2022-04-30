import { promises as fsPromises } from "fs";
import fetch, { Response as ResponseFetch } from "node-fetch";
import { definitions } from "../models/IStrava";

type IStravaSummaryActivity = definitions["SummaryActivity"];
type IStravaDetailedAthlete = definitions["DetailedAthlete"];
type IStravaActivityStats = definitions["ActivityStats"];

const STRAVA_OAUTH_URL = "https://www.strava.com/oauth/token";

const LOCAL_DATA_PATH = "./test/data/";

export class StravaImportService {
  private readonly CLIENT_ID = process.env.CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.CLIENT_SECRET;
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

  public async getOAuthToken(code: string): Promise<ResponseFetch> {
    const grantType = "authorization_code";
    const response = await fetch(`${STRAVA_OAUTH_URL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}` +
                                 `&code=${code}&grant_type=${grantType}`, { method: "post" });
    return response;
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
