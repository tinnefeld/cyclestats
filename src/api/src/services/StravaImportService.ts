import { promises as fsPromises } from "fs";
import fetch, { HeadersInit, Response as ResponseFetch } from "node-fetch";
import { definitions } from "../models/IStrava";
import { AuthCode, BearerToken } from "../models/IUtils";

type IStravaSummaryActivity = definitions["SummaryActivity"];
type IStravaDetailedAthlete = definitions["DetailedAthlete"];
type IStravaActivityStats = definitions["ActivityStats"];

const STRAVA_URL = "https://www.strava.com";
const STRAVA_API = "/api/v3";
const STRAVA_OAUTH_URL = `${STRAVA_URL}/oauth/token`;
const STRAVA_ATHLETE_URL = `${STRAVA_URL}${STRAVA_API}/athlete`;
const STRAVA_ATHLETES_URL = `${STRAVA_URL}${STRAVA_API}/athletes`;
const STRAVA_ACTIVITIES_URL = `${STRAVA_URL}${STRAVA_API}/athlete/activities`;

const LOCAL_DATA_PATH = "./test/data/";

export class StravaImportService {
  private readonly CLIENT_ID = process.env.CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.CLIENT_SECRET;
  private readonly NODE_ENV = process.env.NODE_ENV;
  private readonly headers: HeadersInit = {};

  constructor(bearerToken?: BearerToken) {
    if (bearerToken) {
      this.headers = {
        "Content-type": "application/json",
        Authorization: `${bearerToken}`
      };
    }
  }

  public async getActivities(): Promise<IStravaSummaryActivity[]> {
    let result: IStravaSummaryActivity[] = [];
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("activities_personal_full.json");
    } else if (this.NODE_ENV === "PROD") {
      const perPage = 100;
      let currentPage = 1;
      let continuePaging = true;
      while (continuePaging) {
        const response = await fetch(`${STRAVA_ACTIVITIES_URL}?per_page=${perPage}&page=${currentPage}`,
          { method: "get", headers: this.headers });
        const tmpResult: IStravaSummaryActivity[] = await response.json() as any;
        for (const activity of tmpResult) {
          if (activity.type === "Ride") {
            result.push(activity);
          }
        }
        currentPage++;
        continuePaging = (tmpResult.length === perPage);
      }
    }
    return result;
  }

  public async getAthlete(): Promise<IStravaDetailedAthlete> {
    let result: IStravaDetailedAthlete = {};
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("athlete_personal.json");
    } else if (this.NODE_ENV === "PROD") {
      const response = await fetch(`${STRAVA_ATHLETE_URL}`, { method: "get", headers: this.headers });
      result = await response.json() as any;
    }
    return result;
  }

  public async getAthleteStats(athleteId: number): Promise<IStravaActivityStats> {
    let result: IStravaActivityStats = {};
    if (this.NODE_ENV === "DEV") {
      result = await this.loadLocalData("athlete_stats_basic.json");
    } else if (this.NODE_ENV === "PROD") {
      const response = await fetch(`${STRAVA_ATHLETES_URL}/${athleteId}/stats`,
        { method: "get", headers: this.headers });
      result = await response.json() as any;
    }
    return result;
  }

  public async getOAuthToken(code: AuthCode): Promise<ResponseFetch> {
    let response = new ResponseFetch(JSON.stringify({ access_token: 123456789 }), { status: 201 });
    if (this.NODE_ENV === "PROD") {
      const grantType = "authorization_code";
      response = await fetch(`${STRAVA_OAUTH_URL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}` +
        `&code=${code}&grant_type=${grantType}`, { method: "post" });
    }
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
